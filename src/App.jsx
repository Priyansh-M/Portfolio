import { useId, useLayoutEffect, useRef, useState } from "react"
import { profile } from "./profile"
import { projects } from "./projects"

function ExternalLink({ href, className = "", children }) {
  if (!href) {
    return <span className={`${className} is-disabled`}>{children}</span>
  }

  return (
    <a className={className} href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  )
}

const POSTIMAGES_PAGE_HOSTS = ["postimg.cc", "www.postimg.cc", "postimages.org", "www.postimages.org"]

// Postimages page links return HTML, not an image, so they can never render in an <img>.
function resolveAvatar(url) {
  if (!url) return ""

  try {
    const { hostname } = new URL(url)
    if (POSTIMAGES_PAGE_HOSTS.includes(hostname)) {
      console.warn(
        `profile.avatar is a Postimages page link (${url}). Use the "Direct link" that starts with https://i.postimg.cc/ instead.`,
      )
      return ""
    }
  } catch {
    console.warn(`profile.avatar is not a valid URL: ${url}`)
    return ""
  }

  return url
}

function Avatar({ url, name }) {
  const src = resolveAvatar(url)
  const [failedSrc, setFailedSrc] = useState(null)
  const showImage = src && failedSrc !== src

  return (
    <span className="avatar">
      {showImage ? (
        <img src={src} alt={name} onError={() => setFailedSrc(src)} />
      ) : (
        <span aria-hidden="true">{name.charAt(0)}</span>
      )}
    </span>
  )
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="identity">
        <Avatar url={profile.avatar} name={profile.name} />
        <div>
          <p className="name">{profile.name}</p>
          <p className="role">
            {profile.role}
            {profile.location && <span> · {profile.location}</span>}
          </p>
        </div>
      </div>

      <p className="bio">{profile.bio}</p>

      <ul className="socials">
        {profile.socials.map((social) => (
          <li key={social.label}>
            <ExternalLink href={social.href} className="social">
              {social.label}
            </ExternalLink>
          </li>
        ))}
      </ul>

      <section className="stack" aria-labelledby="stack-heading">
        <h2 id="stack-heading" className="section-label">
          Tech stack
        </h2>
        {profile.stack.map(({ group, items }) => (
          <div key={group} className="stack-group">
            <p className="stack-name">{group}</p>
            <ul className="chips">
              {items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </aside>
  )
}

function Summary({ text, expanded, onToggle }) {
  const ref = useRef(null)
  const id = useId()
  const [overflows, setOverflows] = useState(false)

  useLayoutEffect(() => {
    const element = ref.current
    if (!element || expanded) return

    const measure = () => setOverflows(element.scrollHeight > element.clientHeight + 1)
    measure()
    document.fonts?.ready.then(measure)

    const observer = new ResizeObserver(measure)
    observer.observe(element)
    return () => observer.disconnect()
  }, [text, expanded])

  return (
    <>
      <p ref={ref} id={id} className={`card-summary${expanded ? " is-expanded" : ""}`}>
        {text}
      </p>
      {(overflows || expanded) && (
        <button
          type="button"
          className="read-more"
          aria-expanded={expanded}
          aria-controls={id}
          onClick={onToggle}
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}
    </>
  )
}

function TimelineEntry({ project, expanded, onToggle }) {
  return (
    <li className="entry">
      <span className="node" aria-hidden="true" />
      <p className="entry-year">{project.year}</p>
      <article className="card">
        <h3 className="card-title">
          <ExternalLink href={project.href} className="card-link">
            {project.name}
            {project.href && (
              <span className="arrow" aria-hidden="true">
                ↗
              </span>
            )}
          </ExternalLink>
        </h3>
        <Summary text={project.summary} expanded={expanded} onToggle={onToggle} />
        <div className="card-footer">
          <ul className="chips">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          {project.repo && (
            <a className="repo" href={project.repo} target="_blank" rel="noreferrer">
              Code
            </a>
          )}
        </div>
      </article>
    </li>
  )
}

export default function App() {
  const [expandedName, setExpandedName] = useState(null)

  const toggle = (name) => {
    setExpandedName((current) => (current === name ? null : name))
  }

  return (
    <div className="layout">
      <Sidebar />
      <main>
        <header className="intro">
          <p className="section-label">Selected work</p>
          <h1>Projects</h1>
          <p className="lede">
            Things I have built, in order. Open a project name to visit it.
          </p>
        </header>
        <ol className="timeline">
          {projects.map((project) => (
            <TimelineEntry
              key={project.name}
              project={project}
              expanded={expandedName === project.name}
              onToggle={() => toggle(project.name)}
            />
          ))}
        </ol>
      </main>
    </div>
  )
}
