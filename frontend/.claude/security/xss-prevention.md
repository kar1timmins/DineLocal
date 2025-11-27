## XSS (Cross-Site Scripting) Prevention

### What is XSS?

Cross-Site Scripting occurs when malicious JavaScript code is injected into your website and executes in other users' browsers. This can lead to:

- Stolen session cookies and authentication tokens
- Unauthorized actions on behalf of users
- Data theft (personal information, payment details)
- Defacement of the site

### Types of XSS Attacks

1. **Stored XSS:** Malicious script is stored in the database (e.g., in a review or venue description) and executed every time the page loads
2. **Reflected XSS:** Malicious script is in a URL parameter and reflected back to the user
3. **DOM-based XSS:** Client-side JavaScript modifies the DOM with unsafe data

---

### React's Built-in XSS Protection

**Good News:** React escapes all values rendered in JSX by default.

```tsx
// ✅ SAFE - React automatically escapes the content
export function VenueName({ name }: { name: string }) {
  return <h1>{name}</h1>
}

// Example: If name = "<script>alert('XSS')</script>"
// React renders: &lt;script&gt;alert(&#x27;XSS&#x27;)&lt;/script&gt;
// Result: Displayed as text, not executed as code
```

**What React Does:**

- Converts `<` to `&lt;`
- Converts `>` to `&gt;`
- Converts `"` to `&quot;`
- Converts `'` to `&#x27;`
- Converts `&` to `&amp;`

---

### Dangerous Patterns to Avoid

#### 1. dangerouslySetInnerHTML 🚨

This prop is **explicitly named "dangerous"** for a reason. It bypasses React's protection.

```tsx
// ❌ DANGEROUS - Never use with user input
export function VenueDescription({ html }: { html: string }) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

// ✅ SAFE - Use sanitization library if HTML is required
import DOMPurify from 'isomorphic-dompurify'

export function VenueDescription({ html }: { html: string }) {
  const sanitized = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'ul', 'ol', 'li'],
    ALLOWED_ATTR: [],
  })

  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />
}
```

#### 2. Inline Event Handlers with User Data ❌

```tsx
// ❌ VULNERABLE - User input in event handler
export function SearchButton({ query }: { query: string }) {
  return <button onClick={() => eval(query)}>Search</button>
}

// ✅ SAFE - Never use eval or similar with user input
export function SearchButton({ onSearch }: { onSearch: () => void }) {
  return <button onClick={onSearch}>Search</button>
}
```

#### 3. Dynamic Script Tags ❌

```tsx
// ❌ VULNERABLE - Never construct scripts from user input
const userCode = getUserInput()
return <script>{userCode}</script>

// ✅ SAFE - Use Next.js Script component for third-party scripts only
import Script from 'next/script'

export function Analytics() {
  return <Script src="https://trusted-analytics.com/script.js" strategy="afterInteractive" />
}
```

#### 4. Direct DOM Manipulation ❌

```tsx
// ❌ VULNERABLE - Direct DOM manipulation with user input
useEffect(() => {
  document.getElementById('content')!.innerHTML = userInput
}, [userInput])

// ✅ SAFE - Use React state and JSX
const [content, setContent] = useState('')

return <div>{content}</div>
```

---

### DOMPurify Integration

**Installation:**

```bash
pnpm add isomorphic-dompurify
```

**Basic Usage:**

```tsx
import DOMPurify from 'isomorphic-dompurify'

// Sanitize user-generated HTML content
export function sanitizeHTML(dirtyHTML: string): string {
  return DOMPurify.sanitize(dirtyHTML, {
    ALLOWED_TAGS: [
      'p',
      'br',
      'strong',
      'em',
      'u',
      'h1',
      'h2',
      'h3',
      'ul',
      'ol',
      'li',
      'a',
      'blockquote',
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel'],
    ALLOW_DATA_ATTR: false,
  })
}

// Usage in component
export function HostBio({ bio }: { bio: string }) {
  const sanitizedBio = useMemo(() => sanitizeHTML(bio), [bio])

  return <div className="prose" dangerouslySetInnerHTML={{ __html: sanitizedBio }} />
}
```

**Strict Configuration for User Reviews:**

```tsx
export function sanitizeReviewContent(content: string): string {
  return DOMPurify.sanitize(content, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em'], // Very restrictive
    ALLOWED_ATTR: [], // No attributes allowed
    KEEP_CONTENT: true, // Keep text even if tags are removed
  })
}
```

---

### URL Sanitization

**Problem:** User-submitted links can execute JavaScript.

```tsx
// ❌ VULNERABLE - javascript: protocol can execute code
;<a href={userSubmittedURL}>Click here</a>

// ✅ SAFE - Validate URL protocol
export function sanitizeURL(url: string): string | null {
  try {
    const parsed = new URL(url)
    // Only allow http and https protocols
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return url
    }
    return null
  } catch {
    return null // Invalid URL
  }
}

// Usage
export function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  const safeHref = sanitizeURL(href)

  if (!safeHref) {
    return <span>{children}</span> // Render as text if invalid
  }

  return (
    <a
      href={safeHref}
      target="_blank"
      rel="noopener noreferrer" // Security: prevents window.opener access
    >
      {children}
    </a>
  )
}
```

---

### XSS Prevention Checklist

- [ ] Never use `dangerouslySetInnerHTML` with unsanitized user input
- [ ] Always sanitize HTML content with DOMPurify before rendering
- [ ] Validate URL protocols (only allow http/https)
- [ ] Use `rel="noopener noreferrer"` for external links with `target="_blank"`
- [ ] Never use `eval()`, `Function()`, or similar with user input
- [ ] Avoid direct DOM manipulation with `innerHTML`, `outerHTML`
- [ ] Encode user input when rendering in HTML attributes
- [ ] Use Content Security Policy headers (see CSP section)
- [ ] Sanitize data on both client and server

---
