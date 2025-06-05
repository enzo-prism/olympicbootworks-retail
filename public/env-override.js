// Environment variable override script
;(() => {
  // Ensure process and process.env exist
  if (typeof window !== "undefined") {
    window.process = window.process || { env: {} }
    window.process.env = window.process.env || {}

    // Force summer notice flags to be false regardless of environment
    window.process.env.SHOW_SUMMER_NOTICE = "false"
    window.process.env.SUMMER_CLOSURE = "false"

    // Preserve other environment variables
    window.process.env.NEXT_RUNTIME = window.process.env.NEXT_RUNTIME || "nodejs"

    console.log("[env-override] Environment variables have been standardized")
  }
})()
