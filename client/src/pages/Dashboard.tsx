import React, { useState } from 'react'
import { analyzeCode, saveAnalysis } from '../services/api'

export default function Dashboard() {
  const [code, setCode] = useState('')
  const [level, setLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate')
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleAnalyze = async () => {
    if (!code.trim()) return
    setLoading(true)
    try {
      const data = await analyzeCode({ code, level })
      setResult(data)
      await saveAnalysis({ code, level, result: JSON.stringify(data, null, 2) })
    } catch (err) {
      setResult({ error: 'Analysis failed' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container space">
      <h1 className="heading">Dashboard</h1>
      <div className="grid two">
        <div className="card">
          <div className="flex between mb">
            <h2 className="card-title">Code Input</h2>
            <select value={level} onChange={(e) => setLevel(e.target.value as any)} className="select">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your unfinished code here..."
            className="textarea"
          />
          <button onClick={handleAnalyze} disabled={loading || !code.trim()} className="btn btn-primary mt">
            {loading ? 'Analyzing…' : 'Analyze Code'}
          </button>
        </div>
        <div className="card">
          <h2 className="card-title">Recovery Report</h2>
          {result ? (
            <div className="results-grid">
              <div>
                <h3 className="mini-title">GOAL</h3>
                <p className="muted">{result.goal}</p>
              </div>
              <div>
                <h3 className="mini-title">CURRENT STATE</h3>
                <p className="muted">{result.current_state}</p>
              </div>
              <div>
                <h3 className="mini-title">EXPLANATION</h3>
                <p className="muted">{result.explanation}</p>
              </div>
              <div>
                <h3 className="mini-title">NEXT STEPS</h3>
                <ul className="muted">
                  {(result.next_steps || []).map((s: string, i: number) => <li key={i}>{s}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="mini-title">MOMENTUM SCORE</h3>
                <p className="muted">Completion: {result.momentum?.completion}% • Effort: {result.momentum?.effort}</p>
              </div>
              <div>
                <h3 className="mini-title">RISKS / IMPROVEMENTS</h3>
                <ul className="muted">
                  {(result.risks || []).map((s: string, i: number) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            </div>
          ) : (
            <div className="muted">Run an analysis to see results here</div>
          )}
        </div>
      </div>
    </div>
  )
}
