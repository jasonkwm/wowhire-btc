"use client";

import { useEffect } from "react";
import QRCode from "qrcode";

export default function Page() {
  useEffect(() => {
    const canvas = document.getElementById("qrcode");
    
    // Define the initial data
    const qrData = {
      name: "ETH GLOBAL",
      hourlyRate: 75,
      totalHours: 0.1666667,
      timestamp: new Date().getTime(),
      backgroundImage: "https://cdn.glitch.global/d9dd81e2-9072-4a94-8cf0-158fee54ab3f/devconpic.jpg?v=1731358088320"
    };

    // Function to update the QR code
    const updateQRCode = () => {
      qrData.timestamp = new Date().getTime();
      if (canvas) {
        QRCode.toCanvas(
          canvas,
          JSON.stringify(qrData),
          { width: 350, margin: 2 },
          function (error) {
            if (error) console.error(error);
            else console.log("QR Code updated successfully!");
          }
        );
      }
    };

    updateQRCode();

    const intervalId = setInterval(updateQRCode, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      className="bg-cover bg-center min-h-screen flex items-center justify-center p-4 sm:p-8 md:p-12"
      style={{
        backgroundImage:
          'url("/devconBg.jpg")',
      }}
    >
      <a
        href="#"
        className="flex flex-col h-full w-full max-w-2xl sm:max-w-sm md:max-w-md lg:max-w-lg p-10 border border-black rounded-lg shadow-2xl text-center items-center bg-white bg-opacity-80"
      >
        <div>
          <div className="text-black text-gray-600 mb-2">Employer QR:</div>
          <div className="text-black text-4xl font-bold mb-4">ETH GLOBAL</div>
          <canvas id="qrcode" style={{ width: "350px", height: "350px" }}></canvas>
          <div className="text-black mt-4">Scan the QR to clock in!</div>
        </div>
      </a>
    </div>
  );
}
