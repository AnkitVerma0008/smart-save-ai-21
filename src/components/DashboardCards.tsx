import { DollarSign, TrendingDown, PiggyBank } from "lucide-react";

interface DashboardCardsProps {
  income: number;
  expenses: number;
  savings: number;
}

const cards = [
  { key: "income" as const, label: "Total Income", icon: DollarSign, colorClass: "text-secondary" },
  { key: "expenses" as const, label: "Total Expenses", icon: TrendingDown, colorClass: "text-destructive" },
  { key: "savings" as const, label: "Total Savings", icon: PiggyBank, colorClass: "text-accent" },
];

const DashboardCards = ({ income, expenses, savings }: DashboardCardsProps) => {
  const values = { income, expenses, savings };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div
          key={card.key}
          className="gradient-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-border"
        >
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-muted-foreground">{card.label}</span>
            <div className={`p-2 rounded-xl bg-muted ${card.colorClass}`}>
              <card.icon className="w-5 h-5" />
            </div>
          </div>
          <p className="text-3xl font-bold font-display text-foreground">
            ₹{values[card.key].toLocaleString("en-IN")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
