import type { ReactNode, SVGProps } from 'react'

export interface IconProps extends SVGProps<SVGSVGElement> {
  className?: string
}

const IconWrapper = ({ children, className, ...props }: IconProps & { children: ReactNode }) => (
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
    className={className}
    {...props}
  >
    {children}
  </svg>
)

export const Rocket = (props: IconProps) => (
  <IconWrapper {...props}>
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
  </IconWrapper>
)

export const Disc = (props: IconProps) => (
  <IconWrapper {...props}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="3" />
  </IconWrapper>
)

export const MapPin = (props: IconProps) => (
  <IconWrapper {...props}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </IconWrapper>
)

export const MessageCircle = (props: IconProps) => (
  <IconWrapper {...props}>
    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
  </IconWrapper>
)

export const Menu = (props: IconProps) => (
  <IconWrapper {...props}>
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </IconWrapper>
)

export const X = (props: IconProps) => (
  <IconWrapper {...props}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </IconWrapper>
)

export const Sun = (props: IconProps) => (
  <IconWrapper {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </IconWrapper>
)

export const Moon = (props: IconProps) => (
  <IconWrapper {...props}>
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </IconWrapper>
)

export const ChevronLeft = (props: IconProps) => (
  <IconWrapper {...props}>
    <path d="m15 18-6-6 6-6" />
  </IconWrapper>
)

export const ChevronRight = (props: IconProps) => (
  <IconWrapper {...props}>
    <path d="m9 18 6-6-6-6" />
  </IconWrapper>
)

export const Search = (props: IconProps) => (
  <IconWrapper {...props}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </IconWrapper>
)

export const Play = (props: IconProps) => (
  <IconWrapper {...props}>
    <polygon points="5 3 19 12 5 21 5 3" />
  </IconWrapper>
)

export const Pause = (props: IconProps) => (
  <IconWrapper {...props}>
    <rect width="4" height="16" x="6" y="4" />
    <rect width="4" height="16" x="14" y="4" />
  </IconWrapper>
)

export const SkipBack = (props: IconProps) => (
  <IconWrapper {...props}>
    <polygon points="19 20 9 12 19 4 19 20" />
    <line x1="5" x2="5" y1="19" y2="5" />
  </IconWrapper>
)

export const SkipForward = (props: IconProps) => (
  <IconWrapper {...props}>
    <polygon points="5 4 15 12 5 20 5 4" />
    <line x1="19" x2="19" y1="5" y2="19" />
  </IconWrapper>
)

export const Package = (props: IconProps) => (
  <IconWrapper {...props}>
    <path d="M16.5 9.4 7.5 4.21" />
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    <polyline points="3.29 7 12 12 20.71 7" />
    <line x1="12" y1="22" x2="12" y2="12" />
  </IconWrapper>
)

export const Clock = (props: IconProps) => (
  <IconWrapper {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </IconWrapper>
)

export const DollarSign = (props: IconProps) => (
  <IconWrapper {...props}>
    <line x1="12" y1="2" x2="12" y2="22" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </IconWrapper>
)

export const ShieldCheck = (props: IconProps) => (
  <IconWrapper {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <path d="m9 12 2 2 4-4" />
  </IconWrapper>
)

export const ShoppingCart = (props: IconProps) => (
  <IconWrapper {...props}>
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </IconWrapper>
)

export const Plus = (props: IconProps) => (
  <IconWrapper {...props}>
    <path d="M12 5v14" />
    <path d="M5 12h14" />
  </IconWrapper>
)

export const Check = (props: IconProps) => (
  <IconWrapper {...props}>
    <path d="M20 6 9 17l-5-5" />
  </IconWrapper>
)

export const Trash = (props: IconProps) => (
  <IconWrapper {...props}>
    <path d="M3 6h18" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </IconWrapper>
)

export const ArrowLeft = (props: IconProps) => (
  <IconWrapper {...props}>
    <path d="m12 19-7-7 7-7" />
    <path d="M19 12H5" />
  </IconWrapper>
)

export const Volume = (props: IconProps) => (
  <IconWrapper {...props}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
  </IconWrapper>
)

export const VolumeMute = (props: IconProps) => (
  <IconWrapper {...props}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
    <line x1="23" x2="17" y1="9" y2="15" />
    <line x1="17" x2="23" y1="9" y2="15" />
  </IconWrapper>
)
