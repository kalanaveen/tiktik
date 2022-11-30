import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: '8jgxd3ct',
  dataset: 'production',
  apiVersion: '2022-11-29',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});
