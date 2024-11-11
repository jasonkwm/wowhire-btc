import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center space-y-6">
        <div className="flex items-center ">
          <Image src="/wow-doge.jpeg" width={100} height={100} alt="doge with wow word" className="rounded-full mr-8" />
          <h1 className="text-3xl font-semibold text-gray-800">WOW HIRE!</h1>
        </div>
        <div className="flex md:space-x-4 space-y-4 md:space-y-0">
          <Link href="/get-hired">
            <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-primary transition duration-300">
              GET HIRED
            </button>
          </Link>
          <Link href="/hire-someone">
            <button className="px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300">
              HIRE SOMEONE
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
