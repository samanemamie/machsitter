import type { SVGProps } from 'react'
import React from 'react'

export function SolarCloseCircleLinear(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" {...props}>
      <g fill="none" stroke="currentColor">
        <circle cx={12} cy={12} r={10}></circle>
        <path strokeLinecap="round" d="m14.5 9.5l-5 5m0-5l5 5"></path>
      </g>
    </svg>
  )
}
