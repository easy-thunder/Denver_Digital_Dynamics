import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY // ⟵ anon key is fine on the server
)

export async function POST(req) {
  try {
    const body = await req.json().catch(() => ({}))
    const {
      name,
      email,
      org,
      role,
      usecase,
      updates = true,
      source = 'projects-page',
      intents = [],
      adv_message
    } = body

    if (!email || !usecase) {
      return NextResponse.json({ error: 'email and usecase are required' }, { status: 400 })
    }

    // normalize & whitelist intents
    const allowed = new Set(['creator', 'advertiser', 'consumer'])
    const normalizedIntents = Array.from(new Set((intents || [])
      .map(x => String(x).toLowerCase().trim())
      .filter(x => allowed.has(x))
    ))

    if (normalizedIntents.length === 0) {
      return NextResponse.json({ error: 'at least one intent is required' }, { status: 400 })
    }

    // Call the secure upsert
    const { error } = await supabase.rpc('pilot_signup_upsert', {
      p_email: String(email).trim().toLowerCase(),
      p_name: (name || '').trim() || null,
      p_org: (org || '').trim() || null,
      p_role: (role || '').trim() || null,
      p_usecase: (usecase || '').trim() || null,
      p_updates: !!updates,
      p_source: (source || 'projects-page').trim(),
      p_intents: normalizedIntents,
      p_adv_message: (adv_message || '').trim() || null
    })

    if (error) throw error

    return NextResponse.json({
      ok: true,
      message:
        "Thanks! We've received your request to join Voxcorda’s mission. " +
        "We’ll email you when the first version of the site is released."
    })
  } catch (e) {
    return NextResponse.json({ error: e?.message || 'Unexpected error' }, { status: 500 })
  }
}
