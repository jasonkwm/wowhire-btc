"use client";

import { useState } from "react";
import Timeslots from "./Timeslots";
import * as Dialog from "@radix-ui/react-dialog";
import AddHire from "./AddHire";

export default function Page() {
  const [open, setOpen] = useState(false);
  const [hired, setHired] = useState(false);

  return (
    <div className="w-full flex justify-center">
      <div className="w-[600px] max-w-[95%] flex flex-col gap-y-3 mt-10 md:mt-20">
        <p className="font-header text-xl">Barista</p>
        <p className="text-base font-light">
          If coffee is your canvas, and mornings don't start without that perfect pour, you might be our next Barista
          Extraordinaire. We're on the hunt for someone who can transform beans and water into magic and serve it up
          with just the right blend of charm and speed.
        </p>
        <div className="flex flex-col">
          <div className="flex items-center pb-3">
            <p className="flex-1 font-header text-lg">Timeslots</p>
            <div className="px-5 py-1 border-2 border-primary rounded-md cursor-pointer" onClick={() => setOpen(true)}>
              Add hire
            </div>
          </div>
          <Timeslots hired={hired} />
        </div>
        <Dialog.Root open={open} onOpenChange={(open) => !open && setOpen(false)}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/70" />
            <Dialog.Content asChild>
              <AddHire setOpen={setOpen} setHired={setHired} />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </div>
  );
}
