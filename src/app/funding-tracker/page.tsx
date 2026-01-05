
'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Pie, PieChart, Cell } from 'recharts';
import React from 'react';
import { BottomNav } from '@/components/layout/bottom-nav';
import { useToast } from '@/hooks/use-toast';


const chartData = [
  { source: 'सरकारी अनुदान', amount: 3000000, percentage: 40, fill: '#8884d8' },
  { source: 'कॉर्पोरेट प्रायोजन', amount: 2475000, percentage: 33, fill: '#82ca9d' },
  { source: 'सार्वजनिक दान', amount: 1500000, percentage: 20, fill: '#ff8042' },
  { source: 'अन्य', amount: 525000, percentage: 7, fill: '#ffc658' },
];

const chartConfig = {
  amount: {
    label: 'Amount',
  },
  'सरकारी अनुदान': {
    label: 'सरकारी अनुदान',
    color: 'hsl(var(--chart-1))',
  },
  'कॉर्पोरेट प्रायोजन': {
    label: 'कॉर्पोरेट प्रायोजन',
    color: 'hsl(var(--chart-2))',
  },
  'सार्वजनिक दान': {
    label: 'सार्वजनिक दान',
    color: 'hsl(var(--chart-3))',
  },
  'अन्य': {
    label: 'अन्य',
    color: 'hsl(var(--chart-4))',
  },
};

export default function FundingTrackerPage() {
  const { toast } = useToast();
  const totalAmount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.amount, 0);
  }, []);

  const handleDonate = () => {
    toast({
        title: "दान पृष्ठ पर रीडायरेक्ट किया जा रहा है...",
        description: "आपके समर्थन के लिए धन्यवाद!",
    });
    // In a real app, you would redirect to a payment gateway.
    // window.location.href = '/donate';
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <header className="flex items-center p-4">
        <Link href="/" className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold">फंडिंग ट्रैकर</h1>
      </header>

      <main className="flex-grow p-4 space-y-6">
        <Card className="bg-secondary/50 border-border">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-center font-semibold text-muted-foreground">धन उगाहने की प्रगति</h2>
            <p className="text-center text-5xl font-bold">$7.5M</p>
            <div className="space-y-2">
              <Progress value={75} className="h-3 bg-background [&>div]:bg-gradient-to-r [&>div]:from-cyan-400 [&>div]:to-blue-500" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>लक्ष्य: $10M</span>
                <span>100%</span>
              </div>
            </div>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-lg h-12" onClick={handleDonate}>अभी दान करें</Button>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50 border-border">
          <CardContent className="p-6 space-y-4">
            <h2 className="font-bold text-lg">वित्त पोषण के स्रोत</h2>
            <div className="h-[250px] w-full">
              <ChartContainer config={chartConfig} className="mx-auto aspect-square h-full">
                <PieChart>
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={chartData}
                    dataKey="amount"
                    nameKey="source"
                    innerRadius={60}
                    strokeWidth={5}
                  >
                     <Cell key="cell-0" fill="var(--color-सरकारी अनुदान)" />
                     <Cell key="cell-1" fill="var(--color-कॉर्पोरेट प्रायोजन)" />
                     <Cell key="cell-2" fill="var(--color-सार्वजनिक दान)" />
                     <Cell key="cell-3" fill="var(--color-अन्य)" />
                  </Pie>
                </PieChart>
              </ChartContainer>
            </div>
             <div className="flex items-center justify-center -mt-8">
                <div className="text-center text-lg font-bold">
                    Total
                    <p className="text-foreground">
                        ${(totalAmount / 1000000).toFixed(1)}M
                    </p>
                </div>
            </div>
            <ul className="space-y-2 text-sm pt-4">
              {chartData.map((item) => (
                <li key={item.source} className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.fill }}></span>
                    <span>{item.source}:</span>
                  </div>
                  <span className="font-semibold">{item.percentage}%</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  );
}
