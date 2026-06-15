import type { Building } from '~/types'

export const buildings: Building[] = [
  {
    id: '1',
    slug: 'modern-downtown-apartment',
    title: 'Modern Downtown Apartment',
    description: 'Stunning 2-bedroom apartment in the heart of downtown with panoramic city views and premium finishes.',
    price: 450000,
    currency: 'USD',
    location: 'New York, NY',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    type: 'Apartment',
    image: 'https://picsum.photos/seed/building1/800/600',
    images: [
      'https://picsum.photos/seed/building1/800/600',
      'https://picsum.photos/seed/building1a/800/600',
      'https://picsum.photos/seed/building1b/800/600',
    ],
    features: ['Parking', 'Gym', 'Pool', '24/7 Security', 'Smart Home'],
  },
  {
    id: '2',
    slug: 'suburban-family-villa',
    title: 'Suburban Family Villa',
    description: 'Spacious 4-bedroom villa with private garden, perfect for families seeking tranquility.',
    price: 680000,
    currency: 'USD',
    location: 'Austin, TX',
    bedrooms: 4,
    bathrooms: 3,
    area: 2800,
    type: 'Villa',
    image: 'https://picsum.photos/seed/building2/800/600',
    images: [
      'https://picsum.photos/seed/building2/800/600',
      'https://picsum.photos/seed/building2a/800/600',
    ],
    features: ['Garden', 'Garage', 'Fireplace', 'Solar Panels'],
  },
  {
    id: '3',
    slug: 'luxury-penthouse-suite',
    title: 'Luxury Penthouse Suite',
    description: 'Exclusive penthouse with rooftop terrace, chef\'s kitchen, and breathtaking ocean views.',
    price: 1250000,
    currency: 'USD',
    location: 'Miami, FL',
    bedrooms: 3,
    bathrooms: 3,
    area: 3200,
    type: 'Penthouse',
    image: 'https://picsum.photos/seed/building3/800/600',
    images: [
      'https://picsum.photos/seed/building3/800/600',
      'https://picsum.photos/seed/building3a/800/600',
    ],
    features: ['Rooftop Terrace', 'Concierge', 'Wine Cellar', 'Home Theater'],
  },
  {
    id: '4',
    slug: 'cozy-studio-loft',
    title: 'Cozy Studio Loft',
    description: 'Charming studio loft in a converted warehouse district, ideal for young professionals.',
    price: 275000,
    currency: 'USD',
    location: 'Portland, OR',
    bedrooms: 1,
    bathrooms: 1,
    area: 650,
    type: 'Loft',
    image: 'https://picsum.photos/seed/building4/800/600',
    images: [
      'https://picsum.photos/seed/building4/800/600',
    ],
    features: ['Exposed Brick', 'High Ceilings', 'Bike Storage'],
  },
]

export function getBuildingBySlug(slug: string): Building | undefined {
  return buildings.find(b => b.slug === slug)
}
