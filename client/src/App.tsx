import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Analysis from './pages/Analysis'

const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/app', element: <Dashboard /> },
  { path: '/app/analysis', element: <Analysis /> },
])

export default function App() {
  return <RouterProvider router={router} />
}
