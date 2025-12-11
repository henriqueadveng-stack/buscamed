"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Filter,
  SlidersHorizontal,
  Grid3X3,
  List,
  ChevronDown,
  X,
  Check,
  Star,
  Truck,
  Package,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import {
  equipamentos,
  categorias,
  buscarEquipamentos,
  getMenorPreco,
  getMaiorPreco,
  formatarPreco,
  calcularDesconto,
  type Equipamento,
} from "@/data/equipamentos";

type ViewMode = "grid" | "list";
type SortOption = "relevancia" | "menor-preco" | "maior-preco" | "nome" | "mais-novo";

function EquipamentoCard({
  equipamento,
  viewMode,
}: {
  equipamento: Equipamento;
  viewMode: ViewMode;
}) {
  const menorPreco = getMenorPreco(equipamento);
  const maiorPreco = getMaiorPreco(equipamento);
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
                {equipamento.promocao && (
                  <Badge className="absolute top-1 left-1 bg-red-500 text-[10px] px-1.5 py-0.5">
                    -{desconto}%
                  </Badge>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <Badge variant="outline" className="text-xs mb-1">
                      {equipamento.categoria}
                    </Badge>
                    <h3 className="font-semibold line-clamp-1">
                      {equipamento.nome}
                    </h3>
                    {equipamento.marca && (
                      <p className="text-sm text-muted-foreground">
                        {equipamento.marca}
                      </p>
                    )}
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
                    {maiorPreco !== menorPreco && (
                      <p className="text-xs text-muted-foreground">
                        até {formatarPreco(maiorPreco)}
                      </p>
                    )}
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
            {equipamento.promocao && (
              <Badge className="bg-red-500 text-xs">-{desconto}%</Badge>
            )}
          </div>
        </div>
        <CardContent className="p-4">
          <Badge variant="outline" className="text-xs mb-2">
            {equipamento.categoria}
          </Badge>
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

function FiltersSidebar({
  selectedCategories,
  setSelectedCategories,
  showInStock,
  setShowInStock,
  showPromo,
  setShowPromo,
  priceRange,
  setPriceRange,
}: {
  selectedCategories: string[];
  setSelectedCategories: (cats: string[]) => void;
  showInStock: boolean;
  setShowInStock: (v: boolean) => void;
  showPromo: boolean;
  setShowPromo: (v: boolean) => void;
  priceRange: [number, number];
  setPriceRange: (r: [number, number]) => void;
}) {
  const toggleCategory = (slug: string) => {
    if (selectedCategories.includes(slug)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== slug));
    } else {
      setSelectedCategories([...selectedCategories, slug]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Categorias */}
      <div>
        <h3 className="font-semibold mb-3">Categorias</h3>
        <div className="space-y-2">
          {categorias.map((cat) => (
            <div key={cat.slug} className="flex items-center space-x-2">
              <Checkbox
                id={`cat-${cat.slug}`}
                checked={selectedCategories.includes(cat.slug)}
                onCheckedChange={() => toggleCategory(cat.slug)}
              />
              <Label
                htmlFor={`cat-${cat.slug}`}
                className="text-sm cursor-pointer flex-1"
              >
                {cat.nome}
              </Label>
              <span className="text-xs text-muted-foreground">
                ({cat.quantidade})
              </span>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Disponibilidade */}
      <div>
        <h3 className="font-semibold mb-3">Disponibilidade</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="em-estoque"
              checked={showInStock}
              onCheckedChange={(checked) => setShowInStock(checked as boolean)}
            />
            <Label htmlFor="em-estoque" className="text-sm cursor-pointer">
              Em estoque
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="promocao"
              checked={showPromo}
              onCheckedChange={(checked) => setShowPromo(checked as boolean)}
            />
            <Label htmlFor="promocao" className="text-sm cursor-pointer">
              Em promoção
            </Label>
          </div>
        </div>
      </div>

      <Separator />

      {/* Faixa de Preço */}
      <div>
        <h3 className="font-semibold mb-3">Faixa de Preço</h3>
        <div className="space-y-3">
          <div className="flex gap-2">
            <Input
              type="number"
              placeholder="Mín"
              value={priceRange[0] || ""}
              onChange={(e) =>
                setPriceRange([Number(e.target.value) || 0, priceRange[1]])
              }
              className="h-9"
            />
            <Input
              type="number"
              placeholder="Máx"
              value={priceRange[1] || ""}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value) || 0])
              }
              className="h-9"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPriceRange([0, 5000])}
            >
              Até R$ 5.000
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPriceRange([5000, 20000])}
            >
              R$ 5.000 - R$ 20.000
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPriceRange([20000, 0])}
            >
              Acima de R$ 20.000
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BuscarPageContent() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") || "";

  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sortBy, setSortBy] = useState<SortOption>("relevancia");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [showInStock, setShowInStock] = useState(false);
  const [showPromo, setShowPromo] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const filteredEquipamentos = useMemo(() => {
    let results = searchTerm
      ? buscarEquipamentos(searchTerm)
      : [...equipamentos];

    // Filtrar por categorias
    if (selectedCategories.length > 0) {
      results = results.filter((eq) =>
        selectedCategories.includes(eq.categoriaSlug)
      );
    }

    // Filtrar por estoque
    if (showInStock) {
      results = results.filter((eq) => eq.ofertas.some((o) => o.emEstoque));
    }

    // Filtrar por promoção
    if (showPromo) {
      results = results.filter((eq) => eq.promocao);
    }

    // Filtrar por preço
    if (priceRange[0] > 0 || priceRange[1] > 0) {
      results = results.filter((eq) => {
        const menor = getMenorPreco(eq);
        if (priceRange[0] > 0 && menor < priceRange[0]) return false;
        if (priceRange[1] > 0 && menor > priceRange[1]) return false;
        return true;
      });
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
      case "mais-novo":
        results.sort(
          (a, b) =>
            new Date(b.dataCadastro).getTime() -
            new Date(a.dataCadastro).getTime()
        );
        break;
    }

    return results;
  }, [
    searchTerm,
    selectedCategories,
    showInStock,
    showPromo,
    priceRange,
    sortBy,
  ]);

  const clearFilters = () => {
    setSelectedCategories([]);
    setShowInStock(false);
    setShowPromo(false);
    setPriceRange([0, 0]);
  };

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    showInStock ||
    showPromo ||
    priceRange[0] > 0 ||
    priceRange[1] > 0;

  return (
    <div className="min-h-screen bg-background w-full max-w-full overflow-x-hidden">
      {/* Header de Busca */}
      <div className="border-b bg-muted/30 sticky top-0 z-10">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Campo de Busca */}
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar equipamentos médicos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base"
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>

            {/* Controles */}
            <div className="flex items-center gap-2 w-full md:w-auto">
              {/* Filtros Mobile */}
              <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="lg:hidden">
                    <Filter className="w-4 h-4 mr-2" />
                    Filtros
                    {hasActiveFilters && (
                      <Badge variant="secondary" className="ml-2">
                        {selectedCategories.length +
                          (showInStock ? 1 : 0) +
                          (showPromo ? 1 : 0)}
                      </Badge>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-80">
                  <SheetHeader>
                    <SheetTitle>Filtros</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FiltersSidebar
                      selectedCategories={selectedCategories}
                      setSelectedCategories={setSelectedCategories}
                      showInStock={showInStock}
                      setShowInStock={setShowInStock}
                      showPromo={showPromo}
                      setShowPromo={setShowPromo}
                      priceRange={priceRange}
                      setPriceRange={setPriceRange}
                    />
                  </div>
                </SheetContent>
              </Sheet>

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
                  <SelectItem value="mais-novo">Mais recentes</SelectItem>
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
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-8">
          {/* Sidebar Filtros - Desktop */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold">Filtros</h2>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-xs"
                  >
                    Limpar filtros
                  </Button>
                )}
              </div>
              <FiltersSidebar
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                showInStock={showInStock}
                setShowInStock={setShowInStock}
                showPromo={showPromo}
                setShowPromo={setShowPromo}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />
            </div>
          </aside>

          {/* Conteúdo Principal */}
          <main className="flex-1 min-w-0">
            {/* Contador de Resultados */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                {filteredEquipamentos.length} resultado
                {filteredEquipamentos.length !== 1 ? "s" : ""} encontrado
                {filteredEquipamentos.length !== 1 ? "s" : ""}
                {searchTerm && (
                  <>
                    {" "}
                    para{" "}
                    <span className="font-semibold text-foreground">
                      &ldquo;{searchTerm}&rdquo;
                    </span>
                  </>
                )}
              </p>
            </div>

            {/* Filtros Ativos */}
            {hasActiveFilters && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedCategories.map((slug) => {
                  const cat = categorias.find((c) => c.slug === slug);
                  return (
                    <Badge
                      key={slug}
                      variant="secondary"
                      className="cursor-pointer"
                      onClick={() =>
                        setSelectedCategories(
                          selectedCategories.filter((c) => c !== slug)
                        )
                      }
                    >
                      {cat?.nome}
                      <X className="w-3 h-3 ml-1" />
                    </Badge>
                  );
                })}
                {showInStock && (
                  <Badge
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => setShowInStock(false)}
                  >
                    Em estoque
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                )}
                {showPromo && (
                  <Badge
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => setShowPromo(false)}
                  >
                    Em promoção
                    <X className="w-3 h-3 ml-1" />
                  </Badge>
                )}
              </div>
            )}

            {/* Lista de Resultados */}
            {filteredEquipamentos.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
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
                  Nenhum resultado encontrado
                </h3>
                <p className="text-muted-foreground mb-6">
                  Tente ajustar os filtros ou buscar por outro termo.
                </p>
                <Button onClick={clearFilters}>Limpar filtros</Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function BuscarPageLoading() {
  return (
    <div className="min-h-screen bg-background w-full flex items-center justify-center">
      <div className="text-center">
        <Search className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4 animate-pulse" />
        <p className="text-muted-foreground">Carregando...</p>
      </div>
    </div>
  );
}

export default function BuscarPage() {
  return (
    <Suspense fallback={<BuscarPageLoading />}>
      <BuscarPageContent />
    </Suspense>
  );
}
