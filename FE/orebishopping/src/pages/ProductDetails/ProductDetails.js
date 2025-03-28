import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import ProductInfo from "../../components/pageProps/productDetails/ProductInfo";
import { findByIdBook } from "../../service/BookService";
import { checkHasReview, checkReview, createReview, deleteReview, getReviewByBookId, updateReview } from "../../service/Comment";
import ReviewPopup from "../../components/designLayouts/ReviewPopup";
import { FaStar, FaEdit, FaTrashAlt } from "react-icons/fa";
const ProductDetails = () => {
  const [bookDetail, setBookDetail] = useState({})
  const [prevLocation, setPrevLocation] = useState("");
  const location = useLocation();
  const { id } = useParams();
  const [check, setCheck] = useState();
  const [reviews, setReviews] = useState([])
  const [showPopup, setShowPopup] = useState(false);
  const [editReview, setEditReview] = useState(null);
  const [hasReview, setHasReview] = useState();

  const handleOpenPopup = (review = null) => {
    setEditReview(review);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setEditReview(null);
  };

  useEffect(() => {
    setPrevLocation(location.pathname);
    findByIdBook(id).then((res) => {
      setBookDetail(res.data);
    }).catch((e) => console.error(e));

    checkReview(id).then((data) => {
      setCheck(data.data)
    })

    checkHasReview(id)
    .then((res) => {
      // console.log(res.data);
      setHasReview(res.data); 
    })
    .catch((e) => console.error(e));

    reviewData()
  }, [id])

  function reviewData() {
    getReviewByBookId(id).then((response) => {
      // console.log('object', response);
      setReviews(response.content)
    });
  }
  const handleSaveReview = async (review) => {
    try {
      const req = {
        bookId: id,
        rating: review.rating,
        comment: review.comment,
        status: true
      };
  
      if (review.id) {
        // Nếu có review.id, đây là cập nhật đánh giá
        await updateReview(req, review.id);
      } else {
        // Nếu không có review.id, đây là thêm đánh giá mới
        await createReview(req);
      }
  
      // Cập nhật lại danh sách đánh giá
      reviewData();
    } catch (error) {
      console.error("Lỗi khi lưu đánh giá:", error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm("Bạn có chắc muốn xóa đánh giá này không?")) {
      await deleteReview(reviewId);
      reviewData();
    }
  };


  return (
    <>
      <div className="w-full mx-auto border-b-[1px] border-b-gray-300">
        <div className="max-w-container mx-auto px-4">
          <div className="xl:-mt-10 -mt-7">
            <Breadcrumbs title="" prevLocation={prevLocation} />
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-6 gap-8 h-full -mt-5 xl:-mt-8 pb-10 bg-white p-6 rounded-lg shadow-md">
            <div className="h-full xl:col-span-2">
              <img
                className="w-full h-full object-cover rounded-lg shadow-lg"
                src={bookDetail.imageUrl}
                alt={bookDetail.name}
              />
            </div>
            <div className="h-full w-full md:col-span-2 xl:col-span-3 xl:p-14 flex flex-col gap-8 justify-center">
              <ProductInfo bookDetail={bookDetail} />
            </div>
            <div className="w-full col-span-full mt-8">
              <h3 className="text-2xl font-semibold mb-6 border-b pb-2">Bình luận</h3>
              {
                check ==
                true && hasReview === false && (
                  <button
                    onClick={() => handleOpenPopup()}
                    className="px-6 py-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-md transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    Thêm đánh giá
                  </button>
                )
              }
              {showPopup && (
                <ReviewPopup
                  onClose={handleClosePopup}
                  onSave={handleSaveReview}
                  review={editReview}
                />
              )}
              {reviews && reviews.length > 0 ? (
                <ul className="space-y-6">
                  {reviews.map((review) => (
                    <li
                      key={review.id}
                      className="border p-6 rounded-lg shadow-lg bg-white transition-transform duration-300 hover:scale-105 relative"
                    >
                      <div className="flex items-center mb-4">
                        {/* Avatar + Tên người đánh giá */}
                        <img
                          src={review.imageUrl || "/default-avatar.png"}
                          alt={review.accountName}
                          className="w-12 h-12 rounded-full object-cover border border-gray-300"
                        />
                        <div className="ml-3">
                          <span className="font-semibold text-lg">{review.accountName}</span>
                          <span className="block text-gray-500 text-sm">
                            {new Date(review.createDate).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      {/* Số sao */}
                      <div className="flex items-center mb-2">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <FaStar
                            key={index}
                            className={`${index < review.rating ? "text-yellow-400" : "text-gray-300"
                              } w-5 h-5`}
                          />
                        ))}
                        <span className="ml-2 text-gray-600 text-sm">({review.rating}/5)</span>
                      </div>

                      {/* Nội dung đánh giá */}
                      <p className="text-gray-700 mt-2">{review.comment}</p>

                      {/* Nút Sửa và Xóa bên phải */}
                      <div className="absolute right-4 top-4 flex gap-2">
                        <button
                          onClick={() => handleOpenPopup(review)}
                          className="text-blue-500 hover:text-blue-700 flex items-center gap-1"
                        >
                          <FaEdit className="w-4 h-4" />
                          Sửa
                        </button>
                        <button
                          onClick={() => handleDeleteReview(review.id)}
                          className="text-red-500 hover:text-red-700 flex items-center gap-1"
                        >
                          <FaTrashAlt className="w-4 h-4" />
                          Xóa
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">Chưa có bình luận nào.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
