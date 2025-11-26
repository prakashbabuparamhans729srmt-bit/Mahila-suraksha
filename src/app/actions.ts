
'use server';

import {
  suggestBananaRecipes,
  type SuggestBananaRecipesInput,
} from '@/ai/flows/suggest-banana-recipes';
import { z } from 'zod';

const schema = z.object({
  userPreferences: z.string().min(3, 'Please enter at least 3 characters for your preferences.'),
});

export type FormState = {
  message?: string;
  recipes?: string[];
  error?: boolean;
};

export async function getRecipeSuggestions(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = schema.safeParse({
    userPreferences: formData.get('userPreferences'),
  });

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors.userPreferences?.[0],
      error: true,
      recipes: prevState.recipes,
    };
  }

  try {
    const input: SuggestBananaRecipesInput = {
      userPreferences: validatedFields.data.userPreferences,
    };
    const result = await suggestBananaRecipes(input);
    if (!result || !result.recipes || result.recipes.length === 0) {
      return {
        message: 'Our AI chef couldn\'t find any recipes for that. Try being a bit more general!',
        error: true,
        recipes: prevState.recipes,
      }
    }
    return { recipes: result.recipes, message: undefined, error: false };
  } catch (e) {
    console.error(e);
    return {
      message: 'Oops! Our AI chef is taking a quick break. Please try again in a moment.',
      error: true,
      recipes: prevState.recipes,
    };
  }
}
