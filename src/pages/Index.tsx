import { useState, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import DashboardCards from "@/components/DashboardCards";
import BudgetInputs from "@/components/BudgetInputs";
import AISuggestion from "@/components/AISuggestion";
import BudgetChart from "@/components/BudgetChart";
import ExpenseInsights from "@/components/ExpenseInsights";
import InvestmentSuggestions from "@/components/InvestmentSuggestions";
import { Expense } from "@/lib/budget";

const Index = () => {
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const dashboardRef = useRef<HTMLDivElement>(null);

  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const savings = income - totalExpenses;

  const scrollToDashboard = () => {
    dashboardRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection onStart={scrollToDashboard} />

      <main ref={dashboardRef} className="container mx-auto px-6 py-12 space-y-8 max-w-5xl">
        <h2 className="text-3xl font-bold font-display text-foreground text-center">Your Dashboard</h2>

        <DashboardCards income={income} expenses={totalExpenses} savings={savings} />
        <BudgetInputs income={income} setIncome={setIncome} expenses={expenses} setExpenses={setExpenses} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AISuggestion income={income} savings={savings} />
          <BudgetChart income={income} expenses={expenses} savings={savings} />
        </div>

        <ExpenseInsights income={income} expenses={expenses} />
        <InvestmentSuggestions income={income} savings={savings} />
      </main>

      <footer className="text-center py-8 text-sm text-muted-foreground">
        Smart Budget AI © 2026 — Built for smarter financial decisions
      </footer>
    </div>
  );
};

export default Index;
