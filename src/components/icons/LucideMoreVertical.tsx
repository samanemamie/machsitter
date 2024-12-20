import type { SVGProps } from 'react'

export function LucideMoreVertical(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <circle cx={12} cy={12} r={1}></circle>
        <circle cx={12} cy={5} r={1}></circle>
        <circle cx={12} cy={19} r={1}></circle>
      </g>
    </svg>
  )
}
