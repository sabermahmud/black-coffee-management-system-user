"use client";

import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ImagePlus,
  PackagePlus,
  Boxes,
  X,
  ShoppingCart,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AddProductPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    // TODO: Connect product creation API here.
    console.log(Object.fromEntries(formData.entries()));
  };

  return (
    <div className="min-h-screen bg-[#F7F5F1] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="space-y-2">
            <Link
              href="/admin/inventory"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#77736E] transition hover:text-[#79543A]"
            >
              <ArrowLeft size={16} />
              Back to Inventory
            </Link>

            <div>
              <p className="text-sm font-medium text-[#79543A]">
                BLACK COFFEE / INVENTORY
              </p>

              <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#111111] md:text-3xl">
                Add New Product
              </h1>

              <p className="mt-1 text-sm text-[#77736E]">
                Add a new product to your coffee shop inventory.
              </p>
            </div>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F0EDE8] text-[#79543A]">
            <PackagePlus size={25} />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Buying Information */}
          <Card className="gap-5 border border-[#E7E2DC] bg-white py-5 shadow-none">
            <CardHeader className="px-5">
              <CardTitle className="flex items-center gap-2 text-lg font-bold text-[#111111]">
                <ShoppingCart size={20} className="text-[#79543A]" />
                Buying Information
              </CardTitle>

              <CardDescription className="text-[#77736E]">
                Enter supplier and purchase details for this transaction.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6 px-5 md:grid-cols-2">
              {/* Supplier Name */}
              <div className="space-y-2">
                <Label htmlFor="supplierName" className="text-[#292929]">
                  Supplier Name <span className="text-red-500">*</span>
                </Label>

                <Input
                  id="supplierName"
                  name="supplierName"
                  placeholder="Enter supplier name"
                  required
                  className="h-11 border-[#E7E2DC] bg-white focus-visible:border-[#79543A] focus-visible:ring-[#79543A]/20"
                />
              </div>

              {/* Supplier Phone */}
              <div className="space-y-2">
                <Label htmlFor="supplierPhone" className="text-[#292929]">
                  Supplier Phone <span className="text-red-500">*</span>
                </Label>

                <Input
                  id="supplierPhone"
                  name="supplierPhone"
                  type="tel"
                  placeholder="+966 5X XXX XXXX"
                  required
                  className="h-11 border-[#E7E2DC] bg-white focus-visible:border-[#79543A] focus-visible:ring-[#79543A]/20"
                />
              </div>

              {/* Purchase Date */}
              <div className="space-y-2">
                <Label htmlFor="purchaseDate" className="text-[#292929]">
                  Purchase Date <span className="text-red-500">*</span>
                </Label>

                <Input
                  id="purchaseDate"
                  name="purchaseDate"
                  type="date"
                  required
                  className="h-11 border-[#E7E2DC] bg-white focus-visible:border-[#79543A] focus-visible:ring-[#79543A]/20"
                />
              </div>

              {/* Invoice Number */}
              <div className="space-y-2">
                <Label htmlFor="invoiceNumber" className="text-[#292929]">
                  Invoice Number
                </Label>

                <Input
                  id="invoiceNumber"
                  name="invoiceNumber"
                  placeholder="Enter invoice number"
                  className="h-11 border-[#E7E2DC] bg-white focus-visible:border-[#79543A] focus-visible:ring-[#79543A]/20"
                />
              </div>

              {/* Supplier Address */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="supplierAddress" className="text-[#292929]">
                  Supplier Address
                </Label>

                <Input
                  id="supplierAddress"
                  name="supplierAddress"
                  placeholder="Enter supplier address"
                  className="h-11 border-[#E7E2DC] bg-white focus-visible:border-[#79543A] focus-visible:ring-[#79543A]/20"
                />
              </div>
            </CardContent>
          </Card>

          {/* Product Information */}
          <Card className="gap-5 border border-[#E7E2DC] bg-white py-5 shadow-none">
            <CardHeader className="px-5">
              <CardTitle className="flex items-center gap-2 text-lg font-bold text-[#111111]">
                <Boxes size={20} className="text-[#79543A]" />
                Product Information
              </CardTitle>

              <CardDescription className="text-[#77736E]">
                Enter basic information about your product.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6 px-5 md:grid-cols-2">
              {/* Product Name */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="productName" className="text-[#292929]">
                  Product Name <span className="text-red-500">*</span>
                </Label>

                <Input
                  id="productName"
                  name="productName"
                  placeholder="e.g. Nescafe Classic Coffee"
                  required
                  className="h-11 border-[#E7E2DC] bg-white focus-visible:border-[#79543A] focus-visible:ring-[#79543A]/20"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-[#292929]">
                  Category <span className="text-red-500">*</span>
                </Label>

                <Select name="category" required>
                  <SelectTrigger className="h-11 w-full border-[#E7E2DC] bg-white focus-visible:border-[#79543A] focus-visible:ring-[#79543A]/20">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="coffee">Coffee</SelectItem>
                    <SelectItem value="beverages">Beverages</SelectItem>
                    <SelectItem value="dairy">Dairy Products</SelectItem>
                    <SelectItem value="bakery">Bakery</SelectItem>
                    <SelectItem value="packaging">Packaging</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Stock Information */}
          <Card className="gap-5 border border-[#E7E2DC] bg-white py-5 shadow-none">
            <CardHeader className="px-5">
              <CardTitle className="text-lg font-bold text-[#111111]">
                Stock Information
              </CardTitle>

              <CardDescription className="text-[#77736E]">
                Specify the available product quantities.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6 px-5 md:grid-cols-2">
              {/* Box / Packet */}
              <div className="space-y-2">
                <Label htmlFor="packageQuantity" className="text-[#292929]">
                  Quantity (Box / Packet)
                </Label>

                <Input
                  id="packageQuantity"
                  name="packageQuantity"
                  type="number"
                  min="0"
                  step="1"
                  defaultValue="0"
                  placeholder="Enter quantity"
                  className="h-11 border-[#E7E2DC] bg-white focus-visible:border-[#79543A] focus-visible:ring-[#79543A]/20"
                />

                <p className="text-xs text-[#77736E]">
                  Total number of boxes or packets.
                </p>
              </div>

              {/* Pieces */}
              <div className="space-y-2">
                <Label htmlFor="pieceQuantity" className="text-[#292929]">
                  Quantity (Pieces)
                </Label>

                <Input
                  id="pieceQuantity"
                  name="pieceQuantity"
                  type="number"
                  min="0"
                  step="1"
                  defaultValue="0"
                  placeholder="Enter quantity"
                  className="h-11 border-[#E7E2DC] bg-white focus-visible:border-[#79543A] focus-visible:ring-[#79543A]/20"
                />

                <p className="text-xs text-[#77736E]">
                  Total number of individual pieces.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Product Image */}
          <Card className="gap-5 border border-[#E7E2DC] bg-white py-5 shadow-none">
            <CardHeader className="px-5">
              <CardTitle className="text-lg font-bold text-[#111111]">
                Product Image
              </CardTitle>

              <CardDescription className="text-[#77736E]">
                Upload an image of your product.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-5">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                {/* Image Preview */}
                <div className="relative flex h-40 w-full items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-[#E7E2DC] bg-[#F7F5F1] sm:w-48">
                  {imagePreview ? (
                    <>
                      <Image
                        src={imagePreview}
                        alt="Product preview"
                        fill
                        unoptimized
                        className="object-contain p-2"
                      />

                      <button
                        type="button"
                        onClick={() => setImagePreview(null)}
                        className="absolute right-2 top-2 z-10 rounded-full bg-white p-1.5 text-red-500 shadow-sm transition hover:bg-red-50"
                      >
                        <X size={16} />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-[#77736E]">
                      <ImagePlus size={35} />
                      <span className="text-xs">Image Preview</span>
                    </div>
                  )}
                </div>

                {/* Upload */}
                <div className="flex-1 space-y-3">
                  <Label htmlFor="productImage" className="text-[#292929]">
                    Upload Product Image
                  </Label>

                  <Input
                    id="productImage"
                    name="productImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="h-11 cursor-pointer border-[#E7E2DC] bg-white file:mr-3 file:rounded-md file:border-0 file:bg-[#F0EDE8] file:px-3 file:py-1 file:text-xs file:font-semibold file:text-[#79543A] hover:file:bg-[#E7DCD1]"
                  />

                  <p className="text-xs text-[#77736E]">
                    Supported formats: JPG, PNG, WEBP.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              className="h-11 border-[#E7E2DC] bg-white px-6 text-[#292929] hover:border-[#79543A] hover:bg-[#F7F5F1] hover:text-[#79543A]"
            >
              <Link href="/admin/inventory">Cancel</Link>
            </Button>

            <Button
              type="submit"
              className="h-11 bg-[#111111] px-8 text-white transition hover:bg-[#79543A]"
            >
              <PackagePlus size={18} className="mr-2" />
              Save Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
