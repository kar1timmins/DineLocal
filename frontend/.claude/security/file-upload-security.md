## File Upload Security

See **COMPONENT_GUIDELINES.md → File Upload Patterns** for implementation details.

**Security Considerations:**

- **File Type Validation:** Check MIME type and file extension (both client and server)
- **File Size Limits:** Prevent DoS attacks with large uploads
- **Virus Scanning:** Integrate ClamAV or similar for uploaded files
- **Content Verification:** Validate image headers (not just extension)
- **Secure Storage:** Store uploads outside web root, serve via CDN
- **Access Control:** Ensure users can only access their own uploads
- **Filename Sanitization:** Remove special characters, prevent path traversal

**Quick Example:**

```typescript
// Validate file type
const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp']
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10 MB

export function validateFile(file: File): string | null {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return 'File type not allowed. Use JPEG, PNG, or WebP.'
  }

  if (file.size > MAX_FILE_SIZE) {
    return 'File size exceeds 10 MB limit.'
  }

  return null // Valid
}
```

---

