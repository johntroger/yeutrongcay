import { useEffect } from 'react';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  jsonLdSchemas?: Record<string, any>[];
}

export function useSEO({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = 'https://yeutrongcay.com/logo.jpg',
  ogType = 'website',
  publishedTime,
  modifiedTime,
  jsonLdSchemas = [],
}: SEOProps) {
  useEffect(() => {
    // 1. Title
    document.title = title;

    // Helper cập nhật hoặc tạo thẻ meta
    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard SEO Meta
    setMetaTag('name', 'description', description);
    if (keywords && keywords.length > 0) {
      setMetaTag('name', 'keywords', keywords.join(', '));
    }

    // 3. Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // 4. OpenGraph Tags
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:site_name', 'Yêu Trồng Cây');
    setMetaTag('property', 'og:locale', 'vi_VN');

    // 5. Article Specific Dates (cho GEO & Google News/Discover)
    if (ogType === 'article') {
      if (publishedTime) setMetaTag('property', 'article:published_time', publishedTime);
      if (modifiedTime) setMetaTag('property', 'article:modified_time', modifiedTime);
      setMetaTag('property', 'article:publisher', 'https://yeutrongcay.com');
    }

    // 6. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // 7. Dynamic JSON-LD Structured Data (AEO & GEO Powerhouse)
    const injectedScriptIds: string[] = [];

    // Xóa các script json-ld động cũ nếu có
    document.querySelectorAll('script[data-dynamic-seo="true"]').forEach((el) => el.remove());

    jsonLdSchemas.forEach((schema, idx) => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-dynamic-seo', 'true');
      script.id = `dynamic-jsonld-${idx}`;
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
      injectedScriptIds.push(script.id);
    });

    return () => {
      // Dọn dẹp script khi unmount
      injectedScriptIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.remove();
      });
    };
  }, [title, description, canonicalUrl, ogImage, ogType, publishedTime, modifiedTime, keywords, jsonLdSchemas]);
}
