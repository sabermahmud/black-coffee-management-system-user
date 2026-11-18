
import Image from "next/image";
import {
  Package,
  Layers3,
  CalendarDays,
  UserRound,
  MapPin,
  Phone,
  FileText,
  MoreHorizontal,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

type Product = {
  _id: string;
  productName: string;
  category: string;
  imageUrl: string;
  boxPrice: string;
  piecePrice: string;
  packageQuantity: string;
  pieceQuantity: string;
  unit: string;
  supplierName: string;
  supplierAddress: string;
  supplierPhone: string;
  invoiceNumber: string;
  purchaseDate: string;
};

export default function ProductCard({
  product,
}: {
  product: Product;
}) {
  return (
    <Card className="group overflow-hidden gap-0 border-[#E7E2DC] bg-white py-0 shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#79543A]/5">

      {/* Product Image */}
      <div className="relative aspect-16/16 overflow-hidden bg-[#F7F5F1]">
        <Image
          src={product.imageUrl}
          alt={product.productName}
          width={400}
          height={200}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <Badge className="absolute top-3 left-3 border-0 bg-white text-[#79543A] shadow-sm hover:bg-white">
          {product.category}
        </Badge>

        <button
          type="button"
          className="absolute top-3 right-3 rounded-lg bg-white p-2 text-[#77736E] shadow-sm transition hover:bg-[#111111] hover:text-white"
          aria-label="More options"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>

      <CardContent className="p-5">

        {/* Product Title */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-[#111111]">
              {product.productName}
            </h3>
            <p className="mt-1 text-xs text-[#77736E]">
              ID: {product._id}
            </p>
          </div>
          <Package size={20} className="shrink-0 text-[#79543A]" />
        </div>

        {/* Pricing */}
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-[#F7F5F1] p-3">
            <p className="text-xs text-[#77736E]">
              Box Price
            </p>
            <p className="mt-1 text-xl font-bold text-[#111111]">
              {product.boxPrice}
            </p>
          </div>

          <div className="rounded-xl bg-[#F7F5F1] p-3">
            <p className="text-xs text-[#77736E]">
              Piece Price
            </p>
            <p className="mt-1 text-xl font-bold text-[#79543A]">
              {product.piecePrice}
            </p>
          </div>
        </div>

        {/* Stock Information */}
        <div className="mt-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#77736E]">
            Stock Information
          </p>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-[#77736E]">
                <Layers3 size={16} />
                Packages
              </span>
              <span className="font-semibold text-[#111111]">
                {product.packageQuantity} {product.unit}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-[#77736E]">
                <Package size={16} />
                Total Pieces
              </span>
              <span className="font-semibold text-[#111111]">
                {Number(product.pieceQuantity).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Supplier Information */}
        <div className="mt-5 rounded-xl border border-[#E7E2DC] p-3">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-[#79543A]">
            Supplier Details
          </p>

          <div className="space-y-2 text-sm">
            <p className="flex items-center gap-2 font-semibold text-[#292929]">
              <UserRound size={15} className="text-[#79543A]" />
              {product.supplierName}
            </p>

            <p className="flex items-center gap-2 text-xs text-[#77736E]">
              <MapPin size={15} />
              {product.supplierAddress}
            </p>

            <p className="flex items-center gap-2 text-xs text-[#77736E]">
              <Phone size={15} />
              {product.supplierPhone}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[#E7E2DC] pt-4">
          <div className="flex items-center gap-2 text-xs text-[#77736E]">
            <CalendarDays size={14} />
            {product.purchaseDate}
          </div>

          <div className="flex items-center gap-1 text-xs font-semibold text-[#79543A]">
            <FileText size={14} />
            {product.invoiceNumber}
          </div>
        </div>

      </CardContent>
    </Card>
  );
}
