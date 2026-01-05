'use client'

import { useRef } from 'react'
import TurndownService from 'turndown'
import { gfm } from 'turndown-plugin-gfm'
import { sb } from '@/lib/supabase-browser'
import styles from './ArticleContentEditor.module.css'

// --- Turndown setup: HTML → Markdown on paste ---
const td = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  emDelimiter: '*',
  bulletListMarker: '-',
  linkStyle: 'inlined',
})
td.use(gfm)

function htmlToMarkdown(html) {
  return td.turndown(html)
}

export default function ArticleContentEditor({ value, onChange, label, required }) {
  const supabase = sb()
  const textareaRef = useRef(null)

  // generic helper: wrap selected text
  function wrapSelection(left, right = left) {
    const el = textareaRef.current
    if (!el) {
      onChange((value || '') + left + right)
      return
    }

    const start = el.selectionStart ?? 0
    const end = el.selectionEnd ?? 0
    const src = value || ''
    const selected = src.slice(start, end)
    const next = src.slice(0, start) + left + selected + right + src.slice(end)

    onChange(next)

    queueMicrotask(() => {
      const caret = start + left.length + selected.length + right.length
      el.focus()
      el.setSelectionRange(caret, caret)
    })
  }


  

  function insertAtCursor(text) {
    const el = textareaRef.current
    if (!el) {
      onChange((value || '') + text)
      return
    }

    const start = el.selectionStart ?? 0
    const end = el.selectionEnd ?? 0
    const src = value || ''
    const next = src.slice(0, start) + text + src.slice(end)

    onChange(next)

    queueMicrotask(() => {
      const caret = start + text.length
      el.focus()
      el.setSelectionRange(caret, caret)
    })
  }

  async function handlePaste(e) {
    // 1) images from clipboard → upload → insert ![](url)
    const items = Array.from(e.clipboardData?.items || [])
    const files = items
      .map(it => (it.kind === 'file' ? it.getAsFile() : null))
      .filter(Boolean)
      .filter(file => /^image\//.test(file.type))

    if (files.length > 0) {
      e.preventDefault()
      for (const file of files) {
        const url = await uploadImage(file)
        insertAtCursor(`![image](${url})\n`)
      }
      return
    }

    // 2) rich HTML → Markdown
    const html = e.clipboardData?.getData('text/html')
    if (html) {
      e.preventDefault()
      const md = htmlToMarkdown(html)
      insertAtCursor(md)
    }
    // else: fall back to normal paste
  }

  async function uploadImage(file) {
    const MAX_MB = 5        // pick your limit
    const MAX_BYTES = MAX_MB * 1024 * 1024
  
    if (file.size > MAX_BYTES) {
      window.alert(`Image too large. Max size is ${MAX_MB} MB.`)
      throw new Error('File too large')
    }
  
    const safeName = file.name.replace(/[^\w.\-]+/g, '_')
    const path = `articles/${Date.now()}-${safeName}`
  
    const { error } = await supabase.storage
      .from('article-photos')   // 👈 use your new bucket
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      })
  
    if (error) {
      console.error('Image upload failed:', error)
      window.alert(
        `Image upload failed.\n\n${
          error.message || 'Unknown storage error.'
        }`
      )
      throw error
    }
  
    const { data } = supabase.storage
      .from('article-photos')   // 👈 same bucket here
      .getPublicUrl(path)
  
    return data.publicUrl
  }
  

  return (
    <div className={styles.wrapper}>
      <div className={styles.labelRow}>
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}> *</span>}
        </label>
        <span className={styles.hint}>
          Supports **bold**, *italic*, <u>underline</u>, [links](https://), lists, headings.
          Paste from docs keeps formatting. Paste images to auto-upload.
        </span>
      </div>

      {/* Toolbar */}
      <div className={styles.toolbar}>
        <button type="button" onClick={() => wrapSelection('**')}>
          Bold
        </button>
        <button type="button" onClick={() => wrapSelection('*')}>
          Italic
        </button>
        <button type="button" onClick={() => wrapSelection('<u>', '</u>')}>
          Underline
        </button>
        <button type="button" onClick={() => wrapSelection('## ', '')}>
          Sub-header
        </button>
        <button
          type="button"
          onClick={() => insertAtCursor('[link text](https://example.com)')}
        >
          Link
        </button>
        <button type="button" onClick={() => insertAtCursor('\n- ')}>
          Bullet
        </button>
      </div>

      <textarea
        ref={textareaRef}
        className={styles.textarea}
        rows={14}
        value={value}
        onChange={e => onChange(e.target.value)}
        onPaste={handlePaste}
        placeholder="Write the article body here. Paste from docs to keep formatting; paste images to embed them."
      />
    </div>
  )
}
