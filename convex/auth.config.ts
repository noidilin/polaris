import type { AuthConfig } from 'convex/server'

if (!process.env.CLERK_JWT_ISSUER_DOMAIN) {
  throw new Error('Missing CLERK_JWT_ISSUER_DOMAIN in your .env file')
}

export default {
  providers: [
    {
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN,
      applicationID: 'convex', // NOTE: needs to be the same as the JWT template in clerk
    },
  ],
} satisfies AuthConfig // TODO: what does this typescript syntax `satisfies` do?
