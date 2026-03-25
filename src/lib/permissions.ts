/**
 * Central access-control configuration for the dashboard.
 *
 * ADMIN_EMAILS  – full access to all events.
 * EVENT_COORDINATOR_MAP – restricted access: key = email, value = event name
 *   they are allowed to see. The event name must match exactly what is stored
 *   in the `event_name` column of the `registrations` table.
 */

export const ADMIN_EMAILS: string[] = [
  "gankitsysdev@gmail.com",
  "sam8920341517@gmail.com",
  "sumitrathore45528@gmail.com",
  "asma.iman1407@gmail.com"
];

/** email (lowercase) → exact event_name in the DB */
export const EVENT_COORDINATOR_MAP: Record<string, string> = {
};

/** Returns the event a coordinator is restricted to, or null if they are a full admin. */
export function getCoordinatorEvent(email: string | null | undefined): string | null {
  if (!email) return null;
  return EVENT_COORDINATOR_MAP[email.toLowerCase()] ?? null;
}

/** Returns true if the email has ANY dashboard access (admin or coordinator). */
export function hasDashboardAccess(email: string | null | undefined): boolean {
  if (!email) return false;
  const lower = email.toLowerCase();
  return (
    ADMIN_EMAILS.map(e => e.toLowerCase()).includes(lower) ||
    lower in EVENT_COORDINATOR_MAP
  );
}
