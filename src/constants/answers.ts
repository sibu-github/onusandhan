export const ALL_ANSWERS = [
  'অনুসন্ধান',
  'আনুমানিক',
  'মনোনয়ন',
  'অভিবাদন',
  'অসাধারণ',
  'অনুকরণ',
  'মাধবীলতা',
  'জনপ্রিয়তা',
  'সীমাবদ্ধতা',
  'সাহসিকতা',
  'অমানুষিক',
  'নজরদারি',
  'জলখাবার',
];

function randomNum(min = 0, max = ALL_ANSWERS.length) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getAnswer() {
  return ALL_ANSWERS[randomNum()];
}
