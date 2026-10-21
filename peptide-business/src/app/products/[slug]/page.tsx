import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import {
  ArrowLeft,
  ShieldCheck,
  FileText,
  Dna,
  AlertCircle,
  FlaskConical,
} from "lucide-react";
import { PRODUCTS, getProductBySlug, getAllProductSlugs } from "@/data/products";
import { constructMetadata, generateProductSchema, generateBreadcrumbSchema } from "@/lib/seo";
import ProductDetailActions from "@/components/products/ProductDetailActions";

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const product = getProductBySlug(params.slug);
  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return constructMetadata({
    title: `${product.name} — Technical Specifications`,
    description: product.description,
    image: product.image,
    canonical: `/products/${product.slug}`,
  });
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const productSchema = generateProductSchema(product);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Products", url: "/#products" },
    { name: product.name, url: `/products/${product.slug}` },
  ]);

  // Find related products in the same category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.slug !== product.slug
  ).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <main className="py-8 sm:py-12 bg-[#101513] min-h-screen text-foreground">
        <div className="container-custom space-y-8 sm:space-y-12">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs text-foreground-muted">
            <Link href="/" className="hover:text-foreground transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/#products" className="hover:text-foreground transition-colors">
              Products
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </span>
          </nav>

          {/* Main Product Presentation */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left: Product Image Surface (Pure laboratory & amber glass photography) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-square w-full min-h-[320px] sm:min-h-[420px] rounded-2xl bg-[#222C26] border border-[#354239] overflow-hidden shadow-xl">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 45vw, 520px"
                  className="object-cover object-center"
                />
                <div className="absolute top-4 left-4">
                  <span className="editorial-badge bg-[#222C26]/90 backdrop-blur-xs">
                    {product.category}
                  </span>
                </div>
              </div>

              {/* Informational assurance */}
              <div className="p-4 rounded-xl bg-[#19211D] border border-[#354239] text-xs text-foreground-muted space-y-2">
                <div className="flex items-center gap-2 text-foreground font-medium">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <span>Direct Inquiry Verification</span>
                </div>
                <p className="leading-relaxed">
                  Authentic batch analysis, COA documentation, and formulation inquiries are coordinated directly via our official Telegram contact.
                </p>
              </div>
            </div>

            {/* Right: Product Details & Specs */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <div className="space-y-2 border-b border-[#354239] pb-6">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-accent bg-accent/15 border border-accent/25 px-2.5 py-1 rounded">
                    {product.casNumber ? `CAS: ${product.casNumber}` : "Reference Batch"}
                  </span>
                  <span className="text-xs text-foreground-muted font-mono">
                    ID: {product.id}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl font-display font-medium text-foreground tracking-tight leading-snug">
                  {product.name}
                </h1>

                {product.inciName && (
                  <p className="text-xs sm:text-sm font-mono text-foreground-muted">
                    INCI: <span className="text-accent">{product.inciName}</span>
                  </p>
                )}
              </div>

              {/* Product Narrative */}
              <div className="space-y-4 text-sm sm:text-base text-foreground-muted leading-relaxed font-normal">
                <p>{product.description}</p>
                {product.extendedDescription && <p>{product.extendedDescription}</p>}
              </div>

              {/* Molecular Amino Acid Sequence Architecture */}
              {product.sequence && (
                <div className="p-4 rounded-xl bg-[#222C26] border border-[#354239] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-foreground flex items-center gap-1.5 font-mono">
                      <Dna className="w-4 h-4 text-accent" />
                      Amino Acid Sequence Architecture
                    </span>
                    <span className="text-[10px] font-mono text-accent bg-accent/15 border border-accent/25 px-2 py-0.5 rounded">
                      pH {product.suggestedPh || "5.0 - 7.0"}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {product.aminoAcids ? (
                      product.aminoAcids.map((aa, idx) => (
                        <div
                          key={idx}
                          className={`px-2.5 py-1 rounded-md text-xs font-mono font-medium border flex items-center gap-1 ${
                            aa.type === "basic"
                              ? "bg-blue-950/40 text-blue-300 border-blue-800/50"
                              : aa.type === "acidic"
                              ? "bg-red-950/40 text-red-300 border-red-800/50"
                              : aa.type === "aromatic"
                              ? "bg-amber-950/40 text-amber-300 border-amber-800/50"
                              : aa.type === "terminal"
                              ? "bg-purple-950/40 text-purple-300 border-purple-800/50"
                              : "bg-[#19211D] text-foreground border-[#354239]"
                          }`}
                        >
                          <span>{aa.abbr}</span>
                          {aa.charge && <span className="text-[10px] opacity-75 font-bold">{aa.charge}</span>}
                        </div>
                      ))
                    ) : (
                      <span className="font-mono text-xs text-foreground bg-[#19211D] px-3 py-1 rounded border border-[#354239]">
                        {product.sequence}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Technical Specifications Table */}
              <div className="space-y-3 pt-2">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground flex items-center gap-2 font-mono">
                  <FileText className="w-4 h-4 text-accent" />
                  Technical Descriptors &amp; Parameters
                </h2>

                <div className="border border-[#354239] rounded-xl overflow-hidden bg-[#222C26] text-xs shadow-md">
                  <table className="w-full border-collapse">
                    <tbody className="divide-y divide-[#354239]">
                      {product.casNumber && (
                        <tr>
                          <td className="py-3 px-4 font-medium text-foreground-muted w-2/5">CAS Registry Number</td>
                          <td className="py-3 px-4 font-mono text-foreground font-semibold">{product.casNumber}</td>
                        </tr>
                      )}
                      {product.molecularFormula && (
                        <tr className="bg-[#19211D]">
                          <td className="py-3 px-4 font-medium text-foreground-muted">Molecular Formula</td>
                          <td className="py-3 px-4 font-mono text-foreground">{product.molecularFormula}</td>
                        </tr>
                      )}
                      {product.molecularWeight && (
                        <tr>
                          <td className="py-3 px-4 font-medium text-foreground-muted">Molecular Weight</td>
                          <td className="py-3 px-4 font-mono text-foreground">{product.molecularWeight}</td>
                        </tr>
                      )}
                      {product.appearance && (
                        <tr className="bg-[#19211D]">
                          <td className="py-3 px-4 font-medium text-foreground-muted">Physical Appearance</td>
                          <td className="py-3 px-4 text-foreground">{product.appearance}</td>
                        </tr>
                      )}
                      {product.solubility && (
                        <tr>
                          <td className="py-3 px-4 font-medium text-foreground-muted">Solubility Profile</td>
                          <td className="py-3 px-4 text-foreground">{product.solubility}</td>
                        </tr>
                      )}
                      {product.suggestedPh && (
                        <tr className="bg-[#19211D]">
                          <td className="py-3 px-4 font-medium text-foreground-muted">Optimal Formulation pH</td>
                          <td className="py-3 px-4 font-mono text-accent">{product.suggestedPh}</td>
                        </tr>
                      )}
                      {product.storage && (
                        <tr>
                          <td className="py-3 px-4 font-medium text-foreground-muted">Storage Conditions</td>
                          <td className="py-3 px-4 text-foreground">{product.storage}</td>
                        </tr>
                      )}
                      {product.suggestedUsage && (
                        <tr className="bg-[#19211D]">
                          <td className="py-3 px-4 font-medium text-foreground-muted">Formulation Usage Level</td>
                          <td className="py-3 px-4 text-foreground">{product.suggestedUsage}</td>
                        </tr>
                      )}
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <tr key={key} className="bg-[#222C26]">
                          <td className="py-3 px-4 font-medium text-foreground-muted">{key}</td>
                          <td className="py-3 px-4 text-foreground">{value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Formulation Cautions */}
              {product.incompatibilities && (
                <div className="p-3.5 rounded-xl bg-amber-950/30 border border-amber-800/40 flex items-start gap-2 text-xs text-amber-300">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold block text-[11px] uppercase tracking-wider text-amber-300">
                      Formulation Note:
                    </span>
                    <span className="text-amber-200/90">Avoid mixing directly with {product.incompatibilities.join(", ")}.</span>
                  </div>
                </div>
              )}

              {/* Interactive Actions & Telegram Inquiry */}
              <ProductDetailActions product={product} />

              <div className="pt-2">
                <Link
                  href="/#products"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground-muted hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Ingredient Catalog</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Related Ingredients */}
          {relatedProducts.length > 0 && (
            <div className="pt-12 border-t border-[#354239] space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="editorial-badge">Related Compounds</span>
                  <h2 className="text-xl font-display font-medium text-foreground mt-1">
                    More in {product.category}
                  </h2>
                </div>
                <Link
                  href="/#products"
                  className="text-xs font-medium text-accent hover:underline inline-flex items-center gap-1 font-mono"
                >
                  View full catalog
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/products/${rel.slug}`}
                    className="p-4 rounded-xl bg-[#222C26] border border-[#354239] hover:border-accent/40 transition-colors flex items-center gap-4 group shadow-sm"
                  >
                    <div className="relative w-16 h-16 rounded-lg bg-[#19211D] border border-[#354239] overflow-hidden shrink-0">
                      <Image
                        src={rel.image}
                        alt={rel.imageAlt}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono text-foreground-muted block">
                        {rel.casNumber || rel.category}
                      </span>
                      <h3 className="font-display font-medium text-sm text-foreground group-hover:text-accent transition-colors leading-tight">
                        {rel.name}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
