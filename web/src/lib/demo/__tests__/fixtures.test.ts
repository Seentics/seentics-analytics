import { describe, expect, it } from 'vitest';
import { demoAnalyticsData, demoRealtimeData } from '@/lib/demo';
import { demoHeatmapPoints } from '@/lib/demo/heatmaps';
import { demoReplays } from '@/lib/demo/replays';
import { demoRevenueDashboard } from '@/lib/demo/revenue';

describe('demo fixtures', () => {
  it('returns identical analytics and realtime data for every invocation', () => {
    expect(demoAnalyticsData()).toEqual(demoAnalyticsData());
    expect(demoRealtimeData()).toEqual(demoRealtimeData());
  });

  it('keeps visual fixture data stable for recordings', () => {
    expect(demoHeatmapPoints('click')).toEqual(demoHeatmapPoints('click'));
    expect(demoReplays()).toEqual(demoReplays());
    expect(demoRevenueDashboard(30)).toEqual(demoRevenueDashboard(30));
  });
});
