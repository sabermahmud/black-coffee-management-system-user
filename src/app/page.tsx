import Link from "next/link";
import {
  ArrowRight,
  Coffee,
  Package,
  ShoppingBag,
  Boxes,
  Divide,
} from "lucide-react";

import ProductCarousel, {
  type Product,
} from "@/components/home/product-carousel";
import Image from "next/image";
import Banner from "@/components/header/Banner";

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

async function productsData(): Promise<Product[]> {
  const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;

  if (!serverUrl) {
    console.error("NEXT_PUBLIC_SERVER_URL is not configured.");
    return [];
  }

  try {
    const res = await fetch(`${serverUrl}/products`, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch products:", res.status);
      return [];
    }

    const data = await res.json();

    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Products fetch error:", error);
    return [];
  }
}

export default async function HomePage() {
  const products = await productsData();

  const categories = Array.from(
    new Set(
      products
        .map((product) => product.category?.toLowerCase())
        .filter(Boolean),
    ),
  );

  const totalProducts = products.length;

  const totalStock = products.reduce((total, product) => {
    return total + (Number(product.packageQuantity) || 0);
  }, 0);

  return (
    <main className="min-h-screen bg-[#F7F5F1] text-[#111111]">
      {/* Welcome Banner */}
      <Banner />
      <div className="mx-auto max-w-7xl space-y-10 px-4 pb-4 sm:px-6 lg:px-8">
        {/* Product Categories */}
        <section className="space-y-8">
          <div className="text-center">
            <h2 className="text-xl font-bold sm:text-4xl">
              Explore Products In Store
            </h2>
            <p className="mt-1 text-sm text-[#77736E]">
              Browse products by category.
            </p>
          </div>

          <hr />

          {categories.length > 0 ? (
            categories.map((category) => {
              const categoryProducts = products.filter(
                (product) => product.category?.toLowerCase() === category,
              );

              return (
                <section key={category}>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-bold">
                        {categoryNames[category] || category}
                      </h3>

                      <p className="mt-1 text-xs text-[#77736E]">
                        {categoryProducts.length} products
                      </p>
                    </div>

                    <Link
                      href="/products"
                      className="flex shrink-0 items-center gap-1 text-sm font-semibold text-[#79543A] transition hover:text-[#5F402D]"
                    >
                      View All
                      <ArrowRight size={16} />
                    </Link>
                  </div>

                  <ProductCarousel products={categoryProducts} />
                </section>
              );
            })
          ) : (
            <div className="rounded-xl border border-[#E7E2DC] bg-white px-6 py-12 text-center">
              <ShoppingBag className="mx-auto mb-3 h-10 w-10 text-[#B8ADA3]" />

              <h3 className="font-semibold">No Products Available</h3>

              <p className="mt-2 text-sm text-[#77736E]">
                Add products to your store to see them here.
              </p>

              <Link
                href="/admin"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#79543A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5F402D]"
              >
                Manage Products
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="border-t border-[#E7E2DC] py-6 text-center">
          <p className="text-sm text-[#77736E]">
            © {new Date().getFullYear()} Black Coffee. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}
