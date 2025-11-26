
import Link from 'next/link';
import { ArrowLeft, BarChart2, Home, Plus, RefreshCw, Settings, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="flex items-center p-4">
        <Link href="/" className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold">सेटिंग्स</h1>
      </header>

      <main className="p-4 space-y-8">
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-2 px-2">सुरक्षा और आपातकाल</h2>
          <Card className="bg-secondary/50 border-border">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">आपातकालीन सेटिंग्स</h3>
                <p className="text-sm text-muted-foreground">एसओएस संपर्क और अलर्ट प्रबंधित करें</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-2 px-2">खतरा क्षेत्र अलर्ट</h2>
          <Card className="bg-secondary/50 border-border">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">खतरा क्षेत्र अलर्ट सक्षम करें</h3>
                  <p className="text-sm text-muted-foreground">ज्ञात उच्च जोखिम वाले क्षेत्र में प्रवेश करने पर एक अलर्ट प्राप्त करें।</p>
                </div>
                <Switch defaultChecked={false} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">अलर्ट पर कंपन</h3>
                  <p className="text-sm text-muted-foreground">खतरा क्षेत्र अलर्ट ट्रिगर होने पर डिवाइस को वाइब्रेट करें।</p>
                </div>
                <Switch defaultChecked={true} />
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-muted-foreground mb-2 px-2">सामग्री और भाषा</h2>
          <Card className="bg-secondary/50 border-border divide-y divide-border">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <h3 className="font-semibold">भाषा</h3>
                <p className="text-sm text-muted-foreground">ऐप की प्रदर्शन भाषा बदलें</p>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </CardContent>
            <CardContent className="p-4 flex items-center justify-between">
              <Link href="/location-settings" className="flex items-center justify-between w-full">
                <div>
                  <h3 className="font-semibold">स्थान</h3>
                  <p className="text-sm text-muted-foreground">स्थानीय डेटा के लिए अपनी स्थान सेटिंग्स प्रबंधित करें</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-secondary/80 backdrop-blur-sm border-t border-border">
        <div className="flex justify-around items-center p-2 relative">
          <Link href="/" className="flex flex-col items-center text-muted-foreground">
            <Home className="h-6 w-6" />
            <span className="text-xs">होम</span>
          </Link>
          <div className="flex flex-col items-center text-muted-foreground">
            <BarChart2 className="h-6 w-6" />
            <span className="text-xs">डेटा</span>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 -top-6">
             <Button size="icon" className="rounded-full bg-blue-600 hover:bg-blue-700 h-14 w-14 shadow-lg">
                <Plus className="h-8 w-8 text-white" />
             </Button>
          </div>
          <div className="flex flex-col items-center text-muted-foreground">
            <RefreshCw className="h-6 w-6" />
            <span className="text-xs">अपडेट्स</span>
          </div>
          <Link href="/settings" className="flex flex-col items-center text-primary">
            <Settings className="h-6 w-6" />
            <span className="text-xs">सेटिंग्स</span>
          </Link>
        </div>
      </footer>
       {/* Spacer for bottom nav */}
      <div className="h-24"></div>
    </div>
  );
}
