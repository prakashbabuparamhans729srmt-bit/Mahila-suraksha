'use client';

import { getRecipeSuggestions, type FormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { ChefHat, WandSparkles } from 'lucide-react';
import { useEffect, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Loader } from './loader';

const initialState: FormState = {
  recipes: [],
  message: undefined,
  error: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto">
      {pending ? <Loader className="size-4" /> : <WandSparkles className="size-4" />}
      <span>Suggest Recipes</span>
    </Button>
  );
}

export function RecipeSuggester() {
  const [state, formAction] = useActionState(getRecipeSuggestions, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.error && state.message) {
      toast({
        variant: 'destructive',
        title: 'Something went wrong',
        description: state.message,
      });
    } else if (!state.error && !state.message && state.recipes && state.recipes.length > 0) {
      formRef.current?.reset();
    }
  }, [state, toast]);

  return (
    <section>
      <Card className="mx-auto max-w-2xl shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="font-headline text-3xl font-bold tracking-tight">
            AI Banana Chef
          </CardTitle>
          <CardDescription className="text-lg">
            Tell me what you have or what you like, and I'll suggest some banana recipes!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form ref={formRef} action={formAction} className="grid gap-4">
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                name="userPreferences"
                placeholder="e.g., 'no nuts', 'vegan', 'with chocolate'"
                className="flex-grow"
                required
              />
              <SubmitButton />
            </div>
            {state.error && state.message && (
               <p className="text-center text-sm text-destructive">{state.message}</p>
            )}
          </form>

          <div className="mt-8">
            {state.recipes && state.recipes.length > 0 ? (
              <div className="space-y-4">
                <h3 className="text-center font-headline text-2xl font-semibold">
                  Here are your suggestions!
                </h3>
                <ul className="list-inside space-y-3 rounded-lg border bg-muted/50 p-6">
                  {state.recipes.map((recipe, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <ChefHat className="mt-1 size-5 shrink-0 text-primary" />
                      <span className="text-foreground/90">{recipe}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <p>Your delicious banana recipes will appear here.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
