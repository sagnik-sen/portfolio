import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Leadership } from "@/components/sections/leadership";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";
import { SectionDivider } from "@/components/section-divider";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider label="Work" />
        <Projects />
        <SectionDivider label="Journey" />
        <Experience />
        <SectionDivider label="Community" />
        <Leadership />
        <SectionDivider label="Toolkit" />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
