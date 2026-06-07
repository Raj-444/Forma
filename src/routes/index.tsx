import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import p1 from "@/assets/project-1.jpg";
import p2 from "@/assets/project-2.jpg";
import p3 from "@/assets/project-3.jpg";
import p4 from "@/assets/project-4.jpg";
import detail from "@/assets/detail.jpg";
import { ContactForm } from "@/components/ContactForm";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Forma Interiors — Scandinavian Interior Design Studio" },
      { name: "description", content: "Forma Interiors crafts calm, timeless homes through Scandinavian-inspired interior design. Residential and hospitality studio based in Copenhagen." },
      { property: "og:title", content: "Forma Interiors — Scandinavian Interior Design Studio" },
      { property: "og:description", content: "A design studio shaping refined, quiet interiors for modern living." },
    ],
  }),
  component: Index,
});

const projects = [
  { img: p1, title: "Vesterbro Residence", place: "Copenhagen, DK", year: "2025", tag: "Residential" },
  { img: p2, title: "Brass & Travertine Kitchen", place: "Oslo, NO", year: "2024", tag: "Renovation" },
  { img: p3, title: "Frederiksberg Apartment", place: "Copenhagen, DK", year: "2024", tag: "Residential" },
  { img: p4, title: "Limestone Bath Suite", place: "Stockholm, SE", year: "2023", tag: "Hospitality" },
];

const services = [
  { n: "01", t: "Full Interior Design", d: "From spatial concept to the last linen — concept, joinery, FF&E, styling and installation, delivered as a single, considered whole." },
  { n: "02", t: "Architectural Renovation", d: "Reworking floor plans and light to bring quiet proportion to existing homes, in close partnership with trusted craftsmen." },
  { n: "03", t: "Art Direction & Styling", d: "Editorial direction for residences and hospitality — composing rooms that photograph and live with equal calm." },
];

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Marquee />
      <Philosophy />
      <Projects />
      <FeatureSplit />
      <Services />
      <Testimonial />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 64; // fixed header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/70 border-b border-border/60">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 h-16 flex items-center justify-between">
        <a href="#" className="font-serif text-xl tracking-tight">Forma<span className="text-accent">.</span></a>
        <nav className="hidden md:flex items-center gap-10 text-sm text-muted-foreground">
          <a href="#work" onClick={(e) => handleScroll(e, "work")} className="hover:text-foreground transition-colors">Work</a>
          <a href="#studio" onClick={(e) => handleScroll(e, "studio")} className="hover:text-foreground transition-colors">Studio</a>
          <a href="#services" onClick={(e) => handleScroll(e, "services")} className="hover:text-foreground transition-colors">Services</a>
          <a href="#footer" onClick={(e) => handleScroll(e, "footer")} className="hover:text-foreground transition-colors">Journal</a>
        </nav>
        <a href="#contact" onClick={(e) => handleScroll(e, "contact")} className="text-sm border border-foreground/80 px-5 py-2 hover:bg-foreground hover:text-background transition-colors">
          Begin a project
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative pt-16">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 pt-16 lg:pt-24 pb-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          <div className="lg:col-span-7 animate-fade-up">
            <p className="eyebrow mb-8">Interior Design Studio · Est. 2014</p>
            <h1 className="display text-[14vw] sm:text-[10vw] lg:text-[7.5vw] xl:text-[7rem]">
              Quiet rooms,<br />
              <span className="italic font-normal text-muted-foreground">slowly composed.</span>
            </h1>
            <p className="mt-10 max-w-md text-base leading-relaxed text-muted-foreground">
              Forma Interiors is a Copenhagen-based studio shaping calm, considered homes through restraint, natural materials and a Scandinavian sense of light.
            </p>
          </div>
          <div className="lg:col-span-5 flex lg:justify-end gap-8 text-sm">
            <Stat k="120+" v="Homes realised" />
            <Stat k="14" v="Years of practice" />
            <Stat k="9" v="Awards" />
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="relative overflow-hidden">
          <img
            src={hero}
            alt="Scandinavian living room with linen sofa and oak floors"
            width={1600}
            height={1920}
            className="w-full h-[78vh] object-cover animate-fade-in"
          />
          <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10 bg-background/85 backdrop-blur-sm px-5 py-4">
            <p className="eyebrow">Featured · 001</p>
            <p className="font-serif text-lg mt-1">Vesterbro Residence</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <p className="font-serif text-3xl lg:text-4xl">{k}</p>
      <p className="eyebrow mt-2">{v}</p>
    </div>
  );
}

function Marquee() {
  const items = ["Wallpaper*", "Architectural Digest", "Elle Decor", "Dwell", "Frame", "Kinfolk", "Monocle"];
  return (
    <section className="border-y border-border mt-24 py-8 overflow-hidden">
      <div className="flex w-max animate-marquee gap-16 px-8 text-muted-foreground">
        {[...items, ...items, ...items].map((i, idx) => (
          <span key={idx} className="font-serif text-2xl whitespace-nowrap opacity-70">{i}</span>
        ))}
      </div>
    </section>
  );
}

function Philosophy() {
  return (
    <section id="studio" className="mx-auto max-w-[1400px] px-6 lg:px-12 py-32 lg:py-44">
      <div className="grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <p className="eyebrow">Our practice</p>
        </div>
        <div className="lg:col-span-8">
          <h2 className="display text-4xl md:text-5xl lg:text-6xl">
            We design interiors that age with grace — honest in material, generous in light, and deliberate in every quiet detail.
          </h2>
          <div className="mt-16 grid md:grid-cols-2 gap-12 text-muted-foreground leading-relaxed">
            <p>Each project begins with listening — to the architecture, to the way a family moves through a morning, to the rhythm of the seasons inside a room. From this, we shape spaces of restraint and warmth.</p>
            <p>Our studio works at the intersection of architecture, art and craft, partnering with Scandinavia's most considered makers. The result is interiors that feel inevitable — as though they could not have been any other way.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="work" className="bg-secondary/40 py-32 lg:py-44">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="flex items-end justify-between mb-20">
          <div>
            <p className="eyebrow mb-4">Selected work · 2023 — 2025</p>
            <h2 className="display text-5xl lg:text-6xl">A quiet archive.</h2>
          </div>
          <a href="#" className="hidden md:inline-block text-sm border-b border-foreground pb-1">View all projects →</a>
        </div>

        <div className="grid md:grid-cols-12 gap-x-6 gap-y-20">
          {projects.map((p, i) => (
            <article
              key={p.title}
              className={`group ${i % 2 === 0 ? "md:col-span-7" : "md:col-span-5 md:mt-32"}`}
            >
              <div className="overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  width={1200}
                  height={1500}
                  loading="lazy"
                  className="w-full aspect-[4/5] object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                />
              </div>
              <div className="mt-6 flex items-baseline justify-between">
                <div>
                  <p className="eyebrow mb-2">{p.tag} · {p.year}</p>
                  <h3 className="font-serif text-2xl">{p.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground">{p.place}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureSplit() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 lg:px-12 py-32 lg:py-44">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <img src={detail} alt="Linen curtain and ceramic on oak shelf" width={1400} height={1000} loading="lazy" className="w-full aspect-[7/5] object-cover" />
        </div>
        <div className="order-1 lg:order-2 lg:pl-12">
          <p className="eyebrow mb-6">Material library</p>
          <h2 className="display text-4xl md:text-5xl">
            Linen. Lime plaster. Oiled oak. Unlacquered brass.
          </h2>
          <p className="mt-8 text-muted-foreground leading-relaxed max-w-md">
            We work from a deliberately narrow palette of natural, ageing materials — selected so that every room deepens over the years instead of dating.
          </p>
          <div className="mt-10 grid grid-cols-4 gap-3 max-w-sm">
            {["#e8e1d6", "#d9cdb8", "#b8a890", "#3b332a"].map(c => (
              <div key={c} className="aspect-square" style={{ backgroundColor: c }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section id="services" className="border-t border-border py-32 lg:py-44">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-12 mb-20">
          <p className="eyebrow lg:col-span-4">What we do</p>
          <h2 className="display text-5xl lg:col-span-8">Three ways to work together.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-px bg-border">
          {services.map(s => (
            <div key={s.n} className="bg-background p-10 lg:p-12 min-h-[340px] flex flex-col">
              <p className="font-serif text-accent text-xl mb-12">— {s.n}</p>
              <h3 className="font-serif text-2xl mb-5">{s.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="bg-primary text-primary-foreground py-32 lg:py-44">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <p className="eyebrow opacity-70 mb-10">In their words</p>
        <blockquote className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight italic font-light">
          “They gave us a home that feels as though it has always been here. Every corner has a quietness to it.”
        </blockquote>
        <p className="eyebrow opacity-70 mt-12">Anna &amp; Lars Holm · Frederiksberg Residence</p>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-[1400px] px-6 lg:px-12 py-32 lg:py-44">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-6">Begin a project</p>
          <h2 className="display text-5xl md:text-6xl mb-10">
            Tell us about<br />the home you imagine.
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-12 max-w-sm">
            We take on a small number of projects each year. Share a few details and the studio will reply personally within two working days.
          </p>
          <div className="space-y-4 text-sm">
            <a href="mailto:studio@formainteriors.com" className="block border-b border-foreground pb-2 font-serif text-xl w-fit">
              studio@formainteriors.com
            </a>
            <div className="text-muted-foreground space-y-1 pt-4">
              <p>Bredgade 32, 2.</p>
              <p>1260 København K</p>
              <p>Denmark</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="footer" className="border-t border-border">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12 py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 text-xs text-muted-foreground">
        <p className="font-serif text-lg text-foreground">Forma Interiors</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-foreground">Instagram</a>
          <a href="#" className="hover:text-foreground">Pinterest</a>
          <a href="#" className="hover:text-foreground">Journal</a>
        </div>
        <p>© {new Date().getFullYear()} Forma Interiors ApS · All rights reserved</p>
      </div>
    </footer>
  );
}
