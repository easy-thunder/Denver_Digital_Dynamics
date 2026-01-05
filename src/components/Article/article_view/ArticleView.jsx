'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import remarkBreaks from 'remark-breaks'
import styles from './ArticleView.module.css'
import ArticleQuiz from './ArticleQuiz'


// Tiny helper: grab hero (first image) for the page header
function getHeroImage(article) {
  if (article.thumbnail_url && /^https?:\/\//.test(article.thumbnail_url)) {
    return article.thumbnail_url
  }

  const md =
    typeof article.content === 'string'
      ? article.content
      : article?.content?.markdown || ''

  if (!md) return null

  const match = md.match(/!\[[^\]]*]\(([^)\s]+)(?:\s+"[^"]*")?\)/)
  const url = match?.[1]
  return url && /^https?:\/\//.test(url) ? url : null
}

export default function ArticleView({ article,quiz }) {
  if (!article) return null

  const hero = getHeroImage(article)
  const markdown =
    typeof article.content === 'string'
      ? article.content
      : article?.content?.markdown || ''

  return (
    <article className={styles.article}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.kickerRow}>
          {article.category && (
            <span className={styles.kicker}>{article.category}</span>
          )}
          {article.subcategory && (
            <>
              <span className={styles.dot}>•</span>
              <span className={styles.subKicker}>{article.subcategory}</span>
            </>
          )}
        </div>

        <h1 className={styles.title}>{article.title}</h1>

        {article.topic_detail && (
          <p className={styles.topicDetail}>{article.topic_detail}</p>
        )}
      </header>

      {/* Hero image */}


      {/* Excerpt */}
      {article.excerpt && (
        <p className={styles.excerpt}>{article.excerpt}</p>
      )}

      {/* Body */}
      <section className={styles.body}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          rehypePlugins={[rehypeRaw]}           
          components={{
            a: ({ node, ...props }) => (
              <a
                {...props}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              />
            ),
            img: ({ node, ...props }) => (
              <img {...props} className={styles.inlineImg} />
            ),
            h2: ({ node, ...props }) => (
              <h2 {...props} className={styles.h2} />
            ),
            h3: ({ node, ...props }) => (
              <h3 {...props} className={styles.h3} />
            ),
            ul: ({ node, ...props }) => (
              <ul {...props} className={styles.ul} />
            ),
            ol: ({ node, ...props }) => (
              <ol {...props} className={styles.ol} />
            ),
            p: ({ node, ...props }) => (
              <p {...props} className={styles.p} />
            ),
          }}
        >
          {markdown || '_No content yet._'}
        </ReactMarkdown>
        {quiz && (
            <p className={styles.quizDescription}>{quiz.description}</p>
          )}
          <ArticleQuiz quiz={quiz} />
      </section>

    </article>
  )
}
