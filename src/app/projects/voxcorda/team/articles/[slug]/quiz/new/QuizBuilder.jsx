'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button/Button'
import styles from './QuizBuilder.module.css'

const QUESTION_TYPES = {
  MULTIPLE_CHOICE: 'multiple_choice',
  TRUE_FALSE: 'true_false',
}

function makeEmptyQuestion(type = QUESTION_TYPES.MULTIPLE_CHOICE) {
  if (type === QUESTION_TYPES.TRUE_FALSE) {
    return {
      type,
      questionText: '',
      choices: ['True', 'False'],
      correctAnswer: 'True',
      explanation: '',
    }
  }
  // default MC: 4 blank options
  return {
    type,
    questionText: '',
    choices: ['', '', '', ''],
    correctAnswer: '',
    explanation: '',
  }
}

export default function QuizBuilder({ article }) {
  const [title, setTitle] = useState(`${article.title} — Quiz`)
  const [description, setDescription] = useState('')
  const [questions, setQuestions] = useState([
    makeEmptyQuestion(QUESTION_TYPES.MULTIPLE_CHOICE),
  ])

  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  function updateQuestion(idx, patch) {
    setQuestions(qs =>
      qs.map((q, i) => (i === idx ? { ...q, ...patch } : q)),
    )
  }

  function addQuestion(type) {
    setQuestions(qs => [...qs, makeEmptyQuestion(type)])
  }

  function removeQuestion(idx) {
    setQuestions(qs => qs.filter((_, i) => i !== idx))
  }

  async function handleSave(e) {
    e.preventDefault()
    if (saving) return

    setSaving(true)
    setError('')

    try {
      // Basic payload shape; server will adapt to DB
      const payload = {
        title,
        description,
        questions: questions.map(q => ({
          type: q.type,
          questionText: q.questionText.trim(),
          choices: q.choices,
          correctAnswer: q.correctAnswer,
          explanation: q.explanation.trim() || null,
        })),
      }

      const res = await fetch(`/api/quizzes/from-article/${article.slug}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to save quiz')
      }

      window.alert('Quiz saved successfully!')
      // You can later redirect somewhere else if you want
    } catch (err) {
      console.error(err)
      setError(err.message || 'Quiz save failed.')
      window.alert(
        `An error occurred while saving the quiz.\n\n${err.message || ''}`,
      )
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className={styles.wrap} onSubmit={handleSave}>
      <header className={styles.header}>
        <h1 className={styles.heading}>Create quiz for “{article.title}”</h1>
        <p className={styles.subheading}>
          Question types supported: multiple choice and true/false.
        </p>
      </header>

      <section className={styles.metaSection}>
        <div className={styles.field}>
          <label className={styles.label}>Quiz title</label>
          <input
            className={styles.input}
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Article quiz title"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Description (optional)</label>
          <textarea
            className={styles.textarea}
            rows={2}
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Short description shown before the quiz."
          />
        </div>
      </section>

      <section className={styles.questionsSection}>
        <div className={styles.questionsHeader}>
          <h2 className={styles.questionsHeading}>Questions</h2>
          <div className={styles.addButtons}>
            <Button
              type="button"
              variant="soft"
              size="sm"
              onClick={() => addQuestion(QUESTION_TYPES.MULTIPLE_CHOICE)}
              label={'+ Multiple choice'}
            >
              + Multiple choice
            </Button>
            <Button
              label={'+ True / False'}
              type="button"
              variant="soft"
              size="sm"
              onClick={() => addQuestion(QUESTION_TYPES.TRUE_FALSE)}
            >
              + True / False
            </Button>
          </div>
        </div>

        {questions.length === 0 && (
          <p className={styles.empty}>No questions yet. Add one above.</p>
        )}

        <ol className={styles.questionList}>
          {questions.map((q, idx) => (
            <li key={idx} className={styles.questionCard}>
              <div className={styles.questionHeader}>
                <span className={styles.qLabel}>Question {idx + 1}</span>
                <select
                  className={styles.typeSelect}
                  value={q.type}
                  onChange={e => {
                    const nextType = e.target.value
                    updateQuestion(idx, makeEmptyQuestion(nextType))
                  }}
                >
                  <option value={QUESTION_TYPES.MULTIPLE_CHOICE}>
                    Multiple choice
                  </option>
                  <option value={QUESTION_TYPES.TRUE_FALSE}>True / False</option>
                </select>
                <button
                  type="button"
                  className={styles.removeBtn}
                  onClick={() => removeQuestion(idx)}
                >
                  Remove
                </button>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Question text</label>
                <textarea
                  className={styles.textarea}
                  rows={2}
                  value={q.questionText}
                  onChange={e =>
                    updateQuestion(idx, { questionText: e.target.value })
                  }
                  placeholder="What did the article explain about…?"
                />
              </div>

              {q.type === QUESTION_TYPES.MULTIPLE_CHOICE ? (
                <div className={styles.field}>
                  <label className={styles.label}>Choices</label>
                  <div className={styles.choicesGrid}>
                    {q.choices.map((choice, cIdx) => (
                      <label
                        key={cIdx}
                        className={styles.choiceRow}
                      >
                        <input
                          type="radio"
                          name={`correct-${idx}`}
                          checked={q.correctAnswer === choice}
                          onChange={() =>
                            updateQuestion(idx, { correctAnswer: choice })
                          }
                        />
                        <input
                          className={styles.input}
                          value={choice}
                          onChange={e => {
                            const newChoices = [...q.choices]
                            newChoices[cIdx] = e.target.value
                            let newCorrect = q.correctAnswer
                            // keep correctAnswer in sync if we editing that choice
                            if (q.correctAnswer === choice) {
                              newCorrect = e.target.value
                            }
                            updateQuestion(idx, {
                              choices: newChoices,
                              correctAnswer: newCorrect,
                            })
                          }}
                          placeholder={`Choice ${cIdx + 1}`}
                        />
                      </label>
                    ))}
                  </div>
                </div>
              ) : (
                <div className={styles.field}>
                  <label className={styles.label}>Correct answer</label>
                  <div className={styles.trueFalseRow}>
                    {['True', 'False'].map(opt => (
                      <label key={opt} className={styles.choiceRow}>
                        <input
                          type="radio"
                          name={`correct-${idx}`}
                          checked={q.correctAnswer === opt}
                          onChange={() =>
                            updateQuestion(idx, { correctAnswer: opt })
                          }
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.field}>
                <label className={styles.label}>
                  Explanation (optional, shown after answering)
                </label>
                <textarea
                  className={styles.textarea}
                  rows={2}
                  value={q.explanation}
                  onChange={e =>
                    updateQuestion(idx, { explanation: e.target.value })
                  }
                  placeholder="Explain why this is the correct answer."
                />
              </div>
            </li>
          ))}
        </ol>
      </section>

      {error && <p className={styles.error}>{error}</p>}

      <footer className={styles.footer}>
        <Button label={saving ? 'Saving...': 'Save quiz'} type="submit" variant="primary" size="md" loading={saving}> 
          {saving ? 'Saving…' : 'Save quiz'}
        </Button>
      </footer>
    </form>
  )
}
