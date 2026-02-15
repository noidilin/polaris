import type { AuthConfig } from 'convex/server'

if (!process.env.CLERK_JWT_ISSUER_DOMAIN) {
  throw new Error('Missing CLERK_JWT_ISSUER_DOMAIN in your .env file')
}

export default {
  providers: [
    {
      domain: process.env.CLERK_JWT_ISSUER_DOMAIN,
      // WARN: applicationID needs to be the same as the JWT template in clerk
      applicationID: 'convex',
    },
  ],
} satisfies AuthConfig
// NOTE: validates our config conforms to AuthConfig,
// but still infer the final type from our config
