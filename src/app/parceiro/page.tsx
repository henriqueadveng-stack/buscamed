"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building2,
  Check,
  ArrowRight,
  Users,
  TrendingUp,
  Shield,
  Headphones,
  Mail,
  Phone,
  User,
  MapPin,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const beneficios = [
  {
    icon: Users,
    title: "Alcance Nacional",
    description: "Conecte-se com hospitais e clínicas em todo o Brasil",
  },
  {
    icon: TrendingUp,
    title: "Aumente suas Vendas",
    description: "Exponha seus produtos para compradores qualificados",
  },
  {
    icon: Shield,
    title: "Credibilidade",
    description: "Selo de verificação que aumenta a confiança dos compradores",
  },
  {
    icon: Headphones,
    title: "Suporte Dedicado",
    description: "Equipe especializada para ajudar no seu sucesso",
  },
];

const planos = [
  {
    nome: "Básico",
    preco: "Grátis",
    descricao: "Para começar a vender na plataforma",
    features: [
      "Até 20 produtos cadastrados",
      "Perfil da empresa",
      "Receba cotações",
      "Suporte por e-mail",
    ],
    destaque: false,
  },
  {
    nome: "Profissional",
    preco: "R$ 299/mês",
    descricao: "Para empresas em crescimento",
    features: [
      "Produtos ilimitados",
      "Destaque nas buscas",
      "Relatórios de desempenho",
      "Selo de parceiro verificado",
      "Suporte prioritário",
    ],
    destaque: true,
  },
  {
    nome: "Enterprise",
    preco: "Sob consulta",
    descricao: "Para grandes distribuidores",
    features: [
      "Tudo do Profissional",
      "API de integração",
      "Gerente de conta dedicado",
      "Treinamento personalizado",
      "SLA garantido",
    ],
    destaque: false,
  },
];

export default function ParceiroPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1500);
  };

  return (
    <div className="min-h-screen bg-background w-full max-w-full overflow-x-hidden">
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-b">
        <div className="container mx-auto px-3 sm:px-4 py-12 lg:py-20">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4" variant="secondary">
              Programa de Parceiros
            </Badge>
            <h1 className="text-3xl lg:text-5xl font-bold mb-6">
              Seja um Parceiro BuscaMed
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Cadastre sua empresa como distribuidor e alcance milhares de
              hospitais e clínicas em todo o Brasil. Aumente suas vendas com a
              maior plataforma de equipamentos médicos do país.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-base">
                <Building2 className="w-5 h-5 mr-2" />
                Cadastrar Empresa
              </Button>
              <Button size="lg" variant="outline" className="text-base">
                Falar com Consultor
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Benefícios */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-12">
          Por que ser um parceiro BuscaMed?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {beneficios.map((beneficio, index) => (
            <Card key={index} className="text-center">
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <beneficio.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{beneficio.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {beneficio.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Planos */}
      <div className="bg-muted/30 border-y">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-4">
            Planos para Distribuidores
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Escolha o plano ideal para o tamanho da sua empresa e comece a
            vender hoje mesmo.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {planos.map((plano, index) => (
              <Card
                key={index}
                className={
                  plano.destaque
                    ? "border-primary shadow-lg relative"
                    : ""
                }
              >
                {plano.destaque && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary">Mais Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-2">
                  <CardTitle>{plano.nome}</CardTitle>
                  <CardDescription>{plano.descricao}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="text-3xl font-bold mb-6">{plano.preco}</div>
                  <ul className="space-y-3 text-left mb-6">
                    {plano.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plano.destaque ? "default" : "outline"}
                  >
                    Começar Agora
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Formulário */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Cadastre sua Empresa</CardTitle>
              <CardDescription>
                Preencha o formulário abaixo e nossa equipe entrará em contato
                em até 24 horas.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome completo</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="nome"
                        placeholder="Seu nome"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="empresa">Nome da empresa</Label>
                    <div className="relative">
                      <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="empresa"
                        placeholder="Sua empresa"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="email@empresa.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="telefone"
                        type="tel"
                        placeholder="(00) 00000-0000"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cidade">Cidade/Estado</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="cidade"
                      placeholder="São Paulo, SP"
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mensagem">Mensagem (opcional)</Label>
                  <Textarea
                    id="mensagem"
                    placeholder="Conte-nos mais sobre sua empresa e seus produtos..."
                    rows={4}
                  />
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? "Enviando..." : "Enviar Cadastro"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>

                <p className="text-xs text-center text-muted-foreground">
                  Ao enviar, você concorda com nossos{" "}
                  <Link href="/termos" className="text-primary hover:underline">
                    Termos de Uso
                  </Link>{" "}
                  e{" "}
                  <Link href="/privacidade" className="text-primary hover:underline">
                    Política de Privacidade
                  </Link>
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
