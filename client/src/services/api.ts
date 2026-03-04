// @ts-ignore
import axios from 'axios'

const API_BASE = 'http://localhost:8000'

export const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
})

export interface AnalysisRequest {
  code: string
  cursor_position?: number
}

export interface Analysis {
  id: string
  code: string
  level: string
  result: string
  createdAt: string
}

export const analyzeCode = async (data: AnalysisRequest): Promise<any> => {
  const res = await api.post('/analyze', data)
  return res.data
}

export const saveAnalysis = async (analysis: Omit<Analysis, 'id' | 'createdAt'>): Promise<Analysis> => {
  const item: Analysis = {
    ...analysis,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  }
  const list = JSON.parse(localStorage.getItem('analyses') || '[]')
  list.unshift(item)
  localStorage.setItem('analyses', JSON.stringify(list))
  return item
}

export const getAnalyses = async (): Promise<Analysis[]> => {
  return JSON.parse(localStorage.getItem('analyses') || '[]')
}
