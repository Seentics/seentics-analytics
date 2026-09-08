/**
 * Demo data for support tickets
 */
import { demoDate } from './fixture-utils';

export const demoSupportTickets = () => ([
  {
    id: 'ticket-1',
    subject: 'How to set up custom events?',
    description: 'I want to track button clicks as custom events. What\'s the recommended approach?',
    priority: 'medium' as const,
    status: 'resolved' as const,
    createdAt: demoDate(-7 * 86400000).toISOString(),
    updatedAt: demoDate(-5 * 86400000).toISOString(),
    replies: [
      {
        id: 'reply-1',
        ticketId: 'ticket-1',
        message: 'You can use the seentics.track() method. See our docs at /docs/custom-events for full details.',
        userName: 'Support Team',
        isPrivate: false,
        createdAt: demoDate(-6 * 86400000).toISOString(),
      },
    ],
  },
  {
    id: 'ticket-2',
    subject: 'Data retention policy question',
    description: 'What happens to data after the retention period? Is it permanently deleted?',
    priority: 'low' as const,
    status: 'open' as const,
    createdAt: demoDate(-2 * 86400000).toISOString(),
    updatedAt: demoDate(-2 * 86400000).toISOString(),
    replies: [],
  },
]);
