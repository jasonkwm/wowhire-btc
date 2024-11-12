import { useFirestore } from "@/hooks/useFirestore";
import { parseISO, isThisWeek, format } from "date-fns";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import wowhire from "public/wowhire.jpg";
import doge from "public/doge.jpeg";
import { LuMapPin, LuTimer } from "react-icons/lu";

const DurationAndLocation = (doc: any) => {
  const calculateDuration = () => {
    const startDate = doc.doc.date.startDate.toDate();
    const endDate = doc.doc.date.endDate.toDate();
    const diff = endDate - startDate;

    const diffInHours = diff / (1000 * 60 * 60);
    const diffInDays = diffInHours / 24;

    if (diffInDays >= 1) {
      return `${Math.floor(diffInDays)} days`;
    } else {
      return `${Math.floor(diffInHours)} hours`;
    }
  };

  return (
    <div className="flex gap-x-2 items-center">
      <LuTimer size={20} />
      <p className="mr-3 text-sm md:text-base">{calculateDuration()}</p>
      <LuMapPin size={20} />
      <p className="line-clamp-1 text-sm md:text-base">{doc.doc.location}</p>
    </div>
  );
};

const JobPostings = ({ setSelectedId }: { setSelectedId: Dispatch<SetStateAction<number>> }) => {
  const [jobs, setJobs] = useState<Map<string, DocumentData[]> | undefined>(undefined);
  const { findAllDocumentsGroupedByDate } = useFirestore();

  const formatDateBasedOnWeek = (dateString: string) => {
    const date = parseISO(dateString);
    if (isThisWeek(date)) {
      return format(date, "eeee");
    } else {
      return format(date, "dd/MM/yy");
    }
  };

  useEffect(() => {
    const findAll = async () => {
      const data = await findAllDocumentsGroupedByDate("job");
      if (data) setJobs(data);
      console.log(data);
    };
    findAll();
  }, []);

  if (!jobs) return null;
  return (
    <div className="relative w-full flex flex-col pl-0 md:pl-5 mt-4 md:mt-8">
      <div className="absolute -z-10 top-3 left-[3px] md:left-[23px] w-1 h-full rounded-full bg-foreground/50" />
      {Array.from(jobs).map(([date, documents]) => (
        <div key={date} className="w-full flex flex-col space-y-3">
          <div className="flex space-x-4 items-center">
            <div className="w-[10px] h-[10px] rounded-full bg-foreground" />
            <p className="font-semibold text-xl">{formatDateBasedOnWeek(date)}</p>
          </div>
          <div className="w-full flex pl-3 md:pl-6">
            {documents.map((doc, index) => (
              <div
                key={index}
                className="relative w-full p-3 md:p-5 rounded-xl border-4 border-tertiary flex gap-x-4 cursor-pointer"
                onClick={() => setSelectedId(doc.id)}
              >
                <div className="flex flex-1 flex-col gap-y-1">
                  <div className="flex gap-x-2 items-center">
                    <Image src={wowhire} alt={`kampany ${doc.title}`} className="w-5 h-5 rounded-full" />
                    <p className="text-sm md:text-base">{doc.company}</p>
                  </div>
                  <p className="text-base md:text-xl">{doc.title}</p>
                  <p className="text-sm md:text-base font-light line-clamp-1">{doc.description}</p>
                  <DurationAndLocation doc={doc} />
                </div>
                <Image
                  src={doge}
                  alt={`logo ${doc.title}`}
                  className="max-w-16 max-h-16 md:max-w-28 md:max-h-28 rounded-md flex flex-1"
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobPostings;
