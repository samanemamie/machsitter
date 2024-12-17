import { cookies } from 'next/headers'
import { cache } from 'react'

const getRequestConfig = cache(async () => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const cookie = await cookies()
  const locale = cookie.get('NEXT_LOCALE')?.value || process.env.DEFAULT_LANGUAGE || 'en'

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  }
})

export default getRequestConfig
