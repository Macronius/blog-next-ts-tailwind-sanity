export default function Banner() {
  return (
    <div className="flex flex-col lg:flex-row lg:space-x-5 justify-between font-semibold px-10 py-5 mb-10 bg-blue-300">
      <hr className="outline-none h-[2px] bg-white mt-2" />
      <div>
        <h1 className="text-7xl">
          the Daily{' '}
          {/* <span className="underline decoration-4 decoration-[#F7AB0A]">Blog</span> */}
          <span className="font-bold text-[#e5d9ca]">Blog</span>
          arithm
        </h1>
        <h2 className="mt-3 text-xl font-extrabold text-gray-500">
          Problems | Solutions | Tips | Tricks | Advice | True Stories
        </h2>
      </div>

      <p className="mt-5 md:mt-2 text-gray-400 max-w-sm flex items-end mb-2 md:mb-2">
        Solutions to real Algebra questions asked of me by actual students
      </p>
      <hr className="outline-none h-[2px] bg-white mb-2" />
    </div>
  );
}
