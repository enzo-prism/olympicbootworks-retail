// Set default environment variables to prevent warnings
;(() => {
  if (typeof window !== "undefined") {
    // Create process and env objects if they don't exist
    window.process = window.process || {}
    window.process.env = window.process.env || {}

    // Set default values for all required environment variables
    const defaults = {
      NEXT_RUNTIME: "nodejs",
      SHOW_SUMMER_NOTICE: "false",
      SUMMER_CLOSURE: "false",
    }

    // Apply defaults for any missing variables
    Object.entries(defaults).forEach(([key, value]) => {
      if (!window.process.env[key]) {
        window.process.env[key] = value
      }
    })

    console.log("Environment defaults applied")
  }
})()
