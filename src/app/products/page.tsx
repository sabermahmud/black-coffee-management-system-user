import ProductCard from "@/components/products/ProductCard";



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

const productsData = async (): Promise<Product[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/products`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: Product[] = await res.json();

  return data;
};

export default async function Page() {
  const products = await productsData();

  return (
    <div className="min-h-screen bg-[#F7F5F1] p-4 sm:p-6 lg:p-8">

      {/* Page Header */}
      <div className="mb-7">
        <p className="text-sm font-medium text-[#79543A]">
          BLACK COFFEE / INVENTORY
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#111111] sm:text-3xl">
          Products
        </h1>

        <p className="mt-1 text-sm text-[#77736E]">
          Manage and monitor all your store products.
        </p>
      </div>

      {/* Product Summary */}
      <div className="mb-6 rounded-xl border border-[#E7E2DC] bg-white p-5">
        <p className="text-sm text-[#77736E]">
          Total Products
        </p>

        <h2 className="mt-1 text-3xl font-bold text-[#111111]">
          {products.length.toString().padStart(2, "0")}
        </h2>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-[#D8D0C7] bg-white px-5 py-16 text-center">
          <h2 className="text-lg font-bold text-[#111111]">
            No Products Found
          </h2>

          <p className="mt-2 text-sm text-[#77736E]">
            Start by adding your first product to inventory.
          </p>
        </div>
      )}
    </div>
  );
}
