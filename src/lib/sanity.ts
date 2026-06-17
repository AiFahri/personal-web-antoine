import { createClient } from 'next-sanity';
import type { QueryParams } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'xsqxzbvy';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2025-01-01',
  useCdn: true,
  perspective: 'published',
});

export const sanity = {
  fetch<QueryResponse = unknown[]>(
    query: string,
    params?: QueryParams
  ): Promise<QueryResponse> {
    return params
      ? client.fetch<QueryResponse>(query, params)
      : client.fetch<QueryResponse>(query);
  },
};

export const sanityFetch = sanity;
