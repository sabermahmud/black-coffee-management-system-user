import Image from "next/image";
import {
  Package,
  Layers3,
  Boxes,
  MoreHorizontal,
  Tag,
  ShoppingCart,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Product = {
  _id: string;
  productName: string;
  category: string;
  imageUrl: string;
  boxPrice: string | number;
  piecePrice: string | number;
  packageQuantity: string | number;
  pieceQuantity: string | number;
  unit: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const packageQuantity = Number(product.packageQuantity) || 0;
  const pieceQuantity = Number(product.pieceQuantity) || 0;

  const totalPieces = packageQuantity * pieceQuantity;

  const categoryLabels: Record<string, string> = {
    coffee: "Coffee & Beans",
    beverages: "Beverages",
    dairy: "Dairy Products",
    bakery: "Bakery & Snacks",
    sweets: "Sweets",
    packaging: "Packaging Materials",
    cups: "Cups & Accessories",
    others: "Others",
  };

  return (
    <Card className="group gap-0 overflow-hidden border-[#E7E2DC] bg-white py-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#79543A]/10">
      {/* Product Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#F7F5F1]">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.productName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-[#B8ADA3]">
            <Package size={48} strokeWidth={1.5} />
          </div>
        )}

        <Badge className="absolute top-3 left-3 border-0 bg-white text-[#79543A] shadow-sm hover:bg-white">
          {categoryLabels[product.category] || product.category}
        </Badge>

        <button
          type="button"
          className="absolute top-3 right-3 rounded-lg bg-white/95 p-2 text-[#77736E] shadow-sm transition hover:bg-[#111111] hover:text-white"
          aria-label="More options"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      <CardContent className="p-5">
        {/* Product Title */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="line-clamp-1 text-lg font-bold text-[#111111]">
              {product.productName}
            </h3>

            <p className="mt-1 truncate text-xs text-[#77736E]">
              ID: {product._id}
            </p>
          </div>

          <Package size={20} className="shrink-0 text-[#79543A]" />
        </div>

        {/* Stock Information */}
        <div className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#77736E]">
              Stock Information
            </p>

            <Badge
              variant="outline"
              className="border-[#E7E2DC] text-[#79543A]"
            >
              {product.unit}
            </Badge>
          </div>

          <div className="space-y-3">
            {/* Total Packages */}
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-[#77736E]">
                <Layers3 size={16} />
                Total Packages
              </span>

              <span className="font-semibold text-[#111111]">
                {packageQuantity.toLocaleString()}
              </span>
            </div>

            {/* Pieces per Package */}
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-[#77736E]">
                <Package size={16} />
                Pieces / Package
              </span>

              <span className="font-semibold text-[#111111]">
                {pieceQuantity.toLocaleString()}
              </span>
            </div>

            {/* Total Pieces */}
            <div className="flex items-center justify-between rounded-lg bg-[#F7F5F1] p-3 text-sm">
              <span className="flex items-center gap-2 font-semibold text-[#79543A]">
                <Boxes size={17} />
                Total Pieces
              </span>

              <span className="text-base font-bold text-[#111111]">
                {totalPieces.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Order Button */}
        <Button
          type="button"
          className="mt-5 h-11 w-full gap-2 bg-[#79543A] font-semibold text-white transition-colors hover:bg-[#5F402D]"
        >
          <ShoppingCart size={17} />
          Order Now
        </Button>

        {/* Footer */}
        <div className="mt-5 flex items-center gap-2 border-t border-[#E7E2DC] pt-4 text-xs text-[#77736E]">
          <Tag size={14} />
          <span>Inventory Product</span>
        </div>
      </CardContent>
    </Card>
  );
}
