import { type SchemaTypeDefinition } from 'sanity';

import { siteSettings } from './siteSettings';
import { geschichtePage } from './geschichtePage';
import { probetrainingPage } from './probetrainingPage';
import { kontaktPage } from './kontaktPage';
import { legalPages } from './legalPages';

import { team } from './team';
import { boardMember } from './boardMember';
import { event } from './event';
import { sponsor } from './sponsor';
import { partner } from './partner';
import { downloadItem } from './downloadItem';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Singletons / Pages
    siteSettings,
    geschichtePage,
    probetrainingPage,
    kontaktPage,
    legalPages,

    // Collections
    team,
    boardMember,
    event,
    sponsor,
    partner,
    downloadItem,
  ],
};
