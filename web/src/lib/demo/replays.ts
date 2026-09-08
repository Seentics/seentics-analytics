/**
 * Demo data for session replays
 */
import { createDemoRandom, demoDate } from './fixture-utils';

const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge'];
const devices = ['Desktop', 'Mobile', 'Tablet'];
const oses = ['Windows', 'macOS', 'iOS', 'Android'];
const countries = ['United States', 'Germany', 'United Kingdom', 'Canada', 'France'];
const pages = ['/', '/pricing', '/features', '/docs/introduction', '/blog/getting-started', '/signup', '/contact'];

export const demoReplays = () => ({
  sessions: (() => {
    const random = createDemoRandom('replays');
    return Array.from({ length: 25 }, (_, i) => {
    const startTime = demoDate(-(i * 3600000 + random() * 3600000));
    const duration = Math.floor(30 + random() * 600);
    return {
      id: `demo-session-${i + 1}`,
      session_id: `demo-session-${i + 1}`,
      visitor_id: `visitor-${Math.floor(random() * 1000)}`,
      website_id: 'demo',
      browser: browsers[Math.floor(random() * browsers.length)],
      device: devices[Math.floor(random() * devices.length)],
      os: oses[Math.floor(random() * oses.length)],
      country: countries[Math.floor(random() * countries.length)],
      entry_page: pages[Math.floor(random() * pages.length)],
      exit_page: pages[Math.floor(random() * pages.length)],
      pages_viewed: Math.floor(1 + random() * 8),
      duration,
      duration_seconds: duration,
      start_time: startTime.toISOString(),
      end_time: new Date(startTime.getTime() + duration * 1000).toISOString(),
      created_at: startTime.toISOString(),
      events_count: Math.floor(5 + random() * 50),
      has_errors: random() > 0.8,
      has_rage_clicks: random() > 0.85,
    };
    });
  })(),
  total: 25,
  has_more: false,
});

export const demoReplaySession = (sessionId: string) => ({
  id: sessionId,
  session_id: sessionId,
  visitor_id: 'visitor-demo-42',
  website_id: 'demo',
  browser: 'Chrome',
  device: 'Desktop',
  os: 'macOS',
  country: 'United States',
  entry_page: '/',
  exit_page: '/pricing',
  pages_viewed: 5,
  duration: 245,
  duration_seconds: 245,
  start_time: demoDate(-300000).toISOString(),
  end_time: demoDate(-55000).toISOString(),
  events_count: 32,
  has_errors: false,
  has_rage_clicks: false,
  events: [],
});
