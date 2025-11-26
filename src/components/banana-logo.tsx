import { cn } from '@/lib/utils';

export function BananaLogo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn('size-6 text-primary', className)}
      {...props}
    >
      <path d="M12.726 3.013c-1.55.93-2.618 3.486-2.822 5.344-.242 2.203.203 4.542.842 6.612.633 2.052 1.455 3.963 2.593 5.56.916-1.92 1.48-4.224 1.636-6.52.193-2.852-.39-5.69-1.89-7.925-1.12-1.668-2.67-2.73-3.76-3.071Z" />
      <path
        fillRule="evenodd"
        d="M11.96 21.758c-3.187-1.744-5.87-4.14-7.85-7.14C2.18 11.53 1.25 8.16.837 4.57.78 4.02.96 3.48 1.34 3.1c.38-.38.92-.56 1.47-.5l.38.01c.52.01 1.03.18 1.48.5l.77.53c1.78 1.2 3.02 2.94 3.8 4.9.78 2 1.1 4.2.98 6.4-.11 2.2-.68 4.3-1.62 6.2-.23.47-.63.85-1.12 1.05-.48.2-1.03.17-1.48-.08Z"
        clipRule="evenodd"
      />
    </svg>
  );
}
