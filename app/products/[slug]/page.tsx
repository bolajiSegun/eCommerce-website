import Image from "next/image";

interface CardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string; // Add imageUrl prop
}
const page: React.FC<CardProps> = () => {
  const data = {
    id: 0,
    name: "Mushroom Orange Lamp",
    description: "Mushroom Orange Lamp desc",
    price: 100,
    imageUrl:
      "https://res.cloudinary.com/dyvozwcru/image/upload/v1712563522/cld-sample-5.jpg",
    contactEmail: "bolajisegun@gmail.com",
    boost: false,
  };

  return (
    <div className="px-12 py-12 max-w-7xl mx-auto min-h-screen">
      <div className="flex justify-between mb-6 lg:mb-12">
        <h2 className="text-3xl lg:text-4xl items-start uppercase">
          {data.name}
        </h2>
        <a
          href={`mailto:${data.contactEmail}?subject=Interested in purchasing ${data.name}`}
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
            alt={data.name}
            src={`${process.env.SUPABASE_URL}/storage/v1/object/public/storage/${data.imageUrl}`}
          />
        </div>
        <div className="bg-gray-953 p-6 w-full">
          <label className="font-bold">💰 PRICE:</label>
          <p className="text-gray-800 text-2xl lg:text-3xl pt-4 py-6 text-center border-b-2 decoration-dotted border-dashed border-gray-800 border-opacity-15">
            ${data.price}
          </p>

          {data.boost && (
            <div className="pt-4">
              <label className="font-bold">⭐️ PREMIUM PRODUCT:</label>
              <p className="text-gray-800 text-2xl lg:text-3xl py-6 text-center border-b-2 decoration-dotted border-dashed border-gray-800 border-opacity-15">
                Yes
              </p>
            </div>
          )}

          <a
            href={`mailto:${data.contactEmail}`}
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
          {data.description}
        </p>
      </div>
    </div>
  );
};

export default page;
