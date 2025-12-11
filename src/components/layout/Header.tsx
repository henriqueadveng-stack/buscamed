"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, Bell, ChevronDown, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categories = [
  "Todas as Categorias",
  "Mobiliário Hospitalar",
  "Monitorização",
  "Ventilação",
  "Emergência",
  "Diagnóstico por Imagem",
  "Diagnóstico",
  "Infusão",
  "Vias Aéreas",
];

export function Header() {
  const [selectedCategory, setSelectedCategory] = useState("Todas as Categorias");
  const cartItemCount = 0; // Placeholder para contagem de itens

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6 gap-4">
        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-2xl">
          <div className="flex items-center w-full bg-white border border-border rounded-xl shadow-sm overflow-hidden focus-within:ring-2 focus-within:ring-primary/50 focus-within:border-primary transition-all">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar equipamentos, marcas..."
                className="border-0 pl-10 pr-4 h-11 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
              />
            </div>

            {/* Category Dropdown */}
            <div className="hidden lg:block border-l border-border">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-11 px-4 rounded-none text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 min-w-[160px] justify-between"
                  >
                    <span className="truncate">{selectedCategory}</span>
                    <ChevronDown className="w-4 h-4 ml-2 flex-shrink-0" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {categories.map((category) => (
                    <DropdownMenuItem
                      key={category}
                      className="cursor-pointer"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Search Button */}
            <Button className="h-11 px-6 rounded-none rounded-r-xl bg-primary hover:bg-buscamed-primary-dark">
              <Search className="w-4 h-4 mr-2" />
              Buscar
            </Button>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <div className="flex md:hidden flex-1 ml-12">
          <div className="flex items-center w-full bg-white border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar..."
                className="border-0 pl-10 pr-2 h-10 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent"
              />
            </div>
            <Button size="icon" className="h-10 w-10 rounded-none rounded-r-xl bg-primary hover:bg-buscamed-primary-dark flex-shrink-0">
              <Search className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Cart */}
          <Link href="/carrinho">
            <Button
              variant="ghost"
              size="icon"
              className="relative rounded-xl hover:bg-sidebar-accent"
              aria-label="Carrinho"
            >
              <ShoppingCart className="w-5 h-5 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center bg-primary text-white text-[10px] font-bold rounded-full px-1">
                {cartItemCount}
              </span>
            </Button>
          </Link>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="relative rounded-xl hover:bg-sidebar-accent"
            aria-label="Notificações"
          >
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-buscamed-alert rounded-full" />
          </Button>

          {/* Auth Buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <Button variant="outline" className="rounded-xl">
              Entrar
            </Button>
            <Button className="rounded-xl bg-primary hover:bg-buscamed-primary-dark">
              Criar Conta
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
