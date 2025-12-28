
import Link from 'next/link';
import { ArrowLeft, BarChart2, Home, MapPin, Plus, RefreshCw, Settings, LocateFixed } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BottomNav } from '@/components/layout/bottom-nav';

export default function LocationSettingsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="flex items-center p-4">
        <Link href="/settings" className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold">स्थान सेटिंग्स</h1>
      </header>

      <main className="p-4 space-y-6">
        <p className="text-muted-foreground px-2">
        अधिक प्रासंगिक स्थानीय जानकारी प्राप्त करने और एसओएस सटीकता में सुधार करने के लिए अपना स्थान निर्धारित करें। आप इसे स्वचालित रूप से पता लगा सकते हैं या इसे मैन्युअल रूप से दर्ज कर सकते हैं।
        </p>

        <Card className="bg-secondary/50 border-border">
          <CardContent className="p-4 space-y-2">
            <h3 className="font-semibold">आपका वर्तमान स्थान</h3>
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-red-500" />
              <p>Patna Junction, Patna</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50 border-border">
          <CardContent className="p-4 space-y-3">
            <h3 className="font-semibold">स्थान सटीकता</h3>
            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline">उच्च</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">मध्यम</Button>
              <Button variant="outline">कम</Button>
            </div>
            <p className="text-sm text-muted-foreground">
            उच्च सटीकता अधिक सटीक है लेकिन अधिक बैटरी का उपयोग करती है। कम सटीकता बैटरी जीवन बचाती है।
            </p>
          </CardContent>
        </Card>

        <Card className="bg-secondary/50 border-border">
          <CardContent className="p-4 space-y-4">
            <h3 className="font-semibold">अपना स्थान अपडेट करें</h3>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <LocateFixed className="mr-2 h-5 w-5" />
              मेरा स्थान पता लगाएँ
            </Button>
            
            <div className="flex items-center space-x-2">
              <div className="flex-grow border-t border-border"></div>
              <span className="text-muted-foreground text-sm">या</span>
              <div className="flex-grow border-t border-border"></div>
            </div>

            <div className="space-y-2">
                <label htmlFor="manual-location" className="text-sm font-medium">स्थान मैन्युअल रूप से दर्ज करें</label>
                <Input id="manual-location" placeholder="Patna Junction, Patna" defaultValue="Patna Junction, Patna" className="bg-background border-border" />
            </div>

          </CardContent>
        </Card>

        <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold text-lg h-12">
            स्थान सहेजें
        </Button>

      </main>

      <BottomNav />
    </div>
  );
}
