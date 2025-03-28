import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const ReviewPopup = ({ onClose, onSave, review }) => {
  const [rating, setRating] = useState(review?.rating || 0);
  const [comment, setComment] = useState(review?.comment || "");

  useEffect(() => {
    if (review) {
      setRating(review.rating);
      setComment(review.comment);
    }
  }, [review]);

  const handleSubmit = () => {
    if (rating > 0 && comment.trim() !== "") {
      onSave({ ...review, rating, comment });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">
          {review ? "Cập nhật đánh giá" : "Thêm đánh giá"}
        </h2>

        {/* Đánh giá số sao */}
        <div className="flex items-center mb-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <FaStar
              key={index}
              onClick={() => setRating(index + 1)}
              className={`cursor-pointer w-6 h-6 ${
                index < rating ? "text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Nội dung đánh giá */}
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Nhập nội dung đánh giá..."
          rows="4"
        ></textarea>

        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
          >
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            {review ? "Cập nhật" : "Thêm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPopup;
