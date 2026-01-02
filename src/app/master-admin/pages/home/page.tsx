
'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ManageHomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">होम पेज प्रबंधित करें</h1>
      <Card>
        <CardHeader>
          <CardTitle>सामग्री संपादित करें</CardTitle>
        </CardHeader>
        <CardContent>
          <p>यहां होम पेज की सामग्री को संपादित करें।</p>
          <Button className="mt-4">बदलाव सहेजें</Button>
        </CardContent>
      </Card>
    </div>
  );
}
