
'use client';

import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Clock, AlertCircle, FileText, Landmark, FileBadge } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BottomNav } from '@/components/layout/bottom-nav';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const complianceItems = [
  {
    category: 'पंजीकरण (Registration)',
    tasks: [
      { id: 'reg-1', title: 'कंपनी संरचना का चुनाव', status: 'pending', details: 'Section 8 Company (Non-Profit) के रूप में निर्णय लिया गया।' },
      { id: 'reg-2', title: 'कंपनी का पंजीकरण (MCA)', status: 'pending', details: 'आवश्यक दस्तावेज तैयार किए जा रहे हैं।' },
      { id: 'reg-3', title: 'ट्रेडमार्क पंजीकरण', status: 'pending', details: 'लोगो डिजाइन के बाद आवेदन किया जाएगा।' },
      { id: 'reg-4', title: 'उद्योग आधार (Udyam)', status: 'pending', details: 'कंपनी पंजीकरण के बाद किया जाएगा।' },
    ]
  },
  {
    category: 'कर और वित्त (Tax & Finance)',
    tasks: [
      { id: 'tax-1', title: 'PAN और TAN पंजीकरण', status: 'pending', details: 'कंपनी पंजीकरण के तुरंत बाद आवेदन किया जाएगा।' },
      { id: 'tax-2', title: 'GST पंजीकरण', status: 'pending', details: 'आवश्यकतानुसार आवेदन किया जाएगा।' },
      { id: 'tax-3', title: 'बैंक में करंट अकाउंट', status: 'pending', details: 'निगमन प्रमाणपत्र प्राप्त होने के बाद खोला जाएगा।' },
      { id: 'tax-4', title: 'FCRA पंजीकरण (विदेशी दान)', status: 'pending', details: 'भविष्य में विदेशी धन प्राप्त करने के लिए आवश्यक होगा।' },
    ]
  },
  {
    category: 'नीति और दस्तावेज़ (Policies & Documents)',
    tasks: [
      { id: 'doc-1', title: 'नियम एवं शर्तें (Terms & Conditions)', status: 'pending', details: 'वकील द्वारा मसौदा तैयार किया जा रहा है।' },
      { id: 'doc-2', title: 'गोपनीयता नीति (Privacy Policy)', status: 'pending', details: 'DPDP Act, 2023 के अनुसार मसौदा तैयार किया जा रहा है।' },
      { id: 'doc-3', title: 'कर्मचारी हैंडबुक', status: 'pending', details: 'भर्ती प्रक्रिया शुरू होने से पहले तैयार किया जाएगा।' },
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
        return <Badge className="bg-green-500 text-black">पूर्ण</Badge>;
      case 'in_progress':
        return <Badge className="bg-yellow-500 text-black">प्रगति में</Badge>;
      case 'pending':
      default:
        return <Badge variant="destructive">लंबित</Badge>;
    }
  };

export default function LegalCompliancePage() {
  const totalTasks = complianceItems.flatMap(c => c.tasks).length;
  const completedTasks = complianceItems.flatMap(c => c.tasks).filter(t => t.status === 'completed').length;
  const progressPercentage = (completedTasks / totalTasks) * 100;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans flex flex-col">
      <header className="flex items-center p-4">
        <Link href="/" className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold">कानूनी अनुपालन</h1>
      </header>

      <main className="flex-grow p-4 space-y-6">
        <Card className="bg-secondary/50 border-border">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
                <span>कुल प्रगति</span>
                <span className="text-lg font-bold">{Math.round(progressPercentage)}%</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={progressPercentage} className="h-2 [&>div]:bg-blue-500" />
            <p className="text-xs text-muted-foreground mt-2 text-right">{completedTasks} / {totalTasks} कार्य पूर्ण</p>
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
