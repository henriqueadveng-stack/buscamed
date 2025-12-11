"use client";

import { TrendingDown, TrendingUp, Bell, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function HistoricoPage() {
  return (
    <div className="min-h-screen bg-background w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center">
              <TrendingDown className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Histórico de Preços</h1>
              <p className="text-muted-foreground">
                Acompanhe a variação de preços ao longo do tempo
              </p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Monitore os preços dos equipamentos médicos e tome decisões de compra
            mais inteligentes. Crie alertas para ser notificado quando os preços
            baixarem.
          </p>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="container mx-auto px-4 py-8">
        {/* Busca */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar equipamento para ver histórico..."
                  className="pl-10 h-12"
                />
              </div>
              <Button size="lg">Buscar</Button>
            </div>
          </CardContent>
        </Card>

        {/* Placeholder de gráfico */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Tendências de Mercado</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <TrendingDown className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="font-medium text-lg">Gráfico de tendências</p>
                <p className="text-sm">
                  Selecione um equipamento para visualizar o histórico de preços
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cards informativos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingDown className="w-10 h-10 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Maior Queda do Mês</h3>
              <p className="text-3xl font-bold text-green-600">-18%</p>
              <p className="text-sm text-muted-foreground mt-1">
                Monitor Multiparamétrico
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp className="w-10 h-10 text-red-500 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Maior Alta do Mês</h3>
              <p className="text-3xl font-bold text-red-500">+12%</p>
              <p className="text-sm text-muted-foreground mt-1">
                Ventilador Mecânico
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Bell className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Alertas Ativos</h3>
              <p className="text-3xl font-bold">0</p>
              <p className="text-sm text-muted-foreground mt-1">
                Crie alertas de preço
              </p>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
          <CardContent className="p-8 text-center">
            <Bell className="w-12 h-12 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Crie alertas de preço</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Seja notificado quando o preço do equipamento que você precisa baixar.
              Configure alertas personalizados e economize nas suas compras.
            </p>
            <Link href="/alertas">
              <Button size="lg">
                <Bell className="w-4 h-4 mr-2" />
                Configurar Alertas
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
