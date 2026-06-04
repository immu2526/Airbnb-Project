import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const stars = ["Terrible", "Poor", "Okay", "Good", "Amazing"];
const Review = () => {
  const [rating, setRating] = useState(3);
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (review.trim().length < 10) return;
    const listingId = window.location.pathname.split("/").pop();

    // console.log(rating, review, listingId);

    // call the api

    try {
      let response = await axios.post(
        "http://localhost:5000/api/listing/review/new",
        {
          rating: rating,
          comment: review,
          listingId: listingId,
        },
        { withCredentials: true }
      );
      console.log(response);
      setSubmitted(true);
      toast.success("Review Created!");
    } catch (error) {
      const message = error.response?.data || error.message;
      toast.error(message);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#ffffff] flex items-center  px-4 py-2 lg:ml-70">
        <div className="bg-white     p-10 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-[#FF385C] rounded-full flex items-center justify-center mx-auto mb-5">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-[#222222] mb-2">
            Thank you!
          </h2>
          <p className="text-[#717171] text-sm mb-6">
            Your review has been submitted successfully.
          </p>
          <button
            onClick={() => {
              setSubmitted(false);
              setRating(3);
              setReview("");
            }}
            className="text-sm font-semibold text-[#FF385C] underline underline-offset-2 hover:text-[#E0335A] transition-colors"
          >
            Write another review
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ffffff] flex items-center  px-4 py-2 lg:ml-70">
      <div className="bg-white w-full max-w-lg overflow-hidden ">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-[#EBEBEB]">
          <div className="flex items-center gap-3 mb-1">
            <svg width="24" height="24" viewBox="0 0 32 32" fill="#FF385C">
              <path d="M16 1C10.6 1 5 7.2 5 14.5c0 4.1 1.9 8 5.1 11.2L16 31l5.9-5.3C25.1 22.5 27 18.6 27 14.5 27 7.2 21.4 1 16 1zm0 19.5c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6z" />
            </svg>
            <span className="text-[#FF385C] font-bold text-lg tracking-tight">
              airbnb
            </span>
          </div>
          <h1 className="text-2xl font-semibold text-[#222222] mt-3">
            Leave a Review
          </h1>
          <p className="text-sm text-[#717171] mt-1">
            How was your stay? Share your experience.
          </p>
        </div>

        {/* Form */}
        <div className="px-8 py-8 space-y-8">
          {/* Range Input */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-[#222222]">
                Overall Rating
              </label>
              <span className="text-sm font-semibold text-[#FF385C]">
                {stars[rating - 1]}
              </span>
            </div>

            {/* Star display */}
            <div className="flex gap-1 mb-4">
              {[1, 2, 3, 4, 5].map((s) => (
                <svg
                  key={s}
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill={s <= rating ? "#FF385C" : "#EBEBEB"}
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-all duration-200"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>

            {/* Range slider */}
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #FF385C ${
                  ((rating - 1) / 4) * 100
                }%, #EBEBEB ${((rating - 1) / 4) * 100}%)`,
              }}
            />
            <div className="flex justify-between mt-2">
              {stars.map((s, i) => (
                <span
                  key={s}
                  className={`text-[11px] font-medium transition-colors ${
                    i + 1 === rating ? "text-[#FF385C]" : "text-[#BBBBBB]"
                  }`}
                >
                  {i + 1}
                </span>
              ))}
            </div>
          </div>

          {/* Textarea Input */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-semibold text-[#222222]">
                Your Review
              </label>
              <span className="text-xs text-[#BBBBBB]">
                {review.length} / 500
              </span>
            </div>
            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value.slice(0, 500))}
              placeholder="Tell others about your experience — the location, the host, the vibe..."
              rows={5}
              className="w-full border border-[#EBEBEB] rounded-2xl px-4 py-3 text-sm text-[#222222] placeholder-[#BBBBBB] resize-none focus:outline-none focus:border-[#222222] transition-colors duration-200 leading-relaxed"
            />
            {review.trim().length > 0 && review.trim().length < 10 && (
              <p className="text-xs text-[#FF385C] mt-1.5 ml-1">
                Please write at least 10 characters.
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={review.trim().length < 10}
            className="w-full py-3.5 rounded-xl text-sm font-semibold text-white transition-all duration-200
              bg-gradient-to-r from-[#FF385C] to-[#E61E4D]
              hover:from-[#E61E4D] hover:to-[#D70466]
              disabled:from-[#FFB3BF] disabled:to-[#FFB3BF] disabled:cursor-not-allowed
              active:scale-[0.98]"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
