export interface CategoryDefinition {
  id: string;
  slug: string;
  titleVi: string;
  titleEn: string;
  taglineVi: string;
  taglineEn: string;
  descriptionVi: string;
  descriptionEn: string;
  icon: string;
  badgeVi: string;
  badgeEn: string;
  color: string;
  pillarArticleSlug: string;
  interactiveEngineId: string;
  seoKeywordsVi: string[];
  seoKeywordsEn: string[];
}

export interface ArticleMetaSummary {
  id: string;
  slug: string;
  categorySlug: string;
  titleVi: string;
  titleEn: string;
  subtitleVi: string;
  subtitleEn: string;
  excerptVi: string;
  excerptEn: string;
  readTimeMinutes: number;
  authorName: string;
  authorRoleVi: string;
  authorRoleEn: string;
  lastUpdated: string;
  isPillar: boolean;
  interactiveEngineId?: string;
  coverImage: string;
  tags: string[];
  directAnswerSnippetVi: string;
  directAnswerSnippetEn: string;
}

export interface MetricItem {
  labelVi: string;
  labelEn: string;
  value: string;
  unit?: string;
  noteVi: string;
  noteEn: string;
}

export interface ComparisonTable {
  headersVi: string[];
  headersEn: string[];
  rowsVi: string[][];
  rowsEn: string[][];
}

export interface SopStep {
  step: number;
  title: string;
  description: string;
  duration?: string;
  proTip?: string;
  caution?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BOMItem {
  itemVi: string;
  itemEn: string;
  estCostVnd: number;
  whereToBuyVi: string;
  whereToBuyEn: string;
}

export interface ArticleFullContent extends ArticleMetaSummary {
  scientificData: {
    botanicalName?: string;
    family?: string;
    optimalTemp?: string;
    optimalHumidity?: string;
    phRange?: string;
    ecRange?: string;
    keyMetrics: MetricItem[];
    comparisonTable?: ComparisonTable;
  };
  sopStepsVi: SopStep[];
  sopStepsEn: SopStep[];
  deepContentVi: string;
  deepContentEn: string;
  faqsVi: FAQItem[];
  faqsEn: FAQItem[];
  urbanSafetyNoticeVi?: string;
  urbanSafetyNoticeEn?: string;
  equipmentBOM?: BOMItem[];
  relatedArticleSlugs: string[];
}
