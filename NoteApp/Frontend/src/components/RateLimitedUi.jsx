import React from "react";
import { AlertCircle } from "lucide-react"; // optional icon library
import toast from "react-hot-toast";

export const RateLimitedUi = () =>{
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 text-center">
      <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
      <h1 className="text-2xl font-semibold text-gray-800 mb-2">
        Too Many Requests
      </h1>
      <p className="text-primary  mb-6 max-w-md">
        You’ve made too many requests in a short period of time. Please wait a
        few seconds and try again.
      </p>
    </div>
  );
}
export default RateLimitedUi;