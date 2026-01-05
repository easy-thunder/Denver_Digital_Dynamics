'use client'

import { useState } from 'react'
import styles from './ArticleQuiz.module.css'

export default function ArticleQuiz({ quiz }) {
  const questions = quiz?.quiz_questions || []
  const [answers, setAnswers] = useState({})
  const [checked, setChecked] = useState(false)

  function selectAnswer(qId, value) {
    setAnswers(prev => ({ ...prev, [qId]: value }))
    if (checked) setChecked(false) // reset check if they change an answer
  }

  function handleCheck() {
    setChecked(true)
  }

  // Simple score calculation
  let score = 0
  if (checked) {
    for (const q of questions) {
      const correct = Array.isArray(q.correct_answer)
        ? q.correct_answer[0]
        : q.correct_answer
      if (answers[q.id] === correct) score++
    }
  }

  if (!questions.length) return null

  return (
    <div className={styles.quiz}>
      {questions.map((q, idx) => {
        const correct = Array.isArray(q.correct_answer)
          ? q.correct_answer[0]
          : q.correct_answer

        const userAns = answers[q.id]
        const isTrueFalse = q.type === 'true_false'

        const options = isTrueFalse
          ? ['True', 'False']
          : (q.choices || [])

        return (
          <div key={q.id} className={styles.questionCard}>
            <div className={styles.questionHeader}>
              <span className={styles.qNumber}>Q{idx + 1}</span>
              <p className={styles.questionText}>{q.question_text}</p>
            </div>

            <div className={styles.options}>
              {options.map(opt => {
                const selected = userAns === opt
                const isCorrectOpt = opt === correct
                const isUserWrongOpt =
                  checked && selected && opt !== correct

                let cls = styles.option
                if (selected) cls += ` ${styles.optionSelected}`
                if (checked && isCorrectOpt) cls += ` ${styles.optionCorrect}`
                if (isUserWrongOpt) cls += ` ${styles.optionIncorrect}`

                return (
                  <button
                    key={opt}
                    type="button"
                    className={cls}
                    onClick={() => selectAnswer(q.id, opt)}
                  >
                    {opt}
                  </button>
                )
              })}
            </div>

            {checked && q.explanation && (
              <p className={styles.explanation}>{q.explanation}</p>
            )}
          </div>
        )
      })}

      <div className={styles.footer}>
        {checked && (
          <div className={styles.score}>
            You answered {score} of {questions.length} correctly.
          </div>
        )}
        <button
          type="button"
          className={styles.checkBtn}
          onClick={handleCheck}
        >
          {checked ? 'Check again' : 'Check answers'}
        </button>
      </div>
    </div>
  )
}
