
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
import { createUserWithEmailAndPassword, updateProfile, GoogleAuthProvider, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { useFirebase } from '@/firebase/client-provider';
import { useTranslation } from '@/context/language-context';
import { BananaLogo } from '@/components/banana-logo';


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

// GitHub Icon
const GitHubIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.91 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
);


export default function SignupPage() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
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
            displayName: `${formData.firstName} ${formData.lastName}`.trim(),
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

  const handleSocialLogin = async (provider: 'google' | 'github') => {
      if (!auth) return;

      const authProvider = provider === 'google' ? new GoogleAuthProvider() : new GithubAuthProvider();
      
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
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
            <div className="hidden lg:flex flex-col justify-center p-12 bg-gradient-to-br from-gray-900 to-black text-white">
                <div className="flex items-center gap-4 mb-8">
                    <BananaLogo className="h-10 w-10 text-white" />
                    <h1 className="text-3xl font-bold">Mahila Suraksha</h1>
                </div>
                <h2 className="text-4xl font-bold mb-4">Get Started with Us</h2>
                <p className="text-lg text-gray-300 mb-12">Complete these easy steps to register your account.</p>
                <div className="space-y-6">
                    <div className="p-4 rounded-lg bg-white text-black">
                        <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black text-white font-bold">1</div>
                        <span className="font-semibold text-lg">Sign up your account</span>
                        </div>
                    </div>
                    <div className="p-4 rounded-lg bg-gray-800/50 text-gray-400">
                        <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 text-gray-300 font-bold">2</div>
                        <span className="font-semibold text-lg">Set up your workspace</span>
                        </div>
                    </div>
                    <div className="p-4 rounded-lg bg-gray-800/50 text-gray-400">
                        <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-700 text-gray-300 font-bold">3</div>
                        <span className="font-semibold text-lg">Set up your profile</span>
                        </div>
                    </div>
                </div>
            </div>

            <main className="p-4 sm:p-8 flex items-center justify-center bg-background">
                <div className="w-full max-w-md space-y-6">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold">{t('Signup.title')}</h1>
                        <p className="text-muted-foreground">{t('Signup.createAccount')}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" onClick={() => handleSocialLogin('google')}>
                            <GoogleIcon className="mr-2 h-4 w-4"/>
                            {t('Login.google')}
                        </Button>
                        <Button variant="outline" onClick={() => handleSocialLogin('github')}>
                            <GitHubIcon className="mr-2 h-4 w-4"/>
                            {t('Signup.github')}
                        </Button>
                    </div>
                    
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                            {t('Signup.orContinueWith')}
                            </span>
                        </div>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Input 
                                type="text" 
                                name="firstName"
                                placeholder={t('Signup.firstName')}
                                className="bg-secondary/50 border-input"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                             <Input 
                                type="text" 
                                name="lastName"
                                placeholder={t('Signup.lastName')}
                                className="bg-secondary/50 border-input"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <Input 
                            type="email" 
                            name="email"
                            placeholder={t('Signup.email')}
                            className="bg-secondary/50 border-input"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                        <Input 
                            type="tel" 
                            name="phone"
                            placeholder={t('Signup.phone')}
                            className="bg-secondary/50 border-input"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        <div>
                          <Input 
                            type="password" 
                            name="password"
                            placeholder={t('Signup.password')}
                            className="bg-secondary/50 border-input"
                            value={formData.password}
                            onChange={handleChange}
                            required
                          />
                          <p className="text-xs text-muted-foreground mt-1 px-1">{t('Signup.passwordHint')}</p>
                        </div>
                        <Select onValueChange={(value) => handleSelectChange('country', value)} required>
                            <SelectTrigger className="w-full bg-secondary/50 border-input">
                            <SelectValue placeholder={t('Signup.country')} />
                            </SelectTrigger>
                            <SelectContent>
                            <SelectItem value="india">{t('Signup.india')}</SelectItem>
                            <SelectItem value="usa">{t('Signup.usa')}</SelectItem>
                            <SelectItem value="uk">{t('Signup.uk')}</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select onValueChange={(value) => handleSelectChange('state', value)} required>
                            <SelectTrigger className="w-full bg-secondary/50 border-input">
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
                    
                    <div className="text-center text-sm">
                    <span className="text-muted-foreground">{t('Signup.alreadyHaveAccount')}</span>
                    <Link href="/login" className="text-primary hover:underline">
                        {t('Signup.loginLink')}
                    </Link>
                    </div>
                </div>
            </main>
        </div>
    </div>
  );
}

    