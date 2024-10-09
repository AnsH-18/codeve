import React from 'react'

interface LoadingProps {
  size?: 'small' | 'medium' | 'large'
  color?: string
}

export default function LoadingComp({ size = 'medium', color = 'text-blue-500' }: LoadingProps) {
  const sizeClasses = {
    small: 'w-5 h-5',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  }

  return (
    <div className="flex justify-center items-center">
      <div className={`animate-spin rounded-full border-t-2 border-r-2 border-b-2 border-transparent ${sizeClasses[size]} ${color}`}></div>
    </div>
  )
}