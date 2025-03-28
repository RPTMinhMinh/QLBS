import React, { useEffect, useState } from 'react'
import { deleteWishlist, getBooksByEmail } from '../../service/AccountService'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from '../../components/pageProps/Breadcrumbs';
import Badge from '../../components/home/Products/Badge';
import { FaShoppingCart } from 'react-icons/fa';
import { MdOutlineLabelImportant } from 'react-icons/md';
import { BsSuitHeartFill } from 'react-icons/bs';
import { formatPrice } from '../../constants/constant';
import Image from '../../components/designLayouts/Image';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { useCart } from '../../redux/CartContext';

const FavoriteList = () => {
  const [items, setItems] = useState(9);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [wishListBooks, setwishListBooks] = useState([])
  const token = localStorage.getItem('token');
  const {addCartItem} = useCart();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalPages = Math.ceil(totalCategories / items);

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  function getAllBooksWishLish(){
    getBooksByEmail(currentPage, items).then((res) => {
      console.log(res.content);
      setTotalCategories(res.totalElements);
      setwishListBooks(res.content);
    }).catch((e) => console.error(e));
  }

  useEffect(() => {
    getAllBooksWishLish();
  },[])

  const itemsPerPageFromBanner = (items) => {
    setItems(items);
  };

  // Xử lý xem chi tiết sản phẩm
  const handleProductDetails = (id) => {
    navigate(`/product/${id}`)
  };

  const handleRemoveFromWishLish = (id) => {
    deleteWishlist(id).then(() => {
      // console.log(res.data);
      toast.success("Đã xóa khỏi danh sách yêu thích!");
      getAllBooksWishLish();
    }).catch((e)=>console.error(e));
  }

  const handleAddToCart = (bookId) => {
    const obj = {bookId:bookId,quantity:1}
    try{
      addCartItem(obj)
      toast.success("Thêm vào giỏ hàng thành công")
    }catch(e){
      console.error(e)
    }
  
  }

  return (
    <div className="max-w-container mx-auto px-4">
    <Breadcrumbs title="Danh sách yêu thích" />
    <ToastContainer />
    
    {/* ================= Products Start here =================== */}
    <div className="w-full h-full flex pb-20 gap-10">
      {/* Product List */}
      <div className="w-full mdl:w-[80%] lgl:w-[100%] h-full flex flex-col gap-10">  
        {/* Danh sách sản phẩm */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishListBooks.map((book) => (
            <div key={book.id} className="relative group border rounded-lg shadow-md overflow-hidden">
              {/* Ảnh sản phẩm */}
              <div className="max-w-80 max-h-80 relative overflow-hidden">
                <Image className="w-full h-full object-cover" imgSrc={book.imageUrl} />
                <div className="absolute top-3 left-3">
                {book.discount !== null && book.discount !== undefined && (                  
                    <Badge discount={book.discount} />
                )}
                </div>
                {/* Hiệu ứng hover cho các nút */}
                <div className="w-full h-32 absolute bg-white -bottom-[130px] group-hover:bottom-0 duration-700">
                  <ul className="w-full h-full flex flex-col items-end justify-center gap-2 font-titleFont px-2 border-l border-r">
                    {/* Thêm vào giỏ hàng */}
                    <li
                      onClick={() => handleAddToCart(book.id)}
                      className="hover:text-primeColor text-sm flex items-center justify-end gap-2 cursor-pointer pb-1 duration-300 w-full"
                    >
                      Thêm vào giỏ hàng
                      <FaShoppingCart />
                    </li>
                    {/* Xem chi tiết */}
                    <li
                      onClick={() => handleProductDetails(book.id)}
                      className="hover:text-primeColor text-sm flex items-center justify-end gap-2 cursor-pointer pb-1 duration-300 w-full"
                    >
                      Xem chi tiết
                      <MdOutlineLabelImportant />
                    </li>
                    {/* Xóa khỏi yêu thích */}
                    <li
                      onClick={() => handleRemoveFromWishLish(book.id)}
                      className="hover:text-primeColor text-sm flex items-center justify-end gap-2 cursor-pointer pb-1 duration-300 w-full">
                      Xóa khỏi yêu thích
                      <BsSuitHeartFill />
                    </li>
                  </ul>
                </div>
              </div>
  
              {/* Thông tin sản phẩm */}
              <div className="max-w-80 py-6 flex flex-col gap-1 px-4">
                <div className="flex items-center justify-between font-titleFont">
                  <h2 className="text-lg font-bold">{book.name}</h2>
                  <p className="text-[14px]">{formatPrice(book.price)}</p>
                </div>
                <p className="text-[14px] text-gray-600">{book.author}</p>
              </div>
            </div>
          ))}
        </div>
  
        {/* Thanh phân trang */}
        <nav className="flex justify-center mt-8">
          <ul className="flex items-center space-x-2">
            {/* Nút Previous */}
            <li>
              <button
                className={`px-4 py-2 border rounded-md ${currentPage === 0 ? "bg-gray-200 cursor-not-allowed" : "hover:bg-gray-300"
                  }`}
                onClick={handlePrevPage}
                disabled={currentPage === 0}
              >
                Previous
              </button>
            </li>
  
            {/* Số trang */}
            {Array.from({ length: totalPages }, (_, index) => (
              <li key={index}>
                <button
                  className={`px-4 py-2 border rounded-md ${currentPage === index ? "bg-blue-600 text-white" : "hover:bg-gray-300"
                    }`}
                  onClick={() => handlePageChange(index)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
  
            {/* Nút Next */}
            <li>
              <button
                className={`px-4 py-2 border rounded-md ${currentPage === totalPages - 1 ? "bg-gray-200 cursor-not-allowed" : "hover:bg-gray-300"
                  }`}
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    {/* ================= Products End here ===================== */}
  </div>
  
  )
}

export default FavoriteList