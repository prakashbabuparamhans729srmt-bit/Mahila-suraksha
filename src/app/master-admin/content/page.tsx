
'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function ContentPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">सामग्री मॉडरेशन</h1>
      <Card>
        <CardHeader>
          <CardTitle>लंबित सामग्री</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>शीर्षक</TableHead>
                <TableHead>प्रकार</TableHead>
                <TableHead>उपयोगकर्ता</TableHead>
                <TableHead>तिथि</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>पार्क में असुरक्षित प्रकाश व्यवस्था</TableCell>
                <TableCell>घटना रिपोर्ट</TableCell>
                <TableCell>user123</TableCell>
                <TableCell>2024-07-25</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" className="mr-2">देखें</Button>
                  <Button variant="default" size="sm">स्वीकार करें</Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
