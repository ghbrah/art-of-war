export interface StrategyAdvice {
  title: string;
  originalQuote: string;
  interpretation: string;
  actionableAdvice: string[];
  chineseCharacter?: string; // Optional visual element
}

export interface HistoryItem {
  id: string;
  query: string;
  advice: StrategyAdvice;
  timestamp: number;
}
