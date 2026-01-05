'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button/Button';
import styles from './NewArticleForm.module.css'
import ArticleContentEditor from './ArticleContentEditor'
import ArticleView from '@/components/Article/article_view/ArticleView'



export default function NewArticleForm() {
    const router = useRouter()

    const [title, setTitle] = useState('')
    const [slug, setSlug] = useState('')
    const [category, setCategory] = useState('')
    const [subcategory, setSubcategory] = useState('')
    const [topicDetail, setTopicDetail] = useState('')
    const [excerpt, setExcerpt] = useState('')
    const [thumbnailUrl, setThumbnailUrl] = useState('')
    const [videoUrl, setVideoUrl] = useState('')
    const [contentRaw, setContentRaw] = useState('')
    const [sortOrder, setSortOrder] = useState('')
    const [status, setStatus] = useState('draft')
    const [visibility, setVisibility] = useState('public')

    const [loading, setLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const disableSubmit =
        !title.trim() ||
        !slug.trim() ||
        !category.trim() ||
        !subcategory.trim() ||
        !contentRaw.trim()

        async function handleSubmit(e) {
            e.preventDefault()
            if (disableSubmit || loading) return
          
            setLoading(true)
            setErrorMsg('')
          
            const res = await fetch('/api/articles/newArticle', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                title,
                slug,
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
              const msg = data.error || 'Something went wrong creating the article.'
              setErrorMsg(msg)
          
              // Error alert
              window.alert(
                `An unknown issue occurred while creating the article.\n\n` +
                `Error message:\n${msg}\n\n` +
                `Please contact an admin with this information.`
              )
          
              return
            }
          
            const data = await res.json()
          
            // Success alert
            window.alert(
              'Your article was created successfully.\n\n' +
              'Click OK to return to the dashboard.'
            )
          
            // now send them back
            router.push('/projects/voxcorda/team/dashboard')
          }
          





const previewArticle = useMemo(
    () => ({
      id: 'preview',
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
      // mimic DB content shape
      content: {
        type: 'markdown',
        version: 1,
        markdown: contentRaw || '',
      },
    }),
    [
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

    return (
        <main className={styles.page}>
            <h1 className={styles.heading}>Create a New VoxCorda Article</h1>

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
                        placeholder="How Defense Contractor Lobbying Warps Democracy"
                    />
                </div>

                {/* Slug */}
                <div className={styles.field}>
                    <label className={styles.label}>
                        Slug<span className={styles.required}> *</span>
                    </label>
                    <input
                        className={styles.input}
                        type="text"
                        value={slug}
                        onChange={e => setSlug(e.target.value)}
                        placeholder="defense-contractor-lobbying-basics"
                    />
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
                        <label className={styles.label}>Thumbnail URL (optional IN DEVELOPMENT)</label>
                        <input
                            className={styles.input}
                            type="url"
                            value={thumbnailUrl}
                            onChange={e => setThumbnailUrl(e.target.value)}
                            placeholder="DON'T USE YET - IN DEVELOPMENT Can add if wanted"
                        />
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label}>Video URL (OPTIONAL IN DEVELOPMENT)</label>
                        <input
                            className={styles.input}
                            type="url"
                            value={videoUrl}
                            onChange={e => setVideoUrl(e.target.value)}
                            placeholder="DON'T USE YET - IN DEVELOPMENT Can add if wanted"
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
                        label={loading ? 'Creating…' : 'Create article'}
                    >
                        {loading ? 'Creating…' : 'Create article'}
                    </Button>

                    <Button
                        type="button"
                        variant="soft"
                        size="md"
                        onClick={() => router.push('/team/dashboard')}
                        label={'Cancel'}
                    >
                        Cancel
                    </Button>
                </div>
            </form>
            <section className={styles.previewSection}>
          <h2 className={styles.previewHeading}>Live preview</h2>
          <p className={styles.previewHint}>
            This is how your article will appear on VoxCorda. Draft-only metadata
            (like status) isn’t shown to regular users.
          </p>
          <div className={styles.previewCard}>
            <ArticleView article={previewArticle} />
          </div>
        </section>
        </main>
    )
}
