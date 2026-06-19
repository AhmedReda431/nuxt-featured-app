/**
 * Deterministic "real estate" dataset generator.
 *
 * There's no free, key-less real-estate listings API available, so this
 * server module is the data source instead. It's still a genuine HTTP
 * API the frontend calls (/api/real-estate/...) - swap the body of
 * buildProperties() for a real provider (RentCast, Zillow, your own DB)
 * later without touching any page/component code.
 */

const CITIES = [
  { city: 'Cairo', country: 'Egypt', lat: 30.0444, lng: 31.2357 },
  { city: 'Giza', country: 'Egypt', lat: 30.0131, lng: 31.2089 },
  { city: 'Alexandria', country: 'Egypt', lat: 31.2001, lng: 29.9187 },
  { city: 'Dubai', country: 'UAE', lat: 25.2048, lng: 55.2708 },
  { city: 'Riyadh', country: 'Saudi Arabia', lat: 24.7136, lng: 46.6753 },
  { city: 'Doha', country: 'Qatar', lat: 25.2854, lng: 51.5310 },
]

const TYPES = ['Apartment', 'Villa', 'Townhouse', 'Penthouse', 'Studio', 'Duplex']
const STATUSES = ['for-sale', 'for-rent']
const AMENITIES_POOL = [
  'Swimming Pool', 'Gym', 'Parking', 'Security', 'Garden', 'Balcony',
  'Central AC', 'Elevator', 'Pet Friendly', 'Smart Home', 'Sea View', 'Playground',
]

const IMAGE_SEEDS = [
  'photo-1545324418-cc1a3fa10c00',
  'photo-1512917774080-9991f1c4c750',
  'photo-1600596542815-ffad4c1539a9',
  'photo-1600585154340-be6161a56a0c',
  'photo-1600607687939-ce8a6c25118c',
  'photo-1600047509807-ba8f99d2cdde',
  'photo-1600566753086-00f18fb6b3ea',
  'photo-1582268611958-ebfd161ef9cf',
  'photo-1599809275671-b5942cabc7a2',
  'photo-1567496898669-ee935f5f647a',
  'photo-1493809842364-78817add7ffb',
  'photo-1580587771525-78b9dba3b914',
]

function seededRandom(seed) {
  // Small deterministic PRNG so the same id always returns the same data
  let value = seed % 2147483647
  if (value <= 0) value += 2147483646
  return () => {
    value = (value * 16807) % 2147483647
    return (value - 1) / 2147483646
  }
}

function pick(rand, arr) {
  return arr[Math.floor(rand() * arr.length)]
}

function pickMany(rand, arr, count) {
  const shuffled = [...arr].sort(() => rand() - 0.5)
  return shuffled.slice(0, count)
}

export function buildProperty(id) {
  const rand = seededRandom(id * 7919)
  const location = pick(rand, CITIES)
  const type = pick(rand, TYPES)
  const status = pick(rand, STATUSES)
  const bedrooms = type === 'Studio' ? 0 : Math.floor(rand() * 5) + 1
  const bathrooms = Math.max(1, Math.floor(bedrooms * 0.75) + Math.floor(rand() * 2))
  const area = Math.floor(rand() * 350) + 60
  const basePrice = status === 'for-rent'
    ? Math.floor((area * (rand() * 18 + 8)) / 100) * 100
    : Math.floor((area * (rand() * 1800 + 600)) / 1000) * 1000
  const rating = Math.round((rand() * 1.5 + 3.5) * 10) / 10
  const images = pickMany(rand, IMAGE_SEEDS, 5).map(
    seed => `https://images.unsplash.com/${seed}?auto=format&fit=crop&w=1200&q=80`,
  )
  const amenities = pickMany(rand, AMENITIES_POOL, Math.floor(rand() * 5) + 4)
  const year = 2010 + Math.floor(rand() * 15)
  const agentNames = ['Sara Ahmed', 'Mohamed Ali', 'Lina Haddad', 'Omar Saeed', 'Nora Khalid']
  const agent = pick(rand, agentNames)

  const title = `${type} in ${location.city}${bedrooms ? ` · ${bedrooms} BR` : ''}`

  return {
    id,
    slug: `${type.toLowerCase()}-${location.city.toLowerCase()}-${id}`,
    title,
    type,
    status,
    price: basePrice,
    currency: 'USD',
    bedrooms,
    bathrooms,
    area,
    areaUnit: 'm²',
    rating,
    reviewCount: Math.floor(rand() * 120) + 3,
    yearBuilt: year,
    city: location.city,
    country: location.country,
    address: `${Math.floor(rand() * 200) + 1} ${pick(rand, ['Nile St', 'Palm Ave', 'Garden Rd', 'Marina Blvd', 'Hill View Dr'])}, ${location.city}`,
    lat: location.lat + (rand() - 0.5) * 0.1,
    lng: location.lng + (rand() - 0.5) * 0.1,
    images,
    coverImage: images[0],
    amenities,
    agent: {
      name: agent,
      phone: `+20 1${Math.floor(rand() * 90000000 + 10000000)}`,
      email: `${agent.toLowerCase().replace(' ', '.')}@nexthome-realty.com`,
    },
    description: `This ${bedrooms ? `${bedrooms}-bedroom ` : ''}${type.toLowerCase()} spans ${area} m² in a sought-after part of ${location.city}. Built in ${year}, it combines modern finishes with practical everyday comfort, and includes ${amenities.slice(0, 3).join(', ').toLowerCase()} among its amenities.`,
  }
}

export function buildProperties(count = 48) {
  return Array.from({ length: count }, (_, i) => buildProperty(i + 1))
}
