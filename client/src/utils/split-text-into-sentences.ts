export function splitTextIntoSentences(text: string): string[] {
  return text.trim().split(/(?<=\.|\?|)\s+/);
}
