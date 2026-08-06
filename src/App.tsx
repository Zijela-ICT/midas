import { useEffect, useState } from 'react'
import './App.css'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { ServicesPage } from './pages/ServicesPage'
import { IndustriesPage } from './pages/IndustriesPage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { PostsPage } from './pages/PostsPage'
import { BlogPostPage } from './pages/BlogPostPage'
import { ShippingCalculatorPage } from './pages/ShippingCalculatorPage'
import { CalculatorCta } from './components/CalculatorCta'
import { SupportChat } from './components/SupportChat'
import { OurWorkPage } from './pages/OurWorkPage'

const routes = {
  '/': HomePage,
  '/services': ServicesPage,
  '/industries': IndustriesPage,
  '/about': AboutPage,
  '/contact': ContactPage,
  '/posts': PostsPage,
  '/calculator': ShippingCalculatorPage,
  '/our-work': OurWorkPage,
}

function App() {
  const [path, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const sync = () => setPath(window.location.pathname)
    window.addEventListener('popstate', sync)
    return () => window.removeEventListener('popstate', sync)
  }, [])

  const Page = routes[path as keyof typeof routes] ?? HomePage
  const content = path.startsWith('/posts/')
    ? <BlogPostPage slug={decodeURIComponent(path.slice('/posts/'.length))} />
    : <Page />
  return <div className="site-shell"><Header path={path} /><main>{content}</main>{path !== '/calculator' && <CalculatorCta />}<Footer /><SupportChat /></div>
}

export default App
