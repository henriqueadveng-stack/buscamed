"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Search,
  Grid3X3,
  List,
  SlidersHorizontal,
  Check,
  Package,
  ChevronRight,
  Armchair,
  HeartPulse,
  Wind,
  Siren,
  ScanLine,
  Stethoscope,
  Droplets,
  CircleDot,
  Lightbulb,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  getCategoriaBySlug,
  getEquipamentosPorCategoria,
  getMenorPreco,
  formatarPreco,
  calcularDesconto,
  type Equipamento,
} from "@/data/equipamentos";

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

type ViewMode = "grid" | "list";
type SortOption = "relevancia" | "menor-preco" | "maior-preco" | "nome";

function EquipamentoCard({
  equipamento,
  viewMode,
}: {
  equipamento: Equipamento;
  viewMode: ViewMode;
}) {
  const menorPreco = getMenorPreco(equipamento);
  const ofertaMaisBarata = equipamento.ofertas.find(
    (o) => o.preco === menorPreco
  );
  const temDesconto =
    ofertaMaisBarata?.precoAntigo &&
    ofertaMaisBarata.precoAntigo > ofertaMaisBarata.preco;
  const desconto = temDesconto
    ? calcularDesconto(ofertaMaisBarata.preco, ofertaMaisBarata.precoAntigo!)
    : 0;

  if (viewMode === "list") {
    return (
      <Link href={`/equipamento/${equipamento.id}`}>
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex gap-4">
              <div className="relative w-32 h-24 bg-muted rounded-lg shrink-0 overflow-hidden">
                <Image
                  src={equipamento.imagem}
                  alt={equipamento.nome}
                  fill
                  className="object-cover"
                />
                {equipamento.promocao && desconto > 0 && (
                  <Badge className="absolute top-1 left-1 bg-red-500 text-[10px] px-1.5 py-0.5">
                    -{desconto}%
                  </Badge>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-semibold line-clamp-1">
                      {equipamento.nome}
                    </h3>
                    {equipamento.marca && (
                      <p className="text-sm text-muted-foreground">
                        {equipamento.marca}
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {equipamento.descricao}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    {temDesconto && (
                      <span className="text-sm text-muted-foreground line-through block">
                        {formatarPreco(ofertaMaisBarata.precoAntigo!)}
                      </span>
                    )}
                    <span className="text-xl font-bold text-primary">
                      {formatarPreco(menorPreco)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Package className="w-3 h-3" />
                    {equipamento.ofertas.length} ofertas
                  </span>
                  {equipamento.ofertas.some((o) => o.emEstoque) && (
                    <span className="flex items-center gap-1 text-green-600">
                      <Check className="w-3 h-3" />
                      Em estoque
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/equipamento/${equipamento.id}`}>
      <Card className="h-full hover:shadow-md transition-shadow group">
        <div className="relative aspect-[16/9] bg-muted overflow-hidden">
          <Image
            src={equipamento.imagem}
            alt={equipamento.nome}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-2 left-2 flex flex-wrap gap-1">
            {equipamento.novo && (
              <Badge className="bg-blue-500 text-xs">Novo</Badge>
            )}
            {equipamento.promocao && desconto > 0 && (
              <Badge className="bg-red-500 text-xs">-{desconto}%</Badge>
            )}
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold line-clamp-2 text-sm mb-2 min-h-[40px]">
            {equipamento.nome}
          </h3>
          {equipamento.marca && (
            <p className="text-xs text-muted-foreground mb-2">
              {equipamento.marca}
            </p>
          )}
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs text-muted-foreground">A partir de</p>
              {temDesconto && (
                <span className="text-xs text-muted-foreground line-through">
                  {formatarPreco(ofertaMaisBarata.precoAntigo!)}
                </span>
              )}
              <span className="text-lg font-bold text-primary block">
                {formatarPreco(menorPreco)}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-muted-foreground">
                {equipamento.ofertas.length} ofertas
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function CategoriaPage() {
  const params = useParams();
  const slug = params.slug as string;

  const categoria = getCategoriaBySlug(slug);
  const equipamentosCategoria = getEquipamentosPorCategoria(slug);

  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("relevancia");

  const filteredEquipamentos = useMemo(() => {
    let results = [...equipamentosCategoria];

    // Filtrar por busca
    if (searchTerm) {
      const termo = searchTerm.toLowerCase();
      results = results.filter(
        (eq) =>
          eq.nome.toLowerCase().includes(termo) ||
          eq.descricao.toLowerCase().includes(termo) ||
          (eq.marca && eq.marca.toLowerCase().includes(termo))
      );
    }

    // Ordenar
    switch (sortBy) {
      case "menor-preco":
        results.sort((a, b) => getMenorPreco(a) - getMenorPreco(b));
        break;
      case "maior-preco":
        results.sort((a, b) => getMenorPreco(b) - getMenorPreco(a));
        break;
      case "nome":
        results.sort((a, b) => a.nome.localeCompare(b.nome));
        break;
    }

    return results;
  }, [equipamentosCategoria, searchTerm, sortBy]);

  if (!categoria) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Categoria não encontrada</h1>
        <p className="text-muted-foreground mb-8">
          A categoria que você está procurando não existe.
        </p>
        <Link href="/categorias">
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Ver todas as categorias
          </Button>
        </Link>
      </div>
    );
  }

  const IconComponent = iconMap[categoria.icone] || Stethoscope;

  return (
    <div className="min-h-screen bg-background w-full max-w-full overflow-x-hidden">
      {/* Breadcrumb */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-3 sm:px-4 py-3">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">
              Início
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              href="/categorias"
              className="hover:text-foreground transition-colors"
            >
              Categorias
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground font-medium">{categoria.nome}</span>
          </nav>
        </div>
      </div>

      {/* Header da Categoria */}
      <div className="border-b bg-gradient-to-r from-primary/5 to-primary/10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-start gap-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center shrink-0">
              <IconComponent className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold mb-2">
                {categoria.nome}
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                {categoria.descricao}
              </p>
              <Badge variant="secondary" className="mt-3">
                {filteredEquipamentos.length} equipamentos encontrados
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Controles */}
      <div className="border-b sticky top-0 z-10 bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Busca dentro da categoria */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder={`Buscar em ${categoria.nome}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-10"
              />
            </div>

            {/* Ordenação */}
            <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
              <SelectTrigger className="w-[180px]">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevancia">Relevância</SelectItem>
                <SelectItem value="menor-preco">Menor preço</SelectItem>
                <SelectItem value="maior-preco">Maior preço</SelectItem>
                <SelectItem value="nome">Nome A-Z</SelectItem>
              </SelectContent>
            </Select>

            {/* Modo de Visualização */}
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                className="rounded-r-none"
                onClick={() => setViewMode("grid")}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                className="rounded-l-none"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Equipamentos */}
      <div className="container mx-auto px-4 py-8">
        {filteredEquipamentos.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }
          >
            {filteredEquipamentos.map((eq) => (
              <EquipamentoCard
                key={eq.id}
                equipamento={eq}
                viewMode={viewMode}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">
              Nenhum equipamento encontrado
            </h3>
            <p className="text-muted-foreground mb-6">
              Tente buscar por outro termo ou explore outras categorias.
            </p>
            <Link href="/categorias">
              <Button variant="outline">Ver outras categorias</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
