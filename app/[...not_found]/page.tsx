export default function CatchAllNotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "70vh",
        textAlign: "center",
        padding: "0 1rem",
      }}
    >
      <h1 style={{ fontSize: "3.75rem", fontWeight: "bold", marginBottom: "1rem" }}>404</h1>
      <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "1.5rem" }}>Page Not Found</h2>
      <p style={{ color: "#6b7280", maxWidth: "28rem", marginBottom: "2rem" }}>
        Sorry, we couldn't find the page you're looking for.
      </p>
      <a
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "0.375rem",
          fontSize: "0.875rem",
          fontWeight: "500",
          height: "2.75rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          backgroundColor: "hsl(201, 100%, 36%)",
          color: "white",
          textDecoration: "none",
        }}
      >
        Return Home
      </a>
    </div>
  )
}
