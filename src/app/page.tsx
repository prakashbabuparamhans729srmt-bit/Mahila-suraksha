import { Bell, Home, BarChart2, RefreshCw, Settings, User, MapPin, Search, SlidersHorizontal, Plus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="flex items-center justify-between p-4">
        <h1 className="text-2xl font-bold">डैशबोर्ड</h1>
        <div className="flex items-center space-x-4">
          <Bell className="h-6 w-6" />
          <User className="h-6 w-6" />
          <Settings className="h-6 w-6" />
        </div>
      </header>

      <main className="p-4 space-y-6">
        <Card className="bg-secondary/50 border-border">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <MapPin className="h-6 w-6 text-red-500" />
              <div>
                <p className="text-sm text-muted-foreground">आपका वर्तमान स्थान</p>
                <p className="font-semibold">Patna Junction, Patna</p>
              </div>
            </div>
            <Button variant="link" className="text-primary">बदलें</Button>
          </CardContent>
        </Card>

        <div className="flex items-center space-x-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="किसी सुविधा के लिए खोजें..."
              className="pl-10 bg-secondary/50 border-border"
            />
          </div>
          <Button variant="outline" size="icon" className="bg-secondary/50 border-border">
            <SlidersHorizontal className="h-5 w-5" />
          </Button>
        </div>

        <Card className="bg-red-600">
          <CardContent className="flex flex-col items-center justify-center p-6 text-center text-white">
            <div className="border-2 border-white p-2 mb-2">
              <span className="text-lg font-bold">SOS</span>
            </div>
            <h2 className="text-2xl font-bold">आपातकालीन एसओएस</h2>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50 border-border">
          <CardContent className="p-4">
            <h3 className="font-semibold">वापसी पर स्वागत है!</h3>
            <p className="text-muted-foreground">
              आपका वर्तमान वैश्विक सुरक्षा स्कोर है <span className="text-white font-bold">76/100</span>
            </p>
            <p className="text-green-400 text-sm">पिछले सप्ताह से 2 अंक ऊपर</p>
          </CardContent>
        </Card>
      </main>

      <footer className="fixed bottom-0 left-0 right-0 bg-secondary/80 backdrop-blur-sm border-t border-border">
        <div className="flex justify-around items-center p-2 relative">
          <div className="flex flex-col items-center text-primary">
            <Home className="h-6 w-6" />
            <span className="text-xs">होम</span>
          </div>
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
          <div className="flex flex-col items-center text-muted-foreground">
            <Settings className="h-6 w-6" />
            <span className="text-xs">सेटिंग्स</span>
          </div>
        </div>
      </footer>
       {/* Spacer for bottom nav */}
      <div className="h-24"></div>
    </div>
  );
}
