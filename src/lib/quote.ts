import type { QuoteData } from "../types";

const mockQuote: QuoteData = {
  text: "The best way to predict the future is to create it.",
  author: "Peter Drucker",
};

export function getDailyQuote(): QuoteData {
  return mockQuote;
}
