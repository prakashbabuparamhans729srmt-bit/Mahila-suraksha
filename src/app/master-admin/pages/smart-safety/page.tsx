
'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/context/language-context';

export default function ManageSmartSafetyPage() {
  const { t } = useTranslation();
  const pageName = t('Admin.smartSafetyPage');

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t('Admin.managePageTitle', { pageName })}</h1>
      <Card>
        <CardHeader>
          <CardTitle>{t('Admin.editContent')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{t('Admin.editContentDesc', { pageName })}</p>
          <Button className="mt-4">{t('Admin.saveChanges')}</Button>
        </CardContent>
      </Card>
    </div>
  );
}
