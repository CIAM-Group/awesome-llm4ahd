import { lazy, Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { SiteFooter } from './components/SiteFooter'
import { SiteHeader } from './components/SiteHeader'
import { TimelinePage } from './pages/TimelinePage'

const RelationsPage = lazy(() => import('./pages/RelationsPage').then((module) => ({ default: module.RelationsPage })))
const PapersPage = lazy(() => import('./pages/PapersPage').then((module) => ({ default: module.PapersPage })))
const PaperDetailPage = lazy(() => import('./pages/PaperDetailPage').then((module) => ({ default: module.PaperDetailPage })))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    if (!window.location.hash) window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

export function App() {
  return (
    <div className="app-shell">
      <ScrollToTop />
      <SiteHeader />
      <main>
        <Suspense fallback={<div className="route-loading" role="status">Drawing the atlas…</div>}>
          <Routes>
            <Route path="/" element={<TimelinePage />} />
            <Route path="/relations" element={<RelationsPage />} />
            <Route path="/papers" element={<PapersPage />} />
            <Route path="/papers/:id" element={<PaperDetailPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  )
}
