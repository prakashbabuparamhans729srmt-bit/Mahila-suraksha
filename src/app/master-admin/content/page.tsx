
'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { useAdminContent } from '@/context/admin-content-context';
import { useTranslation } from '@/context/language-context';

export default function ContentPage() {
  const { pendingContent, moderateContent } = useAdminContent();
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleApprove = (id: number) => {
    moderateContent(id, 'approved');
    toast({
      title: t('Admin.approvedToast'),
      description: t('Admin.approvedToastDesc'),
    });
  };
  
  const handleReject = (id: number) => {
    moderateContent(id, 'rejected');
    toast({
      variant: 'destructive',
      title: t('Admin.rejectedToast'),
      description: t('Admin.rejectedToastDesc'),
    });
  };

  const handleView = (title: string) => {
    toast({
      title: t('Admin.viewingToast'),
      description: t('Admin.viewingToastDesc', { title }),
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t('Admin.contentModerationTitle')}</h1>
      <Card>
        <CardHeader>
          <CardTitle>{t('Admin.pendingContent')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('Admin.title')}</TableHead>
                <TableHead>{t('Admin.type')}</TableHead>
                <TableHead>{t('Admin.user')}</TableHead>
                <TableHead>{t('Admin.date')}</TableHead>
                <TableHead>{t('Admin.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingContent.length > 0 ? pendingContent.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.title}</TableCell>
                  <TableCell>{t(`contentType.${item.type}`)}</TableCell>
                  <TableCell>{item.user}</TableCell>
                  <TableCell>{item.date}</TableCell>
                  <TableCell className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleView(item.title)}>{t('Admin.view')}</Button>
                    <Button variant="default" size="sm" onClick={() => handleApprove(item.id)}>{t('Admin.approve')}</Button>
                    <Button variant="destructive" size="sm" onClick={() => handleReject(item.id)}>{t('Admin.reject')}</Button>
                  </TableCell>
                </TableRow>
              )) : (
                <TableRow>
                    <TableCell colSpan={5} className="text-center">{t('Admin.noPendingContent')}</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
