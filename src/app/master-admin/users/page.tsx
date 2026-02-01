
'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { useAdminContent } from '@/context/admin-content-context';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { Label } from '@/components/ui/label';

export default function UsersPage() {
  const { toast } = useToast();
  const { users, addUser, deleteUser } = useAdminContent();
  const [newUser, setNewUser] = useState({ email: '', role: 'उपयोगकर्ता' as 'उपयोगकर्ता' | 'एडमिन' | 'मॉडरेटर' });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (userId: string) => {
    toast({
      title: 'उपयोगकर्ता संपादित करें',
      description: `आप उपयोगकर्ता ${userId} को संपादित कर रहे हैं। यह सुविधा जल्द ही आएगी।`,
    });
  };

  const handleDelete = (userId: string) => {
    deleteUser(userId);
    toast({
      variant: 'destructive',
      title: 'उपयोगकर्ता हटाया गया',
      description: `उपयोगकर्ता ${userId} को सफलतापूर्वक हटा दिया गया है।`,
    });
  };
  
  const handleAddUser = () => {
    if(newUser.email && newUser.role){
        addUser(newUser);
        toast({
            title: 'उपयोगकर्ता जोड़ा गया',
            description: `${newUser.email} को एक नए उपयोगकर्ता के रूप में जोड़ा गया है।`
        });
        setNewUser({email: '', role: 'उपयोगकर्ता'});
        setIsDialogOpen(false);
    } else {
        toast({
            variant: 'destructive',
            title: 'त्रुटि',
            description: 'कृपया सभी फ़ील्ड भरें।'
        });
    }
  };

  return (
    <div>
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">उपयोगकर्ता प्रबंधित करें</h1>
             <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogTrigger asChild>
                    <Button>नया उपयोगकर्ता जोड़ें</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>नया उपयोगकर्ता जोड़ें</AlertDialogTitle>
                        <AlertDialogDescription>
                           एक नया उपयोगकर्ता बनाने के लिए नीचे दिए गए विवरण भरें।
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="space-y-4">
                        <div className='space-y-2'>
                             <Label htmlFor="email">ईमेल</Label>
                            <Input 
                                id="email"
                                type="email" 
                                placeholder="user@example.com"
                                value={newUser.email}
                                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                            />
                        </div>
                        <div className='space-y-2'>
                            <Label htmlFor="role">भूमिका</Label>
                             <Select 
                                value={newUser.role} 
                                onValueChange={(value: 'उपयोगकर्ता' | 'एडमिन' | 'मॉडरेटर') => setNewUser({...newUser, role: value})}
                             >
                                <SelectTrigger id="role">
                                <SelectValue placeholder="एक भूमिका चुनें" />
                                </SelectTrigger>
                                <SelectContent>
                                <SelectItem value="उपयोगकर्ता">उपयोगकर्ता</SelectItem>
                                <SelectItem value="मॉडरेटर">मॉडरेटर</SelectItem>
                                <SelectItem value="एडमिन">एडमिन</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <AlertDialogFooter>
                        <AlertDialogCancel>रद्द करें</AlertDialogCancel>
                        <AlertDialogAction onClick={handleAddUser}>उपयोगकर्ता जोड़ें</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
      <Card>
        <CardHeader>
          <CardTitle>सभी उपयोगकर्ता</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>उपयोगकर्ता आईडी</TableHead>
                <TableHead>ईमेल</TableHead>
                <TableHead>भूमिका</TableHead>
                <TableHead>शामिल हुए</TableHead>
                <TableHead className="text-right">कार्रवाई</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.joined}</TableCell>
                    <TableCell className="space-x-2 text-right">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(user.id)}>संपादित करें</Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                             <Button variant="destructive" size="sm">हटाएं</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>क्या आप वाकई निश्चित हैं?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    यह क्रिया पूर्ववत नहीं की जा सकती। यह उपयोगकर्ता को स्थायी रूप से हटा देगा।
                                </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>रद्द करें</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDelete(user.id)}>हटाएं</AlertDialogAction>
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
