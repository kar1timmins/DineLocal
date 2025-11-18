## Advanced API Patterns (React Query)

### Retry Strategies

**Exponential Backoff:**

✅ **DO:**

- Use exponential backoff for transient errors (network, 500s)
- Set maximum retry attempts (3-5 attempts)
- Add jitter to prevent thundering herd
- Distinguish retriable errors (network) from permanent errors (400, 401)

❌ **DON'T:**

- Retry on client errors (400, 401, 403, 404)
- Retry indefinitely (set max attempts)
- Use fixed retry delays (causes traffic spikes)
- Retry on known permanent failures

**Example (minimal):**

```typescript
// ✅ Good: Smart retry logic
retry: 3,
retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000)
```

---

### Polling Patterns

**Automatic Polling:**

✅ **DO:**

- Use `refetchInterval` for real-time data (booking status, notifications)
- Poll only when data is stale or expected to change
- Stop polling when window is hidden (`refetchIntervalInBackground: false`)
- Use WebSockets/SSE for high-frequency updates (< 5s intervals)

❌ **DON'T:**

- Poll at very short intervals (< 5 seconds, use WebSockets)
- Poll when user is inactive or tab is hidden
- Poll data that rarely changes (use cache instead)
- Forget to clean up polling on unmount

---

### Request Deduplication

React Query automatically deduplicates identical requests.

✅ **DO:**

- Share query keys across components
- Use stable query keys (avoid dynamic objects)
- Set `staleTime` based on data volatility
- Use longer stale time for static data (5-10 minutes)

❌ **DON'T:**

- Create unique query keys for same data
- Use random/timestamp in query keys
- Use default `staleTime: 0` for all queries

---

### Dependent Queries

**Sequential Queries:**

✅ **DO:**

- Use `enabled` option to wait for prerequisite data
- Check if dependency data exists before enabling
- Show proper loading states for each step
- Handle errors at each dependency level

**Example:**

```typescript
// ✅ Good: Wait for user before fetching bookings
const { data: user } = useQuery({ queryKey: ['user'], queryFn: getUser })
const { data: bookings } = useQuery({
  queryKey: ['bookings', user?.id],
  queryFn: () => getBookings(user!.id),
  enabled: !!user, // Wait for user
})
```

---

### Optimistic Updates

**Add Operations:**

✅ **DO:**

- Add new item to cache immediately (optimistic)
- Use temporary ID for optimistic item
- Rollback on error and show error message
- Replace temporary item with server response

**Delete Operations:**

✅ **DO:**

- Remove item from cache immediately
- Store removed item for rollback
- Restore item on error with toast notification
- Confirm deletion with server response

**Example (minimal):**

```typescript
// ✅ Good: Optimistic delete with rollback
const { mutate } = useMutation({
  mutationFn: deleteBooking,
  onMutate: async (id) => {
    await queryClient.cancelQueries({ queryKey: ['bookings'] })
    const previous = queryClient.getQueryData(['bookings'])
    queryClient.setQueryData(['bookings'], (old) => old?.filter((b) => b.id !== id))
    return { previous } // Rollback context
  },
  onError: (err, id, context) => {
    queryClient.setQueryData(['bookings'], context.previous)
    toast.error('Failed to delete booking')
  },
})
```

---

### Advanced API Checklist

- [ ] Retry logic differentiates retriable errors
- [ ] Polling intervals are appropriate for data volatility
- [ ] Query keys are stable and normalized
- [ ] Dependent queries use `enabled` option
- [ ] Optimistic updates include rollback logic
- [ ] Error states are handled and shown to users
- [ ] Loading states are shown for all async operations

---

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Server Components](https://react.dev/reference/react/use-server)
- [TypeScript Best Practices](https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html)
- [Web Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Zustand Documentation](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [React Query Documentation](https://tanstack.com/query/latest/docs/framework/react/overview)

**Questions or Updates?**
Refer to main documentation in [COMPONENT_GUIDELINES.md](/frontend/.claude/context/COMPONENT_GUIDELINES.md) for core patterns.
