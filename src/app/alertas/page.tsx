"use client";

import { Bell, Plus, Search, TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AlertasPage() {
  return (
    <div className="min-h-screen bg-background w-full max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="border-b bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center">
              <Bell className="w-7 h-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Alertas de Preço</h1>
              <p className="text-muted-foreground">
                Seja notificado quando os preços baixarem
              </p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Configure alertas personalizados para os equipamentos que você precisa.
            Receba notificações por e-mail quando o preço atingir o valor desejado.
          </p>
        </div>
      </div>

      {/* Conteúdo - Estado vazio */}
      <div className="container mx-auto px-4 py-16">
        <Card className="max-w-lg mx-auto">
          <CardContent className="p-12 text-center">
            <Bell className="w-20 h-20 text-muted-foreground/30 mx-auto mb-6" />
            <h2 className="text-xl font-semibold mb-2">
              Nenhum alerta configurado
            </h2>
            <p className="text-muted-foreground mb-6">
              Você ainda não configurou nenhum alerta de preço.
              Busque o equipamento desejado e clique em &ldquo;Criar Alerta&rdquo;
              para ser notificado quando o preço baixar.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/buscar">
                <Button>
                  <Search className="w-4 h-4 mr-2" />
                  Buscar Equipamentos
                </Button>
              </Link>
              <Link href="/historico">
                <Button variant="outline">
                  <TrendingDown className="w-4 h-4 mr-2" />
                  Ver Histórico
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Informações */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-primary">1</span>
              </div>
              <h3 className="font-semibold mb-2">Escolha o Equipamento</h3>
              <p className="text-sm text-muted-foreground">
                Busque e selecione o equipamento que você deseja monitorar
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-primary">2</span>
              </div>
              <h3 className="font-semibold mb-2">Defina o Preço Alvo</h3>
              <p className="text-sm text-muted-foreground">
                Configure o valor máximo que você deseja pagar pelo equipamento
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-xl font-bold text-primary">3</span>
              </div>
              <h3 className="font-semibold mb-2">Receba Notificações</h3>
              <p className="text-sm text-muted-foreground">
                Seja avisado por e-mail quando o preço atingir seu valor alvo
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
