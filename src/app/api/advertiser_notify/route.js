import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const runtime = 'nodejs'

export async function POST(req) {
  try {
    const { name, email, org, role, usecase, message } = await req.json().catch(() => ({}))
    if (!email) return NextResponse.json({ error: 'email required' }, { status: 400 })

    const user = process.env.GMAIL_USER
    const pass = process.env.GMAIL_APP_PASS
    const to   = process.env.MAIL_TO
    if (!user || !pass || !to) {
      return NextResponse.json({ error: 'Mail env not configured' }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass }
    })

    const subject = 'New advertiser signup — Voxcorda'
    const html = `
      <h2>Advertiser lead</h2>
      <p><strong>Name:</strong> ${name || '(n/a)'}<br/>
         <strong>Email:</strong> ${email}<br/>
         <strong>Org:</strong> ${org || '(n/a)'}<br/>
         <strong>Role:</strong> ${role || '(n/a)'}
      </p>
      <p><strong>Use case:</strong><br/>${(usecase || '(n/a)').replace(/\n/g,'<br/>')}</p>
      <p><strong>Message:</strong><br/>${(message || '(n/a)').replace(/\n/g,'<br/>')}</p>
    `.trim()

    await transporter.sendMail({
      from: `Voxcorda <${user}>`,
      to,
      subject,
      html,
      replyTo: email
    })

    return NextResponse.json({ success: true })
  } catch (e) {
    return NextResponse.json({ error: e?.message || 'notify failed' }, { status: 500 })
  }
}
