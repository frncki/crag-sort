import type { Route } from '../types';

export interface SortOption {
  label: string;
  comparator: (a: Route, b: Route) => number;
}

export const sortOptions: SortOption[] = [
  { label: 'Difficulty ↑', comparator: (a, b) => a.gradeIndex - b.gradeIndex },
  { label: 'Difficulty ↓', comparator: (a, b) => b.gradeIndex - a.gradeIndex },
  { label: 'Name A-Z', comparator: (a, b) => a.zlaggableName.localeCompare(b.zlaggableName) },
  { label: 'Name Z-A', comparator: (a, b) => b.zlaggableName.localeCompare(a.zlaggableName) },
  { label: 'Rating ↑', comparator: (a, b) => a.averageRating - b.averageRating },
  { label: 'Rating ↓', comparator: (a, b) => b.averageRating - a.averageRating },
  { label: 'Ascents ↑', comparator: (a, b) => a.totalAscents - b.totalAscents },
  { label: 'Ascents ↓', comparator: (a, b) => b.totalAscents - a.totalAscents },
  { label: 'Recommended ↑', comparator: (a, b) => a.totalRecommendedRate - b.totalRecommendedRate },
  { label: 'Recommended ↓', comparator: (a, b) => b.totalRecommendedRate - a.totalRecommendedRate },
];
