"use client"

import { useState, useEffect } from "react"
import { imageExists } from "@/lib/image-utils"

interface ImageAuditToolProps {
  imagePaths?: string[]
}

export default function ImageAuditTool({ imagePaths = [] }: ImageAuditToolProps) {
  const [results, setResults] = useState<{ path: string; exists: boolean }[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function checkImages() {
      // If imagePaths is undefined or empty, set empty results
      if (!imagePaths || imagePaths.length === 0) {
        setResults([])
        setIsLoading(false)
        return
      }

      const imageResults = await Promise.all(
        imagePaths.map(async (path) => {
          const exists = await imageExists(path)
          return { path, exists }
        }),
      )

      setResults(imageResults)
      setIsLoading(false)
    }

    checkImages()
  }, [imagePaths])

  if (isLoading) {
    return <div>Checking images...</div>
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Image Audit Results</h2>
      {results.length === 0 ? (
        <p>No images to audit</p>
      ) : (
        <ul className="space-y-2">
          {results.map((result, index) => (
            <li key={index} className={result.exists ? "text-green-600" : "text-red-600"}>
              {result.path}: {result.exists ? "✓ Exists" : "✗ Missing"}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
