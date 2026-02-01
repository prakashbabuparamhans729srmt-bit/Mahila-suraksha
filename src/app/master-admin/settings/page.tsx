
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { useTranslation } from '@/context/language-context';

export default function MasterAdminSettingsPage() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [defaultRole, setDefaultRole] = useState('user');
  const [requireEmailVerification, setRequireEmailVerification] = useState(true);
  const [autoContentFlagging, setAutoContentFlagging] = useState(true);

  const handleSaveChanges = () => {
    console.log({
      defaultRole,
      requireEmailVerification,
      autoContentFlagging,
    });
    toast({
      title: t('Admin.settingsSaved'),
      description: t('Admin.settingsSavedDesc'),
    });
  };

  return (
    <>
        <p className="text-muted-foreground px-1">
          {t('Admin.settingsDesc')}
        </p>

        <Card className="bg-secondary/50 border-border">
            <CardHeader>
                <CardTitle>{t('Admin.userManagement')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="default-role">{t('Admin.defaultRoleLabel')}</Label>
                    <Select value={defaultRole} onValueChange={setDefaultRole}>
                        <SelectTrigger id="default-role" className="w-full bg-background">
                        <SelectValue placeholder={t('Admin.selectRole')} />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectItem value="user">{t('Admin.roleUser')}</SelectItem>
                        <SelectItem value="moderator">{t('Admin.roleModerator')}</SelectItem>
                        <SelectItem value="admin">{t('Admin.roleAdmin')}</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm bg-background">
                    <div className="space-y-0.5">
                        <Label>{t('Admin.requireEmailVerification')}</Label>
                        <p className="text-xs text-muted-foreground">
                        {t('Admin.requireEmailVerificationDesc')}
                        </p>
                    </div>
                    <Switch checked={requireEmailVerification} onCheckedChange={setRequireEmailVerification} />
                </div>
            </CardContent>
        </Card>

        <Card className="bg-secondary/50 border-border">
            <CardHeader>
                <CardTitle>{t('Admin.contentModeration')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm bg-background">
                    <div className="space-y-0.5">
                        <Label>{t('Admin.autoContentFlagging')}</Label>
                        <p className="text-xs text-muted-foreground">
                        {t('Admin.autoContentFlaggingDesc')}
                        </p>
                    </div>
                    <Switch checked={autoContentFlagging} onCheckedChange={setAutoContentFlagging} />
                </div>
            </CardContent>
        </Card>
        
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg h-12" onClick={handleSaveChanges}>{t('Admin.saveSettings')}</Button>
    </>
  );
}
