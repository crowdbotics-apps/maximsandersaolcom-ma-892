
import i18n from 'i18n-js';

import en from './translations/en.json';
import enAU from './translations/en-AU.json';

i18n.locale = 'en';
i18n.fallbacks = true;
i18n.translations = { en, 'en-AU': enAU };

export default i18n;
