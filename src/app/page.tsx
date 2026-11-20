import Link from "next/link";
import { ArrowRight, Coffee, Package, ShoppingBag, Boxes } from "lucide-react";

import ProductCarousel, {
  type Product,
} from "@/components/home/product-carousel";

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
      <div className="mx-auto max-w-7xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
        {/* Welcome Banner */}
        <section className="relative overflow-hidden rounded-2xl bg-[#79543A] px-6 py-12 text-white sm:px-10 lg:py-16">
          <div className="relative z-10 max-w-2xl">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#E7D8CC]">
              Welcome to Black Coffee
            </p>

            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              Manage Your Coffee Store Smarter.
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#F1E8E1] sm:text-base">
              Keep track of your products, stock and store inventory from one
              simple management system.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-[#79543A] transition hover:bg-[#F7F5F1]"
              >
                Explore Products
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/admin"
                className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Admin Dashboard
              </Link>
            </div>
          </div>

          <Coffee
            className="absolute -right-8 -bottom-12 h-64 w-64 rotate-[-15deg] text-white/10 sm:right-8 sm:h-80 sm:w-80"
            strokeWidth={1}
          />
        </section>

        {/* Store Overview */}
        <section>
          <div className="mb-5">
            <h2 className="text-xl font-bold sm:text-2xl">Store Overview</h2>
            <p className="mt-1 text-sm text-[#77736E]">
              A quick look at your store inventory.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-4 rounded-xl border border-[#E7E2DC] bg-white p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#F7F5F1] text-[#79543A]">
                <ShoppingBag size={24} />
              </div>

              <div>
                <p className="text-sm text-[#77736E]">Total Products</p>
                <p className="text-2xl font-bold">{totalProducts}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-[#E7E2DC] bg-white p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#F7F5F1] text-[#79543A]">
                <Boxes size={24} />
              </div>

              <div>
                <p className="text-sm text-[#77736E]">Total Categories</p>
                <p className="text-2xl font-bold">{categories.length}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-xl border border-[#E7E2DC] bg-white p-5">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#F7F5F1] text-[#79543A]">
                <Package size={24} />
              </div>

              <div>
                <p className="text-sm text-[#77736E]">Total Packages</p>
                <p className="text-2xl font-bold">{totalStock}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Product Categories */}
        <section className="space-y-8">
          <div>
            <h2 className="text-xl font-bold sm:text-2xl">
              Explore Our Products
            </h2>
            <p className="mt-1 text-sm text-[#77736E]">
              Browse products by category.
            </p>
          </div>

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
