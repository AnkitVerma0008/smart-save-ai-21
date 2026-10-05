export const CATEGORIES = [
  "Rent/Housing",
  "Food & Groceries",
  "Dining Out",
  "Transport",
  "Shopping",
  "Subscriptions",
  "Utilities & Bills",
  "Entertainment",
  "EMI/Loans",
  "Health",
  "Other",
] as const;

export type Category = (typeof CATEGORIES)[number];

export interface Expense {
  id: string;
  name: string;
  amount: number;
  category: Category;
}

// Recommended max share of salary per category (%)
export const LIMITS: Record<Category, number> = {
  "Rent/Housing": 30,
  "Food & Groceries": 15,
  "Dining Out": 5,
  Transport: 10,
  Shopping: 7,
  Subscriptions: 3,
  "Utilities & Bills": 8,
  Entertainment: 5,
  "EMI/Loans": 20,
  Health: 8,
  Other: 5,
};

export const TIPS: Record<Category, string[]> = {
  "Rent/Housing": ["Consider sharing a flat or moving slightly away from the city centre.", "Negotiate rent at renewal time."],
  "Food & Groceries": ["Plan weekly meals and buy in bulk.", "Use grocery app offers and avoid impulse buys."],
  "Dining Out": ["Limit eating out to once a week.", "Cook at home and carry lunch to work/college."],
  Transport: ["Use public transport or carpool.", "Use a metro/bus monthly pass."],
  Shopping: ["Follow a 48-hour rule before non-essential buys.", "Unsubscribe from sale emails and remove saved cards."],
  Subscriptions: ["Cancel apps you haven't used in 30 days.", "Share family plans for OTT services."],
  "Utilities & Bills": ["Switch to LED and turn off standby devices.", "Pick a cheaper mobile/internet plan."],
  Entertainment: ["Look for free events and student discounts.", "Set a fixed monthly fun budget."],
  "EMI/Loans": ["Prepay high-interest loans first (avalanche method).", "Avoid new credit-card EMIs."],
  Health: ["Buy health insurance to avoid big surprise bills.", "Use generic medicines where possible."],
  Other: ["Track every small spend — they add up quickly.", "Review this category weekly."],
};

export const inr = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;
