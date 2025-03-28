import { Building, CheckCircle, Eye, FileText, List, Pencil, RefreshCcw, Search, Tag, Target, Trash2, User } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import { useEffect, useState } from 'react';
import { Book } from '../../types/Book';
import { deleteBook, getAll, getBookByCondition } from '../../service/BookService';
import { confirmDelete } from '../../utils/ConfirmationDialog';
import { Category } from '../../types/Category';
import { Publisher } from '../../types/Publisher';
import { useNavigate } from 'react-router-dom';
import { getAllCategory } from '../../service/CategoryService';
import { getAllPublisher } from '../../service/PublisherService';


export const BookList = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalBook, setTotalBook] = useState(0);
  const [category, setCategory] = useState<Category[]>([]);
  const [publisher, setPublisher] = useState<Publisher[]>([]);
  const [param, setParam] = useState({
    code: '',
    name: '',
    author: '',
    category: '',
    publisher: '',
  });

  const navigate = useNavigate();

  function getAllBooks() {
    getAll(currentPage, itemsPerPage)
      .then((response: any) => {
        setBooks(response.content);
        setTotalBook(response.totalElements);
      })
      .catch((e: any) => console.error(e));
  }

  function getAllCategories() {
    getAllCategory(0, 10).then((response: any) => {
      setCategory(response.content);
    }).catch((e: any) => console.error(e));
  }

  function getAllPublishers() {
    getAllPublisher(0, 10).then((response: any) => {
      setPublisher(response.content);
    }).catch((e: any) => console.error(e));
  }

  useEffect(() => {
    getData();
    getAllCategories();
    getAllPublishers();
  }, [currentPage, itemsPerPage]);

  const totalPages = Math.ceil(totalBook / itemsPerPage);

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
    if (param.category || param.name || param.code || param.publisher || param.author) {
      dataSearch()
    } else {
      getAllBooks()
    }
  }

  function dataSearch() {
    getBookByCondition(currentPage, itemsPerPage, param).then((response: any) => {
      setBooks(response.content);
      setTotalBook(response.totalElements)
    })
  }

  const handleReset = () => {
    setParam({
      code: '',
      name: '',
      author: '',
      category: '',
      publisher: '',
    })
    getAllBooks();
  }

  const handleSearch = () => {
    dataSearch()
  }

  const handleRemove = (id: number) => {
    confirmDelete('Bạn chắc chắn mốn xóa sách này ?', 'Hành động này không thể hoàn tác!', () => {
      deleteBook(id).then(() => {
        getAllBooks()
      }).catch((error: any) => console.error(error));
    })
  }

  const handleShow = (id: number) => {
    navigate(`/showDetailBook/${id}`)
  };
  const handleEdit = (id: number) => {
    navigate(`/updateBook/${id}`)
  }


  return (
    <>
      <Breadcrumb pageName='Danh sách sản phẩm' />
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
            name="name"
            value={param.name}
            onChange={(e) => setParam({ ...param, name: e.target.value })}
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Tên sách"
          />
        </div>

        <div className="relative flex-1 min-w-[250px]">
          <User
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
          <input
            type="text"
            name="author"
            value={param.author}
            onChange={(e) => setParam({ ...param, author: e.target.value })}
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Tác giả"
          />
        </div>

        <div className="relative flex-1 min-w-[350px]">
          <List
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
          <select
            value={param.category}
            onChange={(e) => setParam({ ...param, category: e.target.value })}
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
            <option>Chọn danh mục</option>
            {category.map((index) => (
              <option key={index.id} value={Number(index.id)}>{index.name}</option>
            ))}
          </select>
        </div>

        <div className="relative flex-1 min-w-[250px]">
          <Building
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
          <select
            value={param.publisher}
            onChange={(e) => setParam({ ...param, publisher: e.target.value })}
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
            <option>Chọn Nhà xuất bản</option>
            {publisher.map((index) => (
              <option key={index.id} value={Number(index.id)}>{index.name}</option>
            ))}
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
                  <th className="py-4 px-6 font-semibold">Mã sách</th>
                  <th className="py-4 px-6 font-semibold">Ảnh</th>
                  <th className="py-4 px-6 font-semibold">Tên sách</th>
                  <th className="py-4 px-6 font-semibold">Danh mục</th>
                  <th className="py-4 px-6 font-semibold">Nhà xuất bản</th>
                  <th className="py-4 px-6 font-semibold">Số lượng</th>
                  <th className="py-4 px-6 font-semibold">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book, index) => (
                  <tr key={book.id}>
                    <td className="py-4 px-6">
                      {index + 1}
                    </td>
                    <td className="py-4 px-6">{book.code}</td>
                    <td className="py-4 px-6">
                      <img
                        src={book.imageUrl}
                        style={{ width: 80, height: 80 }}
                        alt="book Image 1"
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="py-4 px-6">{book.name}</td>
                    <td className="py-4 px-6">{book.categoryName}</td>
                    <td className="py-4 px-6">{book.publisherName}</td>
                    <td className="py-4 px-6">{book.quantity}</td>
                    <td
                      className="py-4 px-6 flex gap-4"
                      style={{ marginTop: '15%' }}
                    >
                      <button className="text-blue-600 hover:text-blue-800 transition">
                        <Eye
                          onClick={() => handleShow(book.id)}
                          size={20} />
                      </button>
                      <button className="text-yellow-600 hover:text-yellow-800 transition">
                        <Pencil
                          onClick={() => handleEdit(book.id)}
                          size={20}
                        />
                      </button>
                      <button
                        onClick={() => {
                          handleRemove(book.id);
                        }}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-end">
                <li
                  className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}
                >
                  <button
                    className="page-link"
                    onClick={handlePrevPage}
                    disabled={currentPage === 0}
                  >
                    Previous
                  </button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                  <li
                    className={`page-item ${currentPage === index ? 'active' : ''
                      }`}
                    key={index}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                <li
                  className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''
                    }`}
                >
                  <button
                    className="page-link"
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
      </div>
    </>
  )
}
