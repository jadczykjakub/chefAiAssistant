import z from 'zod';
import { apiUrls } from './config';

const sessionStartSchema = z.object({
  sessionId: z.string(),
});

export type SessionStart = z.infer<typeof sessionStartSchema>;

export const startNewSession = async (): Promise<SessionStart> => {
  const response = await fetch(apiUrls.session.start, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) throw new Error('Failed to start a new session');

  const data = await response.json();
  return sessionStartSchema.parse(data);
};
