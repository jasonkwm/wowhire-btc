import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { LuMapPin } from "react-icons/lu";
import wowhire from "public/wowhire.jpg";
import doge from "public/doge.jpeg";
import { useRouter } from "next/navigation";

const Events = () => {
  const router = useRouter();

  return (
    <div
      className="relative w-full ml-3 md:ml-6 p-3 md:p-5 rounded-xl border-4 border-tertiary flex gap-x-4 cursor-pointer"
      onClick={() => router.push("/hire-someone/barista")}
    >
      <div className="flex flex-1 flex-col gap-y-1">
        <p className="text-lg md:text-xl">Barista</p>
        <p className="text-sm md:text-base font-light line-clamp-1">
          If coffee is your canvas, and mornings don't start without that perfect pour, you might be our next Barista
          Extraordinaire. We're on the hunt for someone who can transform beans and water into magic and serve it up
          with just the right blend of charm and speed.
        </p>
        <div className="flex gap-x-2 items-center">
          <LuMapPin size={20} />
          <p className="line-clamp-1 text-sm md:text-base">Bangkok, TH</p>
        </div>
      </div>
      <Image src={doge} alt="logo" className="max-w-16 max-h-16 md:max-w-28 md:max-h-28 rounded-md flex flex-1" />
    </div>
  );
};

const EventDate = () => {
  return (
    <div className="flex space-x-4 items-center">
      <div className="w-[10px] h-[10px] rounded-full bg-foreground" />
      <p className="font-semibold text-xl">Monday</p>
    </div>
  );
};

const MyEvents = () => {
  return (
    <div className="relative w-full flex flex-col pl-0 md:pl-5 mt-4 md:mt-8">
      <div className="absolute -z-10 top-3 left-[3px] md:left-[23px] w-1 h-full rounded-full bg-foreground/50" />
      <div className="w-full flex flex-col space-y-3">
        <EventDate />
        <Events />
      </div>
    </div>
  );
};

export default MyEvents;
