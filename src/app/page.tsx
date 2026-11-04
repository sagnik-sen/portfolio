import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Leadership } from "@/components/sections/leadership";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <div className="mx-auto max-w-2xl px-6">
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Leadership />
        <Contact />
      </main>
    </div>
  );
}
