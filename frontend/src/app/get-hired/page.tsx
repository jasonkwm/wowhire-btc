"use client";

import AvailabilityForm from "@/components/AvailabilityForm";
import AvailabilityList from "@/components/AvailabilityList";
import { useState } from "react";

export default function Page() {
  const [selected, setSelected] = useState(true);
  const jobTypes = [
    "Barista",
    "Cashier",
    "Kitchen/Line Cook",
    "Server/Floor Staff",
    "Diswasher",
    "Baker/Pastry Chef",
    "Runner/Busser",
    "Delivery/Rider",
  ];

  return (
    <div>
      <ToggleButton {...{ selected, setSelected }} />
      {selected ? <AvailabilityForm {...{ jobTypes }} /> : <AvailabilityList />}
    </div>
  );
}

function ToggleButton({ selected, setSelected }: { selected: any; setSelected: any }) {
  const optionOne = "View List";
  const optionTwo = "View Form";
  const [option, setOption] = useState(optionOne);

  const handleToggle = () => {
    const newSelection = option === optionOne ? optionTwo : optionOne;
    setSelected(option === optionOne ? false : true);
    setOption(newSelection);
  };
  return (
    <button
      onClick={handleToggle}
      className={`m-auto flex items-center justify-center w-32 p-2 rounded-full transition-all duration-300 ${
        option === optionOne ? "bg-blue-500 text-white" : "bg-primary text-white"
      }`}
    >
      <span className="font-semibold">{option === optionOne ? optionOne : optionTwo}</span>
    </button>
  );
}
