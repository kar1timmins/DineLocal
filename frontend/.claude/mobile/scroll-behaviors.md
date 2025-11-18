## Scroll Behaviors

### Pull-to-Refresh

**Use for feed-style content:**

```tsx
import PullToRefresh from 'react-simple-pull-to-refresh'
import { useQueryClient } from '@tanstack/react-query'

export function ExperienceFeed({ experiences }) {
  const queryClient = useQueryClient()

  const handleRefresh = async () => {
    await queryClient.invalidateQueries({ queryKey: ['experiences'] })
  }

  return (
    <PullToRefresh
      onRefresh={handleRefresh}
      pullingContent={
        <div className="flex justify-center py-4">
          <ArrowDown className="text-muted-foreground h-6 w-6 animate-bounce" />
        </div>
      }
      refreshingContent={
        <div className="flex justify-center py-4">
          <Loader2 className="text-primary h-6 w-6 animate-spin" />
        </div>
      }
      resistance={2} // Higher = harder to pull
    >
      <div className="space-y-4">
        {experiences.map((exp) => (
          <ExperienceCard key={exp.id} experience={exp} />
        ))}
      </div>
    </PullToRefresh>
  )
}
```

**Best Practices:**

- ✅ Use for content that updates frequently (feeds, lists)
- ✅ Show clear loading indicator
- ✅ Provide haptic feedback when refresh triggers
- ❌ Don't use on pages that rarely update
- ❌ Don't use if there's a fixed header (gesture conflicts)

---

### Infinite Scroll

**Load more content as user scrolls:**

```tsx
import { useInfiniteQuery } from '@tanstack/react-query'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'

export function InfiniteExperienceList() {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '200px', // Start loading 200px before reaching bottom
  })

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['experiences'],
    queryFn: ({ pageParam = 0 }) => fetchExperiences(pageParam),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  })

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage])

  return (
    <div className="space-y-4">
      {data?.pages.map((page) =>
        page.experiences.map((exp) => <ExperienceCard key={exp.id} experience={exp} />)
      )}

      {/* Loading trigger */}
      <div ref={ref} className="py-4">
        {isFetchingNextPage && (
          <Flex justifyContent="center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </Flex>
        )}
      </div>

      {/* End of results */}
      {!hasNextPage && (
        <Text className="text-muted-foreground py-8 text-center">You've reached the end!</Text>
      )}
    </div>
  )
}
```

---

