'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useState, useMemo, useEffect } from 'react';
import { BottomNav } from '@/components/layout/bottom-nav';
import { useTranslation } from '@/context/language-context';

type Task = {
  id: number;
  text: string;
  details: string;
  status: 'To Do' | 'In Progress' | 'Done';
  notes: string;
};

type Checklist = {
  [key: string]: Task[];
};

export default function StartupChecklistPage() {
  const { t } = useTranslation();

  const sections = useMemo(() => [
    { key: 'planning', title: t('StartupChecklist.section.planning'), baseId: 0, count: 10 },
    { key: 'legal', title: t('StartupChecklist.section.legal'), baseId: 10, count: 10 },
    { key: 'financial', title: t('StartupChecklist.section.financial'), baseId: 20, count: 10 },
    { key: 'infrastructure', title: t('StartupChecklist.section.infrastructure'), baseId: 30, count: 10 },
    { key: 'team', title: t('StartupChecklist.section.team'), baseId: 40, count: 10 },
    { key: 'branding', title: t('StartupChecklist.section.branding'), baseId: 50, count: 10 },
    { key: 'operations', title: t('StartupChecklist.section.operations'), baseId: 60, count: 10 },
    { key: 'technology', title: t('StartupChecklist.section.technology'), baseId: 70, count: 10 },
    { key: 'growth', title: t('StartupChecklist.section.growth'), baseId: 80, count: 10 },
    { key: 'management', title: t('StartupChecklist.section.management'), baseId: 90, count: 10 },
    { key: 'salesAndDistribution', title: t('StartupChecklist.section.salesAndDistribution'), baseId: 210, count: 10 },
    { key: 'humanResources', title: t('StartupChecklist.section.humanResources'), baseId: 220, count: 10 },
    { key: 'legalCompliance', title: t('StartupChecklist.section.legalCompliance'), baseId: 230, count: 10 },
    { key: 'financialManagement', title: t('StartupChecklist.section.financialManagement'), baseId: 240, count: 10 },
    { key: 'marketingAdvancement', title: t('StartupChecklist.section.marketingAdvancement'), baseId: 250, count: 10 },
    { key: 'productDevelopment', title: t('StartupChecklist.section.productDevelopment'), baseId: 260, count: 10 },
    { key: 'technologyUpgrade', title: t('StartupChecklist.section.technologyUpgrade'), baseId: 270, count: 10 },
    { key: 'operationalEfficiency', title: t('StartupChecklist.section.operationalEfficiency'), baseId: 280, count: 10 },
    { key: 'businessExpansion', title: t('StartupChecklist.section.businessExpansion'), baseId: 290, count: 10 },
    { key: 'governance', title: t('StartupChecklist.section.governance'), baseId: 300, count: 10 },
    { key: 'impactMeasurement', title: t('StartupChecklist.section.impactMeasurement'), baseId: 310, count: 10 },
    { key: 'riskManagement', title: t('StartupChecklist.section.riskManagement'), baseId: 320, count: 10 },
    { key: 'innovation', title: t('StartupChecklist.section.innovation'), baseId: 330, count: 10 },
    { key: 'sustainability', title: t('StartupChecklist.section.sustainability'), baseId: 340, count: 10 },
    { key: 'legacy', title: t('StartupChecklist.section.legacy'), baseId: 350, count: 10 },
  ], [t]);

  const taskStatusMap: { [key: number]: 'To Do' | 'In Progress' | 'Done' } = {
    1: 'Done', 7: 'Done', 52: 'In Progress', 62: 'Done', 64: 'In Progress',
    69: 'In Progress', 74: 'In Progress', 79: 'In Progress', 88: 'Done', 276: 'Done'
  };

  const dynamicChecklist = useMemo(() => {
    const result: Checklist = {};
    for (const section of sections) {
      result[section.key] = Array.from({ length: section.count }, (_, i) => {
        const taskId = section.baseId + i + 1;
        return {
          id: taskId,
          text: t(`StartupChecklist.${section.key}.${i + 1}.text`),
          details: t(`StartupChecklist.${section.key}.${i + 1}.details`),
          status: taskStatusMap[taskId] || 'To Do',
          notes: ''
        };
      });
    }
    return result;
  }, [sections, t]);

  const [checklist, setChecklist] = useState<Checklist>(dynamicChecklist);

  useEffect(() => {
    const freshChecklist = dynamicChecklist;
    setChecklist(prevChecklist => {
      const newChecklist: Checklist = {};
      for (const sectionKey in freshChecklist) {
        if (Object.prototype.hasOwnProperty.call(freshChecklist, sectionKey)) {
          newChecklist[sectionKey] = freshChecklist[sectionKey].map(freshTask => {
            const oldTask = prevChecklist[sectionKey]?.find(t => t.id === freshTask.id);
            return oldTask ? { ...freshTask, status: oldTask.status, notes: oldTask.notes } : freshTask;
          });
        }
      }
      return newChecklist;
    });
  }, [dynamicChecklist]);

  const handleStatusChange = (section: string, taskId: number, newStatus: Task['status']) => {
    setChecklist(prev => ({
      ...prev,
      [section]: prev[section].map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      ),
    }));
  };

  const handleNotesChange = (section: string, taskId: number, newNotes: string) => {
    setChecklist(prev => ({
      ...prev,
      [section]: prev[section].map(task => 
        task.id === taskId ? { ...task, notes: newNotes } : task
      ),
    }));
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="flex items-center p-4">
        <Link href="/" className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold">{t('StartupChecklist.title')}</h1>
      </header>

      <main className="p-4 space-y-4">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {sections.map(({ key: sectionKey, title }) => (
            <AccordionItem key={sectionKey} value={sectionKey} className="bg-secondary/30 rounded-lg border-border">
              <AccordionTrigger className="p-4 text-lg font-semibold hover:no-underline">
                {title}
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-0">
                <div className="space-y-4">
                  {checklist[sectionKey] && checklist[sectionKey].map(task => (
                    <Card key={task.id} className="bg-background/50 border-border">
                      <CardContent className="p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <h3 className="font-bold text-base leading-tight">{task.id}. {task.text}</h3>
                          <Select value={task.status} onValueChange={(value: Task['status']) => handleStatusChange(sectionKey, task.id, value)}>
                            <SelectTrigger className="w-[120px] bg-secondary/50 h-8 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="To Do">{t('StartupChecklist.statusToDo')}</SelectItem>
                              <SelectItem value="In Progress">{t('StartupChecklist.statusInProgress')}</SelectItem>
                              <SelectItem value="Done">{t('StartupChecklist.statusDone')}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <p className="text-sm text-muted-foreground italic">
                          <span className="font-semibold not-italic">{t('StartupChecklist.appContext')}:</span> {task.details}
                        </p>
                        <div>
                          <label className="text-xs font-semibold text-muted-foreground">{t('StartupChecklist.notes')}</label>
                          <Textarea 
                            placeholder={t('StartupChecklist.notesPlaceholder')}
                            className="mt-1 bg-secondary/50 text-sm"
                            value={task.notes}
                            onChange={(e) => handleNotesChange(sectionKey, task.id, e.target.value)}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>

      <BottomNav />
    </div>
  );
}
