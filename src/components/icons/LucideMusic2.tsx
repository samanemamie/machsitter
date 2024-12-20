import type { SVGProps } from 'react'

export function LucideMusic2(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <circle cx={8} cy={18} r={4}></circle>
        <path d="M12 18V2l7 4"></path>
      </g>
    </svg>
  )
}
