import type { SVGProps } from 'react'

export function LucideCalendar(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path d="M8 2v4m8-4v4"></path>
        <rect width={18} height={18} x={3} y={4} rx={2}></rect>
        <path d="M3 10h18"></path>
      </g>
    </svg>
  )
}
