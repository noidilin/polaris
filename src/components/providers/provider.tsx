'use client'

// TODO: why use client here?

import { ClerkProvider, UserButton } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import { Authenticated, AuthLoading, Unauthenticated } from 'convex/react'
import { ThemeToggle } from '@/components/base/theme-toggle'
import { AuthLoadingView } from '@/components/feature/auth/auth-loading-view'
import { UnauthenticatedView } from '@/components/feature/auth/unauthenticated-view'
import { ConvexClientProvider } from '@/components/providers/convex-provider'
import { ThemeProvider } from '@/components/providers/theme-provider'

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider appearance={{ theme: dark }}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ConvexClientProvider>
          <Authenticated>
            <UserButton />
            {children}
          </Authenticated>

          <Unauthenticated>
            <UnauthenticatedView />
          </Unauthenticated>

          <AuthLoading>
            <AuthLoadingView />
          </AuthLoading>

          <ThemeToggle />
        </ConvexClientProvider>
      </ThemeProvider>
    </ClerkProvider>
  )
}
