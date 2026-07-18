import { BookOpenText, GitFork, Github, Map, Network } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Timeline', icon: Map, end: true },
  { to: '/relations', label: 'Relations', icon: Network },
  { to: '/papers', label: 'Papers', icon: BookOpenText },
]

export function SiteHeader() {
  return (
    <header className="site-header">
      <NavLink to="/" className="wordmark" aria-label="AHD Papers home">
        <span className="wordmark__mark"><GitFork size={20} strokeWidth={1.6} aria-hidden="true" /></span>
        <span>
          <strong>AHD Papers</strong>
          <small>Research Atlas</small>
        </span>
      </NavLink>
      <nav className="primary-nav" aria-label="Primary navigation">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink to={to} end={end} key={to} className={({ isActive }) => isActive ? 'primary-nav__link is-active' : 'primary-nav__link'}>
            <Icon size={17} strokeWidth={1.7} aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>
      <a className="github-link" href="https://github.com/CIAM-Group/awesome-llm4ad" target="_blank" rel="noreferrer" aria-label="Open GitHub repository" title="GitHub repository">
        <Github size={18} strokeWidth={1.7} aria-hidden="true" />
      </a>
    </header>
  )
}
