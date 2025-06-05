import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Shop Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Our Shop</h1>
          <p className="text-muted-foreground">Browse our selection of premium ski and mountain bike equipment</p>
        </div>

        {/* Loading state */}
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
          <p className="text-muted-foreground">Loading shop...</p>
        </div>

        {/* Skeleton loaders */}
        <div className="mb-8 rounded-lg border p-4 bg-card">
          <div className="h-8 w-48 bg-gray-200 rounded mb-4 animate-pulse"></div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="border rounded-lg p-4 bg-card">
              <div className="aspect-square bg-gray-200 rounded mb-4 animate-pulse"></div>
              <div className="h-6 w-3/4 bg-gray-200 rounded mb-2 animate-pulse"></div>
              <div className="h-4 w-1/2 bg-gray-200 rounded mb-4 animate-pulse"></div>
              <div className="h-10 w-full bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
