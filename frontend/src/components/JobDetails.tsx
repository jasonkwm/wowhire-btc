import Image from "next/image";

interface JobDetailsProps {
  imageUrl: string;
  jobTitle: string;
  company: string;
  location: string;
  workDay: string;
  workHours: string;
  requirements: string[];
  salary: string;
  description: string;
}
export default function JobDetails({
  imageUrl,
  jobTitle,
  company,
  location,
  workDay,
  workHours,
  requirements,
  salary,
  description,
}: JobDetailsProps) {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-6">
      <div className="">
        <Image src={imageUrl} alt={jobTitle} width={720} height={720} className="rounded-md mb-4 md:mb-0 md:mr-6" />
      </div>
      <div className="text-center md:text-left">
        <h1 className="text-2xl font-semibold text-gray-800">
          {jobTitle} @ {company}
        </h1>
        <p className="text-gray-600">{location}</p>
        <p className="text-gray-600">
          {workDay} | {workHours}
        </p>
        <p className="text-gray-600"></p>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-700">Requirements</h2>
        <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
          {requirements.map((requirement, index) => (
            <li key={index}>{requirement}</li>
          ))}
        </ul>
      </div>
      <div className="mt-6">
        <h2 className="text-lg font-semibold text-gray-700">Job Description</h2>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
      <h2 className="text-lg font-semibold text-gray-700 mt-8">
        Price: <span>{salary} BHAT</span>
      </h2>
      <button className="mt-2 w-full text-center mx-auto bg-secondary p-2 rounded-xl text-lg text-white font-semibold hover:bg-tertiary">
        APPLY
      </button>
    </div>
  );
}
