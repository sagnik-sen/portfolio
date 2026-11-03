import { Section } from "@/components/section";

export function About() {
  return (
    <Section id="about" label="About">
      <div className="max-w-2xl space-y-6 text-lg leading-relaxed text-secondary">
        <p>
          This past summer I interned at Wizergos, working on a system that
          sorts incoming insurance email with an LLM. I wrote the prompts,
          served Gemma models through vLLM, fine-tuned them with LoRA and
          QLoRA on a single NVIDIA A30, and built an evaluation pipeline to
          check whether each change actually helped.
        </p>
        <p>
          At university I&apos;m General Secretary of{" "}
          <span className="text-primary">Google Developer Groups on Campus, VIT Chennai</span>,
          after starting out as Marketing Lead. I look after the operations
          side: planning events, coordinating teams, and sorting out the
          logistics for hackathons and programs that hundreds of students
          take part in.
        </p>
        <p>
          The part of ML I find most interesting is evaluation, working out
          how you would know a model is ready for real people to use.
        </p>
      </div>
    </Section>
  );
}
