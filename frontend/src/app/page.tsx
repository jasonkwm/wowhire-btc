import Image from "next/image";
import Link from "next/link";
import wowHire from "../../public/wowhire.jpg";

export default function Home() {
  return (
    <div className="w-screen max-w-[1920px] flex h-screen items-center justify-around">
      <Image src={wowHire} alt="logo" className="rounded-full w-[40%]" />
      <div className="w-full max-w-80 h-full flex flex-col items-start justify-center">
        <p className="w-full text-center text-7xl font-header text-black/80">WOWHIRE</p>
        <p className="text-5xl font-normal text-black font-bold">Slave away,</p>
        <p className="text-5xl font-normal text-black font-bold">Work to Earn!</p>
        <Link
          href="/get-hired"
          className="w-48 py-4 mt-10 text-center text-black font-semibold text-xl rounded-lg bg-primary transform transition-transform duration-300 hover:scale-110"
        >
          GET HIRED
        </Link>
        <Link
          href="/hire-someone"
          className="w-48 py-4 mt-5 text-center text-black font-semibold text-xl rounded-lg border border-primary transform transition-transform duration-300 hover:scale-110"
        >
          HIRE SOMEONE
        </Link>
      </div>
    </div>
  );
}
