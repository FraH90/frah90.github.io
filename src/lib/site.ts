import { existsSync } from 'node:fs';

// Public identity uses the existing handle until the author supplies a display name.
export const siteName = 'frah90';
export const siteDescription = 'Scientific and technical writing on waves, signals, and computational engineering.';

// Build-time only: a missing CV never produces a broken public link.
export const cvUrl = existsSync('public/cv.pdf') ? '/cv.pdf' : undefined;
