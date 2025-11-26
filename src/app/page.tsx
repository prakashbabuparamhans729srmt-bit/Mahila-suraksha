import { Header } from '@/components/header';
import { ImageGallery } from '@/components/image-gallery';
import { RecipeSuggester } from '@/components/recipe-suggester';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="container mx-auto flex-1 px-4 py-8 md:py-12">
        <div className="grid gap-12 md:gap-16">
          <RecipeSuggester />
          <ImageGallery />
        </div>
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground">
        <p>Powered by Bananas & AI</p>
      </footer>
    </div>
  );
}
