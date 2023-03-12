import Image from 'next/image';
import Link from 'next/link';
//
import ammonite from '../public/assets/images/ammonite-crop.png';

export default function Header() {
  return (
    <header className="flex justify-between items-center space-x-2 font-bold px-10 py-5">
      <div className="flex items-center space-x-2">
        <Link href="/">
          <Image
            className="rounded-full"
            src="https://links.papareact.com/1m8"
            width={50}
            height={50}
            alt="logo"
          />
          {/* <img src={ammonite} alt="ammonite" /> */}
        </Link>
        <h1 className="">Comtrya | Math Blog</h1>
      </div>

      <div>
        <Link
          href="https://github.com/Macronius"
          className="px-5 py-3 text-sm md:text-base bg-gray-900 text-[#F7AB0A] flex items-center rounded-full text-center"
        >
          Check out my GitHub repositories
        </Link>
      </div>
    </header>
  );
}
