"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Bell,
  Share2,
  ShoppingCart,
  Truck,
  Package,
  Star,
  Check,
  ChevronRight,
  Shield,
  Award,
  Clock,
  TrendingDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getEquipamentoById,
  getDistribuidorById,
  getEquipamentosPorCategoria,
  getMenorPreco,
  getMaiorPreco,
  formatarPreco,
  calcularDesconto,
  type Equipamento,
  type Oferta,
} from "@/data/equipamentos";

function OfertaRow({
  oferta,
  isMelhor,
}: {
  oferta: Oferta;
  isMelhor: boolean;
}) {
  const distribuidor = getDistribuidorById(oferta.distribuidorId);
  if (!distribuidor) return null;

  const temDesconto = oferta.precoAntigo && oferta.precoAntigo > oferta.preco;
  const desconto = temDesconto
    ? calcularDesconto(oferta.preco, oferta.precoAntigo!)
    : 0;

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 rounded-lg border ${
        isMelhor ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
      } transition-colors`}
    >
      {/* Distribuidor */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center shrink-0">
          <Package className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="font-medium text-sm truncate">{distribuidor.nome}</h4>
            {isMelhor && (
              <Badge className="bg-primary text-[10px] px-1.5 py-0">Melhor</Badge>
            )}
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span>{distribuidor.avaliacao}</span>
            <span className="hidden sm:inline">• {distribuidor.entregas} entregas</span>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className="flex items-center gap-3 text-xs">
        {oferta.emEstoque ? (
          <span className="flex items-center gap-1 text-green-600">
            <Check className="w-3 h-3" /> Em estoque
          </span>
        ) : (
          <span className="flex items-center gap-1 text-orange-500">
            <Clock className="w-3 h-3" /> Sob encomenda
          </span>
        )}
        <span className="hidden md:flex items-center gap-1 text-muted-foreground">
          <Truck className="w-3 h-3" />
          {oferta.prazoEntrega}
        </span>
      </div>

      {/* Preço e Ação */}
      <div className="flex items-center justify-between sm:justify-end gap-4">
        <div className="text-right">
          {temDesconto && (
            <div className="flex items-center gap-1 justify-end">
              <span className="text-xs text-muted-foreground line-through">
                {formatarPreco(oferta.precoAntigo!)}
              </span>
              <Badge variant="destructive" className="text-[10px] px-1">
                -{desconto}%
              </Badge>
            </div>
          )}
          <span className="text-lg sm:text-xl font-bold text-primary">
            {formatarPreco(oferta.preco)}
          </span>
          {oferta.frete === 0 && (
            <p className="text-[10px] text-green-600">Frete grátis</p>
          )}
        </div>
        <Button size="sm" className="shrink-0">
          <ShoppingCart className="w-3 h-3 mr-1" />
          <span className="hidden sm:inline">Cotar</span>
        </Button>
      </div>
    </div>
  );
}

function EquipamentoRelacionadoCard({ equipamento }: { equipamento: Equipamento }) {
  const menorPreco = getMenorPreco(equipamento);

  return (
    <Link href={`/equipamento/${equipamento.id}`}>
      <Card className="h-full hover:shadow-md transition-shadow">
        <div className="relative aspect-[16/9] bg-muted">
          <Image
            src={equipamento.imagem}
            alt={equipamento.nome}
            fill
            className="object-cover rounded-t-lg"
          />
          {equipamento.promocao && (
            <Badge className="absolute top-2 left-2 bg-red-500 text-xs">Promoção</Badge>
          )}
        </div>
        <CardContent className="p-3">
          <h4 className="font-medium text-xs sm:text-sm line-clamp-2 mb-1">
            {equipamento.nome}
          </h4>
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground">A partir de</span>
            <span className="font-bold text-sm text-primary">
              {formatarPreco(menorPreco)}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function EquipamentoPage() {
  const params = useParams();
  const id = params.id as string;

  const equipamento = getEquipamentoById(id);

  if (!equipamento) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Equipamento não encontrado</h1>
        <p className="text-muted-foreground mb-8">
          O equipamento que você está procurando não existe ou foi removido.
        </p>
        <Link href="/buscar">
          <Button>Voltar para Busca</Button>
        </Link>
      </div>
    );
  }

  const menorPreco = getMenorPreco(equipamento);
  const maiorPreco = getMaiorPreco(equipamento);
  const ofertasOrdenadas = [...equipamento.ofertas].sort(
    (a, b) => a.preco - b.preco
  );
  const equipamentosRelacionados = getEquipamentosPorCategoria(
    equipamento.categoriaSlug
  )
    .filter((eq) => eq.id !== equipamento.id)
    .slice(0, 4);

  const melhorOferta = ofertasOrdenadas[0];
  const temDescontoGeral =
    melhorOferta?.precoAntigo && melhorOferta.precoAntigo > melhorOferta.preco;
  const descontoGeral = temDescontoGeral
    ? calcularDesconto(melhorOferta.preco, melhorOferta.precoAntigo!)
    : 0;

  return (
    <div className="min-h-screen bg-background w-full max-w-full overflow-x-hidden">
      {/* Breadcrumb - Compact */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-3 sm:px-4 py-2">
          <nav className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-muted-foreground overflow-x-auto">
            <Link href="/" className="hover:text-foreground shrink-0">Início</Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <Link href={`/categoria/${equipamento.categoriaSlug}`} className="hover:text-foreground shrink-0">
              {equipamento.categoria}
            </Link>
            <ChevronRight className="w-3 h-3 shrink-0" />
            <span className="text-foreground truncate max-w-[150px] sm:max-w-[250px]">
              {equipamento.nome}
            </span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Layout Principal - 2 Colunas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 mb-6">
          {/* Coluna Esquerda - Imagem (40%) */}
          <div className="lg:col-span-5">
            <div className="relative bg-muted rounded-xl overflow-hidden" style={{ maxHeight: '350px' }}>
              <div className="aspect-[4/3]">
                <Image
                  src={equipamento.imagem}
                  alt={equipamento.nome}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Badges */}
              <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                {equipamento.novo && (
                  <Badge className="bg-blue-500 text-xs">Novo</Badge>
                )}
                {equipamento.promocao && (
                  <Badge className="bg-red-500 text-xs">Promoção</Badge>
                )}
              </div>
              {/* Ações no canto */}
              <div className="absolute top-3 right-3 flex gap-1.5">
                <Button variant="secondary" size="icon" className="w-8 h-8 bg-white/90 hover:bg-white">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button variant="secondary" size="icon" className="w-8 h-8 bg-white/90 hover:bg-white">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Coluna Direita - Informações (60%) */}
          <div className="lg:col-span-7">
            {/* Cabeçalho */}
            <div className="mb-3">
              <Badge variant="outline" className="mb-2 text-xs">
                {equipamento.categoria}
              </Badge>
              <h1 className="text-xl sm:text-2xl font-bold leading-tight mb-1">
                {equipamento.nome}
              </h1>
              {equipamento.marca && (
                <p className="text-sm text-muted-foreground">
                  {equipamento.marca}
                  {equipamento.modelo && ` • ${equipamento.modelo}`}
                </p>
              )}
            </div>

            {/* Descrição Curta */}
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {equipamento.descricao}
            </p>

            {/* Card de Preço - Compacto */}
            <Card className="bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20 mb-4">
              <CardContent className="p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <p className="text-xs text-muted-foreground mb-0.5">Menor preço</p>
                    <div className="flex items-center gap-2">
                      {temDescontoGeral && (
                        <span className="text-sm text-muted-foreground line-through">
                          {formatarPreco(melhorOferta.precoAntigo!)}
                        </span>
                      )}
                      <span className="text-2xl sm:text-3xl font-bold text-primary">
                        {formatarPreco(menorPreco)}
                      </span>
                      {temDescontoGeral && (
                        <Badge variant="destructive" className="text-xs">-{descontoGeral}%</Badge>
                      )}
                    </div>
                    {melhorOferta?.parcelamento && (
                      <p className="text-xs text-muted-foreground">
                        ou {melhorOferta.parcelamento}
                      </p>
                    )}
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-xs text-muted-foreground">
                      {equipamento.ofertas.length} ofertas
                    </p>
                    {maiorPreco !== menorPreco && (
                      <p className="text-xs text-green-600 font-medium">
                        Economize até {formatarPreco(maiorPreco - menorPreco)}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Info ANVISA e Garantia */}
            <div className="flex flex-wrap gap-3 sm:gap-4 mb-4 text-xs sm:text-sm">
              {equipamento.registroAnvisa && (
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>ANVISA: {equipamento.registroAnvisa}</span>
                </div>
              )}
              {equipamento.garantia && (
                <div className="flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-blue-600" />
                  <span>Garantia: {equipamento.garantia}</span>
                </div>
              )}
            </div>

            {/* Botões de Ação */}
            <div className="flex gap-2 sm:gap-3">
              <Button className="flex-1" size="default">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Solicitar Cotação
              </Button>
              <Button variant="outline" size="default">
                <Bell className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">Alerta</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Comparação de Preços - Logo abaixo */}
        <Card className="mb-6">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-base sm:text-lg flex items-center justify-between">
              <span>Comparar Preços</span>
              <Badge variant="secondary" className="text-xs">
                {equipamento.ofertas.length} distribuidores
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-3 sm:px-4 pb-4 space-y-2">
            {ofertasOrdenadas.map((oferta, index) => (
              <OfertaRow
                key={oferta.id}
                oferta={oferta}
                isMelhor={index === 0}
              />
            ))}
          </CardContent>
        </Card>

        {/* Especificações Técnicas */}
        <Card className="mb-6">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-base sm:text-lg">Especificações Técnicas</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {equipamento.especificacoes.map((spec, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Histórico de Preços */}
        <Card className="mb-6">
          <CardHeader className="py-3 px-4">
            <CardTitle className="text-base sm:text-lg flex items-center gap-2">
              <TrendingDown className="w-5 h-5" />
              Histórico de Preços
            </CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="h-32 sm:h-40 bg-muted/50 rounded-lg flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <TrendingDown className="w-8 h-8 mx-auto mb-1 opacity-50" />
                <p className="text-sm">Gráfico de variação de preços</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Equipamentos Relacionados */}
        {equipamentosRelacionados.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base sm:text-lg font-bold">Equipamentos Relacionados</h2>
              <Link
                href={`/categoria/${equipamento.categoriaSlug}`}
                className="text-xs sm:text-sm text-primary hover:underline flex items-center gap-1"
              >
                Ver todos
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {equipamentosRelacionados.map((eq) => (
                <EquipamentoRelacionadoCard key={eq.id} equipamento={eq} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
