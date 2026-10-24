import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId, useCdn } from '../env';

export const isSanityConfigured = (() => {
  const pid = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  if (!pid) return false;
  const p = pid.toLowerCase().trim();
  return (
    p !== 'your_project_id' &&
    p !== 'your-project-id' &&
    p !== 'dummy_project_id' &&
    p !== 'dummy-project-id' &&
    p !== 'placeholder' &&
    p !== ''
  );
})();

export const client = createClient({
  projectId: projectId || 'dummy-project-id',
  dataset: dataset || 'production',
  apiVersion: apiVersion || '2024-08-01',
  useCdn,
});

/**
 * Helper to fetch data with a safe fallback to null / catch errors if Sanity is not configured yet.
 */
export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
}: {
  query: string;
  params?: Record<string, unknown>;
  revalidate?: number | false;
  tags?: string[];
}): Promise<QueryResponse | null> {
  if (!isSanityConfigured) {
    return null;
  }

  try {
    return await client.fetch<QueryResponse>(query, params, {
      next: {
        revalidate,
        tags,
      },
    });
  } catch (error) {
    console.warn('[sanityFetch] Failed to fetch data from Sanity:', error);
    return null;
  }
}
