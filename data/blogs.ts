import type { BlogPost } from '~/types'

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    slug: 'future-of-ecommerce-2026',
    title: 'The Future of E-Commerce in 2026',
    excerpt: 'Discover the trends shaping online retail, from AI personalization to sustainable packaging.',
    content: `
      <p>E-commerce continues to evolve at a rapid pace. In 2026, we're seeing unprecedented integration of artificial intelligence into every step of the shopping journey.</p>
      <h2>AI-Powered Personalization</h2>
      <p>Modern platforms use machine learning to predict customer preferences, offering tailored product recommendations that increase conversion rates by up to 35%.</p>
      <h2>Sustainable Commerce</h2>
      <p>Consumers increasingly demand eco-friendly packaging and carbon-neutral shipping options. Brands that prioritize sustainability are winning customer loyalty.</p>
      <h2>Social Commerce</h2>
      <p>Shopping directly through social media platforms has become mainstream, blurring the lines between content and commerce.</p>
    `,
    author: 'Sarah Johnson',
    date: '2026-03-15',
    image: 'https://picsum.photos/seed/blog1/800/450',
    category: 'E-Commerce',
    readTime: 5,
  },
  {
    id: '2',
    slug: 'real-estate-investment-guide',
    title: 'Real Estate Investment Guide for Beginners',
    excerpt: 'Learn the fundamentals of property investment and how to build a profitable portfolio.',
    content: `
      <p>Real estate remains one of the most reliable long-term investment strategies. This guide covers everything beginners need to know.</p>
      <h2>Understanding Market Cycles</h2>
      <p>Property markets move in cycles. Understanding when to buy and sell is crucial for maximizing returns.</p>
      <h2>Location Analysis</h2>
      <p>The old adage "location, location, location" still holds true. Focus on areas with strong infrastructure development and population growth.</p>
    `,
    author: 'Michael Chen',
    date: '2026-02-28',
    image: 'https://picsum.photos/seed/blog2/800/450',
    category: 'Real Estate',
    readTime: 8,
  },
  {
    id: '3',
    slug: 'healthcare-digital-transformation',
    title: 'Digital Transformation in Healthcare',
    excerpt: 'How technology is revolutionizing patient care and medical practice management.',
    content: `
      <p>The healthcare industry is undergoing a digital revolution that promises to improve outcomes and reduce costs.</p>
      <h2>Telemedicine Growth</h2>
      <p>Remote consultations have become standard practice, making healthcare more accessible than ever before.</p>
      <h2>Electronic Health Records</h2>
      <p>Unified patient records enable better coordination between providers and reduce medical errors.</p>
    `,
    author: 'Dr. Emily Watson',
    date: '2026-01-20',
    image: 'https://picsum.photos/seed/blog3/800/450',
    category: 'Healthcare',
    readTime: 6,
  },
]

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(b => b.slug === slug)
}
