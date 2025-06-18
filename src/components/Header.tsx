import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{
        fontFamily: "georgia",
        display: "flex",
        alignItems: "center",
        padding: "12px 24px",
        backgroundColor: "#000",
        color: "#fff",
        maxWidth: "100vw",
        overflowX: "hidden",
        boxSizing: "border-box",
      }}
    >
      <Link
        href="/"
        aria-label="Go to homepage"
        style={{
          fontWeight: "bold",
          fontSize: "24px",
          color: "white",
          textDecoration: "none",
          flexShrink: 0, // Prevent shrinking
        }}
      >
        Transkriptly
      </Link>

      <nav
        style={{
          display: "flex",
          gap: "20px",
          marginLeft: "auto", // Push nav to the right but inside header
          flexWrap: "nowrap",
        }}
      >
        <Link href="/" style={{ color: "white", textDecoration: "none" }}>
          Home
        </Link>
        <Link href="/transcribe" style={{ color: "white", textDecoration: "none" }}>
          Transcribe
        </Link>
      </nav>
    </header>
  );
}
