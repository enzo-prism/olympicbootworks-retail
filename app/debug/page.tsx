import ImageAuditTool from "@/components/image-audit-tool"
import CoreImage from "@/components/core-image"
import DirectImage from "@/components/direct-image"
import FallbackSVG from "@/components/fallback-svg"

export default function DebugPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Image Debug Page</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Image Audit</h2>
        <ImageAuditTool />
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Test Images</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="border p-4 rounded-lg">
            <h3 className="font-semibold mb-2">CoreImage - Valid Path</h3>
            <CoreImage
              src="/images/fitting-process-2.jpg"
              alt="Fitting Process"
              width={400}
              height={300}
              className="rounded-md"
            />
          </div>

          <div className="border p-4 rounded-lg">
            <h3 className="font-semibold mb-2">CoreImage - Invalid Path</h3>
            <CoreImage
              src="/images/non-existent-image.jpg"
              alt="Non-existent Image"
              width={400}
              height={300}
              className="rounded-md"
            />
          </div>

          <div className="border p-4 rounded-lg">
            <h3 className="font-semibold mb-2">DirectImage - Valid Path</h3>
            <DirectImage
              src="/images/fitting-process-2.jpg"
              alt="Fitting Process"
              width="100%"
              height="auto"
              className="rounded-md"
            />
          </div>

          <div className="border p-4 rounded-lg">
            <h3 className="font-semibold mb-2">DirectImage - Invalid Path</h3>
            <DirectImage
              src="/images/non-existent-image.jpg"
              alt="Non-existent Image"
              width="100%"
              height="auto"
              className="rounded-md"
            />
          </div>

          <div className="border p-4 rounded-lg">
            <h3 className="font-semibold mb-2">FallbackSVG</h3>
            <FallbackSVG text="Custom Fallback" width={400} height={300} className="rounded-md" />
          </div>

          <div className="border p-4 rounded-lg">
            <h3 className="font-semibold mb-2">Static Placeholder SVG</h3>
            <img src="/placeholder.png" alt="Static Placeholder" width="100%" height="auto" className="rounded-md" />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Environment Information</h2>
        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto">
          {JSON.stringify(
            {
              nextRuntime: process.env.NEXT_RUNTIME || "unknown",
              nodeEnv: process.env.NODE_ENV || "unknown",
              vercelEnv: process.env.VERCEL_ENV || "unknown",
            },
            null,
            2,
          )}
        </pre>
      </div>
    </div>
  )
}
