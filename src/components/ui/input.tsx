'use client'
import { cva, type VariantProps } from 'class-variance-authority'
import React, { type ReactElement, useId, useState } from 'react'
import { cn } from '@/lib/utils'
import { SolarEyeClosedLinear, SolarEyeLinear } from '@/components/icons'

const inputContainer = cva(
  [
    'box-border overflow-hidden',
    'group flex rounded-100 outline-none', //temporary
    'relative w-auto bg-gray-50',
    'border-2 text-gray-900 placeholder-gray-600', //override
  ],
  {
    variants: {
      color: {
        error: [
          'error border-error',
          'focus-within:border-error', //override
        ],
        success: [
          'success border-success',
          'text-gray-600 focus-within:border-success', //override
        ],
        default: [
          'default border-primary text-gray-600 shadow-black/5',
          'border-gray-200 focus-within:border-primary', //override
        ],
      },
      variant: {
        default: ['focus-within:border-2'],
      },
      size: {
        default: ['h-[46px] text-input'],
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
      color: 'default',
    },
  }
)

type TInputProps = {
  visiblePassword?: 'prefix' | 'suffix'
  prefixIcon?: ReactElement
  suffixIcon?: ReactElement
} & React.InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputContainer>

export default function Input({
  type: Type,
  className,
  prefixIcon,
  suffixIcon,
  visiblePassword,
  color,
  id,
  variant,
  disabled,
  ...props
}: TInputProps) {
  const _id = useId()
  id = id || _id
  const [isVisible, setIsVisible] = useState(false)
  const [type] = useState(() => Type)
  const inputClassNames = inputContainer({ color, variant })

  const PasswordToggle = (
    <IconBox onClick={() => setIsVisible((p) => !p)} role="button">
      {isVisible ? <SolarEyeClosedLinear /> : <SolarEyeLinear />}
    </IconBox>
  )
  const PrefixIcon =
    visiblePassword === 'prefix'
      ? PasswordToggle
      : prefixIcon && <IconBox htmlFor={id}>{prefixIcon}</IconBox>

  const SuffixIcon =
    visiblePassword === 'suffix'
      ? PasswordToggle
      : suffixIcon && <IconBox htmlFor={id}>{suffixIcon}</IconBox>

  return (
    <div
      className={cn(
        inputClassNames,
        className,
        { disabled: disabled },
        { prefix: !!PrefixIcon, suffix: !!SuffixIcon }
      )}
    >
      {PrefixIcon}
      <input
        disabled={disabled}
        id={id}
        type={isVisible ? (type === 'password' ? 'text' : type) : type}
        className={cn([
          'typo-desk-body-sm w-full border-none px-3 placeholder-gray-600 outline-none',
          'bg-transparent text-gray-900',
          {
            'ps-0': !!PrefixIcon,
            'pe-0': !!SuffixIcon,
          },
        ])}
        {...props}
      />
      {SuffixIcon}
    </div>
  )
}

function IconBox({ className, ...props }: React.ComponentProps<'label'>) {
  return (
    <label
      {...props}
      className={cn(
        'flex h-full w-12 flex-shrink-0 items-center justify-center text-gray-700',
        className
      )}
    />
  )
}
