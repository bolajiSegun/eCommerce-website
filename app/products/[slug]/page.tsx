import { createClient } from "@/supabase/client";
import Image from "next/image";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const supabase = createClient();

  const { data: products } = await supabase.from("easysell-products").select();

  if (!products) {
    return [];
  }
  return products.map((product) => ({
    slug: product.id,
  }));
}

const page = async function ({ params }: Props) {
  //   const data = {
  //     id: 0,
  //     name: "White Air Jordan Shoe",
  //     description:
  //       "White Air Jordan Shoe with rubber sole and comes in different sizes",
  //     price: 100,
  //     imageUrl:
  //       "https://res.cloudinary.com/dyvozwcru/image/upload/v1712563522/cld-sample-5.jpg",
  //     contactEmail: "bolajisegun@gmail.com",
  //     boost: false,
  //   };

  const supabase = createClient();

  const { data: product } = await supabase
    .from("easysell-products")
    .select()
    .match({ id: params.slug })
    .single();
  return (
    <div className="px-12 py-12 max-w-7xl mx-auto min-h-screen">
      <div className="flex justify-between mb-6 lg:mb-12">
        <h2 className="text-3xl lg:text-4xl items-start uppercase">
          {product.name}
        </h2>
        <a
          href={`mailto:${product.contactEmail}?subject=Interested in purchasing ${product.name}`}
          className="bg-orange-900 hover:bg-orange-950 text-white px-4 py-2 rounded-md hidden lg:flex"
        >
          Contact the Seller!
        </a>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mb-4">
        <div className="flex items-center justify-center">
          <Image
            className="rounded-lg shadow-xl border-4 border-gray-200 p-2 lg:min-w-[40rem] lg:min-h-[30rem]"
            width={600}
            height={600}
            alt={product.name}
            src={`${process.env.SUPABASE_URL}/storage/v1/object/public/storage/${product.imageUrl}`}
          />
        </div>
        <div className="bg-gray-953 p-6 w-full">
          <label className="font-bold">💰 PRICE:</label>
          <p className="text-gray-800 text-2xl lg:text-3xl pt-4 py-6 text-center border-b-2 decoration-dotted border-dashed border-gray-800 border-opacity-15">
            ${product.price}
          </p>

          {product.boost && (
            <div className="pt-4">
              <label className="font-bold">⭐️ PREMIUM PRODUCT:</label>
              <p className="text-gray-800 text-2xl lg:text-3xl py-6 text-center border-b-2 decoration-dotted border-dashed border-gray-800 border-opacity-15">
                Yes
              </p>
            </div>
          )}

          <a
            href={`mailto:${product.contactEmail}`}
            className="bg-orange-900 hover:bg-orange-950 text-white px-4 py-2 rounded-md flex lg:hidden w-full items-center justify-center my-12"
          >
            Contact the Seller!
          </a>
        </div>
      </div>
      <div className="pt-6">
        <label className="font-bold pb-2 border-b-2 decoration-dotted border-dashed border-gray-800 border-opacity-15">
          📝 DESCRIPTION:
        </label>
        <p className="text-gray-600 text-lg my-4 pt-4 pb-6 ">
          {product.description}
        </p>
      </div>
    </div>
  );
};

export default page;
