import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { CATEGORIES, Category, Expense } from "@/lib/budget";

interface BudgetInputsProps {
  income: number;
  setIncome: (v: number) => void;
  expenses: Expense[];
  setExpenses: (v: Expense[]) => void;
}

const BudgetInputs = ({ income, setIncome, expenses, setExpenses }: BudgetInputsProps) => {
  const [expName, setExpName] = useState("");
  const [expAmount, setExpAmount] = useState("");
  const [category, setCategory] = useState<Category>("Food & Groceries");

  const addExpense = () => {
    if (!expAmount) return;
    setExpenses([...expenses, { id: crypto.randomUUID(), name: expName.trim() || category, amount: Number(expAmount), category }]);
    setExpName("");
    setExpAmount("");
  };

  const removeExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Income */}
      <div className="gradient-card rounded-2xl p-6 shadow-card border border-border">
        <h3 className="text-lg font-semibold font-display text-foreground mb-4">Monthly Income</h3>
        <Input
          type="number"
          placeholder="Enter monthly income"
          value={income || ""}
          onChange={(e) => setIncome(Number(e.target.value))}
          className="text-lg h-12 rounded-xl"
        />
      </div>

      {/* Expenses */}
      <div className="gradient-card rounded-2xl p-6 shadow-card border border-border">
        <h3 className="text-lg font-semibold font-display text-foreground mb-4">Add Expense</h3>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
          className="w-full mb-2 h-10 rounded-xl border border-input bg-background px-3 text-sm text-foreground"
        >
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="Expense name"
            value={expName}
            onChange={(e) => setExpName(e.target.value)}
            className="rounded-xl"
          />
          <Input
            type="number"
            placeholder="Amount"
            value={expAmount}
            onChange={(e) => setExpAmount(e.target.value)}
            className="rounded-xl w-32"
          />
          <Button onClick={addExpense} size="icon" className="shrink-0 rounded-xl bg-secondary hover:bg-secondary/90 text-secondary-foreground">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {expenses.length > 0 && (
          <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
            {expenses.map((exp) => (
              <div key={exp.id} className="flex items-center justify-between p-3 rounded-xl bg-muted">
                <span className="text-sm font-medium text-foreground">{exp.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-destructive">₹{exp.amount.toLocaleString("en-IN")}</span>
                  <button onClick={() => removeExpense(exp.id)} className="text-muted-foreground hover:text-destructive transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BudgetInputs;
