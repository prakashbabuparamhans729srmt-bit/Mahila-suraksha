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
import { useTranslation } from '@/context/language-context';

export default function FundingTrackerPage() {
  const { toast } = useToast();
  const { t } = useTranslation();

  const chartData = React.useMemo(() => [
    { source: 'govGrant', amount: 3000000, percentage: 40, fill: 'hsl(var(--chart-1))' },
    { source: 'corpSponsor', amount: 2475000, percentage: 33, fill: 'hsl(var(--chart-2))' },
    { source: 'publicDonation', amount: 1500000, percentage: 20, fill: 'hsl(var(--chart-3))' },
    { source: 'other', amount: 525000, percentage: 7, fill: 'hsl(var(--chart-4))' },
  ], []);

  const chartConfig = React.useMemo(() => ({
    amount: {
      label: 'Amount',
    },
    govGrant: {
      label: t('FundingTracker.sourceGovGrant'),
      color: 'hsl(var(--chart-1))',
    },
    corpSponsor: {
      label: t('FundingTracker.sourceCorpSponsor'),
      color: 'hsl(var(--chart-2))',
    },
    publicDonation: {
      label: t('FundingTracker.sourcePublicDonation'),
      color: 'hsl(var(--chart-3))',
    },
    other: {
      label: t('FundingTracker.sourceOther'),
      color: 'hsl(var(--chart-4))',
    },
  }), [t]);

  const totalAmount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.amount, 0);
  }, [chartData]);

  const handleDonate = () => {
    toast({
        title: t('FundingTracker.redirectingToast'),
        description: t('FundingTracker.thankYouToast'),
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
        <h1 className="text-xl font-bold">{t('FundingTracker.title')}</h1>
      </header>

      <main className="flex-grow p-4 space-y-6">
        <Card className="bg-secondary/50 border-border">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-center font-semibold text-muted-foreground">{t('FundingTracker.progressTitle')}</h2>
            <p className="text-center text-5xl font-bold">$7.5M</p>
            <div className="space-y-2">
              <Progress value={75} className="h-3 bg-background [&>div]:bg-primary" />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0%</span>
                <span>{t('FundingTracker.target')}</span>
                <span>100%</span>
              </div>
            </div>
            <Button className="w-full text-lg h-12" onClick={handleDonate}>{t('FundingTracker.donateNow')}</Button>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50 border-border">
          <CardContent className="p-6 space-y-4">
            <h2 className="font-bold text-lg">{t('FundingTracker.sourcesTitle')}</h2>
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
                     {chartData.map((entry) => (
                      <Cell key={`cell-${entry.source}`} fill={`var(--color-${entry.source})`} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            </div>
             <div className="flex items-center justify-center -mt-8">
                <div className="text-center text-lg font-bold">
                    {t('FundingTracker.total')}
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
                    <span>{chartConfig[item.source as keyof typeof chartConfig]?.label}:</span>
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
