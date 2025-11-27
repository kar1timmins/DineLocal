## Testing Considerations

### 18. Write Testable Components

**Structure components to be easily testable.**

```tsx
// ✅ Testable: Pure function, clear inputs/outputs
export function formatPrice(price: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(price)
}

// ✅ Testable: Props-based component
export function PriceDisplay({ price, currency }: PriceDisplayProps) {
  return <span>{formatPrice(price, currency)}</span>
}

// PriceDisplay.test.tsx
describe('PriceDisplay', () => {
  it('formats price correctly', () => {
    render(<PriceDisplay price={99.99} currency="USD" />)
    expect(screen.getByText('$99.99')).toBeInTheDocument()
  })
})
```

---
