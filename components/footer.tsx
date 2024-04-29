export default function Footer({ font }: { font?: string }) {
  return (
    <footer className="py-12 bg-black text-gray-953">
      <div
        className={`max-w-[100rem] px-12 mx-auto flex justify-between ${font}`}
      >
        <p className="text-xl mx-auto font-semibold">© SG TECH.</p>
      </div>
    </footer>
  );
}
