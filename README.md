# Polaris

## Notes

### Auth Integration Checklist (Provider-Agnostic)

1. Define trust boundaries  
    - List runtimes: Browser, App Server, BaaS Backend, CLI/CI.  
    - Decide which runtime is trusted to hold secrets (usually server/BaaS only).
2. Inventory required env vars by category  
    - Public app identifiers (`NEXT_PUBLIC_*` style).  
    - Secret credentials (server-only).  
    - Token verification config (issuer/audience/JWKS/project).  
    - Service endpoints/deployment IDs.
3. Map each env var to a single owner runtime  
    - Browser vars must be public-safe.  
    - Server/BaaS vars must never leak to client bundle.  
    - Tooling vars (CLI) stay local/CI.
4. Wire frontend auth bootstrap  
    - Configure provider SDK (Clerk/Auth0/Firebase/etc.) with public identifier.  
    - Verify login/logout/session refresh works in browser.
5. Wire backend token verification  
    - Backend/BaaS validates token signature + issuer + audience/application id.  
    - Reject tokens failing any check.
6. Connect auth context to data client  
    - Ensure authenticated client requests include access token automatically.  
    - Confirm backend sees user identity (subject/user ID, claims).
7. Implement authorization rules (not just authentication)  
    - Enforce “who can do what” in backend/BaaS functions/queries.  
    - Use user ID/roles/org claims, never trust client-only checks.
8. Configure environments consistently  
    - Local `.env.local`, preview, production, and BaaS dashboard envs all aligned.  
    - Keep issuer/audience/project IDs environment-specific (dev vs prod).
9. Add observability + failure diagnostics  
    - Log auth failure reasons safely (invalid issuer, expired token, missing audience).  
    - Add a quick “auth health check” flow: sign in -> call protected endpoint -> verify identity.
10. Secure operations hygiene  
    - Rotate secrets, avoid committing `.env*`, use least-privilege keys.  
    - Document each env var: who reads it, why it exists, what breaks if wrong.

#### Current stack (Clerk + Convex + Next.js)

- Browser uses Clerk public key + Convex public URL.
- Convex backend trusts Clerk tokens via issuer/application config.
- Secret Clerk key is for privileged server-side Clerk operations.
- Convex CLI uses deployment selector.
