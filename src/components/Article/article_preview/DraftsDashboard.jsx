'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import Button from '@/components/ui/Button/Button'
import styles from './DraftsDashboard.module.css'

// Helper: get first image for an article
function getFirstImageFromArticle(article) {
    if (article.thumbnail_url) return article.thumbnail_url

    const md = article?.content?.markdown || ''
    const match = md.match(/!\[[^\]]*]\(([^)]+)\)/) // ![alt](url)
    if (match) return match[1]

    return null
}

export default function DraftsDashboard({ drafts, teamRole, userEmail }) {

    const router = useRouter()

    const [query, setQuery] = useState('')
    const [expandedId, setExpandedId] = useState(null)

    const filteredDrafts = useMemo(() => {
        const q = query.trim().toLowerCase()
        if (!q) return drafts
        return drafts.filter(a => {
            const t = a.title?.toLowerCase() || ''
            const e = a.excerpt?.toLowerCase() || ''
            return t.includes(q) || e.includes(q)
        })
    }, [drafts, query])


    async function handleDelete(article) {
        const ok = window.confirm(
            `Delete "${article.title}"?\n\nThis cannot be undone.`
        )
        if (!ok) return

        try {
            const res = await fetch(`/api/articles/deleteArticle/${article.id}`, {
                method: 'DELETE',
            })

            if (!res.ok) {
                const data = await res.json().catch(() => ({}))
                window.alert(
                    data.error || 'Something went wrong deleting this article.'
                )
                return
            }

            // Collapse if this one was open
            setExpandedId(prev => (prev === article.id ? null : prev))

            // Re-fetch drafts from server so list updates
            router.refresh()
        } catch (err) {
            console.error(err)
            window.alert('Network error while deleting the article.')
        }
    }


    return (
        <main className={styles.page}>
            <header className={styles.header}>
                <div>
                    <h1 className={styles.heading}>Draft Articles</h1>
                    <p className={styles.subheading}>
                        Signed in as <span className={styles.email}>{userEmail}</span> — role: <span className={styles.role}>{teamRole}</span>
                    </p>
                </div>
                <div className={styles.searchWrap}>
                    <input
                        type="search"
                        className={styles.searchInput}
                        placeholder="Search drafts by title or excerpt…"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                </div>
            </header>

            {filteredDrafts.length === 0 ? (
                <p className={styles.empty}>No drafts found.</p>
            ) : (
                <section className={styles.grid}>
                    {filteredDrafts.map(article => {
                        const thumb = getFirstImageFromArticle(article)
                        const isExpanded = expandedId === article.id

                        return (
                            <article
                                key={article.id}
                                className={`${styles.card} ${isExpanded ? styles.cardExpanded : ''}`}
                            >
                                {/* Clickable header = thumbnail + title + category */}
                                <button
                                    type="button"
                                    className={styles.cardHeader}
                                    onClick={() =>
                                        setExpandedId(isExpanded ? null : article.id)
                                    }
                                >
                                    <div className={styles.thumb}>
                                        {thumb ? (
                                            <img
                                                src={thumb}
                                                alt=""
                                                className={styles.thumbImg}
                                            />
                                        ) : (
                                            <div className={styles.thumbPlaceholder}>
                                                <span>No image</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className={styles.cardTitleBlock}>
                                        <h2 className={styles.cardTitle}>{article.title}</h2>
                                        <p className={styles.cardMeta}>
                                            <span className={styles.category}>
                                                {article.category || 'Uncategorized'}
                                            </span>
                                            {article.subcategory && (
                                                <>
                                                    <span className={styles.dot}>•</span>
                                                    <span className={styles.subcategory}>
                                                        {article.subcategory}
                                                    </span>
                                                </>
                                            )}
                                        </p>
                                        {article.excerpt && (
                                            <p className={styles.excerpt}>
                                                {article.excerpt}
                                            </p>
                                        )}
                                    </div>
                                </button>

                                {/* Expanded body with full info + buttons */}
                                {isExpanded && (
                                    <div className={styles.cardBody}>
                                        <dl className={styles.metaList}>
                                            <div className={styles.metaItem}>
                                                <dt className={styles.metaLabel}>Slug</dt>
                                                <dd className={styles.metaValue}>{article.slug}</dd>
                                            </div>

                                            <div className={styles.metaItem}>
                                                <dt className={styles.metaLabel}>Category</dt>
                                                <dd className={styles.metaValue}>
                                                    {article.category || 'Uncategorized'}
                                                </dd>
                                            </div>

                                            <div className={styles.metaItem}>
                                                <dt className={styles.metaLabel}>Subcategory</dt>
                                                <dd className={styles.metaValue}>
                                                    {article.subcategory || '—'}
                                                </dd>
                                            </div>

                                            <div className={styles.metaItem}>
                                                <dt className={styles.metaLabel}>Topic detail</dt>
                                                <dd className={styles.metaValue}>
                                                    {article.topic_detail || '—'}
                                                </dd>
                                            </div>

                                            <div className={styles.metaItem}>
                                                <dt className={styles.metaLabel}>Status</dt>
                                                <dd className={styles.metaValue}>{article.status}</dd>
                                            </div>

                                            <div className={styles.metaItem}>
                                                <dt className={styles.metaLabel}>Visibility</dt>
                                                <dd className={styles.metaValue}>{article.visibility}</dd>
                                            </div>

                                            <div className={styles.metaItem}>
                                                <dt className={styles.metaLabel}>Sort order</dt>
                                                <dd className={styles.metaValue}>{article.sort_order ?? '—'}</dd>
                                            </div>
                                        </dl>

                                        <div className={styles.contentPreview}>
                                            <h3 className={styles.previewHeading}>Content preview</h3>
                                            <p className={styles.previewText}>
                                                {(article.content?.markdown || '').slice(0, 400) || 'No content yet.'}
                                                {article.content?.markdown &&
                                                    article.content.markdown.length > 400 &&
                                                    '…'}
                                            </p>
                                        </div>

                                        <div className={styles.actions}>
                                            <Button
                                                href={`articles/${article.slug}/preview`}
                                                variant="soft"
                                                size="sm"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                label={'View'}
                                            >
                                                View
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="soft"
                                                size="md"
                                                href={`articles/${article.slug}/edit`}
                                                label='Edit'
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="soft"
                                                size="md"
                                                href={`articles/${article.slug}/quiz/new`}
                                                label='Create quiz'
                                            >
                                                Create quiz
                                            </Button>
                                            <Button
                                                label={article.status === 'published' ? 'Unpublish' : 'Publish'}
                                                type="button"
                                                variant="primary"
                                                size="md"
                                                onClick={async () => {
                                                    const newStatus = article.status === 'published' ? 'draft' : 'published'
                                                    const actionVerb = newStatus === 'published' ? 'publish' : 'unpublish'

                                                    if (!confirm(`Are you sure you want to ${actionVerb} this article?`)) return;

                                                    const res = await fetch(`/api/articles/publish/${article.id}`, {
                                                        method: 'PATCH',
                                                        headers: { 'Content-Type': 'application/json' },
                                                        body: JSON.stringify({ status: newStatus }),
                                                    });

                                                    if (!res.ok) {
                                                        const data = await res.json().catch(() => ({}));
                                                        alert(`Failed: ${data.error || 'Unknown error'}`);
                                                        return;
                                                    }

                                                    alert(`Article successfully ${newStatus === 'published' ? 'published' : 'returned to draft'}!`);
                                                    router.refresh(); // reloads data
                                                }}
                                            >
                                                {article.status === 'published' ? 'Unpublish' : 'Publish'}
                                            </Button>


                                            <Button label='Delete' type="button" variant="delete" size="md" onClick={() => handleDelete(article)}                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </div>

                                )}
                            </article>
                        )
                    })}
                </section>
            )}
        </main>
    )
}
