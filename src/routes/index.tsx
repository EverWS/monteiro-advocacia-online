import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Scale, Heart, Users, Baby, FileText, ShoppingBag, Home,
  MessageCircle, Phone, Video, Instagram, Menu, X, ChevronDown,
  CheckCircle2, ShieldCheck, Sparkles,
} from "lucide-react";
import heroImg from "@/assets/maria-monteiro.jpg";
import aboutImg from "@/assets/about-office.jpg";
import logoMark from "@/assets/mark-m-dark.png.asset.json";
import watermark from "@/assets/watermark-m.png.asset.json";

function Watermark({ className = "" }: { className?: string }) {
  return (
    <img
      src={watermark.url}
      alt=""
      aria-hidden="true"
      loading="lazy"
      className={`pointer-events-none select-none absolute -z-10 opacity-[0.07] ${className}`}
    />
  );
}

const WHATSAPP = "https://wa.me/message/UE562PFEOQKLL1";
const INSTAGRAM = "https://www.instagram.com/adv.mariamonteiro/";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maria Monteiro Advocacia — Família, Sucessões e Consumidor" },
      { name: "description", content: "Advocacia especializada em Direito de Família, Sucessões e Direito do Consumidor. Atendimento online em todo o Brasil com escuta humanizada e segurança jurídica." },
      { name: "keywords", content: "advogada família, divórcio, guarda, pensão alimentícia, inventário, união estável, direito do consumidor, advogada online" },
      { property: "og:title", content: "Maria Monteiro Advocacia" },
      { property: "og:description", content: "Orientação jurídica humanizada em Família, Sucessões e Consumidor. Atendimento online em todo o Brasil." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: Index,
});

const nav = [
  { href: "#inicio", label: "Início" },
  { href: "#sobre", label: "Sobre" },
  { href: "#areas", label: "Áreas de Atuação" },
  { href: "#como-funciona", label: "Como Funciona" },
  { href: "#depoimentos", label: "Depoimentos" },
  { href: "#contato", label: "Contato" },
];

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-background/80 border-b border-border/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-24 flex items-center justify-between">
        <a href="#inicio" className="flex items-center gap-4 group">
          <img src={logoMark.url} alt="Maria Monteiro Advocacia" width={64} height={58} className="h-11 lg:h-12 w-auto object-contain shrink-0" />
          <div className="leading-none hidden sm:block">
            <div className="font-display text-2xl lg:text-[1.75rem] text-primary tracking-wide">Maria Monteiro</div>
            <div className="mt-1.5 text-[9px] lg:text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Advocacia e Consultoria Jurídica</div>
          </div>
        </a>
        <nav className="hidden lg:flex items-center gap-8">
          {nav.map(n => (
            <a key={n.href} href={n.href} className="text-sm text-foreground/80 hover:text-primary transition-colors">
              {n.label}
            </a>
          ))}
        </nav>
        <button className="lg:hidden text-primary" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border/60 bg-background/95 backdrop-blur">
          <div className="px-6 py-4 flex flex-col gap-3">
            {nav.map(n => (
              <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="py-2 text-foreground/80">
                {n.label}
              </a>
            ))}
            <a href={WHATSAPP} target="_blank" rel="noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full gradient-gold text-primary-foreground font-medium shadow-gold">
              <MessageCircle size={16} /> Agendar Consulta
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="inicio" className="relative pt-32 lg:pt-40 pb-20 lg:pb-28 overflow-hidden gradient-hero">
      <div className="absolute inset-0 opacity-40 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle at 20% 20%, oklch(0.88 0.05 40 / 0.4), transparent 50%), radial-gradient(circle at 80% 80%, oklch(0.78 0.08 75 / 0.25), transparent 50%)" }} />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div className="fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-border text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8">
            <Sparkles size={12} className="text-gold" /> OAB · Atendimento Online
          </div>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-primary leading-[1.05] mb-6">
            Advocacia especializada em <em className="text-gold not-italic">Família</em>, Sucessões e Direito do Consumidor
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed">
            Atendimento online em todo o Brasil, com orientação jurídica humanizada, estratégica e segura para proteger seus direitos.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href={WHATSAPP} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full gradient-gold text-primary-foreground font-medium shadow-gold hover:scale-[1.02] transition-transform">
              <MessageCircle size={18} /> Agendar consulta pelo WhatsApp
            </a>
            <a href="#areas"
              className="inline-flex items-center gap-2 px-7 py-4 rounded-full border border-primary/30 text-primary font-medium hover:bg-primary hover:text-primary-foreground transition-colors">
              Conheça as áreas de atuação
            </a>
          </div>
          <div className="mt-12 flex flex-wrap gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-gold" /> Sigilo profissional</div>
            <div className="flex items-center gap-2"><Heart size={16} className="text-gold" /> Atendimento humanizado</div>
            <div className="flex items-center gap-2"><CheckCircle2 size={16} className="text-gold" /> Todo o Brasil</div>
          </div>
        </div>
        <div className="relative fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="absolute -inset-6 gradient-gold opacity-20 blur-3xl rounded-full" />
          <div className="relative rounded-[2rem] overflow-hidden shadow-elegant border border-border/60">
            <img src={heroImg} alt="Advogada Maria Monteiro" width={1280} height={1600} className="w-full h-auto object-cover" />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-5 shadow-elegant border border-border max-w-[220px] hidden md:block float-anim">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center">
                <Scale size={18} className="text-primary-foreground" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Especialização</div>
                <div className="text-sm font-medium text-primary">Família & Sucessões</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="sobre" className="relative isolate overflow-hidden py-24 lg:py-32">
      <Watermark className="-right-24 top-1/2 -translate-y-1/2 w-[420px] lg:w-[560px]" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="rounded-[2rem] overflow-hidden shadow-elegant">
            <img src={aboutImg} alt="Escritório de advocacia" loading="lazy" width={1280} height={1280} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full gradient-gold opacity-30 blur-2xl" />
        </div>
        <div className="order-1 lg:order-2">
          <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Sobre</div>
          <h2 className="font-display text-4xl lg:text-5xl text-primary mb-6">Sobre Maria Monteiro</h2>
          <div className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Maria Monteiro é advogada com atuação voltada ao Direito de Família, Sucessões e Direito do Consumidor. Seu atendimento é pautado na escuta atenta, na análise técnica de cada caso e na busca por soluções jurídicas seguras, humanas e eficientes.
            </p>
            <p>
              Com atendimento online em todo o Brasil, oferece suporte jurídico para pessoas que enfrentam momentos delicados envolvendo divórcio, guarda, pensão, união estável, inventários, conflitos familiares e relações de consumo.
            </p>
          </div>
          <a href={WHATSAPP} target="_blank" rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors">
            <MessageCircle size={18} /> Falar com a advogada
          </a>
        </div>
      </div>
    </section>
  );
}

const areas = [
  { icon: Heart, title: "Divórcio", text: "Orientação e acompanhamento em divórcios consensuais ou litigiosos, com atenção à partilha de bens, guarda, pensão e demais direitos envolvidos." },
  { icon: Baby, title: "Guarda e Convivência", text: "Atuação em ações de guarda, regulamentação de convivência e proteção dos interesses dos filhos." },
  { icon: Scale, title: "Pensão Alimentícia", text: "Atendimento em ações de fixação, revisão, exoneração e execução de alimentos." },
  { icon: Users, title: "União Estável", text: "Reconhecimento e dissolução de união estável, com análise dos direitos patrimoniais e familiares." },
  { icon: FileText, title: "Sucessões e Inventário", text: "Atuação em inventários judiciais e extrajudiciais, partilha de bens, planejamento sucessório e orientação aos herdeiros." },
  { icon: ShoppingBag, title: "Direito do Consumidor", text: "Atuação em casos de cobranças indevidas, negativação indevida, falhas na prestação de serviços, contratos abusivos e defesa dos direitos do consumidor." },
];

function Areas() {
  return (
    <section id="areas" className="relative isolate overflow-hidden py-24 lg:py-32 bg-secondary/40">
      <Watermark className="-left-28 top-10 w-[380px] lg:w-[520px]" />
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Especialidades</div>
          <h2 className="font-display text-4xl lg:text-5xl text-primary mb-4">Áreas de Atuação</h2>
          <p className="text-muted-foreground">Orientação técnica e estratégica em cada etapa do seu caso.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map(({ icon: Icon, title, text }) => (
            <article key={title} className="group p-8 rounded-3xl bg-card border border-border shadow-soft hover:shadow-elegant hover:-translate-y-1 transition-all">
              <div className="w-14 h-14 rounded-2xl gradient-gold flex items-center justify-center mb-6 shadow-gold group-hover:scale-110 transition-transform">
                <Icon size={24} className="text-primary-foreground" />
              </div>
              <h3 className="font-display text-2xl text-primary mb-3">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  { n: "01", title: "Agendamento pelo WhatsApp", text: "O primeiro contato é feito de forma simples e rápida para entender a necessidade inicial." },
  { n: "02", title: "Análise do caso", text: "A situação é analisada com cuidado, considerando documentos, fatos e objetivos do cliente." },
  { n: "03", title: "Orientação jurídica", text: "O cliente recebe orientação clara sobre os caminhos possíveis e as medidas jurídicas cabíveis." },
  { n: "04", title: "Atuação estratégica", text: "Quando necessário, são adotadas as providências judiciais ou extrajudiciais adequadas ao caso." },
];

function HowItWorks() {
  return (
    <section id="como-funciona" className="py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Processo</div>
          <h2 className="font-display text-4xl lg:text-5xl text-primary mb-4">Como Funciona o Atendimento</h2>
          <p className="text-muted-foreground">Um caminho claro, transparente e acolhedor do início ao fim.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, i) => (
            <div key={s.n} className="relative p-8 rounded-3xl bg-card border border-border shadow-soft">
              <div className="font-display text-5xl text-gold mb-4">{s.n}</div>
              <h3 className="font-display text-xl text-primary mb-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-3 w-6 h-px bg-gold/40" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Online() {
  return (
    <section className="py-24 lg:py-32 bg-secondary/40">
      <div className="max-w-5xl mx-auto px-6 lg:px-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-card border border-border text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6">
          <Home size={12} className="text-gold" /> Online · Brasil
        </div>
        <h2 className="font-display text-4xl lg:text-5xl text-primary mb-6">
          Atendimento jurídico online em todo o Brasil
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto mb-10">
          Com o atendimento online, você pode receber orientação jurídica especializada sem sair de casa, com praticidade, segurança e sigilo profissional. As consultas podem ser realizadas por chamada de vídeo, telefone ou WhatsApp, conforme a necessidade do cliente.
        </p>
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {[{ icon: Video, label: "Vídeo" }, { icon: Phone, label: "Telefone" }, { icon: MessageCircle, label: "WhatsApp" }].map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3 px-5 py-3 rounded-full bg-card border border-border shadow-soft">
              <Icon size={18} className="text-gold" />
              <span className="text-sm font-medium text-primary">{label}</span>
            </div>
          ))}
        </div>
        <p className="font-display italic text-2xl text-primary mb-8">
          "Praticidade, sigilo e acompanhamento humanizado."
        </p>
        <a href={WHATSAPP} target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full gradient-gold text-primary-foreground font-medium shadow-gold hover:scale-[1.02] transition-transform">
          <MessageCircle size={18} /> Agendar atendimento online
        </a>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[2.5rem] p-12 lg:p-20 bg-primary text-primary-foreground shadow-elegant">
          <div className="absolute inset-0 opacity-30"
            style={{ backgroundImage: "radial-gradient(circle at 80% 20%, oklch(0.78 0.08 75 / 0.6), transparent 50%)" }} />
          <div className="relative text-center max-w-3xl mx-auto">
            <h2 className="font-display text-4xl lg:text-5xl mb-6">
              Precisa de orientação jurídica em um momento delicado?
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-10 leading-relaxed">
              Fale com a advogada Maria Monteiro e receba uma análise cuidadosa do seu caso.
            </p>
            <a href={WHATSAPP} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full gradient-gold text-primary font-semibold shadow-gold hover:scale-[1.03] transition-transform text-lg">
              <MessageCircle size={20} /> Agendar consulta pelo WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

const testimonials = [
  "Recebi um atendimento muito claro e humanizado em um momento difícil.",
  "Atendimento profissional, ágil e com explicações objetivas.",
  "Consegui entender meus direitos e os próximos passos do meu caso.",
];

function Testimonials() {
  return (
    <section id="depoimentos" className="py-24 lg:py-32 bg-secondary/40">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Depoimentos</div>
          <h2 className="font-display text-4xl lg:text-5xl text-primary">O que dizem os clientes</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <figure key={i} className="p-8 rounded-3xl bg-card border border-border shadow-soft">
              <div className="text-4xl font-display text-gold leading-none mb-4">"</div>
              <blockquote className="text-foreground/85 leading-relaxed italic font-display text-lg">
                {t}
              </blockquote>
              <figcaption className="mt-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Cliente atendida
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  { q: "É possível resolver meu caso de forma online?", a: "Sim. Muitos atendimentos e acompanhamentos podem ser realizados de forma online, com segurança, praticidade e sigilo." },
  { q: "Quais documentos preciso enviar para a consulta?", a: "Depende do caso. Após o primeiro contato, serão indicados os documentos necessários para a análise jurídica." },
  { q: "A consulta é feita pelo WhatsApp?", a: "O agendamento pode ser feito pelo WhatsApp, e a consulta poderá ocorrer por vídeo, telefone ou outro meio combinado." },
  { q: "A advogada atende em todo o Brasil?", a: "Sim. O atendimento online permite a orientação jurídica para clientes de diferentes regiões do país." },
];

function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  return (
    <section className="py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-6 lg:px-10">
        <div className="text-center mb-16">
          <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">FAQ</div>
          <h2 className="font-display text-4xl lg:text-5xl text-primary">Perguntas Frequentes</h2>
        </div>
        <div className="space-y-3">
          {faqs.map((f, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden shadow-soft">
                <button onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left">
                  <span className="font-display text-lg text-primary">{f.q}</span>
                  <ChevronDown size={20} className={`text-gold shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ nome: "", telefone: "", mensagem: "" });
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Olá, sou ${form.nome}. Telefone: ${form.telefone}. ${form.mensagem}`;
    window.open(`${WHATSAPP}?text=${encodeURIComponent(text)}`, "_blank");
  };
  return (
    <section id="contato" className="relative isolate overflow-hidden py-24 lg:py-32 bg-secondary/40">
      <Watermark className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] lg:w-[700px]" />
      <div className="max-w-6xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-12">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Contato</div>
          <h2 className="font-display text-4xl lg:text-5xl text-primary mb-6">Vamos conversar</h2>
          <p className="text-muted-foreground leading-relaxed mb-10">
            Estou à disposição para uma análise inicial do seu caso. Atendimento online em todo o Brasil.
          </p>
          <div className="space-y-4">
            <a href={WHATSAPP} target="_blank" rel="noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border shadow-soft hover:shadow-elegant transition-shadow">
              <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center shadow-gold">
                <MessageCircle size={20} className="text-primary-foreground" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">WhatsApp</div>
                <div className="font-medium text-primary">Agendar consulta</div>
              </div>
            </a>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer"
              className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border shadow-soft hover:shadow-elegant transition-shadow">
              <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center shadow-gold">
                <Instagram size={20} className="text-primary-foreground" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Instagram</div>
                <div className="font-medium text-primary">@adv.mariamonteiro</div>
              </div>
            </a>
            <div className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border shadow-soft">
              <div className="w-12 h-12 rounded-xl gradient-gold flex items-center justify-center shadow-gold">
                <Home size={20} className="text-primary-foreground" />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Atendimento</div>
                <div className="font-medium text-primary">Online em todo o Brasil</div>
              </div>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="p-8 lg:p-10 rounded-3xl bg-card border border-border shadow-elegant space-y-5">
          <h3 className="font-display text-2xl text-primary mb-2">Envie uma mensagem</h3>
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Nome</label>
            <input required value={form.nome} onChange={e => setForm({ ...form, nome: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-background border border-input focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Telefone</label>
            <input required value={form.telefone} onChange={e => setForm({ ...form, telefone: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-background border border-input focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-muted-foreground mb-2">Mensagem</label>
            <textarea required rows={4} value={form.mensagem} onChange={e => setForm({ ...form, mensagem: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-background border border-input focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition resize-none" />
          </div>
          <button type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full gradient-gold text-primary-foreground font-medium shadow-gold hover:scale-[1.01] transition-transform">
            <MessageCircle size={18} /> Enviar pelo WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <span className="w-9 h-9 rounded-full gradient-gold flex items-center justify-center">
            <Scale size={18} className="text-primary" />
          </span>
          <span className="font-display text-xl">Maria Monteiro Advocacia</span>
        </div>
        <p className="text-sm text-primary-foreground/70">
          © {new Date().getFullYear()} Maria Monteiro Advocacia. Todos os direitos reservados.
        </p>
        <p className="text-xs text-primary-foreground/60 max-w-2xl mx-auto leading-relaxed">
          As informações deste site possuem caráter informativo e não substituem a consulta jurídica individualizada. A atuação profissional observa as normas da OAB.
        </p>
      </div>
    </footer>
  );
}

function FloatingCta() {
  return (
    <a href={WHATSAPP} target="_blank" rel="noreferrer"
      aria-label="Agendar consulta pelo WhatsApp"
      className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 pl-5 pr-6 py-3.5 rounded-full gradient-gold text-primary-foreground text-sm font-medium shadow-gold hover:scale-[1.03] transition-transform float-anim">
      <MessageCircle size={18} /> Agendar Consulta
    </a>
  );
}


function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Areas />
        <HowItWorks />
        <Online />
        <CTA />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <FloatingCta />
    </div>
  );
}
