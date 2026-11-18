import Image from "next/image";

// type Product = {
//   _id: string;
//   productName: string;
//   category: string;
//   imageUrl: string;
//   imagePublicId: string;
//   boxPrice: string;
//   piecePrice: string;
//   packageQuantity: string;
//   pieceQuantity: string;
//   unit: string;
//   supplierName: string;
//   supplierAddress: string;
//   supplierPhone: string;
//   invoiceNumber: string;
//   purchaseDate: string;
// };

// const productsData = async (): Promise<Product[]> => {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_SERVER_URL}/products`,
//     {
//       cache: "no-store",
//     }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch products");
//   }

//   const data: Product[] = await res.json();

//   return data;
// };

export default async function HomePage() {
  // const allProducts = await productsData();
  // console.log(allProducts)
  return 
    <>
    
    </>
  
}
