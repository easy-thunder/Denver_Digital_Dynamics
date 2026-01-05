'use client'

import { useState, useMemo } from 'react'
import styles from './ArticleFileTree.module.css'
import Link from 'next/link'
/**
 * articles: array of rows from `articles` table
 *   { id, slug, title, category, subcategory, topic_detail, sort_order }
 *
 * onSelect: optional callback(article) when a file is clicked
 */
export default function ArticleFileTree({ articles, onSelect }) {
    const [openCategories, setOpenCategories] = useState(() => new Set())
    const [openSubcats, setOpenSubcats] = useState(() => new Set())
    const [openTopics, setOpenTopics] = useState(() => new Set())

    const tree = useMemo(() => buildTree(articles || []), [articles])

    function toggle(setter, key) {
        setter(prev => {
            const next = new Set(prev)
            if (next.has(key)) next.delete(key)
            else next.add(key)
            return next
        })
    }

    if (!articles?.length) {
        return <p className={styles.empty}>No articles yet.</p>
    }

    return (
        <div className={styles.tree}>
            {tree.map(cat => {
                const catKey = cat.name || '(Uncategorized)'
                const catOpen = openCategories.has(catKey)

                return (
                    <div key={catKey} className={styles.categoryBlock}>
                        {/* Category row */}
                        <button
                            type="button"
                            className={`${styles.row} ${styles.folderRow}`}
                            onClick={() => toggle(setOpenCategories, catKey)}
                        >
                            <span className={styles.chevron}>
                                {catOpen ? '▾' : '▸'}
                            </span>
                            <span className={styles.folderLabel} title={catKey}>
                                {catKey}
                            </span>
                        </button>

                        {catOpen && (
                            <div className={styles.level}>
                                {cat.subcategories.map(sub => {
                                    const subKey = `${catKey}::${sub.name || '(No subcategory)'}`
                                    const subOpen = openSubcats.has(subKey)

                                    return (
                                        <div key={subKey}>
                                            {/* Subcategory row */}
                                            <button
                                                type="button"
                                                className={`${styles.row} ${styles.folderRow} ${styles.subFolderRow}`}
                                                onClick={() => toggle(setOpenSubcats, subKey)}
                                            >
                                                <span className={styles.chevron}>
                                                    {subOpen ? '▾' : '▸'}
                                                </span>
                                                <span
                                                    className={styles.folderLabel}
                                                    title={sub.name || '(No subcategory)'}
                                                >
                                                    {sub.name || '(No subcategory)'}
                                                </span>
                                            </button>

                                            {subOpen && (
                                                <div className={styles.level}>
                                                    {sub.topics.map(topic => {
                                                        const topicName = topic.name || '(General)'
                                                        const topicKey = `${subKey}::${topicName}`
                                                        const topicOpen = openTopics.has(topicKey)

                                                        return (
                                                            <div key={topicKey}>
                                                                {/* Topic detail row */}
                                                                <button
                                                                    type="button"
                                                                    className={`${styles.row} ${styles.folderRow} ${styles.topicRow}`}
                                                                    onClick={() => toggle(setOpenTopics, topicKey)}
                                                                >
                                                                    <span className={styles.chevron}>
                                                                        {topicOpen ? '▾' : '▸'}
                                                                    </span>
                                                                    <span
                                                                        className={styles.folderLabel}
                                                                        title={topicName}
                                                                    >
                                                                        {topicName}
                                                                    </span>
                                                                </button>

                                                                {/* Files (article titles) */}
                                                                {topicOpen && (
                                                                    <div className={styles.level}>
                                                                        {topic.articles.map(article => (
                                                                            <Link
                                                                                key={article.id}
                                                                                href={`/projects/voxcorda/wiki/articles/${article.slug}`}
                                                                                className={`${styles.row} ${styles.fileRow}`}
                                                                                title={article.title}
                                                                            >
                                                                                <span className={styles.fileBullet}>•</span>
                                                                                <span className={styles.fileLabel}>
                                                                                    {article.title}
                                                                                </span>
                                                                            </Link>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                )
            })}
        </div>
    )
}

/**
 * Build nested tree:
 * [
 *   {
 *     name: category,
 *     subcategories: [
 *       {
 *         name: subcategory,
 *         topics: [
 *           { name: topic_detail, articles: [ ... ] }
 *         ]
 *       }
 *     ]
 *   }
 * ]
 */
function buildTree(articles) {
    const byCategory = new Map()

    for (const a of articles) {
        const catName = a.category || ''
        const subName = a.subcategory || ''
        const topicName = a.topic_detail || ''

        if (!byCategory.has(catName)) {
            byCategory.set(catName, {
                name: catName,
                subcategories: new Map(),
            })
        }
        const cat = byCategory.get(catName)

        if (!cat.subcategories.has(subName)) {
            cat.subcategories.set(subName, {
                name: subName,
                topics: new Map(),
            })
        }
        const sub = cat.subcategories.get(subName)

        if (!sub.topics.has(topicName)) {
            sub.topics.set(topicName, {
                name: topicName,
                articles: [],
            })
        }
        const topic = sub.topics.get(topicName)

        topic.articles.push(a)
    }

    // turn maps into sorted arrays
    const categories = Array.from(byCategory.values())

    // sort categories alphabetically
    categories.sort((a, b) =>
        (a.name || '').localeCompare(b.name || '')
    )

    for (const cat of categories) {
        cat.subcategories = Array.from(cat.subcategories.values())
        cat.subcategories.sort((a, b) =>
            (a.name || '').localeCompare(b.name || '')
        )

        for (const sub of cat.subcategories) {
            sub.topics = Array.from(sub.topics.values())
            sub.topics.sort((a, b) =>
                (a.name || '').localeCompare(b.name || '')
            )

            for (const topic of sub.topics) {
                // sort articles: sort_order first, then title
                topic.articles.sort((a, b) => {
                    const soA = a.sort_order ?? Number.MAX_SAFE_INTEGER
                    const soB = b.sort_order ?? Number.MAX_SAFE_INTEGER
                    if (soA !== soB) return soA - soB
                    return (a.title || '').localeCompare(b.title || '')
                })
            }
        }
    }

    return categories
}
