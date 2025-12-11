import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "full" | "compact";
  className?: string;
}

export function Logo({ variant = "full", className }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Logo Icon - Lupa estilizada com cruz médica */}
      <div className="relative w-9 h-9 flex-shrink-0">
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="logoGradientMain" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00B894" />
              <stop offset="100%" stopColor="#009B7D" />
            </linearGradient>
            <linearGradient id="logoGradientHandle" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00A085" />
              <stop offset="100%" stopColor="#008570" />
            </linearGradient>
          </defs>

          {/* Magnifying glass circle - filled with gradient */}
          <circle
            cx="15"
            cy="15"
            r="12"
            fill="url(#logoGradientMain)"
          />

          {/* Inner circle - creates ring effect */}
          <circle
            cx="15"
            cy="15"
            r="9"
            fill="white"
            fillOpacity="0.15"
          />

          {/* Medical cross in center */}
          <rect x="13" y="9" width="4" height="12" rx="1" fill="white" />
          <rect x="9" y="13" width="12" height="4" rx="1" fill="white" />

          {/* Magnifying glass handle */}
          <rect
            x="24"
            y="22"
            width="10"
            height="5"
            rx="2.5"
            transform="rotate(45 24 22)"
            fill="url(#logoGradientHandle)"
          />
        </svg>
      </div>

      {/* Logo Text - Full version */}
      {variant === "full" && (
        <div className="flex items-baseline">
          <span className="text-[22px] tracking-tight leading-none">
            <span className="font-normal text-slate-700">Busca</span>
            <span className="font-bold text-primary">Med</span>
          </span>
        </div>
      )}
    </div>
  );
}
