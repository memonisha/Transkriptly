import AnimatedBackground from "@/components/AnimatedBackground";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <AnimatedBackground />
      <div className="centered-container">
        <h1 style={{ textAlign: "center", fontSize: "32px", fontFamily:"georgia" }}>🙋🏻‍♀️Welcome to Transkriptly 🎥...📝</h1>
       
         <img 
          src="/logo.png" 
          alt="Logo" 
          style={{ width: "150px", marginBottom: "16px" }}
        />
        <Image src="/logo.png" alt="example" width={300} height={200} />
       
        <p style={{ textAlign: "center", fontSize: "15px" }}>Just Paste a YouTube link to get instant transcriptions!!!</p>
        
       

        <Link href="/transcribe" className="button-primary">
          Get Started 🍃
        </Link>
      </div>
    </main>
  );
}
