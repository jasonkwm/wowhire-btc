// import JobDetails from "@/components/JobDetails";

// export default function Page() {
//   return (
//     <JobDetails
//       imageUrl="/wowhire.jpg"
//       jobTitle="Cashier"
//       company="Starbucks"
//       location="92/4, Floor 2, Sathorn Thani 2 Building, North Sathorn Road, Si Lom, Bang Rak, Bangkok 10500"
//       workDay="Wednesday"
//       workHours="8am-12pm"
//       requirements={["Making Coffee", "Talking to people", "Art on Latte"]}
//       salary="500"
//       description="If coffee is your canvas, and mornings don’t start without that perfect pour, you might be our next Barista Extraordinaire. We’re on the hunt for someone who can transform beans and water into magic and serve it up with just the right blend of charm and speed."
//     />
"use client";

import { useState } from "react";
import Header from "./Header";
import JobPostings from "./JobPostings";
import * as Dialog from "@radix-ui/react-dialog";
import JobModal from "./JobModal";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

export default function Page() {
  const [selectedId, setSelectedId] = useState(0);

  return (
    <div className="w-[600px] max-w-[95%]">
      <Header />
      <JobPostings setSelectedId={setSelectedId} />
      <Dialog.Root open={selectedId !== 0} onOpenChange={(open) => !open && setSelectedId(0)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/70" />
          <Dialog.Content asChild>
            <JobModal setSelectedId={setSelectedId} />
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
