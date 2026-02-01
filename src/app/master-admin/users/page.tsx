
'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { useAdminContent, UserRole } from '@/context/admin-content-context';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { useTranslation } from '@/context/language-context';

export default function UsersPage() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const { users, addUser, deleteUser } = useAdminContent();
  const [newUser, setNewUser] = useState({ email: '', role: 'user' as UserRole });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (userId: string) => {
    toast({
      title: t('Admin.editUserToast'),
      description: t('Admin.editUserToastDesc', { userId }),
    });
  };

  const handleDelete = (userId: string) => {
    deleteUser(userId);
    toast({
      variant: 'destructive',
      title: t('Admin.userDeleted'),
      description: t('Admin.userDeletedDesc', { userId }),
    });
  };
  
  const handleAddUser = () => {
    if(newUser.email && newUser.role){
        addUser(newUser);
        toast({
            title: t('Admin.userAdded'),
            description: t('Admin.userAddedDesc', { email: newUser.email })
        });
        setNewUser({email: '', role: 'user'});
        setIsDialogOpen(false);
    } else {
        toast({
            variant: 'destructive',
            title: t('Admin.error'),
            description: t('Admin.fillAllFields')
        });
    }
  };

  return (
    <div>
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">{t('Admin.manageUsersTitle')}</h1>
             <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogTrigger asChild>
                    <Button>{t('Admin.addNewUser')}</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{t('Admin.addNewUser')}</AlertDialogTitle>
                        <AlertDialogDescription>
                           {t('Admin.addNewUserDesc')}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="space-y-4">
                        <div className='space-y-2'>
                             <Label htmlFor="email">{t('Admin.email')}</Label>
                            <Input 
                                id="email"
                                type="email" 
                                placeholder={t('Admin.emailPlaceholder')}
                                value={newUser.email}
                                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor="role">{t('Admin.role')}</Label>
                             <Select 
                                value={newUser.role} 
                                onValueChange={(value: UserRole) => setNewUser({...newUser, role: value})}
                             >
                                <SelectTrigger id="role">
                                <SelectValue placeholder={t('Admin.selectRole')} />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectItem value="user">{t('Admin.roleUser')}</SelectItem>
                                <SelectItem value="moderator">{t('Admin.roleModerator')}</SelectItem>
                                <SelectItem value="admin">{t('Admin.roleAdmin')}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>{t('Admin.cancel')}</AlertDialogCancel>
                        <AlertDialogAction onClick={handleAddUser}>{t('Admin.addUser')}</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>{t('Admin.allUsers')}</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('Admin.userId')}</TableHead>
                <TableHead>{t('Admin.email')}</TableHead>
                <TableHead>{t('Admin.role')}</TableHead>
                <TableHead>{t('Admin.joined')}</TableHead>
                <TableHead className="text-right">{t('Admin.actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{t(`role.${user.role}`)}</TableCell>
                    <TableCell>{user.joined}</TableCell>
                    <TableCell className="space-x-2 text-right">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(user.id)}>{t('Admin.edit')}</Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                             <Button variant="destructive" size="sm">{t('Admin.delete')}</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>{t('Admin.areYouSure')}</AlertDialogTitle>
                                <AlertDialogDescription>
                                    {t('Admin.deleteUserWarning')}
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>{t('Admin.cancel')}</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(user.id)}>{t('Admin.delete')}</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                    </TableCell>
              </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

    