"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import {
  Search,
  Package,
  Building2,
  Grid3X3,
  Armchair,
  HeartPulse,
  Wind,
  Siren,
  ScanLine,
  Stethoscope,
  Droplets,
  CircleDot,
  ArrowRight,
  Star,
  TrendingDown,
  Activity,
  Zap,
  Sparkles,
  BadgeCheck,
  Pill,
  Syringe,
  Thermometer,
  Cross,
} from "lucide-react";
import {
  getEquipamentosPopulares,
  getEquipamentosNovos,
  getMenorPreco,
  getMaiorPreco,
  formatarPreco,
  type Equipamento,
} from "@/data/equipamentos";

const stats = [
  { label: "Equipamentos", value: "1.200+", icon: Package },
  { label: "Distribuidores", value: "50+", icon: Building2 },
  { label: "Categorias", value: "8", icon: Grid3X3 },
  { label: "Empresas Verificadas", value: "120+", icon: BadgeCheck },
];

const categories = [
  { name: "Mobiliário Hospitalar", icon: Armchair, href: "/categoria/mobiliario-hospitalar", count: 245 },
  { name: "Monitorização", icon: HeartPulse, href: "/categoria/monitorizacao", count: 189 },
  { name: "Ventilação", icon: Wind, href: "/categoria/ventilacao", count: 134 },
  { name: "Emergência", icon: Siren, href: "/categoria/emergencia", count: 98 },
  { name: "Diagnóstico por Imagem", icon: ScanLine, href: "/categoria/diagnostico-imagem", count: 156 },
  { name: "Diagnóstico", icon: Stethoscope, href: "/categoria/diagnostico", count: 203 },
  { name: "Infusão", icon: Droplets, href: "/categoria/infusao", count: 87 },
  { name: "Vias Aéreas", icon: CircleDot, href: "/categoria/vias-aereas", count: 76 },
];

const quickCategories = [
  { name: "UTI", icon: Activity, href: "/buscar?q=uti" },
  { name: "Diagnóstico", icon: Stethoscope, href: "/categoria/diagnostico" },
  { name: "Emergência", icon: Zap, href: "/categoria/emergencia" },
  { name: "Monitores", icon: HeartPulse, href: "/categoria/monitorizacao" },
];

const partners = [
  { name: "MedEquip Brasil" },
  { name: "Hospitalar SP" },
  { name: "TechMed Solutions" },
  { name: "Saúde Total" },
  { name: "EquipoMed" },
];

interface EquipmentCardProps {
  equipment: Equipamento;
  compact?: boolean;
}

function EquipmentCard({ equipment, compact = false }: EquipmentCardProps) {
  const menorPreco = getMenorPreco(equipment);
  const maiorPreco = getMaiorPreco(equipment);

  return (
    <Link href={`/equipamento/${equipment.id}`}>
      <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full">
        <div className={`${compact ? "aspect-[2.5/1]" : "aspect-[16/9]"} bg-muted relative overflow-hidden`}>
          <Image
            src={equipment.imagem}
            alt={equipment.nome}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {equipment.promocao && (
            <Badge className="absolute top-2 right-2 bg-buscamed-alert text-white text-xs px-2 py-0.5">
              <TrendingDown className="w-3 h-3 mr-1" />
              Promoção
            </Badge>
          )}
          {equipment.novo && (
            <Badge className="absolute top-2 left-2 bg-buscamed-secondary text-white text-xs px-2 py-0.5">
              <Sparkles className="w-3 h-3 mr-1" />
              Novo
            </Badge>
          )}
        </div>
        <CardContent className={compact ? "p-3" : "p-4"}>
          <p className="text-[10px] text-muted-foreground mb-0.5 uppercase tracking-wide">{equipment.categoria}</p>
          <h3 className={`font-semibold text-foreground mb-1.5 line-clamp-2 group-hover:text-primary transition-colors ${compact ? "text-xs" : "text-sm"}`}>
            {equipment.nome}
          </h3>
          <p className={`font-bold text-primary mb-1.5 ${compact ? "text-sm" : "text-base"}`}>
            {formatarPreco(menorPreco)} - {formatarPreco(maiorPreco)}
          </p>
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">
              {equipment.ofertas.length} ofertas
            </span>
            <div className="flex items-center gap-1 text-buscamed-alert">
              <Star className="w-3 h-3 fill-current" />
              <span className="font-medium">4.8</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

interface EquipmentCarouselProps {
  equipments: Equipamento[];
  compact?: boolean;
}

function EquipmentCarousel({ equipments, compact = false }: EquipmentCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const autoplayRef = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true, stopOnMouseEnter: true })
  );

  useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="relative w-full overflow-hidden">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          loop: true,
          containScroll: "trimSnaps",
        }}
        plugins={[autoplayRef.current]}
        className="w-full"
      >
        <CarouselContent className="-ml-2 sm:-ml-3">
          {equipments.map((equipment) => (
            <CarouselItem key={equipment.id} className="pl-2 sm:pl-3 basis-[85%] sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
              <EquipmentCard equipment={equipment} compact={compact} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex left-0 bg-white shadow-lg border-0 hover:bg-primary hover:text-white" />
        <CarouselNext className="hidden md:flex right-0 bg-white shadow-lg border-0 hover:bg-primary hover:text-white" />
      </Carousel>
      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-4">
        {Array.from({ length: Math.min(Math.ceil(equipments.length / 3), 5) }).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              Math.floor(current / 1) === index ? "bg-primary w-4" : "bg-muted-foreground/30"
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const popularEquipments = getEquipamentosPopulares();
  const newEquipments = getEquipamentosNovos();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/buscar?q=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push("/buscar");
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden">
      {/* Hero Section - Responsive */}
      <section className="relative py-6 sm:py-8 lg:py-12 px-3 sm:px-4 overflow-hidden">
        {/* Background - Clean gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-buscamed-primary-light/30 via-buscamed-primary-light/10 to-transparent" />

        {/* Decorative Icons - Hidden on small screens */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none hidden md:block">
          <Stethoscope
            className="absolute -bottom-4 -left-4 w-24 lg:w-32 h-24 lg:h-32 text-emerald-700/[0.10] -rotate-12"
            strokeWidth={1}
          />
          <HeartPulse
            className="absolute top-8 right-8 lg:right-12 w-16 lg:w-20 h-16 lg:h-20 text-emerald-700/[0.12] rotate-12"
            strokeWidth={1.5}
          />
          <Pill
            className="absolute top-1/2 -right-2 w-12 lg:w-16 h-12 lg:h-16 text-emerald-700/[0.10] rotate-45"
            strokeWidth={1.5}
          />
          <Activity
            className="absolute top-16 left-4 lg:left-8 w-10 lg:w-14 h-10 lg:h-14 text-emerald-700/[0.10] -rotate-6"
            strokeWidth={1.5}
          />
          <Syringe
            className="absolute bottom-12 right-16 lg:right-20 w-10 lg:w-12 h-10 lg:h-12 text-emerald-700/[0.08] rotate-[30deg]"
            strokeWidth={1.5}
          />
        </div>

        <div className="container mx-auto relative px-0 sm:px-2">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 leading-tight px-2">
              Encontre o <span className="text-primary">melhor preço</span> para seu equipamento
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground mb-4 sm:mb-6 px-2">
              Compare preços de distribuidores verificados em todo o Brasil
            </p>

            {/* Search Box - Responsive */}
            <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 max-w-xl mx-auto mb-4 sm:mb-6 px-2">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 sm:w-5 h-4 sm:h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Buscar equipamentos, marcas..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-10 sm:h-12 pl-10 sm:pl-12 pr-4 rounded-xl border border-border bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-sm sm:text-base"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto rounded-xl bg-primary hover:bg-buscamed-primary-dark px-6 sm:px-8 h-10 sm:h-12 shadow-lg text-sm sm:text-base"
              >
                Buscar
              </Button>
            </form>

            {/* Quick Category Pills - Responsive */}
            <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 px-2">
              <span className="text-xs sm:text-sm text-muted-foreground mr-1 sm:mr-2">Populares:</span>
              {quickCategories.map((cat) => (
                <Link key={cat.name} href={cat.href}>
                  <Badge
                    variant="secondary"
                    className="px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium cursor-pointer hover:bg-primary hover:text-white transition-colors"
                  >
                    <cat.icon className="w-3 sm:w-3.5 h-3 sm:h-3.5 mr-1 sm:mr-1.5" />
                    {cat.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Responsive */}
      <section className="py-3 sm:py-4 px-2 sm:px-4 bg-white border-y border-border">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-3 sm:gap-6 md:gap-10 lg:gap-12">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-2 justify-center sm:justify-start">
                <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <stat.icon className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-primary" />
                </div>
                <div>
                  <p className="text-base sm:text-lg font-bold text-foreground leading-tight">{stat.value}</p>
                  <p className="text-[10px] sm:text-[11px] text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section - Grid Layout Responsive */}
      <section className="py-4 sm:py-6 px-2 sm:px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-3 sm:mb-4 px-1">
            <h2 className="text-base sm:text-lg font-bold text-foreground">Categorias</h2>
            <Link
              href="/categorias"
              className="text-primary hover:text-buscamed-primary-dark font-medium text-xs flex items-center gap-1"
            >
              Ver todas
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {/* Grid responsivo: 2 colunas em mobile, 3 em sm, 4 em md/lg, scroll horizontal opcional */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
            {categories.map((category) => (
              <Link key={category.name} href={category.href}>
                <div className="group flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg sm:rounded-xl border border-border/50 bg-white hover:shadow-md hover:border-primary/30 transition-all cursor-pointer h-full">
                  <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/10 to-buscamed-accent/10 flex items-center justify-center group-hover:from-primary/20 group-hover:to-buscamed-accent/20 transition-colors shrink-0">
                    <category.icon className="w-4 sm:w-5 h-4 sm:h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-foreground text-xs sm:text-sm leading-tight truncate">
                      {category.name}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">{category.count} itens</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Equipment Section with Carousel */}
      <section className="py-6 sm:py-8 px-2 sm:px-4 bg-muted/30 overflow-hidden">
        <div className="container mx-auto max-w-full overflow-hidden">
          <div className="flex items-center justify-between mb-3 sm:mb-4 px-1">
            <h2 className="text-base sm:text-lg font-bold text-foreground">Equipamentos Populares</h2>
            <Link
              href="/buscar"
              className="text-primary hover:text-buscamed-primary-dark font-medium text-xs flex items-center gap-1"
            >
              Ver todos
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <EquipmentCarousel equipments={popularEquipments} />
        </div>
      </section>

      {/* Recently Added Section with Carousel */}
      <section className="py-6 sm:py-8 px-2 sm:px-4 overflow-hidden">
        <div className="container mx-auto max-w-full overflow-hidden">
          <div className="flex items-center justify-between mb-3 sm:mb-4 px-1">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-foreground">Adicionados Recentemente</h2>
              <p className="text-[10px] sm:text-xs text-muted-foreground">Últimos equipamentos cadastrados</p>
            </div>
            <Link
              href="/buscar?ordenar=recentes"
              className="text-primary hover:text-buscamed-primary-dark font-medium text-xs flex items-center gap-1"
            >
              Ver todos
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <EquipmentCarousel equipments={newEquipments} compact />
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-6 sm:py-8 px-2 sm:px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-3 sm:mb-4 px-1">
            <h2 className="text-base sm:text-lg font-bold text-foreground">Distribuidores Parceiros</h2>
            <Link
              href="/distribuidores"
              className="text-primary hover:text-buscamed-primary-dark font-medium text-xs flex items-center gap-1"
            >
              Ver todos
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="w-20 sm:w-24 h-10 sm:h-12 rounded-lg bg-white border border-border/50 flex items-center justify-center px-2 hover:shadow-md hover:border-primary/30 transition-all cursor-pointer"
              >
                <span className="text-[9px] sm:text-[10px] font-medium text-muted-foreground text-center leading-tight">
                  {partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
