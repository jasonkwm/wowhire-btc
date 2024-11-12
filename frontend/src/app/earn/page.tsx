"use client";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const humanNumber = require("human-number");

export default function Page() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [hourlyRate, setHourlyRate] = useState(0);
  const [totalHours, setTotalHours] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [currentSats, setCurrentSats] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState("");

  useEffect(() => {
    const scannedData = localStorage.getItem("scannedData");
    if (scannedData) {
      const parsedData = JSON.parse(scannedData);
      setName(parsedData.name);
      setHourlyRate(parsedData.hourlyRate);
      setTotalHours(parsedData.totalHours);

      if (parsedData.backgroundImage) {
        setBackgroundImage(parsedData.backgroundImage);
      } else {
        setBackgroundImage("");
      }

      const savedTimestamp = parsedData.timestamp;
      const currentTimestamp = new Date().getTime();
      const elapsed = Math.floor((currentTimestamp - savedTimestamp) / 1000);
      setElapsedSeconds(elapsed);

      setDataLoaded(true);
    } else {
      router.push("/");
    }
  }, [router]);

  const isDataAvailable = dataLoaded && hourlyRate > 0 && totalHours > 0;

  const totalRewardUSD = isDataAvailable ? hourlyRate * totalHours : 0;
  const satsPerDollar = 100000000 / 85000;
  const totalRewardSats = totalRewardUSD * satsPerDollar;
  const durationInSeconds = isDataAvailable ? totalHours * 3600 : 1;
  const satsPerSecond = durationInSeconds > 0 ? Math.floor(totalRewardSats / durationInSeconds) : 0;

  const initialRemainingTime = Math.max(durationInSeconds - elapsedSeconds, 0);
  const initialSats = Math.floor(elapsedSeconds * satsPerSecond); // Round initial sats to integer

  useEffect(() => {
    if (isDataAvailable) {
      setCurrentSats(initialSats);
    }
  }, [initialSats, isDataAvailable]);

  const renderTime = ({ remainingTime }: { remainingTime: number }) => {
    const hours = Math.floor(remainingTime / 3600);
    const minutes = Math.floor((remainingTime % 3600) / 60);
    const seconds = remainingTime % 60;

    return (
      <div className="timer text-black">
        <div className="value text-7xl">{`${hours}:${minutes}:${seconds}`}</div>
        <div className="text mt-2">Time Remaining</div>
      </div>
    );
  };

  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (isDataAvailable) {
      const interval = setInterval(() => {
        setCurrentSats((prevSats) => Math.min(prevSats + satsPerSecond, Math.floor(totalRewardSats)));
        setFlash(true);
        setTimeout(() => setFlash(false), 300);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [satsPerSecond, totalRewardSats, isDataAvailable]);

  const currentUSD = currentSats / satsPerDollar;

  return (
    <div
      className={`bg-cover bg-center min-h-screen flex items-center justify-center p-4 sm:p-8 md:p-12`}
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : "none", // If no image, fallback to white background
        backgroundColor: backgroundImage ? "transparent" : "white", // Set white background if no image
      }}
    >
      <a
        href="#"
        className="flex flex-col h-full w-full max-w-2xl sm:max-w-sm md:max-w-md lg:max-w-lg p-10 border border-black rounded-lg shadow-2xl text-center items-center bg-white bg-opacity-80"
      >
        <div>
          <div className="text-black text-gray-600 mb-2">Currently working at</div>
          <div className="text-black text-4xl font-bold mb-4">{name}</div>
        </div>
        <div>
          <div className={`text-black text-2xl font-bold ${flash ? "flash" : ""}`}>
            {humanNumber(Math.floor(currentSats))} SATS &#8383;
          </div>
          <div className="text-black mb-4">
            (~ ${currentUSD.toFixed(2)}) - ${hourlyRate}/H
          </div>
        </div>
        <div className="mt-4">
          {isDataAvailable && (
            <CountdownCircleTimer
              isPlaying
              duration={durationInSeconds}
              initialRemainingTime={initialRemainingTime}
              size={350}
              colors="#34eb9b"
              onComplete={() => {
                router.push("/");
                return { shouldRepeat: false };
              }}
            >
              {renderTime}
            </CountdownCircleTimer>
          )}
        </div>
      </a>
    </div>
  );
}
