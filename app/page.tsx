import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <main className="relative h-[100dvh] w-full overflow-hidden no-scrollbar">
      <Navbar />
      <Hero />
      
      {/* Decorative corners */}
      <div className="fixed top-0 left-0 w-32 h-32 border-t border-l border-accent/20 z-10 pointer-events-none" />
      <div className="fixed top-0 right-0 w-32 h-32 border-t border-r border-accent/20 z-10 pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-32 h-32 border-b border-l border-accent/20 z-10 pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-32 h-32 border-b border-r border-accent/20 z-10 pointer-events-none" />
    </main>
  );
}
