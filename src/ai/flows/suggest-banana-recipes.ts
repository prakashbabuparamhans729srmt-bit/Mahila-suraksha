'use server';

/**
 * @fileOverview A flow for suggesting banana recipes to the user.
 *
 * - suggestBananaRecipes - A function that suggests banana recipes.
 * - SuggestBananaRecipesInput - The input type for the suggestBananaRecipes function.
 * - SuggestBananaRecipesOutput - The return type for the suggestBananaRecipes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestBananaRecipesInputSchema = z.object({
  userPreferences: z
    .string()
    .describe('Any specific dietary restrictions, preferences, or available ingredients.'),
});
export type SuggestBananaRecipesInput = z.infer<typeof SuggestBananaRecipesInputSchema>;

const SuggestBananaRecipesOutputSchema = z.object({
  recipes: z
    .array(z.string())
    .describe('An array of suggested banana recipes, considering user preferences.'),
});
export type SuggestBananaRecipesOutput = z.infer<typeof SuggestBananaRecipesOutputSchema>;

export async function suggestBananaRecipes(input: SuggestBananaRecipesInput): Promise<SuggestBananaRecipesOutput> {
  return suggestBananaRecipesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestBananaRecipesPrompt',
  input: {schema: SuggestBananaRecipesInputSchema},
  output: {schema: SuggestBananaRecipesOutputSchema},
  prompt: `You are a recipe suggestion bot that specializes in banana recipes.

  Based on the user's preferences, suggest some recipes. Return them as a numbered list.

  User Preferences: {{{userPreferences}}}
  `,
});

const suggestBananaRecipesFlow = ai.defineFlow(
  {
    name: 'suggestBananaRecipesFlow',
    inputSchema: SuggestBananaRecipesInputSchema,
    outputSchema: SuggestBananaRecipesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
