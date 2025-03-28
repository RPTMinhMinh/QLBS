import React, { useEffect, useState } from 'react'
import Breadcrumbs from '../../components/pageProps/Breadcrumbs'
import { getAllOrders, getOrderByEmail, getOrderDetail } from '../../service/OrderDetail';
import { formatPrice } from '../../constants/constant';

import { MdRemoveRedEye } from 'react-icons/md';

export const Order = () => {
  const [orders, setOrders] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [items, setItems] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalOrder, setTotalOrder] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getOrderByEmail(currentPage, items)
      .then((res) => {
        setOrders(res.content);
        setTotalOrder(res.totalElements);
      })
      .catch((e) => console.error(e));
  }, [currentPage, items]);

  const totalPages = Math.ceil(totalOrder / items);
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


  const handleViewDetail = (orderId) => {
    getOrderDetail(orderId).then((res) => {
      setOrderDetail(res.content);
    }).catch((e) => console.error(e))
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="max-w-container mx-auto px-4">
        <Breadcrumbs title="Danh sách đơn hàng" />
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STT
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã đơn hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày đặt hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order, index) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap flex justify-center items-center">
                    {index + 1 + currentPage * items}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.code}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.createDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order.status === 'Đã giao hàng'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'Đang giao hàng'
                          ? 'bg-blue-100 text-blue-800'
                          : order.status === 'Chờ xác nhận'
                            ? 'bg-yellow-100 text-yellow-800'
                            : order.status === 'Chờ lấy hàng'
                              ? 'bg-orange-100 text-orange-800'
                              : 'bg-red-100 text-red-800'
                        }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <MdRemoveRedEye onClick={() => handleViewDetail(order.id)} className="h-5 w-5 mr-2" /> {/* Icon từ react-icons */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Thanh phân trang */}
          <nav className="flex justify-center mt-8 mb-8">
            <ul className="flex items-center space-x-2">
              {/* Nút Previous */}
              <li>
                <button
                  className={`px-4 py-2 border rounded-md ${currentPage === 0 ? "bg-gray-200 cursor-not-allowed" : "hover:bg-gray-300"
                    }`}
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                >
                  Trước
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
                  Sau
                </button>
              </li>
            </ul>
          </nav>
        </div>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-md w-full max-w-5xl">
              <h2 className="text-lg font-semibold mb-4">Chi tiết đơn hàng</h2>
              {orderDetail && (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                        STT
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                        Ảnh
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                        Tên sản phẩm
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                        Số lượng
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                        Giảm giá
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500">
                        Giá tiền
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orderDetail.map((orderDetail, index) => (
                      <tr key={orderDetail.id}>
                        <td className="px-6 py-4 whitespace-nowrap flex justify-center items-center">{index + 1}</td>
                        <td className="px-6 py-4 whitespace-nowrap" style={{ width: 100 }}>
                          <img
                            className="w-[50px] h-[50px] object-cover rounded-md"
                            src={orderDetail.bookDto.imageUrl}
                            alt="Book Image"
                          />
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          {orderDetail.bookDto.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {orderDetail.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {orderDetail.bookDto.discount} %
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {formatPrice(orderDetail.price)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

              )}
              <div className="mt-4 flex justify-end">
                <span className=" text-lg">
                  Phí vận chuyển: {formatPrice(30000)}
                </span>
              </div>
              {/* Hiển thị tổng tiền */}
              <div className="mt-4 flex justify-end">
                <span className="text-lg">
                  Tổng tiền: {orderDetail && formatPrice(orderDetail.reduce((acc, item) => acc + item.price, 0) + 30000)}
                </span>
              </div>
              <button
                onClick={closeModal}
                className="mt-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              >
                Đóng
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
