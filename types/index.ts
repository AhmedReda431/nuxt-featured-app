export interface Product {
  id: number
  slug: string
  name: string
  price: number
  originalPrice?: number
  images: string[]
  description: string
  category: string
}

export interface Building {
  id: number
  slug: string
  title: string
  price: number
  images: string[]
  bedrooms: number
  bathrooms: number
  area: number
  description: string
}

export interface BlogPost {
  id: number
  slug: string
  title: string
  coverImage: string
  excerpt: string
  publishedAt: string
  content: string
  author: {
    name: string
    avatar: string
  }
}

export interface CartItem {
  product: Product
  quantity: number
}
