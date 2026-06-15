import type { Product } from '~/types'

export const products: Product[] = [
  {
    id: '1',
    slug: 'wireless-headphones',
    name: 'Wireless Headphones Pro',
    description: 'Premium noise-cancelling wireless headphones with 40-hour battery life and studio-quality sound.',
    price: 249.99,
    currency: 'USD',
    category: 'Electronics',
    image: 'https://picsum.photos/seed/headphones/600/600',
    images: [
      'https://picsum.photos/seed/headphones/800/600',
      'https://picsum.photos/seed/headphones2/800/600',
      'https://picsum.photos/seed/headphones3/800/600',
    ],
    rating: 4.8,
    inStock: true,
  },
  {
    id: '2',
    slug: 'smart-watch-ultra',
    name: 'Smart Watch Ultra',
    description: 'Advanced fitness tracking, GPS, and health monitoring in a sleek titanium design.',
    price: 399.99,
    currency: 'USD',
    category: 'Electronics',
    image: 'https://picsum.photos/seed/watch/600/600',
    images: [
      'https://picsum.photos/seed/watch/800/600',
      'https://picsum.photos/seed/watch2/800/600',
    ],
    rating: 4.6,
    inStock: true,
  },
  {
    id: '3',
    slug: 'leather-backpack',
    name: 'Premium Leather Backpack',
    description: 'Handcrafted full-grain leather backpack with laptop compartment and water-resistant lining.',
    price: 189.99,
    currency: 'USD',
    category: 'Accessories',
    image: 'https://picsum.photos/seed/backpack/600/600',
    images: [
      'https://picsum.photos/seed/backpack/800/600',
      'https://picsum.photos/seed/backpack2/800/600',
    ],
    rating: 4.9,
    inStock: true,
  },
  {
    id: '4',
    slug: 'running-shoes',
    name: 'Performance Running Shoes',
    description: 'Lightweight running shoes with responsive cushioning and breathable mesh upper.',
    price: 129.99,
    currency: 'USD',
    category: 'Footwear',
    image: 'https://picsum.photos/seed/shoes/600/600',
    images: [
      'https://picsum.photos/seed/shoes/800/600',
      'https://picsum.photos/seed/shoes2/800/600',
    ],
    rating: 4.5,
    inStock: true,
  },
  {
    id: '5',
    slug: 'coffee-maker',
    name: 'Smart Coffee Maker',
    description: 'Programmable coffee maker with app control, built-in grinder, and thermal carafe.',
    price: 179.99,
    currency: 'USD',
    category: 'Home',
    image: 'https://picsum.photos/seed/coffee/600/600',
    images: [
      'https://picsum.photos/seed/coffee/800/600',
    ],
    rating: 4.4,
    inStock: false,
  },
  {
    id: '6',
    slug: 'yoga-mat',
    name: 'Eco Yoga Mat',
    description: 'Non-slip eco-friendly yoga mat with alignment markers and carrying strap.',
    price: 49.99,
    currency: 'USD',
    category: 'Fitness',
    image: 'https://picsum.photos/seed/yoga/600/600',
    images: [
      'https://picsum.photos/seed/yoga/800/600',
    ],
    rating: 4.7,
    inStock: true,
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug)
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}
