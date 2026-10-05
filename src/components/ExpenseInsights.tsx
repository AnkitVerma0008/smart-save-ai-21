import { CATEGORIES, Expense, LIMITS, TIPS, inr } from "@/lib/budget";
import { Lightbulb, ShieldCheck, AlertTriangle, CheckCircle2 } from "lucide-react";

interface Props {
  income: number;
  expenses: Expense[];
}

const ExpenseInsights = ({ income, expenses }: Props) => {
  if (income <= 0) return null;

  const byCat = CATEGORIES.map((c) => {
    const spent = expenses.filter((e) => e.category === c).reduce((s, e) => s + e.amount, 0);
    const limit = (LIMITS[c] / 100) * income;
    return { c, spent, limit, over: spent - limit, pct: (spent / income) * 100 };
  }).filter((x) => x.spent > 0);

  const overs = byCat.filter((x) => x.over > 0).sort((a, b) => b.over - a.over);
  const potential = overs.reduce((s, x) => s + x.over, 0);

  const needs = income * 0.5, wants = income * 0.3, save = income * 0.2;

  return (
    <div className="gradient-card rounded-2xl p-6 shadow-card border border-border space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-muted"><Lightbulb className="w-5 h-5 text-secondary" /></div>
        <div>
          <h3 className="text-lg font-semibold font-display text-foreground">Expense Analysis & Saving Plan</h3>
          <p className="text-sm text-muted-foreground">Based on your salary of {inr(income)}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[["Needs 50%", needs], ["Wants 30%", wants], ["Save/Invest 20%", save]].map(([l, v]) => (
          <div key={l as string} className="rounded-xl bg-muted p-3 text-center">
            <p className="text-xs text-muted-foreground">{l}</p>
            <p className="font-bold font-display text-foreground">{inr(v as number)}</p>
          </div>
        ))}
      </div>

      {byCat.length === 0 ? (
        <p className="text-sm text-muted-foreground">Add expenses with categories to see where your money goes.</p>
      ) : (
        <div className="space-y-3">
          {byCat.map((x) => (
            <div key={x.c}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-foreground">{x.c}</span>
                <span className={x.over > 0 ? "text-destructive font-semibold" : "text-muted-foreground"}>
                  {inr(x.spent)} / {inr(x.limit)}
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${x.over > 0 ? "bg-destructive" : "bg-secondary"}`}
                  style={{ width: `${Math.min(100, (x.spent / x.limit) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {overs.length > 0 ? (
        <div className="space-y-3">
          <p className="flex items-center gap-2 text-sm font-semibold text-destructive">
            <AlertTriangle className="w-4 h-4" /> You could save about {inr(potential)}/month by fixing these:
          </p>
          {overs.map((x) => (
            <div key={x.c} className="rounded-xl border border-destructive/20 bg-destructive/5 p-4">
              <p className="font-semibold text-foreground text-sm mb-1">
                {x.c}: {inr(x.over)} over the recommended {LIMITS[x.c]}%
              </p>
              <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                {TIPS[x.c].map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
          ))}
        </div>
      ) : byCat.length > 0 ? (
        <p className="flex items-center gap-2 text-sm text-secondary font-medium">
          <CheckCircle2 className="w-4 h-4" /> All categories are within healthy limits. Well done!
        </p>
      ) : null}

      <div className="rounded-xl bg-muted p-4">
        <p className="flex items-center gap-2 font-semibold text-sm text-foreground mb-2">
          <ShieldCheck className="w-4 h-4 text-accent" /> Golden rules to prevent overspending
        </p>
        <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
          <li>Pay yourself first: move {inr(save)} to savings on salary day.</li>
          <li>Build an emergency fund of 6 months' expenses ({inr((income - save) * 6)}).</li>
          <li>Use UPI spending limits and review statements every Sunday.</li>
          <li>Avoid buy-now-pay-later for wants.</li>
        </ul>
      </div>
    </div>
  );
};

export default ExpenseInsights;
