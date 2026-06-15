export interface Product {
  id: string
  slug: string
  name: string
  description: string
  price: number
  currency: string
  category: string
  image: string
  images: string[]
  rating: number
  inStock: boolean
}

export interface CartItem {
  productId: string
  quantity: number
}

export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  image: string
  category: string
  readTime: number
}

export interface Building {
  id: string
  slug: string
  title: string
  description: string
  price: number
  currency: string
  location: string
  bedrooms: number
  bathrooms: number
  area: number
  type: string
  image: string
  images: string[]
  features: string[]
}

export interface User {
  id: string
  name: string
  email: string
}

export interface SeoMeta {
  title?: string
  description?: string
  image?: string
  type?: string
  noindex?: boolean
}
