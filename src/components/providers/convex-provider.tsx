'use client'

// NOTE: How things wired up
// 1. useAuth knows current session/ token state
// 2. ConvexProviderWithClerk knows how to ask Clerk for auth info/token and attach it to Convex requests
// 3. ConvexReactClient sends requests to NEXT_PUBLIC_CONVEX_URL
// 4. Convex backend validates that token using auth.config.ts issuer domain + applicationID
//
// Results: all convex hooks, components inside the provider automatically become auth-aware

import { useAuth } from '@clerk/nextjs'
import { ConvexReactClient } from 'convex/react'
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import type { ReactNode } from 'react'

if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
  throw new Error('Missing NEXT_PUBLIC_CONVEX_URL in your .env file')
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL)

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  )
}
