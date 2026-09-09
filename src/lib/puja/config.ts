import "server-only";

export class PujaConfigurationError extends Error {
  constructor(message = "The Puja RSVP service is not configured.") {
    super(message);
    this.name = "PujaConfigurationError";
  }
}

function requireEnvironmentValue(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new PujaConfigurationError(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getPujaSessionSecret() {
  const secret = requireEnvironmentValue("PUJA_SESSION_SECRET");

  if (secret.length < 32) {
    throw new PujaConfigurationError("PUJA_SESSION_SECRET must be at least 32 characters.");
  }

  return secret;
}

export function getPujaAdminPassword() {
  return requireEnvironmentValue("PUJA_ADMIN_PASSWORD");
}
