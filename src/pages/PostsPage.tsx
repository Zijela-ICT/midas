import { useEffect, useState } from 'react'
import { navigate } from '../navigation'

const API_URL = 'https://indigo-turkey-497183.hostingersite.com/wp-json/wp/v2/posts'
const POSTS_PER_PAGE = 6
const fallbackImages = [
  'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=82',
  'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=1200&q=82',
]

type WpPost = {
  id: number
  slug: string
  date: string
  link: string
  title: { rendered: string }
  excerpt: { rendered: string }
  _embedded?: {
    author?: Array<{ name: string }>
    'wp:featuredmedia'?: Array<{ source_url: string; alt_text?: string }>
    'wp:term'?: Array<Array<{ name: string }>>
  }
}

function textOnly(html: string) {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.textContent?.trim() ?? ''
}

function initialPage() {
  const value = Number(new URLSearchParams(window.location.search).get('page'))
  return Number.isInteger(value) && value > 0 ? value : 1
}

export function PostsPage() {
  const [posts, setPosts] = useState<WpPost[]>([])
  const [page, setPage] = useState(initialPage)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [reload, setReload] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    fetch(`${API_URL}?per_page=${POSTS_PER_PAGE}&page=${page}&_embed=1`, { signal: controller.signal })
      .then(async response => {
        if (!response.ok) throw new Error('Unable to load posts')
        setTotalPages(Math.max(1, Number(response.headers.get('X-WP-TotalPages')) || 1))
        setPosts(await response.json())
      })
      .catch(err => { if (err.name !== 'AbortError') setError(true) })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => controller.abort()
  }, [page, reload])

  const selectPage = (next: number) => {
    if (next < 1 || next > totalPages || next === page) return
    setLoading(true)
    setError(false)
    setPage(next)
    const url = new URL(window.location.href)
    if (next === 1) url.searchParams.delete('page'); else url.searchParams.set('page', String(next))
    window.history.replaceState({}, '', url)
    window.scrollTo({ top: 360, behavior: 'smooth' })
  }

  return <>
    <section className="posts-hero">
      <div className="container posts-hero-inner">
        <div><div className="eyebrow">Ideas in motion</div><h1>Insights for a world<br /><em>on the move.</em></h1></div>
        <p>Practical thinking, industry perspectives and useful updates from the Midas logistics team.</p>
      </div>
    </section>
    <section className="section posts-section">
      <div className="container">
        <div className="posts-heading"><div><span>Latest intelligence</span><h2>From the Midas journal</h2></div><p>Explore our latest thinking on freight, procurement, warehousing and resilient supply chains.</p></div>
        {loading && <div className="posts-grid" aria-label="Loading articles">{Array.from({ length: 6 }).map((_, i) => <div className="post-skeleton" key={i}><div /><span /><span /></div>)}</div>}
        {error && <div className="posts-message"><h3>We couldn’t load the journal.</h3><p>Please check your connection and try again.</p><button className="button" onClick={() => { setLoading(true); setError(false); setReload(current => current + 1) }}>Try again</button></div>}
        {!loading && !error && posts.length === 0 && <div className="posts-message"><h3>New insights are on the way.</h3><p>Check back soon for the latest from our team.</p></div>}
        {!loading && !error && posts.length > 0 && <div className="posts-grid">{posts.map((post, index) => {
          const media = post._embedded?.['wp:featuredmedia']?.[0]
          const category = post._embedded?.['wp:term']?.[0]?.[0]?.name ?? 'Insights'
          const author = post._embedded?.author?.[0]?.name
          return <article className={'post-card '+(index===0?'featured':'')} key={post.id}>
            <a className="post-image" href={`/posts/${post.slug}`} onClick={e=>{e.preventDefault();navigate(`/posts/${post.slug}`)}}><img src={media?.source_url || fallbackImages[post.id % fallbackImages.length]} alt={media?.alt_text || ''}/><span>{category}</span></a>
            <div className="post-body"><div className="post-meta"><time dateTime={post.date}>{new Intl.DateTimeFormat('en-GB',{day:'2-digit',month:'short',year:'numeric'}).format(new Date(post.date))}</time>{author && <><i/> <span>{author}</span></>}</div><h3><a href={`/posts/${post.slug}`} onClick={e=>{e.preventDefault();navigate(`/posts/${post.slug}`)}}>{textOnly(post.title.rendered)}</a></h3><p>{textOnly(post.excerpt.rendered)}</p><a className="read-link" href={`/posts/${post.slug}`} onClick={e=>{e.preventDefault();navigate(`/posts/${post.slug}`)}}>Read article <span>→</span></a></div>
          </article>
        })}</div>}
        {!loading && !error && totalPages > 1 && <nav className="pagination" aria-label="Posts pagination"><button onClick={() => selectPage(page - 1)} disabled={page === 1} aria-label="Previous page">←</button>{Array.from({ length: totalPages }, (_, i) => i + 1).map(number => <button className={number === page ? 'current' : ''} onClick={() => selectPage(number)} aria-current={number === page ? 'page' : undefined} key={number}>{number}</button>)}<button onClick={() => selectPage(page + 1)} disabled={page === totalPages} aria-label="Next page">→</button></nav>}
      </div>
    </section>
  </>
}
