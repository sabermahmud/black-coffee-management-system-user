
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
    <div className="min-h-screen bg-[#FAF9F5] p-4 md:p-8">
      <div className="mx-auto max-w-5xl space-y-6">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Link
              href="/admin/inventory"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft size={16} />
              Back to Inventory
            </Link>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-[#245C45] md:text-3xl">
                Add New Product
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Add a new product to your coffee shop inventory.
              </p>
            </div>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#245C45]/10 text-[#245C45]">
            <PackagePlus size={25} />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Product Information */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <Boxes size={20} className="text-[#245C45]" />
                Product Information
              </CardTitle>
              <CardDescription>
                Enter basic information about your product.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6 md:grid-cols-2">

              {/* Product Name */}
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="productName">
                  Product Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="productName"
                  name="productName"
                  placeholder="e.g. Nescafe Classic Coffee"
                  required
                  className="h-11"
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category">
                  Category <span className="text-red-500">*</span>
                </Label>

                <Select name="category" required>
                  <SelectTrigger className="h-11 w-full">
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
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Stock Information</CardTitle>
              <CardDescription>
                Specify the available product quantities.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6 md:grid-cols-2">

              {/* Box / Packet */}
              <div className="space-y-2">
                <Label htmlFor="packageQuantity">
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
                  className="h-11"
                />
                <p className="text-xs text-muted-foreground">
                  Total number of boxes or packets.
                </p>
              </div>

              {/* Pieces */}
              <div className="space-y-2">
                <Label htmlFor="pieceQuantity">
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
                  className="h-11"
                />
                <p className="text-xs text-muted-foreground">
                  Total number of individual pieces.
                </p>
              </div>

            </CardContent>
          </Card>

          {/* Product Image */}
          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg">Product Image</CardTitle>
              <CardDescription>
                Upload an image of your product.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start">

                {/* Image Preview */}
                <div className="relative flex h-40 w-full items-center justify-center overflow-hidden rounded-xl border-2 border-dashed bg-muted/30 sm:w-48">
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
                        className="absolute right-2 top-2 z-10 rounded-full bg-white p-1.5 text-red-500 shadow"
                      >
                        <X size={16} />
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                      <ImagePlus size={35} />
                      <span className="text-xs">Image Preview</span>
                    </div>
                  )}
                </div>

                {/* Upload */}
                <div className="flex-1 space-y-3">
                  <Label htmlFor="productImage">
                    Upload Product Image
                  </Label>

                  <Input
                    id="productImage"
                    name="productImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="h-11 cursor-pointer"
                  />

                  <p className="text-xs text-muted-foreground">
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
              className="h-11"
            >
              <Link href="/admin/inventory">
                Cancel
              </Link>
            </Button>

            <Button
              type="submit"
              className="h-11 bg-[#245C45] px-8 text-white hover:bg-[#194632]"
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
