// app/team/articles/[slug]/edit/EditArticleForm.jsx
'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button/Button'
import ArticleContentEditor from '../../../new-article/ArticleContentEditor'
import ArticleView from '@/components/Article/article_view/ArticleView'
import styles from '../../../new-article/NewArticleForm.module.css'

export default function EditArticleForm({ initialArticle }) {
  const router = useRouter()

  // slug is immutable – keep as a plain const
  const slug = initialArticle.slug

  const [title, setTitle] = useState(initialArticle.title || '')
  const [category, setCategory] = useState(initialArticle.category || '')
  const [subcategory, setSubcategory] = useState(initialArticle.subcategory || '')
  const [topicDetail, setTopicDetail] = useState(initialArticle.topic_detail || '')
  const [excerpt, setExcerpt] = useState(initialArticle.excerpt || '')
  const [thumbnailUrl, setThumbnailUrl] = useState(initialArticle.thumbnail_url || '')
  const [videoUrl, setVideoUrl] = useState(initialArticle.video_url || '')
  const [contentRaw, setContentRaw] = useState(
    typeof initialArticle.content === 'string'
      ? initialArticle.content
      : initialArticle.content?.markdown || ''
  )
  const [sortOrder, setSortOrder] = useState(
    initialArticle.sort_order != null ? String(initialArticle.sort_order) : ''
  )
  const [status, setStatus] = useState(initialArticle.status || 'draft')
  const [visibility, setVisibility] = useState(initialArticle.visibility || 'public')

  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const disableSubmit =
    !title.trim() ||
    !category.trim() ||
    !subcategory.trim() ||
    !contentRaw.trim()

  // live preview object (same shape as DB row)
  const previewArticle = useMemo(
    () => ({
      id: initialArticle.id,
      title: title || 'Untitled article',
      slug,
      category,
      subcategory,
      topic_detail: topicDetail,
      excerpt,
      thumbnail_url: thumbnailUrl || null,
      video_url: videoUrl || null,
      sort_order: sortOrder ? Number(sortOrder) : null,
      status,
      visibility,
      content: {
        type: 'markdown',
        version: 1,
        markdown: contentRaw || '',
      },
    }),
    [
      initialArticle.id,
      title,
      slug,
      category,
      subcategory,
      topicDetail,
      excerpt,
      thumbnailUrl,
      videoUrl,
      sortOrder,
      status,
      visibility,
      contentRaw,
    ]
  )

// app/team/articles/[slug]/edit/EditArticleForm.jsx

async function handleSubmit(e) {
    e.preventDefault()
    if (disableSubmit || loading) return
  
    setLoading(true)
    setErrorMsg('')
  
    const res = await fetch(`/api/articles/editArticle/${slug}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: initialArticle.id,   // ⬅️ send the DB id
        slug,                    // just for reference; we won’t update it
        title,
        category,
        subcategory,
        topicDetail,
        excerpt,
        thumbnailUrl,
        videoUrl,
        contentRaw,
        sortOrder,
        status,
        visibility,
      }),
    })
  
    setLoading(false)
  
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      const msg = data.error || 'Something went wrong updating the article.'
      setErrorMsg(msg)
      window.alert(
        `An unknown issue occurred while updating the article.\n\n` +
        `Error message:\n${msg}\n\n` +
        `Please contact an admin with this information.`
      )
      return
    }
  
    window.alert(
      'Your changes were saved successfully.\n\n' +
      'Click OK to return to the dashboard.'
    )
    router.push('/projects/voxcorda/team/dashboard')
  }
  
  return (
    <main className={styles.page}>
      <h1 className={styles.heading}>Edit VoxCorda Article</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* Title */}
        <div className={styles.field}>
          <label className={styles.label}>
            Title<span className={styles.required}> *</span>
          </label>
          <input
            className={styles.input}
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Article title"
          />
        </div>

        {/* Slug – read-only */}
        <div className={styles.field}>
          <label className={styles.label}>Slug (cannot be changed)</label>
          <input
            className={styles.input}
            type="text"
            value={slug}
            readOnly
            disabled
          />
          <p className={styles.smallHint}>
            Slug is locked to avoid breaking existing links.
          </p>
        </div>

        {/* Category row */}
        <div className={`${styles.fieldRow} ${styles.three}`}>
          <div className={styles.field}>
            <label className={styles.label}>
              Category<span className={styles.required}> *</span>
            </label>
            <input
              className={styles.input}
              type="text"
              value={category}
              onChange={e => setCategory(e.target.value)}
              placeholder="Corruption"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>
              Subcategory<span className={styles.required}> *</span>
            </label>
            <input
              className={styles.input}
              type="text"
              value={subcategory}
              onChange={e => setSubcategory(e.target.value)}
              placeholder="Lobbyism"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Topic detail (optional)</label>
            <input
              className={styles.input}
              type="text"
              value={topicDetail}
              onChange={e => setTopicDetail(e.target.value)}
              placeholder="Defense contractor lobbyism"
            />
          </div>
        </div>

        {/* Excerpt */}
        <div className={styles.field}>
          <label className={styles.label}>Excerpt (optional)</label>
          <textarea
            className={styles.textarea}
            rows={2}
            value={excerpt}
            onChange={e => setExcerpt(e.target.value)}
            placeholder="One or two sentences summarizing the article."
          />
        </div>

        {/* Media + sort */}
        <div className={`${styles.fieldRow} ${styles.threeWide}`}>
          <div className={styles.field}>
            <label className={styles.label}>Thumbnail URL (optional)</label>
            <input
              className={styles.input}
              type="url"
              value={thumbnailUrl}
              onChange={e => setThumbnailUrl(e.target.value)}
              placeholder="https://…"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Video URL (optional)</label>
            <input
              className={styles.input}
              type="url"
              value={videoUrl}
              onChange={e => setVideoUrl(e.target.value)}
              placeholder="https://…"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Sort order (optional)</label>
            <input
              className={styles.input}
              type="number"
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
              placeholder="10"
            />
          </div>
        </div>

        {/* Status + visibility */}
        <div className={`${styles.fieldRow} ${styles.three}`}>
          <div className={styles.field}>
            <label className={styles.label}>Status</label>
            <select
              className={styles.input}
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Visibility</label>
            <select
              className={styles.input}
              value={visibility}
              onChange={e => setVisibility(e.target.value)}
            >
              <option value="public">Public</option>
              <option value="members_only">Members only</option>
              <option value="team_only">Team only</option>
            </select>
          </div>
        </div>

        {/* Content */}
        <div className={styles.field}>
          <ArticleContentEditor
            label="Content"
            required
            value={contentRaw}
            onChange={setContentRaw}
          />
        </div>

        {errorMsg && <p className={styles.error}>{errorMsg}</p>}

        <div className={styles.actions}>
          <Button
            type="submit"
            variant="primary"
            size="md"
            loading={loading}
            disabled={disableSubmit}
            label={loading ? 'Saving…' : 'Save changes'}
          >
            {loading ? 'Saving…' : 'Save changes'}
          </Button>

          <Button
            type="button"
            variant="soft"
            size="md"
            onClick={() => router.push('/team/dashboard')}
            label='Cancel'
          >
            Cancel
          </Button>
        </div>
      </form>

      {/* Live preview */}
      <section className={styles.previewSection}>
        <h2 className={styles.previewHeading}>Live preview</h2>
        <p className={styles.previewHint}>
          This is how your article will appear on VoxCorda.
        </p>
        <div className={styles.previewCard}>
          <ArticleView article={previewArticle} />
        </div>
      </section>
    </main>
  )
}
