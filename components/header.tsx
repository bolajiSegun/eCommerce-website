import Link from "next/link";

function Header({ font }: { font?: string }) {
  return (
    <header className="py-2 bg-black ">
      <div className="max-w-[100rem] px-12 mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className={`uppercase text-yellow-500 text-center py-2 ${font}`}>
            SG STORE
          </h1>
        </Link>
        <Link
          href="../products/upload"
          className="uppercase text-green-951 text-md py-2 hover:text-yellow-700"
        >
          Upload
        </Link>
      </div>
    </header>
  );
}

export default Header;
