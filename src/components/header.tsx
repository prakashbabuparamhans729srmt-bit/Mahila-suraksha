import { BananaLogo } from './banana-logo';

export function Header() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto flex items-center gap-3 px-4 py-4">
        <BananaLogo className="size-8 text-yellow-500" />
        <h1 className="font-headline text-2xl font-bold text-foreground">
          Banana Buddy
        </h1>
      </div>
    </header>
  );
}
