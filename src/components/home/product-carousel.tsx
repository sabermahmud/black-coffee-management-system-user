"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ChevronLeft, ChevronRight, Package, ShoppingBag, ShoppingCart } from "lucide-react";
import { Button } from "@base-ui/react";

export interface Product {
  _id: string;
  productName: string;
  category: string;
  imageUrl?: string;
  imagePublicId?: string;
  boxPrice?: number | string;
  piecePrice?: number | string;
  packageQuantity?: number | string;
  pieceQuantity?: number | string;
  unit?: string;
  supplierName?: string;
  supplierPhone?: string;
  invoiceNumber?: string;
  purchaseDate?: string;
}

interface ProductCarouselProps {
  products: Product[];
}

const categoryNames: Record<string, string> = {
  coffee: "Coffee & Beans",
  beverages: "Beverages",
  dairy: "Dairy Products",
  bakery: "Bakery & Snacks",
  sweets: "Sweets",
  packaging: "Packaging Materials",
  cups: "Cups & Accessories",
  others: "Others",
};

function formatPrice(price?: number | string) {
  const value = Number(price);

  if (!Number.isFinite(value)) return "0.00";

  return value.toFixed(2);
}

function ProductCard({ product }: { product: Product }) {
  const packageQuantity = Number(product.packageQuantity) || 0;
  const pieceQuantity = Number(product.pieceQuantity) || 0;
  const totalPieces = packageQuantity * pieceQuantity;

  return (
    <article className="group w-[260px] shrink-0 overflow-hidden rounded-xl border border-[#E7E2DC] bg-white snap-start transition-shadow hover:shadow-md sm:w-[280px]">
      <Link href={`/products/${product._id}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-[#F7F5F1]">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.productName}
              fill
              unoptimized
              sizes="280px"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <ShoppingBag className="h-12 w-12 text-[#B8ADA3]" />
            </div>
          )}
        </div>
      </Link>

      <div className="space-y-3 p-4">
        <div>
          <p className="mb-1 text-xs font-medium uppercase tracking-wide text-[#79543A]">
            {categoryNames[product.category?.toLowerCase()] ||
              product.category ||
              "Other"}
          </p>

          <Link
            href={`/products/${product._id}`}
            className="line-clamp-1 font-semibold text-[#111111] hover:text-[#79543A]"
          >
            {product.productName}
          </Link>
        </div>

        <div className="flex items-center justify-between gap-2 text-sm">
          <span className="text-[#77736E]">Box Price</span>
          <span className="font-semibold text-[#111111]">
            {formatPrice(product.boxPrice)}
          </span>
        </div>

        <div className="flex items-center justify-between gap-2 text-sm">
          <span className="text-[#77736E]">Piece Price</span>
          <span className="font-semibold text-[#111111]">
            {formatPrice(product.piecePrice)}
          </span>
        </div>

        <div className="flex items-center justify-between border-t border-[#E7E2DC] pt-3 text-xs">
          <span className="flex items-center gap-1 text-[#77736E]">
            <Package className="h-4 w-4" />
            Stock
          </span>

          <span className="font-medium text-[#79543A]">
            {packageQuantity} {product.unit || "Packages"}
          </span>
        </div>

        <p className="text-xs text-[#77736E]">Total pieces: {totalPieces}</p>
      </div>
      <div>
        {/* Order Button */}
        <Button
          type="button"
          className="flex items-center justify-center gap-2 mt-5 h-11 w-full bg-[#79543A] font-semibold text-white transition-colors hover:bg-[#5F402D]"
        >
          <ShoppingCart size={17} />
          Add To Order List
        </Button>
        {/*  */}
      </div>
    </article>
  );
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -600 : 600,
      behavior: "smooth",
    });
  };

  if (!products.length) {
    return (
      <div className="rounded-xl border border-dashed border-[#E7E2DC] bg-white px-6 py-10 text-center">
        <ShoppingBag className="mx-auto mb-3 h-8 w-8 text-[#B8ADA3]" />
        <p className="text-sm text-[#77736E]">
          No products available in this category.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="mb-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => scroll("left")}
          aria-label="Scroll products left"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E7E2DC] bg-white text-[#79543A] transition hover:bg-[#79543A] hover:text-white"
        >
          <ChevronLeft size={20} />
        </button>

        <button
          type="button"
          onClick={() => scroll("right")}
          aria-label="Scroll products right"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E7E2DC] bg-white text-[#79543A] transition hover:bg-[#79543A] hover:text-white"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:thin] [scrollbar-color:#B8ADA3_#F7F5F1]"
      >
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
