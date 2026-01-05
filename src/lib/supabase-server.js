// src/app/lib/supabase-server.js
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export async function sbServer() {
  const cookieStore = await cookies()  // <-- await in Next 15

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) { return cookieStore.get(name)?.value },
        set(name, value, options) { try { cookieStore.set({ name, value, ...options }) } catch {} },
        remove(name, options) { try { cookieStore.set({ name, value: '', ...options }) } catch {} },
      },
    }
  )
}
