import { useGlobalContext } from "@/app/GlobalProvider";
import React from "react";
import { useAccount } from "wagmi";
import AvailabilityForm from "./AvailabilityForm";
import Link from "next/link";

interface Employee {
  user: string;
  jobType: string;
  startFrom: string;
  endAt: string;
  description: string;
  hired: boolean;
}

export default function AvailabilityList() {
  const { employee } = useGlobalContext();
  const { address } = useAccount();

  // Filter posts based on the current user's address
  const userPosts = employee.filter((e: any) => e.user === address);

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg space-y-6">
      <h2 className="text-2xl font-semibold text-center mb-4">Your Job Postings</h2>

      {userPosts.length === 0 ? (
        <p className="text-gray-600 text-center">No job postings found for this address.</p>
      ) : (
        <div className="space-y-4">
          {userPosts.map((post: any, index: any) => {
            const PostContent = (
              <div
                key={index}
                className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
              >
                <h3 className="text-lg font-semibold text-gray-800">{post.jobType}</h3>
                <p className="text-gray-600">Start From: {new Date(post.startFrom).toLocaleDateString()}</p>
                <p className="text-gray-600">End At: {new Date(post.endAt).toLocaleDateString()}</p>
                <p className="text-gray-800 mt-2">{post.description}</p>
                <div className="mt-3">
                  <span
                    className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${
                      post.hired ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
                    }`}
                  >
                    {post.hired ? "Hired" : "Not Hired"}
                  </span>
                </div>
              </div>
            );

            return post.hired ? (
              <Link href="/employer" key={index} passHref>
                {PostContent}
              </Link>
            ) : (
              <div key={index}>{PostContent}</div>
            );
          })}
        </div>
      )}
    </div>
  );
}
