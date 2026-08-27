# Vaden Consultancy website

Production website for Vaden Consultancy, an assumed name of Ecleva LLC. Built with Next.js, TypeScript, and Tailwind CSS for deployment on Vercel.

Project location: `/Users/shiva/Documents/GitHub/VadenSoftware`

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production checks

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, select **Add New → Project** and import the repository.
3. Keep **Framework Preset** set to Next.js and leave the build and output settings at their defaults.
4. Select **Deploy**.
5. In the Vercel project, open **Settings → Domains** and add `vadensoftware.com`, then add `www.vadensoftware.com`.
6. Set `vadensoftware.com` as the primary domain and configure `www.vadensoftware.com` to redirect to it.

## Cloudflare DNS for Vercel

Use DNS only (gray cloud) while Vercel verifies the domain:

| Type | Name | Target | Proxy status |
| --- | --- | --- | --- |
| A | `@` | `76.76.21.21` | DNS only |
| CNAME | `www` | `cname.vercel-dns-0.com` | DNS only |

If Vercel displays project-specific DNS targets in **Settings → Domains**, use those exact targets instead. Remove only conflicting web-hosting records for `@` or `www`. Do not change existing MX, email-related TXT, DKIM, or SPF records.
