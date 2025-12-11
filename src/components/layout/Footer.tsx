import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Building2 } from "lucide-react";

const navigationLinks = [
  { href: "/", label: "Início" },
  { href: "/buscar", label: "Buscar" },
  { href: "/categorias", label: "Categorias" },
  { href: "/distribuidores", label: "Distribuidores" },
];

const institutionalLinks = [
  { href: "/sobre", label: "Sobre Nós" },
  { href: "/contato", label: "Contato" },
  { href: "/termos", label: "Termos de Uso" },
  { href: "/privacidade", label: "Privacidade" },
];

const businessLinks = [
  { href: "/parceiro", label: "Seja Parceiro" },
  { href: "/anuncie", label: "Anuncie" },
  { href: "/api", label: "API para Desenvolvedores" },
];

function FooterLogo() {
  return (
    <div className="flex items-center gap-3">
      {/* Logo Icon - Lupa com cruz médica (versão para footer escuro) */}
      <div className="relative w-9 h-9 flex-shrink-0">
        <svg
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Magnifying glass circle - white filled */}
          <circle
            cx="15"
            cy="15"
            r="12"
            fill="white"
          />

          {/* Inner circle - subtle ring */}
          <circle
            cx="15"
            cy="15"
            r="9"
            fill="#00A085"
            fillOpacity="0.1"
          />

          {/* Medical cross in center */}
          <rect x="13" y="9" width="4" height="12" rx="1" fill="#00A085" />
          <rect x="9" y="13" width="12" height="4" rx="1" fill="#00A085" />

          {/* Magnifying glass handle */}
          <rect
            x="24"
            y="22"
            width="10"
            height="5"
            rx="2.5"
            transform="rotate(45 24 22)"
            fill="white"
          />
        </svg>
      </div>
      <span className="text-[22px] tracking-tight leading-none">
        <span className="font-normal text-white/90">Busca</span>
        <span className="font-bold text-white">Med</span>
      </span>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="mt-auto bg-buscamed-primary-dark">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Logo, Description & CTA */}
          <div className="lg:col-span-1">
            <FooterLogo />
            <p className="text-white text-sm leading-relaxed mt-5 mb-6 opacity-90">
              A plataforma líder em comparação de preços de equipamentos médicos hospitalares no Brasil.
            </p>
            <Link href="/parceiro">
              <Button
                className="w-full bg-white text-buscamed-primary-dark hover:bg-white/90 font-semibold rounded-xl shadow-lg"
              >
                <Building2 className="w-4 h-4 mr-2" />
                Seja um Parceiro
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Navegação</h3>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white text-sm hover:text-buscamed-accent transition-colors opacity-90 hover:opacity-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Institutional */}
          <div>
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Institucional</h3>
            <ul className="space-y-3">
              {institutionalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white text-sm hover:text-buscamed-accent transition-colors opacity-90 hover:opacity-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: For Business */}
          <div>
            <h3 className="text-white font-bold mb-5 text-sm uppercase tracking-wider">Para Empresas</h3>
            <ul className="space-y-3">
              {businessLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white text-sm hover:text-buscamed-accent transition-colors opacity-90 hover:opacity-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Highlight for distributors */}
            <div className="mt-6 p-4 rounded-xl bg-white/10 border border-white/20">
              <p className="text-white text-xs leading-relaxed">
                É distribuidor? Cadastre seus produtos e alcance hospitais e clínicas em todo o Brasil.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar - slightly darker */}
      <div className="border-t border-white/15 bg-[#008570]">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-white text-sm">
            <p className="opacity-90">&copy; 2025 BuscaMed. Todos os direitos reservados.</p>
            <p className="opacity-90">
              Carefully crafted by{" "}
              <span className="font-semibold">André Nobre</span> &{" "}
              <span className="font-semibold">Henrique Engelhardt</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
