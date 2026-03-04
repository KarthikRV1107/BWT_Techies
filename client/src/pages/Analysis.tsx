import React, { useEffect, useState } from 'react'
import { getAnalyses } from '../services/api'
import type { Analysis } from '../services/api'

export default function Analysis() {
  const [analyses, setAnalyses] = useState<Analysis[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const list = await getAnalyses()
      setAnalyses(list)
      setLoading(false)
    })()
  }, [])

  if (loading) return <div className="container muted">Loading analyses…</div>

  return (
    <div className="container space">
      <div className="flex between">
        <h1 className="heading">Analysis History</h1>
        <button onClick={async () => setAnalyses(await getAnalyses())} className="btn btn-secondary">Refresh</button>
      </div>
      {analyses.length === 0 ? (
        <div className="card">
          <div className="muted">No analyses yet. Run one in the dashboard.</div>
        </div>
      ) : (
        <div className="grid">
          {analyses.map(a => (
            <div className="card" key={a.id}>
              <div className="flex between mb">
                <span className="tag">{a.level}</span>
                <span className="muted small">{new Date(a.createdAt).toLocaleString()}</span>
              </div>
              <pre className="code">{a.code.substring(0, 300)}{a.code.length > 300 ? '…' : ''}</pre>
              <div className="mt">
                <pre className="code">{a.result}</pre>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
