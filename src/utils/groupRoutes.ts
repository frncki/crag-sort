import type { Route } from '../types';

export interface GroupOption {
  key: keyof Route;
  labelKey: keyof Route;
  label: string;
}

export const groupOptions: GroupOption[] = [
  { key: 'countrySlug', labelKey: 'countryName', label: 'Country' },
  { key: 'areaSlug', labelKey: 'areaName', label: 'Area' },
  { key: 'cragSlug', labelKey: 'cragName', label: 'Crag' },
  { key: 'sectorSlug', labelKey: 'sectorName', label: 'Sector' },
  { key: 'zlaggableSlug', labelKey: 'zlaggableName', label: 'Route' },
  { key: 'difficulty', labelKey: 'difficulty', label: 'Difficulty' },
];

export interface RouteGroup {
  groupLabel: string;
  routes: Route[];
}

export function groupRoutes(routes: Route[], option: GroupOption): RouteGroup[] {
  const map = new Map<string, { label: string; routes: Route[] }>();

  for (const route of routes) {
    const key = String(route[option.key]);
    if (!map.has(key)) {
      map.set(key, { label: String(route[option.labelKey]), routes: [] });
    }
    map.get(key)!.routes.push(route);
  }

  return Array.from(map.values())
    .map(({ label, routes }) => ({
      groupLabel: label,
      routes: [...routes],
    }))
    .sort((a, b) => a.groupLabel.localeCompare(b.groupLabel));
}
