import { useGlobalContext } from "@/app/GlobalProvider";
import React, { useState } from "react";
import { useAccount } from "wagmi";

interface AvailabilityFormProps {
  jobTypes: string[];
}

const AvailabilityForm: React.FC<AvailabilityFormProps> = ({ jobTypes }) => {
  const { address } = useAccount();
  const [jobType, setJobType] = useState("");
  const [startFrom, setStartFrom] = useState("");
  const [endAt, setEndAt] = useState("");
  const [description, setDescription] = useState("");
  const { employee, setEmployee } = useGlobalContext();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      id: employee.length,
      user: address,
      jobType,
      startFrom,
      endAt,
      description,
      hired: false,
    };
    setEmployee((employee: any) => [...employee, formData]);
    console.log("Form submitted:", formData);
    // Add form submission logic here (e.g., API call)
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center">Post Your Availability</h2>
      {/* Job Type Dropdown */}
      <div>
        <label htmlFor="jobType" className="block text-gray-700 font-medium mb-2">
          Job Type
        </label>
        <select
          id="jobType"
          value={jobType}
          onChange={(e) => setJobType(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Select a job type</option>
          {jobTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Available From (Date and Time) */}
      <div>
        <label htmlFor="startFrom" className="block text-gray-700 font-medium mb-2">
          Start From
        </label>
        <input
          type="datetime-local"
          id="startFrom"
          value={startFrom}
          onChange={(e) => setStartFrom(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label htmlFor="endAt" className="block text-gray-700 font-medium mb-2">
          End At
        </label>
        <input
          type="datetime-local"
          id="endAt"
          value={endAt}
          onChange={(e) => setEndAt(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
          Short Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Tell us a bit about yourself and your experience..."
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-primary hover:bg-primary text-white font-semibold py-2 rounded-md transform transition-transform duration-300 hover:scale-105"
      >
        Submit Availability
      </button>
    </form>
  );
};

export default AvailabilityForm;
