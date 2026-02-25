import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface Expense {
  id: string;
  name: string;
  amount: number;
}

interface BudgetChartProps {
  income: number;
  expenses: Expense[];
  savings: number;
}

const COLORS = [
  "hsl(160, 100%, 39%)",
  "hsl(187, 100%, 50%)",
  "hsl(216, 75%, 15%)",
  "hsl(0, 84%, 60%)",
  "hsl(45, 90%, 55%)",
  "hsl(270, 60%, 55%)",
  "hsl(30, 80%, 55%)",
];

const BudgetChart = ({ income, expenses, savings }: BudgetChartProps) => {
  if (income <= 0) {
    return (
      <div className="gradient-card rounded-2xl p-6 shadow-card border border-border flex items-center justify-center h-80">
        <p className="text-muted-foreground">Enter your income to see the chart</p>
      </div>
    );
  }

  const data = [
    ...expenses.map((e) => ({ name: e.name, value: e.amount })),
    ...(savings > 0 ? [{ name: "Savings", value: savings }] : []),
  ];

  if (data.length === 0) {
    return (
      <div className="gradient-card rounded-2xl p-6 shadow-card border border-border flex items-center justify-center h-80">
        <p className="text-muted-foreground">Add expenses to see the breakdown</p>
      </div>
    );
  }

  return (
    <div className="gradient-card rounded-2xl p-6 shadow-card border border-border">
      <h3 className="text-lg font-semibold font-display text-foreground mb-4">Budget Breakdown</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={3}
            dataKey="value"
            stroke="none"
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => `₹${value.toLocaleString("en-IN")}`}
            contentStyle={{
              borderRadius: "12px",
              border: "1px solid hsl(214, 30%, 91%)",
              boxShadow: "0 4px 24px -4px rgba(0,0,0,0.1)",
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetChart;
