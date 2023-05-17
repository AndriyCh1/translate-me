export const splitTextIntoSentences = (text: string): string[] => {
  return text.trim().split(/(?<=\.|\?|\!)\s+/);
};
