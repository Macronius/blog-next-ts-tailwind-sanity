'use client';

import { definePreview } from 'next-sanity/preview';
import { projectId, dataset } from './sanity.client';

function onPublicAccessOnly() {
  throw new Error('Unable to load preview.  You must first be logged in');
}

if (!projectId || !dataset) {
  throw new Error(
    'Missing projectId or dataset.  Check your sanity.json or .env files'
  );
}

export const usePreview = definePreview({
  projectId,
  dataset,
  onPublicAccessOnly,
});

/**
 * when I finally pull in the usePreview hook, it should allow me to make queries to my endpoint
 * (sanity database backend) and get all of the information, both published state and draft state
 *
 * This will enable me to make changes and examine them without interrupted usage of the site in its
 * current state
 *
 * The preview neesds to be able to be enabled and disabled
 */
