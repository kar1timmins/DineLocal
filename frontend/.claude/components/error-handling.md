## Error Handling

### 16. Graceful Error Boundaries

**Implement error.tsx for error handling in route segments.**

```tsx
// app/products/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="error-container">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  )
}
```

---

### 17. Validate User Input

**Always validate on both client and server.**

**For DineLocal: Client-side validation with React Hook Form + Zod, Server-side validation in NestJS backend**

```tsx
// ✅ Client-side validation (Frontend)
// features/products/schemas/product.schema.ts
import { z } from 'zod'

export const productSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name too long'),
  price: z.number().positive('Price must be positive'),
  description: z.string().optional(),
})

export type ProductFormData = z.infer<typeof productSchema>

// features/products/components/ProductForm.tsx
;('use client')
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { productSchema, type ProductFormData } from '../schemas/product.schema'
import { useCreateProduct } from '../hooks/useCreateProduct'

export function ProductForm() {
  const { mutate: createProduct, isPending } = useCreateProduct()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  })

  const onSubmit = (data: ProductFormData) => {
    createProduct(data, {
      onSuccess: () => toast.success('Product created!'),
      onError: (error) => toast.error(error.message),
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      {errors.name && <span className="text-destructive">{errors.name.message}</span>}

      <input {...register('price', { valueAsNumber: true })} type="number" />
      {errors.price && <span className="text-destructive">{errors.price.message}</span>}

      <Button type="submit" disabled={isPending}>
        {isPending ? 'Creating...' : 'Create Product'}
      </Button>
    </form>
  )
}
```

**Server-side validation (NestJS Backend):**

```typescript
// backend/src/products/dto/create-product.dto.ts
import { IsString, IsNumber, IsOptional, Min, MaxLength } from 'class-validator'

export class CreateProductDto {
  @IsString()
  @MaxLength(100)
  name: string

  @IsNumber()
  @Min(0)
  price: number

  @IsString()
  @IsOptional()
  description?: string
}

// backend/src/products/products.controller.ts
@Post()
async create(@Body() createProductDto: CreateProductDto) {
  // NestJS automatically validates using class-validator
  return this.productsService.create(createProductDto)
}
```

**Note**: Frontend validates for UX, Backend validates for security. Never trust client-side validation alone!

---

