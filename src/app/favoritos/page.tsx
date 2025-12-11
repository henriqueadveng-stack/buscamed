"use client";

import { Heart, Search, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function FavoritosPage() {
  return (
    <div className="min-h-screen bg-background w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center">
              <Heart className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Favoritos</h1>
              <p className="text-muted-foreground">
                Seus equipamentos salvos
              </p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Salve os equipamentos que você está interessado para acompanhar
            preços e disponibilidade.
          </p>
        </div>
      </div>

      {/* Conteúdo - Estado vazio */}
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-lg mx-auto">
          <CardContent className="p-12 text-center">
            <Heart className="w-20 h-20 text-muted-foreground/30 mx-auto mb-6" />
            <h2 className="text-xl font-semibold mb-2">
              Nenhum favorito ainda
            </h2>
            <p className="text-muted-foreground mb-6">
              Você ainda não adicionou nenhum equipamento aos seus favoritos.
              Explore nosso catálogo e salve os itens que interessam você.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/buscar">
                <Button>
                  <Search className="w-4 h-4 mr-2" />
                  Buscar Equipamentos
                </Button>
              </Link>
              <Link href="/categorias">
                <Button variant="outline">Ver Categorias</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
