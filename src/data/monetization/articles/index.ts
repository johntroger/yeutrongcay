import { ArticleFullContent } from '../types';
import { NURSERY_ARTICLES } from './nurseryArticles';
import { HERBAL_ARTICLES } from './herbalArticles';
import { BALCONY_ARTICLES } from './balconyArticles';
import { CIRCULAR_ARTICLES } from './circularArticles';
import { MICROGREENS_ARTICLES } from './microgreensArticles';
import { SMART_AGRI_ARTICLES } from './smartAgriArticles';

export const ALL_FULL_ARTICLES: ArticleFullContent[] = [
  ...NURSERY_ARTICLES,
  ...HERBAL_ARTICLES,
  ...BALCONY_ARTICLES,
  ...CIRCULAR_ARTICLES,
  ...MICROGREENS_ARTICLES,
  ...SMART_AGRI_ARTICLES
];

export const getFullArticle = (categorySlug: string, slug: string): ArticleFullContent | undefined => {
  return ALL_FULL_ARTICLES.find(
    (art) => art.categorySlug === categorySlug && art.slug === slug
  );
};

export const getArticlesByCategory = (categorySlug: string): ArticleFullContent[] => {
  return ALL_FULL_ARTICLES.filter((art) => art.categorySlug === categorySlug);
};

export const getFullArticlesByCategory = getArticlesByCategory;

export const getPillarArticle = (categorySlug: string): ArticleFullContent | undefined => {
  return ALL_FULL_ARTICLES.find(
    (art) => art.categorySlug === categorySlug && art.isPillar
  );
};

export const getFullPillarArticle = getPillarArticle;

export {
  NURSERY_ARTICLES,
  HERBAL_ARTICLES,
  BALCONY_ARTICLES,
  CIRCULAR_ARTICLES,
  MICROGREENS_ARTICLES,
  SMART_AGRI_ARTICLES
};
