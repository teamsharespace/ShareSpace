# SpaceShare Platform Documentation

## Overview
SpaceShare is a platform for booking unique spaces for meetings, photoshoots, events, and coworking. This documentation provides a comprehensive guide to the codebase structure and how to implement new features.

## Tech Stack
- **Frontend**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth.js
- **Payment Processing**: Stripe

## Project Structure

```
spaceshare/
├── app/                    # Next.js app directory
│   ├── (dashboard)/       # Dashboard routes
│   ├── api/               # API routes
│   ├── spaces/            # Space listing pages
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
├── lib/                   # Utility functions
└── prisma/               # Database schema and migrations
```

## Core Features

### 1. Space Management
- Location: `app/spaces/`
- Key Files:
  - `page.tsx`: Main listing page with search and filters
  - `[id]/page.tsx`: Individual space details
  - `api/spaces/route.ts`: Space-related API endpoints

#### Adding New Space Features
1. Update Prisma Schema (`prisma/schema.prisma`)
2. Create/Update API endpoints (`app/api/spaces/`)
3. Modify UI components as needed

### 2. Authentication
- Implementation: NextAuth.js
- Location: `app/api/auth/[...nextauth]/route.ts`
- Supports:
  - Email/Password authentication
  - Protected routes
  - Role-based access (User, Host, Admin)

### 3. Booking System
- Location: `app/api/bookings/`
- Features:
  - Real-time availability
  - Stripe integration
  - Booking management

## API Structure

### Spaces API
```typescript
// GET /api/spaces
// Supports filtering by: city, category, price range, capacity
interface SpaceFilters {
  city?: string
  category?: string
  minPrice?: number
  maxPrice?: number
  capacity?: number
}

// GET /api/spaces/[id]
interface Space {
  id: string
  title: string
  description: string
  price: number
  capacity: number
  address: string
  city: string
  state: string
  images: string[]
  amenities: string[]
  host: {
    name: string
    image?: string
  }
}
```

### Bookings API
```typescript
// POST /api/bookings
interface BookingRequest {
  spaceId: string
  startTime: string
  endTime: string
  totalPrice: number
}
```

## Adding New Features

### Step 1: Database Schema
1. Add new models/fields to `prisma/schema.prisma`
2. Generate migration: `npx prisma migrate dev`
3. Update Prisma client: `npx prisma generate`

### Step 2: API Endpoint
1. Create new route in `app/api/`
2. Implement request handling
3. Add authentication/authorization if needed

Example:
```typescript
// app/api/example/route.ts
import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import prisma from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await getServerSession()
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    // Implementation
    return NextResponse.json(data)
  } catch (error) {
    return new NextResponse("Internal error", { status: 500 })
  }
}
```

### Step 3: UI Components
1. Create new component in `components/`
2. Use shadcn/ui components for consistent styling
3. Implement responsive design with Tailwind CSS

Example:
```typescript
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function NewFeature() {
  const [data, setData] = useState()

  return (
    <Card>
      {/* Implementation */}
    </Card>
  )
}
```

## Best Practices

### 1. Type Safety
- Always use TypeScript interfaces for API responses
- Implement proper error handling
- Use Zod for request validation

### 2. Performance
- Use Next.js Image component for optimized images
- Implement proper loading states
- Use React Query for data fetching when needed

### 3. Security
- Always validate user sessions for protected routes
- Implement proper CORS policies
- Use environment variables for sensitive data

### 4. Code Style
- Use "use client" directive for client components
- Follow the existing project structure
- Use meaningful component and variable names
- Add comments for complex logic

## Common Tasks

### Adding a New Page
1. Create new directory in `app/`
2. Add `page.tsx` with proper layout
3. Update navigation if needed

### Adding New API Endpoints
1. Create new route file in `app/api/`
2. Implement proper error handling
3. Add authentication if needed
4. Update API documentation

### Modifying Database Schema
1. Update `schema.prisma`
2. Create migration
3. Update affected API endpoints
4. Update TypeScript interfaces

## Testing
- Add unit tests for utility functions
- Add integration tests for API endpoints
- Test across different devices and browsers

## Deployment
- Build command: `npm run build`
- Environment variables needed:
  - `DATABASE_URL`
  - `NEXTAUTH_SECRET`
  - `STRIPE_SECRET_KEY`
  - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`