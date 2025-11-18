# Architecture Documentation

Project structure, file organization, naming conventions.

---

## 📋 Index

1. **[Directory Structure](./directory-structure.md)**
   - Folder organization
   - Feature structure
   - Shared vs feature-specific

2. **[File Naming](./file-naming.md)**
   - React Components: PascalCase
   - TypeScript files: camelCase
   - Types, enums, constants, hooks, stores

3. **[Import Patterns](./import-patterns.md)**
   - Path aliases (`@/*`)
   - Import best practices
   - Cross-feature rules

4. **[State Management](./state-management.md)**
   - Zustand stores setup
   - Context patterns
   - When to use each

5. **[Clean Code Principles](./clean-code.md)** ⭐ NEW
   - SOLID principles for React/TypeScript
   - Function best practices
   - Naming conventions
   - DRY, pure functions, error handling

---

## Quick Reference Table

| File Type | Convention | Example |
|-----------|-----------|---------|
| Component | PascalCase | `UserProfile.tsx` |
| Hook | camelCase + `use` | `useAuth.ts` |
| Store | camelCase + `Store` | `authStore.ts` |
| Types | camelCase + `.types.ts` | `user.types.ts` |
| Route | kebab-case | `/user-profile`, `/venues/[id]` |

---

**See also:** [SSOT Mapping](../SINGLE_SOURCE_OF_TRUTH.md)
