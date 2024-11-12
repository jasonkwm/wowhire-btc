import { useEffect, useState } from "react";
import { timeslot } from "./timeslot";
import { LuArrowBigLeft, LuArrowBigRight } from "react-icons/lu";
import { useGlobalContext } from "@/app/GlobalProvider";

const Timeslots = ({ hired }: { hired: boolean }) => {
  const [day, setDay] = useState<"tuesday" | "wednesday">("tuesday");
  const { employee } = useGlobalContext();

  return (
    <>
      <div className="flex w-full gap-x-2">
        <p className="flex flex-1 text-xl pb-3">{day}</p>
        <LuArrowBigLeft onClick={() => setDay("tuesday")} size={30} />
        <LuArrowBigRight onClick={() => setDay("wednesday")} size={30} />
      </div>
      <div className="flex flex-col gap-y-2">
        {timeslot[day].map((time, index) => {
          return (
            <div key={index} className="flex h-20 gap-x-3">
              <div className="w-20 rounded-md flex items-center justify-center border-2 border-tertiary">
                <p>{time.time}</p>
              </div>
              <div className="flex flex-1 border-2 border-secondary rounded-md gap-x-2 px-3 py-2">
                {time.address.map((employee, index) => {
                  return (
                    <div className="flex flex-col" key={index + employee}>
                      <div
                        className={`h-[70%] aspect-square rounded-full ${
                          employee === "0xabc"
                            ? "bg-gray-500"
                            : employee === "0xbcd"
                            ? "bg-blue-300"
                            : employee === "0xcde"
                            ? "bg-green-400"
                            : "bg-yellow-400"
                        }`}
                      />
                      <p className="text-sm">{employee}</p>
                    </div>
                  );
                })}
                {hired && time.time >= "1300" && time.time <= "1700" && (
                  <div className="flex flex-col">
                    <div className="h-[70%] aspect-square rounded-full bg-red-400" />
                    <p className="text-sm">{employee[0].user.slice(0, 5)}...</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Timeslots;
