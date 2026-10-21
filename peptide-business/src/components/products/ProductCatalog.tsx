"use client";

import React, { useState, useMemo } from "react";
import { Search, SlidersHorizontal, RefreshCcw, Scale, X } from "lucide-react";
import { Product } from "@/types/product";
import { PRODUCT_CATEGORIES } from "@/data/products";
import ProductCard from "./ProductCard";
import ProductDetailModal from "./ProductDetailModal";
import ProductComparisonModal from "./ProductComparisonModal";

interface ProductCatalogProps {
  initialProducts: Product[];
}

export default function ProductCatalog({ initialProducts }: ProductCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Products");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  // Comparison State
  const [comparedProducts, setComparedProducts] = useState<Product[]>([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

  // Filter products based on category and search query
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Category filter
      const matchesCategory =
        selectedCategory === "All Products" || product.category === selectedCategory;

      // Text search filter
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        (product.casNumber && product.casNumber.toLowerCase().includes(query)) ||
        (product.inciName && product.inciName.toLowerCase().includes(query)) ||
        (product.sequence && product.sequence.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [initialProducts, selectedCategory, searchQuery]);

  const handleResetFilters = () => {
    setSelectedCategory("All Products");
    setSearchQuery("");
  };

  const handleToggleCompare = (product: Product) => {
    setComparedProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      if (prev.length >= 4) {
        alert("You can compare up to 4 peptide ingredients simultaneously.");
        return prev;
      }
      return [...prev, product];
    });
  };

  const handleRemoveCompared = (id: string) => {
    setComparedProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <section id="products" className="py-16 sm:py-20 lg:py-24 bg-background relative">
      <div className="container-custom space-y-10">
        {/* Section Editorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-border">
          <div className="space-y-2 max-w-xl">
            <span className="editorial-badge">Ingredient Catalog</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-foreground tracking-tight">
              Featured Peptide Profiles
            </h2>
            <p className="text-sm text-foreground-secondary leading-relaxed">
              Explore organized molecular descriptors, CAS identifiers, and formulation parameters. Submit inquiries directly via our official Telegram contact.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-xs text-foreground-muted">
              Displaying <span className="font-semibold text-foreground">{filteredProducts.length}</span> of{" "}
              {initialProducts.length} ingredients
            </div>

            {comparedProducts.length > 0 && (
              <button
                type="button"
                onClick={() => setIsCompareModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-accent text-background text-xs font-semibold uppercase tracking-wider shadow-sm hover:bg-accent-hover transition-colors"
              >
                <Scale className="w-3.5 h-3.5" />
                <span>Compare ({comparedProducts.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <label htmlFor="catalog-search" className="sr-only">
                Search peptide catalog
              </label>
              <Search className="w-4 h-4 text-foreground-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="catalog-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by peptide, INCI, CAS, or sequence motif..."
                className="w-full pl-10 pr-4 py-2.5 text-xs bg-surface border border-border rounded-lg text-foreground placeholder:text-foreground-muted/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-all"
              />
            </div>

            {/* Category Pills (Horizontal scrolling on mobile) */}
            <div
              role="tablist"
              aria-label="Filter peptide categories"
              className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none"
            >
              {PRODUCT_CATEGORIES.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedCategory(category)}
                    className={`shrink-0 px-3.5 py-2 text-xs font-medium rounded-lg transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      isActive
                        ? "bg-accent text-background font-bold shadow-xs"
                        : "bg-surface border border-border text-foreground-secondary hover:text-foreground hover:bg-background-secondary"
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenQuickView={(p) => setActiveModalProduct(p)}
                onToggleCompare={handleToggleCompare}
                isCompared={comparedProducts.some((p) => p.id === product.id)}
              />
            ))}
          </div>
        ) : (
          /* Empty Search State */
          <div className="text-center py-16 px-4 bg-surface border border-border rounded-xl space-y-4 max-w-md mx-auto">
            <div className="w-12 h-12 rounded-full bg-background-secondary border border-border flex items-center justify-center mx-auto text-foreground-muted">
              <SlidersHorizontal className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-medium text-base text-foreground">
                No matching peptide ingredients found
              </h3>
              <p className="text-xs text-foreground-muted leading-relaxed">
                We couldn&apos;t find any items matching &ldquo;{searchQuery}&rdquo; in this category.
              </p>
            </div>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-md bg-accent text-background font-bold hover:bg-accent-hover transition-colors"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Floating Sticky Compare Drawer Trigger (Mobile/Desktop) */}
      {comparedProducts.length > 0 && (
        <aside
          aria-label="Comparison dock"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-surface/98 backdrop-blur-md border border-border shadow-xl rounded-full px-5 py-3 flex items-center gap-4 animate-fade-in"
        >
          <div className="flex items-center gap-2 text-xs font-medium text-foreground">
            <Scale className="w-4 h-4 text-accent" />
            <span>{comparedProducts.length} selected to compare</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsCompareModalOpen(true)}
              className="px-3.5 py-1.5 rounded-full bg-accent text-background text-xs font-bold uppercase tracking-wider hover:bg-accent-hover transition-colors"
            >
              View Matrix
            </button>
            <button
              type="button"
              onClick={() => setComparedProducts([])}
              className="p-1 rounded-full text-foreground-muted hover:text-foreground"
              aria-label="Clear compared products"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </aside>
      )}

      {/* Quick View Modal */}
      <ProductDetailModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />

      {/* Side-by-side Comparison Matrix Modal */}
      <ProductComparisonModal
        products={comparedProducts}
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        onRemoveProduct={handleRemoveCompared}
      />
    </section>
  );
}
