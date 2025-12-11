"use client";

import Link from "next/link";
import { Building2, Star, Truck, MapPin, ChevronRight, Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { distribuidores } from "@/data/equipamentos";

export default function DistribuidoresPage() {
  return (
    <div className="min-h-screen bg-background w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center">
              <Building2 className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Distribuidores</h1>
              <p className="text-muted-foreground">
                {distribuidores.length} distribuidores parceiros
              </p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Conheça os distribuidores verificados que fazem parte da nossa rede.
            Todos passam por um rigoroso processo de verificação para garantir
            qualidade e confiabilidade.
          </p>
        </div>
      </div>

      {/* Lista de Distribuidores */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {distribuidores.map((distribuidor) => (
            <Card key={distribuidor.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-muted rounded-xl flex items-center justify-center shrink-0">
                    <Building2 className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-semibold text-lg truncate">
                      {distribuidor.nome}
                    </h2>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                      <MapPin className="w-4 h-4" />
                      <span>{distribuidor.localizacao}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{distribuidor.avaliacao}</span>
                    <span className="text-sm text-muted-foreground">avaliação</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-muted-foreground" />
                    <span className="font-semibold">{distribuidor.entregas}</span>
                    <span className="text-sm text-muted-foreground">entregas</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Verificado
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Pronta entrega
                  </Badge>
                </div>

                <Button variant="outline" className="w-full mt-4">
                  Ver produtos
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA para se tornar distribuidor */}
        <Card className="mt-12 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <Package className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">É distribuidor de equipamentos médicos?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Cadastre-se em nossa plataforma e alcance hospitais e clínicas em todo o Brasil.
              Aumente suas vendas e expanda seu negócio.
            </p>
            <Link href="/parceiro">
              <Button size="lg">
                <Building2 className="w-4 h-4 mr-2" />
                Seja um Parceiro
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
