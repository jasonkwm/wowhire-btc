import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center p-12 shadow-2xl">
        <div className="flex items-center mb-12">
          <Image src="/wow-doge.jpeg" width={100} height={100} alt="doge with wow word" className="rounded-full mr-8" />
          <h1 className="text-4xl font-semibold text-gray-800">WOW HIRE!</h1>
        </div>
        <div className="flex flex-col gap-4">
          <Link
            href="/get-hired"
            className="px-8 py-4 bg-blue-600 text-white font-semibold text-xl rounded-lg bg-primary transform transition-transform duration-300 hover:scale-110"
          >
            GET HIRED
          </Link>
          <Link
            href="/hire-someone"
            className="px-8 py-4 bg-green-600 text-white font-semibold text-xl rounded-lg bg-secondary transform transition-transform duration-300 hover:scale-110"
          >
            HIRE SOMEONE
          </Link>
        </div>
      </div>
    </div>
  );
}
