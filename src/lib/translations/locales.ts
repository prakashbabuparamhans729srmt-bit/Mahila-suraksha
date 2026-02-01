
export const languages = [
    { code: 'en', name: 'English', localName: 'अंग्रेज़ी' },
    { code: 'hi', name: 'Hindi', localName: 'हिंदी' },
    { code: 'sa', name: 'Sanskrit', localName: 'संस्कृतम्' },
    { code: 'bn', name: 'Bengali', localName: 'বাংলা' },
    { code: 'te', name: 'Telugu', localName: 'తెలుగు' },
    { code: 'mr', name: 'Marathi', localName: 'मराठी' },
    { code: 'ta', name: 'Tamil', localName: 'தமிழ்' },
    { code: 'gu', name: 'Gujarati', localName: 'ગુજરાતી' },
    { code: 'kn', name: 'Kannada', localName: 'ಕನ್ನಡ' },
    { code: 'ml', name: 'Malayalam', localName: 'മലയാളം' },
    { code: 'or', name: 'Odia', localName: 'ଓଡ଼ିଆ' },
    { code: 'pa', name: 'Punjabi', localName: 'ਪੰਜਾਬੀ' },
    { code: 'as', name: 'Assamese', localName: 'অসমীয়া' },
    { code: 'mai', name: 'Maithili', localName: 'मैथिली' },
    { code: 'sat', name: 'Santhali', localName: 'संथाली' },
    { code: 'ks', name: 'Kashmiri', localName: 'कश्मीरी / كأشر' },
    { code: 'sd', name: 'Sindhi', localName: 'सिंधी / سندي' },
    { code: 'doi', name: 'Dogri', localName: 'डोगरी' },
    { code: 'kok', name: 'Konkani', localName: 'कोंकणी' },
    { code: 'mni', name: 'Manipuri', localName: 'मणिपुरी / মণিপুরী' },
    { code: 'ne', name: 'Nepali', localName: 'नेपाली' },
    { code: 'brx', name: 'Bodo', localName: 'बोडो' },
];

export const defaultLocale = 'hi';
export const locales = languages.map(lang => lang.code);
