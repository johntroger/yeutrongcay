import { ArticleMetaSummary } from './types';
import { ALL_FULL_ARTICLES } from './articles';

export const ARTICLES_METADATA_REGISTRY: ArticleMetaSummary[] = ALL_FULL_ARTICLES.map((art) => ({
  id: art.id,
  slug: art.slug,
  categorySlug: art.categorySlug,
  titleVi: art.titleVi,
  titleEn: art.titleEn,
  subtitleVi: art.subtitleVi,
  subtitleEn: art.subtitleEn,
  excerptVi: art.excerptVi,
  excerptEn: art.excerptEn,
  readTimeMinutes: art.readTimeMinutes,
  authorName: art.authorName,
  authorRoleVi: art.authorRoleVi,
  authorRoleEn: art.authorRoleEn,
  lastUpdated: art.lastUpdated,
  isPillar: art.isPillar,
  interactiveEngineId: art.interactiveEngineId,
  coverImage: art.coverImage,
  tags: art.tags,
  directAnswerSnippetVi: art.directAnswerSnippetVi,
  directAnswerSnippetEn: art.directAnswerSnippetEn
}));

export const getArticleMeta = (
  categorySlug: string,
  slug: string
): ArticleMetaSummary | undefined => {
  return ARTICLES_METADATA_REGISTRY.find(
    (a) => a.categorySlug === categorySlug && a.slug === slug
  );
};

export const getArticlesMetaByCategory = (
  categorySlug: string
): ArticleMetaSummary[] => {
  return ARTICLES_METADATA_REGISTRY.filter((a) => a.categorySlug === categorySlug);
};

export const getPillarArticleMeta = (
  categorySlug: string
): ArticleMetaSummary | undefined => {
  return ARTICLES_METADATA_REGISTRY.find(
    (a) => a.categorySlug === categorySlug && a.isPillar
  );
};

export const getRelatedArticlesMeta = (
  categorySlug: string,
  currentSlug: string,
  limit: number = 3
): ArticleMetaSummary[] => {
  return ARTICLES_METADATA_REGISTRY.filter(
    (a) => a.categorySlug === categorySlug && a.slug !== currentSlug
  ).slice(0, limit);
};
