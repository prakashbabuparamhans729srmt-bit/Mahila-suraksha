import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent } from '@/components/ui/card';

export function ImageGallery() {
  return (
    <section>
      <div className="text-center">
        <h2 className="font-headline text-3xl font-bold tracking-tight">
          A-peeling Gallery
        </h2>
        <p className="mt-2 text-lg text-muted-foreground">
          A collection of banana-inspired visuals.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-8">
        {PlaceHolderImages.map((image) => (
          <Card
            key={image.id}
            className="group overflow-hidden rounded-xl shadow-md transition-all duration-300 hover:shadow-xl"
          >
            <CardContent className="p-0">
              <div className="relative aspect-[3/2] w-full overflow-hidden">
                <Image
                  src={image.imageUrl}
                  alt={image.description}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  data-ai-hint={image.imageHint}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
