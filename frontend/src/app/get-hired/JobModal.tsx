import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Dispatch, SetStateAction } from "react";

const JobModal = ({ setSelectedId }: { setSelectedId: Dispatch<SetStateAction<number>> }) => {
  return (
    <div className="absolute py-2 md:py-5 px-3 md:px-6 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] max-w-[95%] h-fit max-h-[90vh] overflow-y-scroll">
      <VisuallyHidden asChild>
        <Dialog.Title>Job details</Dialog.Title>
      </VisuallyHidden>
      <p>HELLO</p>
    </div>
  );
};

export default JobModal;
