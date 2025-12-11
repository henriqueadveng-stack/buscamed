"use client";

import Link from "next/link";
import {
  Armchair,
  HeartPulse,
  Wind,
  Siren,
  ScanLine,
  Stethoscope,
  Droplets,
  CircleDot,
  Lightbulb,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { categorias } from "@/data/equipamentos";

const iconMap: Record<string, React.ElementType> = {
  Armchair,
  HeartPulse,
  Wind,
  Siren,
  ScanLine,
  Stethoscope,
  Droplets,
  CircleDot,
  Lightbulb,
};

export default function CategoriasPage() {
  return (
    <div className="min-h-screen bg-background w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
          <h1 className="text-3xl font-bold mb-2">Categorias de Equipamentos</h1>
          <p className="text-muted-foreground max-w-2xl">
            Navegue por nossas categorias de equipamentos médicos hospitalares.
            Encontre tudo que você precisa para sua instituição de saúde.
          </p>
        </div>
      </div>

      {/* Grid de Categorias */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categorias.map((categoria) => {
            const IconComponent = iconMap[categoria.icone] || Stethoscope;

            return (
              <Link key={categoria.slug} href={`/categoria/${categoria.slug}`}>
                <Card className="h-full hover:shadow-lg transition-all hover:-translate-y-1 group">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="w-7 h-7 text-primary" />
                    </div>
                    <h2 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                      {categoria.nome}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {categoria.descricao}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">
                        {categoria.quantidade} produtos
                      </Badge>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
