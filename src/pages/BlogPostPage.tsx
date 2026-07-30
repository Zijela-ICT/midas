import { useEffect, useState } from 'react'
import { navigate } from '../navigation'

const API_URL = 'https://indigo-turkey-497183.hostingersite.com/wp-json/wp/v2/posts'
const fallbackImage = 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1800&q=86'

type WpPost = {
  date: string
  title: { rendered: string }
  content: { rendered: string }
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

export function BlogPostPage({ slug }: { slug: string }) {
  const [post, setPost] = useState<WpPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    fetch(`${API_URL}?slug=${encodeURIComponent(slug)}&_embed=1`, { signal: controller.signal })
      .then(async response => {
        if (!response.ok) throw new Error('Unable to load article')
        const posts: WpPost[] = await response.json()
        if (!posts[0]) throw new Error('Article not found')
        setPost(posts[0])
        document.title = `${textOnly(posts[0].title.rendered)} | Midas Global Solutions`
      })
      .catch(err => { if (err.name !== 'AbortError') setError(true) })
      .finally(() => { if (!controller.signal.aborted) setLoading(false) })
    return () => { controller.abort(); document.title = 'Midas Global Solutions | Logistics & Supply Chain' }
  }, [slug])

  if (loading) return <div className="article-loading"><div className="article-loader"/><p>Loading article…</p></div>
  if (error || !post) return <section className="article-error"><div className="container"><div className="eyebrow">Midas journal</div><h1>Article not found.</h1><p>This article may have moved or is no longer available.</p><button className="button" onClick={()=>navigate('/posts')}>Return to blog</button></div></section>

  const media = post._embedded?.['wp:featuredmedia']?.[0]
  const category = post._embedded?.['wp:term']?.[0]?.[0]?.name ?? 'Blog'
  const author = post._embedded?.author?.[0]?.name
  return <article className="article-page">
    <header className="article-header"><div className="container article-header-inner"><a href="/posts" onClick={e=>{e.preventDefault();navigate('/posts')}} className="article-back">← Back to blog</a><div className="eyebrow">{category}</div><h1>{textOnly(post.title.rendered)}</h1><div className="article-meta"><time dateTime={post.date}>{new Intl.DateTimeFormat('en-GB',{day:'2-digit',month:'long',year:'numeric'}).format(new Date(post.date))}</time>{author && <><span>•</span><span>By {author}</span></>}</div></div></header>
    <div className="container article-image"><img src={media?.source_url || fallbackImage} alt={media?.alt_text || ''}/></div>
    <div className="article-layout container"><aside><span>Share</span><a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer" aria-label="Share on LinkedIn">in</a><a href={`mailto:?subject=${encodeURIComponent(textOnly(post.title.rendered))}&body=${encodeURIComponent(window.location.href)}`} aria-label="Share by email">@</a></aside><div className="article-content" dangerouslySetInnerHTML={{__html:post.content.rendered}} /></div>
    <div className="container article-end"><div><span>Continue exploring</span><h2>More ideas for a world in motion.</h2></div><button className="button" onClick={()=>navigate('/posts')}>View all posts</button></div>
  </article>
}
