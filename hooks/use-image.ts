"use client"

import { useState, useEffect } from "react"

interface UseImageOptions {
  src: string
  fallbackSrc?: string
}

interface UseImageResult {
  isLoading: boolean
  error: boolean
  imgSrc: string
  handleLoad: () => void
  handleError: () => void
}

export function useImage({ src, fallbackSrc = "/placeholder.png" }: UseImageOptions): UseImageResult {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(false)
  const [imgSrc, setImgSrc] = useState<string>(src || fallbackSrc)

  useEffect(() => {
    if (!src) {
      setImgSrc(fallbackSrc)
      setIsLoading(false)
      setError(true)
      return
    }

    setImgSrc(src)
    setIsLoading(true)
    setError(false)
  }, [src, fallbackSrc])

  const handleLoad = () => {
    setIsLoading(false)
    setError(false)
  }

  const handleError = () => {
    console.error(`Image error for: ${src}`)
    setImgSrc(fallbackSrc)
    setIsLoading(false)
    setError(true)
  }

  return {
    isLoading,
    error,
    imgSrc,
    handleLoad,
    handleError,
  }
}
