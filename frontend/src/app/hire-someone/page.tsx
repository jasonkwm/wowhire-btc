"use client";

import { useState } from "react";
import JobModal from "../get-hired/JobModal";
import Header from "./Header";
import * as Dialog from "@radix-ui/react-dialog";
import MyEvents from "./MyEvents";

export default function Page() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[600px] max-w-[95%]">
        <Header />
        <MyEvents />
        {/* <Dialog.Root open={selectedId} onOpenChange={(open) => !open && setSelectedId(0)}>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/70" />
            <Dialog.Content asChild>
              <JobModal setSelectedId={setSelectedId} />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root> */}
      </div>
    </div>
  );
}
