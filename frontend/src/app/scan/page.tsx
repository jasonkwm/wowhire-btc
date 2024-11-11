"use client";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const [scanResult, setScanResult] = useState("");
  const [messageColor, setMessageColor] = useState("text-black");

  const handleScan = (result) => {
    try {
      localStorage.removeItem("scannedData");
      let parsedValue = JSON.parse(result[0].rawValue);

      if (!parsedValue.name || !parsedValue.hourlyRate || !parsedValue.totalHours || !parsedValue.timestamp) {
        throw new Error("Missing required fields");
      }

      const currentTimestamp = new Date().getTime();
      
      if (currentTimestamp - parsedValue.timestamp > 3000) {
        throw new Error("Expired QR scanned");
      }

      localStorage.setItem("scannedData", JSON.stringify(parsedValue));

      setScanResult("QR scanned, redirecting soon");
      setMessageColor("text-green-500");

      router.push("/earn");
    } catch (error) {
      setScanResult("Invalid / Expired QR scanned");
      setMessageColor("text-red-500");
    }
  };

  return (
    <div>
      <div className="bg-white min-h-screen flex items-center justify-center p-4 sm:p-8 md:p-12">
        <div className="text-center">
          <Scanner onScan={handleScan} />
          <div className="text-black mt-5">Scan to clock in</div>
          <div id="update" className={`${messageColor} mt-2`}>
            {scanResult}
          </div>
        </div>
      </div>
    </div>
  );
}
