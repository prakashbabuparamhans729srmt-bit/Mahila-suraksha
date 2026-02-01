
'use client';

import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BottomNav } from '@/components/layout/bottom-nav';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useTranslation } from '@/context/language-context';

export default function LegalCompliancePage() {
  const { t } = useTranslation();

  const complianceItems = [
    {
      category: t('LegalCompliance.categoryRegistration'),
      tasks: [
        { id: 'reg-1', title: t('LegalCompliance.taskReg1Title'), status: 'pending', details: t('LegalCompliance.taskReg1Details') },
        { id: 'reg-2', title: t('LegalCompliance.taskReg2Title'), status: 'pending', details: t('LegalCompliance.taskReg2Details') },
        { id: 'reg-3', title: t('LegalCompliance.taskReg3Title'), status: 'pending', details: t('LegalCompliance.taskReg3Details') },
        { id: 'reg-4', title: t('LegalCompliance.taskReg4Title'), status: 'pending', details: t('LegalCompliance.taskReg4Details') },
      ]
    },
    {
      category: t('LegalCompliance.categoryTax'),
      tasks: [
        { id: 'tax-1', title: t('LegalCompliance.taskTax1Title'), status: 'pending', details: t('LegalCompliance.taskTax1Details') },
        { id: 'tax-2', title: t('LegalCompliance.taskTax2Title'), status: 'pending', details: t('LegalCompliance.taskTax2Details') },
        { id: 'tax-3', title: t('LegalCompliance.taskTax3Title'), status: 'pending', details: t('LegalCompliance.taskTax3Details') },
        { id: 'tax-4', title: t('LegalCompliance.taskTax4Title'), status: 'pending', details: t('LegalCompliance.taskTax4Details') },
      ]
    },
    {
      category: t('LegalCompliance.categoryPolicies'),
      tasks: [
        { id: 'doc-1', title: t('LegalCompliance.taskDoc1Title'), status: 'pending', details: t('LegalCompliance.taskDoc1Details') },
        { id: 'doc-2', title: t('LegalCompliance.taskDoc2Title'), status: 'pending', details: t('LegalCompliance.taskDoc2Details') },
        { id: 'doc-3', title: t('LegalCompliance.taskDoc3Title'), status: 'pending', details: t('LegalCompliance.taskDoc3Details') },
      ]
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'in_progress':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'pending':
      default:
        return <AlertCircle className="h-5 w-5 text-red-500" />;
    }
  };
  
  const getStatusBadge = (status: string) => {
      switch (status) {
        case 'completed':
          return <Badge className="bg-green-500 text-black">{t('LegalCompliance.statusCompleted')}</Badge>;
        case 'in_progress':
          return <Badge className="bg-yellow-500 text-black">{t('LegalCompliance.statusInProgress')}</Badge>;
        case 'pending':
        default:
          return <Badge variant="destructive">{t('LegalCompliance.statusPending')}</Badge>;
      }
    };

  const totalTasks = complianceItems.flatMap(c => c.tasks).length;
  const completedTasks = complianceItems.flatMap(c => c.tasks).filter(t => t.status === 'completed').length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <header className="flex items-center p-4">
        <Link href="/" className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold">{t('LegalCompliance.title')}</h1>
      </header>

      <main className="flex-grow p-4 space-y-6">
        <Card className="bg-secondary/50 border-border">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
                <span>{t('LegalCompliance.totalProgress')}</span>
                <span className="text-lg font-bold">{Math.round(progressPercentage)}%</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progressPercentage} className="h-2 [&>div]:bg-primary" />
            <p className="text-xs text-muted-foreground mt-2 text-right">{t('LegalCompliance.tasksCompleted', { completedTasks, totalTasks })}</p>
          </CardContent>
        </Card>

        {complianceItems.map(category => (
            <div key={category.category}>
                <h2 className="text-lg font-semibold mb-2 px-1">{category.category}</h2>
                <div className="space-y-3">
                    {category.tasks.map(task => (
                        <Card key={task.id} className="bg-background/50 border-border">
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="flex items-start gap-4">
                                    {getStatusIcon(task.status)}
                                    <div>
                                        <h3 className="font-semibold">{task.title}</h3>
                                        <p className="text-sm text-muted-foreground">{task.details}</p>
                                    </div>
                                </div>
                                {getStatusBadge(task.status)}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        ))}
      </main>

      <BottomNav />
    </div>
  );
}
