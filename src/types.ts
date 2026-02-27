export interface Route {
  zlaggableName: string;
  zlaggableSlug: string;
  cragSlug: string;
  cragName: string;
  countrySlug: string;
  countryName: string;
  areaSlug: string;
  areaName: string;
  sectorSlug: string;
  sectorName: string;
  category: number;
  difficulty: string;
  gradeIndex: number;
  totalAscents: number;
  totalRecommendedRate: number;
  averageRating: number;
  flashOnsightRate: number;
  userClimbed: boolean;
  hasVlId: boolean;
}
