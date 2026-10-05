import { useState } from "react";
import { LineChart, Info } from "lucide-react";
import { inr } from "@/lib/budget";

type Risk = "Low" | "Medium" | "High";

const PLANS: Record<Risk, { alloc: [string, number][]; picks: { name: string; type: string; why: string }[] }> = {
  Low: {
    alloc: [["Fixed Deposit / RD", 40], ["PPF / Debt Funds", 30], ["Nifty 50 Index Fund", 20], ["Gold ETF", 10]],
    picks: [
      { name: "Nifty 50 Index Fund", type: "Index Fund", why: "Low cost, tracks India's top 50 companies." },
      { name: "HDFC Bank", type: "Large-cap Stock", why: "Stable, leading private bank." },
      { name: "ITC", type: "Large-cap Stock", why: "Consistent dividends, defensive FMCG business." },
    ],
  },
  Medium: {
    alloc: [["Nifty 50 Index SIP", 40], ["Flexi-cap Mutual Fund", 25], ["Blue-chip Stocks", 20], ["Debt / PPF", 15]],
    picks: [
      { name: "Infosys", type: "Large-cap IT", why: "Strong balance sheet, global client base." },
      { name: "Reliance Industries", type: "Large-cap Conglomerate", why: "Diversified across energy, retail & telecom." },
      { name: "Flexi-cap Mutual Fund SIP", type: "Mutual Fund", why: "Professional diversification across sizes." },
    ],
  },
  High: {
    alloc: [["Mid & Small-cap Funds", 35], ["Direct Equity", 35], ["Nifty Next 50", 20], ["Gold / Debt", 10]],
    picks: [
      { name: "Tata Motors", type: "Auto / EV", why: "Growth exposure to electric vehicles." },
      { name: "Bajaj Finance", type: "NBFC", why: "High-growth consumer lending leader." },
      { name: "Nifty Midcap 150 Index Fund", type: "Index Fund", why: "Broad mid-cap growth at low cost." },
    ],
  },
};

const InvestmentSuggestions = ({ income, savings }: { income: number; savings: number }) => {
  const pct = income > 0 ? (savings / income) * 100 : 0;
  const auto: Risk = pct >= 30 ? "High" : pct >= 15 ? "Medium" : "Low";
  const [risk, setRisk] = useState<Risk | null>(null);
  if (income <= 0) return null;
  const r = risk ?? auto;
  const investable = Math.max(0, savings * 0.7);
  const plan = PLANS[r];

  return (
    <div className="gradient-card rounded-2xl p-6 shadow-card border border-border space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-muted"><LineChart className="w-5 h-5 text-accent" /></div>
          <div>
            <h3 className="text-lg font-semibold font-display text-foreground">AI Investment Suggestions</h3>
            <p className="text-sm text-muted-foreground">
              Invest ~{inr(investable)}/month (70% of savings, rest stays as emergency cash)
            </p>
          </div>
        </div>
        <div className="flex gap-1 rounded-xl bg-muted p-1">
          {(["Low", "Medium", "High"] as Risk[]).map((x) => (
            <button
              key={x}
              onClick={() => setRisk(x)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${r === x ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {x} risk
            </button>
          ))}
        </div>
      </div>

      {investable <= 0 ? (
        <p className="text-sm text-destructive">Your expenses exceed your income. Cut expenses first before investing.</p>
      ) : (
        <>
          <div className="space-y-2">
            {plan.alloc.map(([name, p]) => (
              <div key={name} className="flex items-center gap-3 text-sm">
                <span className="w-44 shrink-0 text-foreground">{name}</span>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: `${p}%` }} />
                </div>
                <span className="w-24 text-right font-semibold text-foreground">{inr((investable * p) / 100)}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {plan.picks.map((s) => (
              <div key={s.name} className="rounded-xl border border-border bg-card p-4 hover:shadow-card-hover hover:-translate-y-0.5 transition-all">
                <p className="text-xs text-secondary font-medium">{s.type}</p>
                <p className="font-semibold font-display text-foreground">{s.name}</p>
                <p className="text-sm text-muted-foreground mt-1">{s.why}</p>
              </div>
            ))}
          </div>
        </>
      )}

      <p className="flex items-start gap-2 text-xs text-muted-foreground">
        <Info className="w-4 h-4 shrink-0" />
        Educational suggestions only, not financial advice. Stock prices change daily — research or consult a SEBI-registered advisor before investing.
      </p>
    </div>
  );
};

export default InvestmentSuggestions;
