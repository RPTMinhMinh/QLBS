import { Eye, FileText, Pencil, RefreshCcw, Search, Tag, Trash2, User } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import { deleteOrder, findByIdOrder, getAll, getOrderByCondition, updateOrder } from '../../service/OrderService';
import { Order } from '../../types/Order';
import { useEffect, useState } from 'react';
import { confirmDelete } from '../../utils/ConfirmationDialog';
import '../../assets/index.css';
import { OrderDetail } from '../../types/OrderDetail';
import { getOrderDetail } from '../../service/OrderDetail';

export const OrderList = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalOrder, setTotalOrder] = useState(0);
  const [orderDetail, setOrderDetail] = useState<OrderDetail[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState({
    id: 0,
    code: '',
    status: '',
    accountId: 0,
    accountName: '',
  })

  const [param, setParam] = useState({
    code: '',
    accountName: '',
    status: '',
  });

  function getAllOrders() {
    getAll(currentPage, itemsPerPage)
      .then((response: any) => {
        console.log(response.content);
        setOrders(response.content);
        setTotalOrder(response.totalElements);
      })
      .catch((e: any) => console.error(e));
  }

  useEffect(() => {
    getData();
  }, [currentPage, itemsPerPage]);

  const totalPages = Math.ceil(totalOrder / itemsPerPage);

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

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    getData();
  };

  function getData() {
    if (param.code || param.accountName || param.status) {
      dataSearch()
    } else {
      getAllOrders()
    }
  }

  const handleSearch = () => {
    dataSearch()
  }
  function dataSearch() {
    getOrderByCondition(param, currentPage, itemsPerPage).then((response: any) => {
      setOrders(response.content);
      setTotalOrder(response.totalElements)
    })
  }
  const handleReset = () => {
    setParam({
      code: '',
      accountName: '',
      status: '',
    })
    getAllOrders()
  }

  const handleRemove = (id: number) => {
    confirmDelete('Bạn chắc chắn muốn xóa đơn hàng này ?', 'Hành động này không thể hoàn tác!', () => {
      deleteOrder(id).then(() => {
        getAllOrders()
      }).catch((error: any) => console.error(error));
    })
  }

  const handleDetail = (id: number) => {
    getOrderDetail(0, 10, id).then((response) => {
      setOrderDetail(response.content);
      setModalOpen(true);
    })
  }




  const handleUpdate = (id: number, newStatus: string) => {
    // Tạo một bản sao của data với status mới
    const updatedData = { ...data, status: newStatus };

    // Gọi API để cập nhật đơn hàng
    updateOrder(id, updatedData)
      .then(() => {
        getAllOrders();
        alert('Cập nhật đơn hàng thành công!');
      })
      .catch((error) => console.error(error));
  };


  return (
    <>
      <Breadcrumb pageName='Danh sách đơn hàng' />
      <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-white rounded-xl shadow-md">
        <div className="relative flex-1 min-w-[250px]">
          <FileText
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
          <input
            type="text"
            name="code"
            value={param.code}
            onChange={(e) => setParam({ ...param, code: e.target.value })}
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Mã sách"
          />
        </div>

        <div className="relative flex-1 min-w-[350px]">
          <Tag
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
          <input
            type="text"
            name="accountName"
            value={param.accountName}
            onChange={(e) => setParam({ ...param, accountName: e.target.value })}
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Tên khách hàng"
          />
        </div>

        <div className="relative flex-1 min-w-[250px]">
          <User
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
          <select
            value={param.status}
            onChange={(e) => setParam({ ...param, status: e.target.value })}
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
            <option>Chọn Trạng thái</option>
            <option value="Đã giao hàng">Đã giao hàng</option>
            <option value="Đang giao hàng">Đang giao hàng</option>
            <option value="Chờ xác nhận">Chờ xác nhận</option>
            <option value="Chờ lấy hàng">Chờ lấy hàng</option>
            <option value="Đã hủy">Đã hủy</option>
          </select>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-2 bg-gray-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-gray-700 transition-all text-lg font-semibold">
          <RefreshCcw size={20} />
          Làm mới
        </button>

        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all text-lg font-semibold">
          <Search size={20} />
          Tìm kiếm
        </button>
      </div>
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto text-left">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-4 px-6 font-semibold">STT</th>
                  <td className="py-4 px-6 font-semibold">Mã đơn hàng</td>
                  <th className="py-4 px-6 font-semibold">Họ tên</th>
                  <th className="py-4 px-6 font-semibold">Trạng thái</th>
                  <th className="py-4 px-6 font-semibold">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order.id}>
                    <td className="py-4 px-6">{index + 1 + currentPage * itemsPerPage}</td>
                    <td className="py-4 px-6">{order.code}</td>
                    <td className="py-4 px-6">{order.accountName}</td>
                    <td className="py-4 px-6">
                      <select
                        onChange={(e) => handleUpdate(order.id, e.target.value)}
                        value={order.status} // Đảm bảo trạng thái luôn phản ánh dữ liệu thực tế
                        className="form-select block w-full border rounded p-2 text-gray-700 font-medium text-sm"
                      >
                        <option value="Đã giao hàng">Đã giao hàng</option>
                        <option value="Đang giao hàng">Đang giao hàng</option>
                        <option value="Chờ lấy hàng">Chờ lấy hàng</option>
                        <option value="Chờ xác nhận">Chờ xác nhận</option>
                        <option value="Đã hủy">Đã hủy</option>
                      </select>
                    </td>

                    <td className="py-4 px-4 flex gap-4">
                      <button className="text-yellow-600 hover:text-yellow-800 transition">
                        <Eye
                          onClick={() => handleDetail(Number(order.id))}
                          size={20} />
                      </button>

                      <button className="text-red-600 hover:text-red-800 transition">
                        <Trash2
                          onClick={() => handleRemove(Number(order.id))}
                          size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-end">
                <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={handlePrevPage} disabled={currentPage === 0}>Previous</button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                  <li className={`page-item ${currentPage === index ? 'active' : ''}`} key={index}>
                    <button className="page-link" onClick={() => handlePageChange(index)}>{index + 1}</button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={handleNextPage} disabled={currentPage === totalPages - 1}>Next</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setModalOpen(false);
            }
          }}
        >
          <div className="bg-white p-6 rounded-xl shadow-xl w-[1000px] relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      STT
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tên sản phẩm
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Số lượng
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Giá
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orderDetail.map((product, index) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{index + 1}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.bookDto.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.quantity}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{product.price}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-gray-300">
                    <td
                      colSpan={3}
                      className="py-4 px-6 font-semibold text-right"
                    >
                      Tổng tiền:
                    </td>
                    <td className=" text-lg font-bold text-red-600">
                      {orderDetail.reduce((total, item) => {
                        const itemTotal = item.price * item.quantity;
                        return total + itemTotal;
                      }, 0)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
