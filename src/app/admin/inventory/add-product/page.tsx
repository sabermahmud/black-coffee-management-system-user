
"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ImagePlus,
  PackagePlus,
  Boxes,
  X,
  ShoppingCart,
  ClipboardList,
  Warehouse,
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
import swal from "sweetalert";

const inputStyles =
  "h-11 border-[#E7E2DC] bg-white focus-visible:border-[#79543A] focus-visible:ring-[#79543A]/20";

export default function AddProductPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!imagePreview) return;

    return () => URL.revokeObjectURL(imagePreview);
  }, [imagePreview]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      event.target.value = "";
      return;
    }

    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImagePreview(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Submit product information and image
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch("http://localhost:5000/add-product", {
        method: "POST",
        body: formData,
      });

      const resData = await res.json();

      if (!res.ok) {
        swal(
          "Oops!",
          resData.message || "Product creation failed",
          "warning",
        );
        return;
      }

      swal(
        "Success!",
        resData.message || "Product added successfully!",
        "success",
      );

      form.reset();
      setImagePreview(null);
    } catch (error) {
      console.error("Product submission error:", error);

      swal(
        "Error!",
        "Something went wrong. Please try again.",
        "error",
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F1] p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-5xl space-y-7">
        {/* Header */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="space-y-3">
            <Link
              href="/admin/inventory"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#77736E] transition hover:text-[#79543A]"
            >
              <ArrowLeft size={16} />
              Back to Inventory
            </Link>

            <div>
              <p className="text-xs font-bold tracking-[0.15em] text-[#79543A]">
                BLACK COFFEE / INVENTORY
              </p>

              <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#111111] md:text-3xl">
                Add New Product
              </h1>

              <p className="mt-2 text-sm text-[#77736E]">
                Add product details, purchase information and stock quantities.
              </p>
            </div>
          </div>

          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F0EDE8] text-[#79543A]">
            <PackagePlus size={27} />
          </div>
        </div>

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

            <CardContent className="grid gap-5 px-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="supplierName">
                  Supplier Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="supplierName"
                  name="supplierName"
                  placeholder="Enter supplier name"
                  required
                  className={inputStyles}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="supplierPhone">
                  Supplier Phone <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="supplierPhone"
                  name="supplierPhone"
                  type="tel"
                  placeholder="+966 5X XXX XXXX"
                  required
                  className={inputStyles}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="purchaseDate">
                  Purchase Date <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="purchaseDate"
                  name="purchaseDate"
                  type="date"
                  required
                  defaultValue={new Date().toLocaleDateString("en-CA")}
                  className={inputStyles}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="invoiceNumber">
                  Invoice Number <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="invoiceNumber"
                  name="invoiceNumber"
                  placeholder="e.g. INV-2026-001"
                  className={inputStyles}
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="supplierAddress">Supplier Address</Label>
                <Input
                  id="supplierAddress"
                  name="supplierAddress"
                  placeholder="Enter supplier address"
                  className={inputStyles}
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
                Enter the basic information about your product.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-5 px-5 md:grid-cols-2">
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="productName">
                  Product Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="productName"
                  name="productName"
                  placeholder="e.g. Nescafe Classic Coffee"
                  required
                  className={inputStyles}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">
                  Category <span className="text-red-500">*</span>
                </Label>

                <Select name="category" required>
                  <SelectTrigger
                    id="category"
                    className={`w-full ${inputStyles}`}
                  >
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="coffee">Coffee & Beans</SelectItem>
                    <SelectItem value="beverages">Beverages</SelectItem>
                    <SelectItem value="dairy">Dairy Products</SelectItem>
                    <SelectItem value="bakery">Bakery & Snacks</SelectItem>
                    <SelectItem value="sweets">Sweets</SelectItem>
                    <SelectItem value="packaging">Packaging Materials</SelectItem>
                    <SelectItem value="cups">Cups & Accessories</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="unit">Stock Unit</Label>

                <Select name="unit" defaultValue="piece">
                  <SelectTrigger id="unit" className={`w-full ${inputStyles}`}>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="piece">Piece</SelectItem>
                    <SelectItem value="box">Box</SelectItem>
                    <SelectItem value="packet">Packet</SelectItem>
                    <SelectItem value="kg">Kilogram (KG)</SelectItem>
                    <SelectItem value="liter">Liter (L)</SelectItem>
                    <SelectItem value="carton">Carton</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="boxPrice">
                  Price per Box / Packet (SAR)
                  <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="boxPrice"
                  name="boxPrice"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className={inputStyles}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="piecePrice">Price per Piece (SAR)</Label>
                <Input
                  id="piecePrice"
                  name="piecePrice"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  className={inputStyles}
                />
              </div>
            </CardContent>
          </Card>

          {/* Stock Information */}
          <Card className="gap-5 border border-[#E7E2DC] bg-white py-5 shadow-none">
            <CardHeader className="px-5">
              <CardTitle className="flex items-center gap-2 text-lg font-bold text-[#111111]">
                <Warehouse size={20} className="text-[#79543A]" />
                Stock Information
              </CardTitle>

              <CardDescription className="text-[#77736E]">
                Specify the quantities received from this purchase.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-5 px-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="packageQuantity">Quantity (Box / Packet)</Label>
                <Input
                  id="packageQuantity"
                  name="packageQuantity"
                  type="number"
                  min="0"
                  step="1"
                  defaultValue="0"
                  className={inputStyles}
                />
                <p className="text-xs text-[#77736E]">
                  Total boxes or packets purchased.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pieceQuantity">Quantity (Pieces)</Label>
                <Input
                  id="pieceQuantity"
                  name="pieceQuantity"
                  type="number"
                  min="0"
                  step="1"
                  defaultValue="0"
                  className={inputStyles}
                />
                <p className="text-xs text-[#77736E]">
                  Total individual pieces purchased.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Product Image */}
          <Card className="gap-5 border border-[#E7E2DC] bg-white py-5 shadow-none">
            <CardHeader className="px-5">
              <CardTitle className="flex items-center gap-2 text-lg font-bold text-[#111111]">
                <ImagePlus size={20} className="text-[#79543A]" />
                Product Image
              </CardTitle>

              <CardDescription className="text-[#77736E]">
                Upload a clear image of your product.
              </CardDescription>
            </CardHeader>

            <CardContent className="px-5">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
                {/* Image Preview */}
                <div className="relative flex h-44 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-[#E7E2DC] bg-[#F7F5F1] sm:w-48">
                  {imagePreview ? (
                    <>
                      <Image
                        src={imagePreview}
                        alt="Product preview"
                        fill
                        unoptimized
                        className="object-contain p-3"
                      />

                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        aria-label="Remove product image"
                        className="absolute right-2 top-2 z-10 rounded-full bg-white p-2 text-red-500 shadow-sm transition hover:bg-red-50"
                      >
                        <X size={16} />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-[#77736E]">
                      <div className="rounded-full bg-white p-4">
                        <ImagePlus size={28} />
                      </div>
                      <span className="text-xs font-medium">Image Preview</span>
                    </div>
                  )}
                </div>

                {/* Upload */}
                <div className="flex-1 space-y-3">
                  <Label htmlFor="productImage">Upload Product Image</Label>

                  <Input
                    ref={fileInputRef}
                    id="productImage"
                    name="productImage"
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleImageChange}
                    className="h-11 cursor-pointer border-[#E7E2DC] bg-white file:mr-3 file:rounded-md file:border-0 file:bg-[#F0EDE8] file:px-3 file:py-1 file:text-xs file:font-semibold file:text-[#79543A] hover:file:bg-[#E7DCD1]"
                  />

                  <p className="text-xs leading-relaxed text-[#77736E]">
                    Supported formats: JPG, PNG, WEBP.
                    <br />
                    Choose a high-quality image for better product
                    identification.
                  </p>

                  {imagePreview && (
                    <p className="text-xs font-medium text-green-700">
                      Image selected successfully.
                    </p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col-reverse justify-end gap-3 border-t border-[#E7E2DC] pt-5 sm:flex-row">
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
              <ClipboardList size={18} className="mr-2" />
              Save Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
