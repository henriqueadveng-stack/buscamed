"use client";

import { ShoppingCart, Search, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CarrinhoPage() {
  return (
    <div className="min-h-screen bg-background w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center">
              <ShoppingCart className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Carrinho de Cotações</h1>
              <p className="text-muted-foreground">
                Seus equipamentos para cotação
              </p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Adicione equipamentos ao carrinho para solicitar cotações de
            múltiplos itens de uma só vez aos distribuidores.
          </p>
        </div>
      </div>

      {/* Conteúdo - Estado vazio */}
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-lg mx-auto">
          <CardContent className="p-12 text-center">
            <ShoppingCart className="w-20 h-20 text-muted-foreground/30 mx-auto mb-6" />
            <h2 className="text-xl font-semibold mb-2">
              Seu carrinho está vazio
            </h2>
            <p className="text-muted-foreground mb-6">
              Você ainda não adicionou nenhum equipamento ao carrinho de cotações.
              Explore nosso catálogo e adicione os itens que você precisa.
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

        {/* Como funciona */}
        <div className="mt-12 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-center mb-8">Como funciona</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">1</span>
                </div>
                <h3 className="font-semibold mb-2">Adicione Equipamentos</h3>
                <p className="text-sm text-muted-foreground">
                  Busque e adicione os equipamentos que você precisa ao carrinho
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">2</span>
                </div>
                <h3 className="font-semibold mb-2">Solicite Cotações</h3>
                <p className="text-sm text-muted-foreground">
                  Envie uma solicitação de cotação para múltiplos distribuidores
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold text-primary">3</span>
                </div>
                <h3 className="font-semibold mb-2">Compare e Escolha</h3>
                <p className="text-sm text-muted-foreground">
                  Receba as cotações e escolha a melhor opção para sua necessidade
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
