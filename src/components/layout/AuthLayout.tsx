import type { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

export function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: AuthLayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center bg-[var(--bg-page)] sm:justify-center sm:py-10">
      <div className="flex w-full flex-1 flex-col bg-white shadow-[0_2px_10px_rgba(0,0,0,0.04)] sm:max-w-[420px] sm:flex-none sm:overflow-hidden sm:rounded-[32px] sm:border sm:border-[var(--border)] sm:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.18)]">
        {/* Colored banner */}
        <div className="bg-[var(--brand-bg)] px-6 py-16">
          <div className="mx-auto flex max-w-md items-center justify-center gap-5">
            <img
              src="/Pandal_Logo_White-removebg-preview.png"
              alt="Pandal"
              className="h-8 -mt-2.5 w-auto shrink-0"
            />

            {/* Divider */}
            <div className="h-10 w-px bg-white/40" />

            <div className="text-left">
              <h1 className="text-[28px] font-semibold leading-[1.05] tracking-tighter text-white">
                {title}
              </h1>

              <p className="text-[15px] leading-[1.2] tracking-tighte text-white/80">
                {subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Form card, overlapping the banner */}
        <div className="relative -mt-6 flex flex-1 flex-col rounded-t-[28px] bg-white px-6 pb-8 pt-7 shadow-[0_-8px_24px_-16px_rgba(0,0,0,0.12)]">
          <div className="flex-1">{children}</div>
          <p className="mt-6 text-center text-[13px] tracking-tight text-[var(--gray-500)]">
            {footer}
          </p>
        </div>
      </div>
    </div>
  );
}
