
'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useTranslation } from '@/context/language-context';

export default function AnalyticsPage() {
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t('Admin.analyticsTitle')}</h1>
      <Card>
        <CardHeader>
          <CardTitle>{t('Admin.appAnalytics')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{t('Admin.appAnalyticsDesc')}</p>
          {/* Analytics charts and data will go here */}
        </CardContent>
      </Card>
    </div>
  );
}
