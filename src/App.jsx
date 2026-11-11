import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { strings, LangContext } from './i18n.js'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import ModelPage from './pages/ModelPage.jsx'
import Models from './pages/Models.jsx'
import TestDrive from './pages/TestDrive.jsx'
import Showroom from './pages/Showroom.jsx'
import NotFound from './pages/NotFound.jsx'

// The deployed site (Vercel) uses clean URLs. The double-click "Open demo.html"
// build uses #/ URLs, because a file opened from disk has no server to route it.
const Router = import.meta.env.VITE_HASH_ROUTER === '1' ? HashRouter : BrowserRouter

const readLang = () => {
  try { return localStorage.getItem('lang') === 'bn' ? 'bn' : 'en' } catch { return 'en' }
}

export default function App() {
  const [lang, setLang] = useState(readLang)
  const value = useMemo(() => ({ lang, setLang, t: strings[lang] }), [lang])

  useEffect(() => {
    document.documentElement.lang = lang === 'bn' ? 'bn' : 'en'
    try { localStorage.setItem('lang', lang) } catch { /* storage unavailable */ }
  }, [lang])

  return (
    <LangContext.Provider value={value}>
      <div className={`app lang-${lang}`}>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="models" element={<Models />} />
              <Route path="models/:slug" element={<ModelPage />} />
              <Route path="t2-idm" element={<Navigate to="/models/t2-idm" replace />} />
              <Route path="dashing" element={<Navigate to="/models/dashing" replace />} />
              <Route path="x70-plus" element={<Navigate to="/models/x70-plus" replace />} />
              <Route path="test-drive" element={<TestDrive />} />
              <Route path="showroom" element={<Showroom />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </LangContext.Provider>
  )
}
