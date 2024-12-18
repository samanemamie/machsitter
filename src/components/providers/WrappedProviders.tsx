import NextIntlProvider from '@/components/providers/NextIntlProvider'
import ReactQueryProvider from '@/components/providers/ReactQueryProvider'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import ToasterComponent from '@/components/common/ToasterComponent'
import type { PropsWithChildren } from 'react'
import AuthProvider from '@/lib/context/AuthProvider'
import { getCurrentUser } from '@/lib/supabase/server'

type WrappedProvidersProps = PropsWithChildren
const WrappedProviders = async ({ children }: WrappedProvidersProps) => {
  const user = await getCurrentUser()
  return (
    <ThemeProvider>
      <NextIntlProvider>
        <AuthProvider initial={{ user: user.data.user }}>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </AuthProvider>
        <ToasterComponent />
      </NextIntlProvider>
    </ThemeProvider>
  )
}

export default WrappedProviders