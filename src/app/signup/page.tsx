
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useFirebase } from '@/firebase/client-provider';
import { useTranslation } from '@/context/language-context';

// Google Icon Component
const GoogleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" {...props}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      <path d="M1 1h22v22H1z" fill="none"/>
    </svg>
);

// Facebook Icon
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#1877F2" {...props}>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
);

export default function SignupPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    country: '',
    state: '',
  });
  const { toast } = useToast();
  const { auth } = useFirebase();
  const router = useRouter();

  const indianStates = [
    'Andaman and Nicobar Islands', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh', 'Chhattisgarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand', 'Karnataka', 'Kerala', 'Ladakh', 'Lakshadweep', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
  ].sort();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: 'country' | 'state', value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!auth) return;

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      if (userCredential.user) {
        await updateProfile(userCredential.user, {
            displayName: formData.fullName,
        });
      }
      toast({
        title: t('Signup.accountCreated'),
        description: t('Signup.thankYou'),
      });
      router.push('/');
    } catch (error: any) {
        console.error(error);
        toast({
            variant: 'destructive',
            title: t('Error'),
            description: error.message || t('Signup.signupFailed'),
        });
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
      if (!auth) return;

      const authProvider = provider === 'google' ? new GoogleAuthProvider() : null; // FacebookAuthProvider needs more setup
      if (!authProvider) {
          toast({
              variant: 'destructive',
              title: t('CommunityEmpowerment.comingSoon'),
              description: t('Login.facebookComingSoon'),
          });
          return;
      }
      
      try {
          await signInWithPopup(auth, authProvider);
          toast({
              title: t('Signup.accountCreated'),
              description: t('Signup.thankYou'),
          });
          router.push('/');
      } catch (error: any) {
          console.error(error);
          toast({
              variant: 'destructive',
              title: t('Error'),
              description: error.message || t('Signup.signupFailedSocial'),
          });
      }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="flex items-center p-4">
        <Link href="/login" className="mr-4">
          <ArrowLeft className="h-6 w-6" />
        </Link>
        <h1 className="text-xl font-bold">{t('Signup.title')}</h1>
      </header>

      <main className="p-4 flex items-center justify-center">
        <Card className="w-full max-w-sm bg-secondary/50 border-border">
          <CardContent className="p-8 space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-bold">{t('Signup.joinMovement')}</h2>
              <p className="text-muted-foreground">{t('Signup.createAccount')}</p>
            </div>
            
            <form onSubmit={handleSignup} className="space-y-4">
              <Input 
                type="text" 
                name="fullName"
                placeholder={t('Signup.fullName')}
                className="bg-background border-input"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
              <Input 
                type="email" 
                name="email"
                placeholder={t('Signup.email')}
                className="bg-background border-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Input 
                type="password" 
                name="password"
                placeholder={t('Signup.password')}
                className="bg-background border-input"
                value={formData.password}
                onChange={handleChange}
                required
              />
               <Select onValueChange={(value) => handleSelectChange('country', value)} required>
                <SelectTrigger className="w-full bg-background border-input">
                  <SelectValue placeholder={t('Signup.country')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="india">{t('Signup.india')}</SelectItem>
                  <SelectItem value="usa">{t('Signup.usa')}</SelectItem>
                  <SelectItem value="uk">{t('Signup.uk')}</SelectItem>
                </SelectContent>
              </Select>
               <Select onValueChange={(value) => handleSelectChange('state', value)} required>
                <SelectTrigger className="w-full bg-background border-input">
                  <SelectValue placeholder={t('Signup.state')} />
                </SelectTrigger>
                <SelectContent>
                  {indianStates.map(state => (
                    <SelectItem key={state} value={state.toLowerCase().replace(/ & /g, ' and ').replace(/ /g, '-')}>{state}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button type="submit" className="w-full font-bold text-lg h-12">
                {t('Signup.createAccountButton')}
              </Button>
            </form>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-secondary/50 px-2 text-muted-foreground">
                    {t('Signup.orContinueWith')}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" onClick={() => handleSocialLogin('google')}>
                    <GoogleIcon className="mr-2 h-4 w-4"/>
                    Google
                </Button>
                <Button variant="outline" onClick={() => handleSocialLogin('facebook')}>
                    <FacebookIcon className="mr-2 h-4 w-4"/>
                    Facebook
                </Button>
            </div>
            
            <div className="text-center text-sm">
              <span className="text-muted-foreground">{t('Signup.alreadyHaveAccount')}</span>
              <Link href="/login" className="text-primary hover:underline">
                {t('Signup.loginLink')}
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
