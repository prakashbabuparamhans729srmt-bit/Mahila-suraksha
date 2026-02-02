import { cn } from '@/lib/utils';

export function BananaLogo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('text-primary', className)}
      {...props}
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M12 7.5c1.2-1.5 3-1.5 4.5 0 1.5 1.5 1.5 4.5 0 6l-4.5 4.5-4.5-4.5c-1.5-1.5-1.5-4.5 0-6 1.5-1.5 3.3-1.5 4.5 0z" />
    </svg>
  );
}
