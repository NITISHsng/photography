"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
// import use
const FeedbackForm: React.FC = () => {
  const [feedbackText, setFeedbackText] = useState("");
  const [rating, setRating] = useState(0);
  const [clientId, setClientId] = useState("");
  const [clientName, setClientName] = useState("");
  const [isValidClient, setIsValidClient] = useState<boolean | null>(null);

  // ✅ Auto-check when ID length == 15
const checkClient = async () => {
  if (clientId.length === 15) {
    try {
      const res = await fetch("/api/check-client", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: clientId }),
      });

      if (!res.ok) throw new Error("Failed to check client");

      const data = await res.json();
      setIsValidClient(data.valid);

    } catch (err) {
      console.error("Error checking client:", err);
      setIsValidClient(false);
    }
  } else {
    setIsValidClient(null);
  }
};

  useEffect(() => {
    checkClient();
  }, [clientId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidClient) {
      toast.error("Only valid clients can submit feedback.");
      return;
    }

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: clientId, feedbackText,clientName, rating }),
      });

      if (response.ok) {
        toast.success("Thank you for your feedback!");
        setFeedbackText("");
        setRating(0);
        setClientId("");
        setClientName("");
      } else {
        const errorData = await response.json();
        toast.error(`Failed: ${errorData.error}`)
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("An error occurred.");
    }
  };

  return (
    <div className="w-6xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
        Provide Feedback
      </h2>
      <p>Clients must be valid to give feedback</p> <br />
      <form onSubmit={handleSubmit}>
        {/* Client ID */}
        <div className="mb-4">
          <label
            htmlFor="clientId"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Booking ID
          </label>
          <input
            type="text"
            id="clientId"
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
            placeholder="Enter your client ID"
            required
          />
          {isValidClient === true && (
            <p className="text-green-600 text-sm mt-1">✔ Valid Client</p>
          )}
          {isValidClient === false && (
            <p className="text-red-600 text-sm mt-1">
              ✖ Invalid ID. Only clients can submit feedback.
            </p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="clientId"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
          Name
          </label>
          <input
            type="text"
            name="name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
            placeholder="Enter Your Name"
            required
          />
        </div>

        {/* Feedback */}
        <div className="mb-4">
          <label
            htmlFor="feedbackText"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Your Feedback
          </label>
          <textarea
            id="feedbackText"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm dark:bg-gray-700 dark:text-white"
            rows={5}
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
            placeholder="Tell us what you think..."
            required
          ></textarea>
        </div>

        {/* Rating */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Rating
          </label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className={`text-2xl ${
                  star <= rating
                    ? "text-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                } focus:outline-none`}
                onClick={() => setRating(star)}
              >
                ★
              </button>
            ))}
          </div>
        </div>
    <div className="flex justify-center">

        <button
          type="submit"
          disabled={!isValidClient}
          className={`w-full max-w-[500px] font-bold py-2 px-4 rounded-md focus:outline-none ${
            isValidClient
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
        >
          Submit Feedback
        </button>
    </div>
      </form>
    </div>
  );
};

export default FeedbackForm;
