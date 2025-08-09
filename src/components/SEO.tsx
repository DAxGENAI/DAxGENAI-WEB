import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'course' | 'organization';
  courseData?: {
    name: string;
    description: string;
    instructor: string;
    price: string;
    duration: string;
    difficulty: string;
    rating: number;
    reviewCount: number;
  };
  articleData?: {
    title: string;
    author: string;
    publishedDate: string;
    modifiedDate: string;
    category: string;
    tags: string[];
  };
}

const SEO: React.FC<SEOProps> = ({
  title = 'DAxGENAI - 1-on-1 Data Analytics & AI Training | Personalized Learning',
  description = 'Transform your career with exclusive 1-on-1 Data Analytics and AI training. No group classes, no pre-recorded videos - just personalized sessions with a Senior Data Analyst. 2000+ successful students trained.',
  keywords = '1-on-1 training, personalized learning, data analytics, generative AI, python training, SQL course, power BI, machine learning, data science, AI tutor, individual coaching, career transformation',
  image = 'https://daxgenai.com/og-image.jpg',
  url = 'https://daxgenai.com',
  type = 'website',
  courseData,
  articleData
}) => {
  // Generate structured data based on content type
  const generateStructuredData = () => {
    const baseData = {
      "@context": "https://schema.org",
      "@type": type === 'course' ? 'Course' : type === 'article' ? 'Article' : 'WebSite',
      "name": title,
      "description": description,
      "url": url,
      "image": image,
      "publisher": {
        "@type": "Organization",
        "name": "DAxGENAI Training Platform",
        "logo": {
          "@type": "ImageObject",
          "url": "https://daxgenai.com/logo.png"
        }
      }
    };

    if (type === 'course' && courseData) {
      return {
        ...baseData,
        "@type": "Course",
        "courseName": courseData.name,
        "description": courseData.description,
        "provider": {
          "@type": "Organization",
          "name": "DAxGENAI Training Platform",
          "sameAs": [
            "https://linkedin.com/company/daxgenai",
            "https://twitter.com/daxgenai_training"
          ]
        },
        "instructor": {
          "@type": "Person",
          "name": courseData.instructor,
          "jobTitle": "Senior Data Analyst",
          "worksFor": {
            "@type": "Organization",
            "name": "DAxGENAI Training Platform"
          }
        },
        "offers": {
          "@type": "Offer",
          "price": courseData.price,
          "priceCurrency": "INR",
          "availability": "https://schema.org/InStock",
          "validFrom": "2024-01-01"
        },
        "timeRequired": `PT${courseData.duration}H`,
        "educationalLevel": courseData.difficulty,
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": courseData.rating,
          "reviewCount": courseData.reviewCount,
          "bestRating": 5,
          "worstRating": 1
        },
        "teaches": [
          "Data Analysis",
          "Python Programming",
          "SQL Database Management",
          "Machine Learning",
          "Data Visualization",
          "Statistical Analysis"
        ]
      };
    }

    if (type === 'article' && articleData) {
      return {
        ...baseData,
        "@type": "Article",
        "headline": articleData.title,
        "author": {
          "@type": "Person",
          "name": articleData.author
        },
        "datePublished": articleData.publishedDate,
        "dateModified": articleData.modifiedDate,
        "articleSection": articleData.category,
        "keywords": articleData.tags.join(', '),
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": url
        }
      };
    }

    // Default organization schema
    return {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      "name": "DAxGENAI Training Platform",
      "description": "Personalized Data Analytics and Generative AI training programs with one-on-one mentoring",
      "url": "https://daxgenai.com",
      "logo": "https://daxgenai.com/logo.png",
      "sameAs": [
        "https://linkedin.com/company/daxgenai",
        "https://twitter.com/daxgenai_training",
        "https://youtube.com/@daxgenai"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+1-555-123-4567",
        "contactType": "customer service",
        "email": "training@daxgenai.com",
        "availableLanguage": "English"
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN",
        "addressLocality": "Online Training",
        "addressRegion": "Worldwide"
      },
      "foundingDate": "2024",
      "numberOfEmployees": "10-50",
      "serviceArea": {
        "@type": "GeoCircle",
        "geoMidpoint": {
          "@type": "GeoCoordinates",
          "latitude": 20.5937,
          "longitude": 78.9629
        },
        "geoRadius": "20000"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Data Analytics Training Courses",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Course",
              "name": "Introduction to Data Analysis with Generative AI",
              "description": "Start your journey with the fundamentals of data analysis enhanced by AI tools and techniques."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Course",
              "name": "Python Programming for Data Science",
              "description": "Master Python programming with focus on pandas, numpy, matplotlib, and data manipulation."
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Course",
              "name": "SQL & Database Management",
              "description": "Learn SQL from basics to advanced queries, database design, and optimization techniques."
            }
          }
        ]
      }
    };
  };

  // Generate FAQ structured data
  const generateFAQStructuredData = () => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What makes your training approach different from other online courses?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our training is completely personalized with one-on-one sessions tailored to your specific learning pace and career goals. Unlike pre-recorded courses, you get direct access to an experienced Senior Data Analyst with real industry experience and immediate feedback on your progress."
        }
      },
      {
        "@type": "Question",
        "name": "How flexible is the scheduling for training sessions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Very flexible! We understand that most students have full-time jobs or other commitments. Sessions can be scheduled during evenings, weekends, or any time that works for your schedule. We offer sessions across different time zones to accommodate global students."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need any prior experience to start the training?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No prior experience required! Our courses are designed to take you from complete beginner to confident professional. We start with fundamentals and gradually build up to advanced concepts. The only prerequisites are basic computer skills and a willingness to learn."
        }
      },
      {
        "@type": "Question",
        "name": "What kind of career support do you offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our Complete Program includes resume review, LinkedIn profile optimization, mock interviews, and job search strategies. We also provide ongoing mentorship and can make introductions within our professional network when appropriate."
        }
      },
      {
        "@type": "Question",
        "name": "Is there a money-back guarantee?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We offer a 30-day money-back guarantee. If you're not completely satisfied with your first few sessions, we'll refund your investment. Your success is our priority."
        }
      }
    ]
  });

  // Generate breadcrumb structured data
  const generateBreadcrumbStructuredData = () => ({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://daxgenai.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": type === 'course' ? 'Courses' : type === 'article' ? 'Blog' : 'Training',
        "item": type === 'course' ? 'https://daxgenai.com/courses' : type === 'article' ? 'https://daxgenai.com/blog' : 'https://daxgenai.com'
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": title,
        "item": url
      }
    ]
  });

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="DAxGENAI Training Platform" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="rating" content="General" />
      <meta name="distribution" content="Global" />
      <meta name="coverage" content="Worldwide" />
      <meta name="target" content="all" />
      <meta name="HandheldFriendly" content="true" />
      <meta name="format-detection" content="telephone=no" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="DAxGENAI Training Platform" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:locale:alternate" content="en_GB" />
      <meta property="og:locale:alternate" content="en_CA" />
      <meta property="og:locale:alternate" content="en_AU" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      <meta property="twitter:creator" content="@daxgenai_training" />
      <meta property="twitter:site" content="@daxgenai_training" />

      {/* Additional SEO Meta Tags */}
      <meta name="theme-color" content="#0ea5e9" />
      <meta name="msapplication-TileColor" content="#0ea5e9" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-title" content="DAxGENAI" />
      <link rel="canonical" href={url} />
      <link rel="alternate" hrefLang="en" href={url} />
      <link rel="alternate" hrefLang="x-default" href={url} />

      {/* Performance Optimizations */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="https://images.pexels.com" />
      <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
      <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

      {/* PWA Support */}
      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/icon-192x192.png" />
      <link rel="apple-touch-icon" sizes="152x152" href="/icon-152x152.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/icon-180x180.png" />
      <link rel="apple-touch-icon" sizes="167x167" href="/icon-167x167.png" />

      {/* Favicon */}
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="shortcut icon" href="/favicon.ico" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(generateStructuredData())}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify(generateFAQStructuredData())}
      </script>
      
      <script type="application/ld+json">
        {JSON.stringify(generateBreadcrumbStructuredData())}
      </script>

      {/* Additional structured data for local business */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          "name": "DAxGENAI Training Platform",
          "description": "Personalized Data Analytics and AI training services",
          "url": "https://daxgenai.com",
          "telephone": "+1-555-123-4567",
          "email": "training@daxgenai.com",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "IN",
            "addressLocality": "Online Training",
            "addressRegion": "Worldwide"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": 20.5937,
            "longitude": 78.9629
          },
          "openingHours": "Mo-Su 00:00-23:59",
          "priceRange": "₹₹",
          "paymentAccepted": "Cash, Credit Card, Bank Transfer",
          "currenciesAccepted": "INR, USD, EUR",
          "areaServed": "Worldwide",
          "serviceType": "Data Analytics Training",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Training Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Data Analytics Training",
                  "description": "Personalized one-on-one training in data analytics and AI"
                }
              }
            ]
          }
        })}
      </script>

      {/* Review structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AggregateRating",
          "itemReviewed": {
            "@type": "EducationalOrganization",
            "name": "DAxGENAI Training Platform"
          },
          "ratingValue": "4.9",
          "reviewCount": "2000",
          "bestRating": "5",
          "worstRating": "1"
        })}
      </script>

      {/* Critical CSS Inline */}
      <style>
        {`
          /* Critical CSS for above-the-fold content */
          body { 
            margin: 0; 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            background-color: #0f172a;
            color: #f8fafc;
          }
          .loading { 
            display: flex; 
            justify-content: center; 
            align-items: center; 
            height: 100vh; 
            background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%);
          }
          .spinner { 
            width: 40px; 
            height: 40px; 
            border: 4px solid rgba(255,255,255,0.3); 
            border-top: 4px solid #ffffff; 
            border-radius: 50%; 
            animation: spin 1s linear infinite; 
          }
          @keyframes spin { 
            0% { transform: rotate(0deg); } 
            100% { transform: rotate(360deg); } 
          }
          .hero-gradient {
            background: linear-gradient(135deg, #0ea5e9 0%, #8b5cf6 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
          }
        `}
      </style>
    </Helmet>
  );
};

export default SEO;
