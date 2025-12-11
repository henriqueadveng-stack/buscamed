"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Search,
  Grid3X3,
  Building2,
  TrendingUp,
  User,
  Heart,
  Bell,
  Handshake,
  Menu,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Logo } from "./Logo";

const SIDEBAR_COLLAPSED_KEY = "buscamed-sidebar-collapsed";
const SIDEBAR_WIDTH_EXPANDED = 240;
const SIDEBAR_WIDTH_COLLAPSED = 64;

const mainNavItems = [
  { href: "/", label: "Início", icon: Home },
  { href: "/buscar", label: "Buscar Equipamentos", icon: Search },
  { href: "/categorias", label: "Categorias", icon: Grid3X3 },
  { href: "/distribuidores", label: "Distribuidores", icon: Building2 },
  { href: "/historico", label: "Histórico de Preços", icon: TrendingUp },
];

const accountNavItems = [
  { href: "/login", label: "Login / Minha Conta", icon: User },
  { href: "/carrinho", label: "Carrinho", icon: ShoppingCart, badge: 0 },
  { href: "/favoritos", label: "Favoritos", icon: Heart },
  { href: "/alertas", label: "Alertas de Preço", icon: Bell },
];

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  isCollapsed: boolean;
  badge?: number;
}

function NavItem({ href, label, icon: Icon, isActive, isCollapsed, badge }: NavItemProps) {
  return (
    <Link
      href={href}
      title={isCollapsed ? label : undefined}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium relative",
        isCollapsed ? "justify-center" : "",
        isActive
          ? "bg-primary text-primary-foreground shadow-md"
          : "text-muted-foreground hover:bg-sidebar-accent hover:text-foreground"
      )}
    >
      <Icon className="w-5 h-5 shrink-0" />
      {!isCollapsed && <span className="truncate">{label}</span>}
      {badge !== undefined && badge >= 0 && (
        <span className={cn(
          "min-w-[18px] h-[18px] flex items-center justify-center text-[10px] font-bold rounded-full px-1",
          isCollapsed ? "absolute -top-1 -right-1" : "ml-auto",
          isActive ? "bg-white text-primary" : "bg-primary text-white"
        )}>
          {badge}
        </span>
      )}
    </Link>
  );
}

interface SidebarContentProps {
  isCollapsed: boolean;
}

function SidebarContent({ isCollapsed }: SidebarContentProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full">
      {/* Header: Logo */}
      <div className={cn(
        "flex items-center p-4",
        isCollapsed ? "justify-center" : "justify-start"
      )}>
        <Link href="/">
          <Logo variant={isCollapsed ? "compact" : "full"} />
        </Link>
      </div>

      {/* Spacing */}
      <div className="h-4" />

      {/* Main Navigation */}
      <nav className="flex-1 px-2 overflow-y-auto">
        <ul className="space-y-1">
          {mainNavItems.map((item) => (
            <li key={item.href}>
              <NavItem
                href={item.href}
                label={item.label}
                icon={item.icon}
                isActive={pathname === item.href}
                isCollapsed={isCollapsed}
              />
            </li>
          ))}
        </ul>

        <Separator className="my-4" />

        {/* Account Section Label */}
        {!isCollapsed && (
          <p className="px-3 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Minha Conta
          </p>
        )}

        <ul className="space-y-1">
          {accountNavItems.map((item) => (
            <li key={item.href}>
              <NavItem
                href={item.href}
                label={item.label}
                icon={item.icon}
                isActive={pathname === item.href}
                isCollapsed={isCollapsed}
                badge={item.badge}
              />
            </li>
          ))}
        </ul>
      </nav>

      {/* Partner CTA */}
      <div className={cn("p-3 mt-auto", isCollapsed && "px-2")}>
        {isCollapsed ? (
          <Link href="/parceiro" className="block" title="Seja um Parceiro">
            <Button
              size="icon"
              className="w-full h-10 bg-gradient-to-r from-primary to-buscamed-primary-dark hover:from-buscamed-primary-dark hover:to-primary text-white shadow-lg rounded-xl"
            >
              <Handshake className="w-5 h-5" />
            </Button>
          </Link>
        ) : (
          <Link href="/parceiro" className="block">
            <Button className="w-full bg-gradient-to-r from-primary to-buscamed-primary-dark hover:from-buscamed-primary-dark hover:to-primary text-white shadow-lg rounded-xl py-5">
              <Handshake className="w-5 h-5 mr-2" />
              Seja um Parceiro
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
    if (saved === "true") {
      setIsCollapsed(true);
    }
    setMounted(true);
  }, []);

  const toggleCollapsed = () => {
    const newValue = !isCollapsed;
    setIsCollapsed(newValue);
    localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(newValue));
  };

  // Calculate width - no animation, instant transition
  const width = mounted && isCollapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED;

  return (
    <>
      {/* Toggle Button - FIXED position, completely independent of sidebar hierarchy */}
      <button
        onClick={toggleCollapsed}
        style={{
          left: `${width - 12}px`,
          top: '56px'
        }}
        className="hidden lg:flex fixed w-6 h-6 rounded-full bg-white shadow-lg border border-border items-center justify-center hover:bg-muted hover:scale-110 transition-all z-[9999]"
        aria-label={isCollapsed ? "Expandir menu" : "Colapsar menu"}
      >
        {mounted && isCollapsed ? (
          <ChevronRight className="w-3.5 h-3.5 text-muted-foreground" />
        ) : (
          <ChevronLeft className="w-3.5 h-3.5 text-muted-foreground" />
        )}
      </button>

      {/* Desktop Sidebar */}
      <aside
        style={{ width: `${width}px` }}
        className="hidden lg:flex fixed inset-y-0 left-0 z-40 bg-sidebar border-r border-sidebar-border flex-col"
      >
        {/* Scrollable content inside */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          <SidebarContent isCollapsed={mounted && isCollapsed} />
        </div>
      </aside>

      {/* Spacer - prevents content from going under fixed sidebar */}
      <div
        style={{ width: `${width}px`, minWidth: `${width}px` }}
        className="hidden lg:block shrink-0"
        aria-hidden="true"
      />

      {/* Mobile Menu */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden fixed top-4 left-4 z-50 bg-white/80 backdrop-blur-sm shadow-md rounded-xl"
            aria-label="Abrir menu"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
          <SidebarContent isCollapsed={false} />
        </SheetContent>
      </Sheet>
    </>
  );
}
