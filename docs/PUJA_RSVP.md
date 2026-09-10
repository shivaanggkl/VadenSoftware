# Temporary Puja RSVP setup

The invitation and RSVP UI lives in `src/app/puja`. Its small server-side
storage module lives in `src/lib/puja`. Each household response is stored as a
private JSON object under `puja-rsvps/<id>.json` in Vercel Blob.

## Local setup

1. Install dependencies with `npm install`.
2. Link this checkout to the existing Vercel project with `vercel link`.
3. Complete the private Blob setup below.
4. Pull the project environment into the ignored local file with
   `vercel env pull .env.local`.
5. Add the two app-specific values below to `.env.local` if they are not already
   present, then run `npm run dev`.

## Required environment

- `PUJA_ADMIN_PASSWORD`: a unique, strong dashboard password.
- `PUJA_SESSION_SECRET`: at least 32 random characters; generate one with
  `openssl rand -base64 48`.

No static Blob token is required. Vercel supplies short-lived OIDC credentials
to server functions and provides `BLOB_STORE_ID` when the private store is
connected. Neither value belongs in browser code.

## Vercel Blob setup

In the existing Vercel project, open **Storage**, choose **Create Database →
Blob**, set access to **Private**, and connect the store to this project using
OIDC. Vercel automatically provides the store ID and short-lived credentials.
For local Blob access, link the checkout with `vercel link` and run through the
Vercel CLI so it can obtain a development OIDC token.

## Local URLs

- Invitation and RSVP: `http://localhost:3000/puja`
- Private dashboard: `http://localhost:3000/puja/admin`

## Deployment setup

Add `PUJA_ADMIN_PASSWORD` and `PUJA_SESSION_SECRET` in the Vercel project's
environment settings for Production and any Preview environment used for
testing. Confirm the private Blob store is connected through OIDC, then
redeploy. Do not add `BLOB_READ_WRITE_TOKEN`.

## Removal after September 27, 2026

1. Delete `src/app/puja`, `src/lib/puja`, and this document.
2. Restore `src/app/layout.tsx` to render the existing Vaden Header/Footer
   directly, then delete `src/components/site-chrome.tsx`.
3. Run `npm uninstall @vercel/blob` and remove the Puja entries from
   `.env.example`.
4. Remove the two Puja secrets from Vercel. After the RSVP data is no longer
   needed, delete the private Blob store (or all objects under `puja-rsvps/`).
