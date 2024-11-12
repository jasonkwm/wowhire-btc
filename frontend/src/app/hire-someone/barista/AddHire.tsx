import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { useGlobalContext } from "@/app/GlobalProvider";

const AddHire = ({
  setOpen,
  setHired,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  setHired: Dispatch<SetStateAction<boolean>>;
}) => {
  const [startFrom, setStartFrom] = useState("");
  const [endAt, setEndAt] = useState("");
  const [find, setFind] = useState(false);
  const { employee, setEmployee } = useGlobalContext();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const height = window.innerHeight;
    setOffset((height - 500) / 2);
  }, []);

  const handleClick = (event: any) => {
    event.stopPropagation(); // Prevents click from propagating to parent elements
  };

  useEffect(() => {
    console.log(employee);
  }, [employee]);

  return (
    <div
      className="absolute z-10 top-0 left-1/2 -translate-x-1/2 translate-y-[30vh] w-[560px] max-w-[95vw] min-h-[500px] bg-foreground p-5 flex flex-col gap-y-3"
      onClick={handleClick}
    >
      <VisuallyHidden asChild>
        <Dialog.Title>Add hire</Dialog.Title>
      </VisuallyHidden>
      {offset &&
        (find ? (
          <>
            {employee.map((dude: any, index: number) => {
              const yerStart = new Date(startFrom);
              const yerEnd = new Date(endAt);
              const yeeStart = new Date(dude.startFrom);
              const yeeEnd = new Date(dude.endAt);
              if (yerStart >= yeeStart && yerEnd <= yeeEnd) {
                console.log("here");
                return null;
              }
              return (
                <div
                  className="flex flex-1 flex-col gap-y-1 bg-background p-5 rounded-lg max-h-fit border-2 border-tertiary"
                  key={index}
                >
                  <div className="flex gap-x-2 items-center">
                    <div className="min-w-16 min-h-16 rounded-full bg-red-400" />
                    <p className="text-base truncate">{dude.user}</p>
                  </div>
                  <p className="text-base md:text-xl">{dude.description}</p>
                  <button
                    className="px-10 py-2 bg-primary mt-4 font-header text-lg rounded-md"
                    onClick={() => {
                      const updatedEmployees = employee.map((emp: any) => {
                        if (emp === dude) {
                          return { ...emp, hired: true };
                        }
                        return emp;
                      });

                      setEmployee(updatedEmployees);
                      setHired(true);
                    }}
                  >
                    Hire!
                  </button>
                </div>
              );
            })}
          </>
        ) : (
          <>
            <p className="mb-2 text-sm text-black/50" onClick={() => setOpen(false)}>
              Back
            </p>
            <p className="font-header text-lg md:text-xl">Add Hire</p>
            <p>
              Need more helpers? Fret not!
              <br />
              Hire extra help here!
            </p>
            <div>
              <label htmlFor="startFrom" className="block text-gray-700 font-medium mb-2">
                Start From
              </label>
              <input
                type="datetime-local"
                id="startFrom"
                value={startFrom}
                onChange={(e) => setStartFrom(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="endAt" className="block text-gray-700 font-medium mb-2">
                End At
              </label>
              <input
                type="datetime-local"
                id="endAt"
                value={endAt}
                onChange={(e) => setEndAt(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <button
              className="w-full py-3 bg-primary rounded-lg mt-5"
              disabled={!startFrom || !endAt}
              onClick={() => setFind(true)}
            >
              Find!
            </button>
          </>
        ))}
    </div>
  );
};

export default AddHire;
