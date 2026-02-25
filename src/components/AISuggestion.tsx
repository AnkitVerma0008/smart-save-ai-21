import { Bot, AlertTriangle, TrendingUp, Sparkles } from "lucide-react";

interface AISuggestionProps {
  income: number;
  savings: number;
}

const AISuggestion = ({ income, savings }: AISuggestionProps) => {
  if (income <= 0) return null;

  const pct = (savings / income) * 100;

  let message: string;
  let Icon: typeof AlertTriangle;
  let accent: string;

  if (pct < 10) {
    message = "⚠️ Your savings are below 10%. Reduce unnecessary expenses and build an emergency fund first.";
    Icon = AlertTriangle;
    accent = "border-destructive/30 bg-destructive/5";
  } else if (pct <= 30) {
    message = "💡 You're saving between 10–30%. Try increasing your savings rate by cutting subscriptions or dining out less.";
    Icon = TrendingUp;
    accent = "border-accent/30 bg-accent/5";
  } else {
    message = "🚀 Great job! You're saving over 30%. Consider investing in SIP, Mutual Funds, or Index Funds for long-term wealth.";
    Icon = Sparkles;
    accent = "border-secondary/30 bg-secondary/5";
  }

  return (
    <div className={`rounded-2xl p-6 shadow-card border ${accent} transition-all duration-500`}>
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-xl bg-muted">
          <Bot className="w-6 h-6 text-secondary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold font-display text-foreground mb-1">AI Suggestion</h3>
          <p className="text-sm text-muted-foreground mb-2">
            Savings rate: <span className="font-semibold text-foreground">{pct.toFixed(1)}%</span>
          </p>
          <p className="text-foreground leading-relaxed">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default AISuggestion;
