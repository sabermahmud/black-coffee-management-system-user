import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Coffee,
  Package,
  Boxes,
  Truck,
  ShoppingBag,
  LayoutDashboard,
  Layers3,
} from "lucide-react";

type Product = {
  _id: string;
  productName: string;
  category: string;
  imageUrl: string;
  imagePublicId: string;
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

const productsData = async (): Promise<Product[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: Product[] = await res.json();

  return Array.isArray(data) ? data : [];
};

function ProductCard({ product }: { product: Product }) {
  const packageQuantity = Number(product.packageQuantity) || 0;
  const pieceQuantity = Number(product.pieceQuantity) || 0;
  const totalPieces = packageQuantity * pieceQuantity;

  return (
    <div className="group overflow-hidden rounded-2xl border border-[#E7E2DC] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#79543A]/10">
      {/* Product Image */}
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[#F7F5F1]">
        {product.imageUrl ? (
          <Image
            src={product.imageUrl}
            alt={product.productName}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <Package size={48} strokeWidth={1.5} className="text-[#B8ADA3]" />
        )}

        <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-medium text-[#79543A] shadow-sm">
          {categoryLabels[product.category] || product.category}
        </span>
      </div>

      {/* Product Information */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-bold text-[#111111]">
              {product.productName}
            </h3>
          </div>

          <Package size={20} className="shrink-0 text-[#79543A]" />
        </div>

        {/* Stock Information */}
        <div className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#77736E]">
              Stock Information
            </p>

            <span className="rounded-full border border-[#E7E2DC] px-3 py-1 text-xs text-[#79543A]">
              {product.unit}
            </span>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-[#77736E]">
                <Layers3 size={16} />
                Total Packages
              </span>

              <span className="font-semibold text-[#111111]">
                {packageQuantity.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-[#77736E]">
                <Package size={16} />
                Pieces / Package
              </span>

              <span className="font-semibold text-[#111111]">
                {pieceQuantity.toLocaleString()}
              </span>
            </div>

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
      </div>
    </div>
  );
}

function OverviewCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-[#E7E2DC] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:shadow-[#79543A]/10">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#F7F5F1] text-[#79543A]">
        {icon}
      </div>

      <div>
        <p className="text-sm text-[#77736E]">{title}</p>

        <p className="mt-1 text-2xl font-bold text-[#111111]">
          {value.toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default async function HomePage() {
  const allProducts = await productsData();

  const categories = [
    ...new Set(allProducts.map((product) => product.category).filter(Boolean)),
  ];

  const suppliers = new Set(
    allProducts.map((product) => product.supplierName).filter(Boolean),
  );

  const allCups = allProducts.filter((product) => product.category === "cups");

  const categoryGroups = categories.map((category) => ({
    category,
    products: allProducts
      .filter((product) => product.category === category)
      .slice(0, 4),
    total: allProducts.filter((product) => product.category === category)
      .length,
  }));

  return (
    <main className="min-h-screen bg-[#F7F5F1] px-4 py-8 md:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-10">


        {/* Product Categories */}
        <section className="space-y-8">

          {categoryGroups.length > 0 ? (
            categoryGroups.map(({ category, products, total }) => (
              <div key={category}>
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-[#111111]">
                      {categoryLabels[category] || category}
                    </h3>

                    <p className="mt-1 text-sm text-[#77736E]">
                      {total} products available
                    </p>
                  </div>

                  <Link
                    href={`/products?category=${encodeURIComponent(category)}`}
                    className="flex items-center gap-1 text-sm font-semibold text-[#79543A] transition hover:text-[#5F402D]"
                  >
                    View All
                    <ArrowRight size={16} />
                  </Link>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-[#E7E2DC] bg-white py-16 text-center">
              <ShoppingBag size={42} className="mx-auto text-[#B8ADA3]" />

              <h3 className="mt-4 font-semibold text-[#111111]">
                No Products Available
              </h3>

              <p className="mt-2 text-sm text-[#77736E]">
                Your store products will appear here.
              </p>

              <Link
                href="/products"
                className="mt-5 inline-flex items-center gap-2 rounded-xl bg-[#79543A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#5F402D]"
              >
                Explore Products
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
