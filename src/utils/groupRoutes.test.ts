import { describe, it, expect } from 'vitest';
import { groupRoutes, groupOptions, type GroupOption } from './groupRoutes';
import type { Route } from '../types';

function makeRoute(overrides: Partial<Route> = {}): Route {
  return {
    zlaggableName: 'Route A',
    zlaggableSlug: 'route-a',
    cragSlug: 'crag-1',
    cragName: 'Crag One',
    countrySlug: 'country-1',
    countryName: 'Country One',
    areaSlug: 'area-1',
    areaName: 'Area One',
    sectorSlug: 'sector-1',
    sectorName: 'Sector One',
    category: 0,
    difficulty: '6a',
    gradeIndex: 100,
    totalAscents: 10,
    totalRecommendedRate: 5,
    averageRating: 3.5,
    flashOnsightRate: 0.5,
    userClimbed: false,
    hasVlId: false,
    ...overrides,
  };
}

describe('groupRoutes', () => {
  it('returns empty array for empty input', () => {
    const option = groupOptions.find((o) => o.key === 'cragSlug')!;
    expect(groupRoutes([], option)).toEqual([]);
  });

  it('returns one group for a single route', () => {
    const route = makeRoute();
    const option = groupOptions.find((o) => o.key === 'cragSlug')!;
    const result = groupRoutes([route], option);

    expect(result).toHaveLength(1);
    expect(result[0].groupLabel).toBe('Crag One');
    expect(result[0].routes).toHaveLength(1);
  });

  it('groups by cragSlug with cragName as label', () => {
    const routes = [
      makeRoute({ cragSlug: 'crag-1', cragName: 'Crag One', gradeIndex: 50 }),
      makeRoute({ cragSlug: 'crag-2', cragName: 'Crag Two', gradeIndex: 60 }),
      makeRoute({ cragSlug: 'crag-1', cragName: 'Crag One', gradeIndex: 40 }),
    ];
    const option = groupOptions.find((o) => o.key === 'cragSlug')!;
    const result = groupRoutes(routes, option);

    expect(result).toHaveLength(2);
    expect(result[0].groupLabel).toBe('Crag One');
    expect(result[0].routes).toHaveLength(2);
    expect(result[1].groupLabel).toBe('Crag Two');
    expect(result[1].routes).toHaveLength(1);
  });

  it('groups by difficulty with difficulty value as label', () => {
    const routes = [
      makeRoute({ difficulty: '7a', gradeIndex: 200 }),
      makeRoute({ difficulty: '6a', gradeIndex: 100 }),
      makeRoute({ difficulty: '7a', gradeIndex: 190 }),
    ];
    const option = groupOptions.find((o) => o.key === 'difficulty')!;
    const result = groupRoutes(routes, option);

    expect(result).toHaveLength(2);
    expect(result[0].groupLabel).toBe('7a');
    expect(result[0].routes).toHaveLength(2);
    expect(result[1].groupLabel).toBe('6a');
  });

  it('sorts routes within a group by gradeIndex ascending', () => {
    const routes = [
      makeRoute({ cragSlug: 'c', gradeIndex: 300 }),
      makeRoute({ cragSlug: 'c', gradeIndex: 100 }),
      makeRoute({ cragSlug: 'c', gradeIndex: 200 }),
    ];
    const option = groupOptions.find((o) => o.key === 'cragSlug')!;
    const result = groupRoutes(routes, option);

    expect(result).toHaveLength(1);
    const indices = result[0].routes.map((r) => r.gradeIndex);
    expect(indices).toEqual([100, 200, 300]);
  });

  it.each(groupOptions)(
    'groupOption "$label" uses valid Route keys',
    (option: GroupOption) => {
      const route = makeRoute();
      expect(option.key in route).toBe(true);
      expect(option.labelKey in route).toBe(true);
    },
  );
});
