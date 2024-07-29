import Image from "next/image";
import Card from "../components/card";
import { createClient } from "@/supabase/client";
import { notFound } from "next/navigation";

export const revalidate = 0;

export default async function Home() {
  const supabase = createClient();
  // const products = [
  //   {
  //     id: 0,
  //     name: "Mushroom Orange Lamp",
  //     description: "Mushroom Orange Lamp desc",
  //     price: 100,
  //     imageUrl:
  //       "https://res.cloudinary.com/dyvozwcru/image/upload/v1712563522/cld-sample-5.jpg",
  //   },
  // ];

  const { data: topProducts } = await supabase
    .from("easysell-products")
    .select()
    .eq("boost", "true");

  const { data: products, error } = await supabase
    .from("easysell-products")
    .select();

  if (!products) {
    return <p>Not found</p>;
    return notFound();
  }

  return (
    <main className="min-h-screen max-w-[100rem] mx-auto">
      <header className="header abosolute rounded-md top-0 left-0 bottom-0 right-0">
        <div className="shadow-lg shadow-yellow-500 md:py-[20%] lg:py-[22%] py-[50%]">
          <h1 className="text-center lg:text-6xl text-white font-extrabold ">
            <span className="text-yellow-500">Swift-Global</span> Market Place
          </h1>
          <p className="text-center lg:text-2xl pt-4 text-yellow-500">
            Shop on a go
          </p>
        </div>
      </header>
      <div className="px-12 pt-12 pb-20">
        <div className="flex flex-col xl:flex-row gap-2 xl:gap-40">
          <div className="pt-12">
            <h2 className="text-4xl mb-16">OUR TOP PRODUCTS</h2>
            <p className="text-xl">You can pay to boost your products here.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 xl:gap-12">
            {topProducts.map((item) => (
              <Card
                // id={item.id}
                key={`${item.name}-${item.id}`}
                {...item}
                imageUrl={`${process.env.SUPABASE_URL}/storage/v1/object/public/storage/${item.imageUrl}`}
              />
            ))}
          </div>
        </div>

        <h2 className="text-4xl mt-20 mb-16">ALL PRODUCTS</h2>
        {products && products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((item) => (
              <Card
                // id={item.id}
                key={`${item.name}-${item.id}`}
                {...item}
                imageUrl={`${process.env.SUPABASE_URL}/storage/v1/object/public/storage/${item.imageUrl}`}
              />
            ))}
          </div>
        ) : (
          <p className="text-xl text-gray-800">All our products are gone...</p>
        )}
      </div>
    </main>
  );
}
