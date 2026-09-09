import "server-only";

type RateLimitRecord = {
  count: number;
  resetAt: number;
};

const attempts = new Map<string, RateLimitRecord>();

export function checkRateLimit(
  key: string,
  options: { limit: number; windowMs: number },
) {
  const now = Date.now();
  const existing = attempts.get(key);

  if (!existing || existing.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + options.windowMs });
    return { allowed: true, retryAfter: 0 };
  }

  existing.count += 1;

  if (attempts.size > 500) {
    for (const [attemptKey, record] of attempts) {
      if (record.resetAt <= now) attempts.delete(attemptKey);
    }
  }

  return {
    allowed: existing.count <= options.limit,
    retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
}
