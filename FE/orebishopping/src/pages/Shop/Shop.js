import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";
import { findByCondition, findByPriceRange, getAllBooks } from "../../service/BookService";
import Product from "../../components/home/Products/Product";
import { getAllCategories } from "../../service/CategoryService";
import NavTitle from "../../components/pageProps/shopPage/shopBy/NavTitle";

const Shop = () => {
  // 1. Khởi tạo state
  const [items, setItems] = useState(9);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isPriceRangeSearch, setIsPriceRangeSearch] = useState(false);
  const [filters, setFilters] = useState({
    code: "",
    name: "",
    author: "",
    category: "",
    publisher: ""
  });

  // 2. Các hàm xử lý logic
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

  const handlePriceChange = (newMinPrice, newMaxPrice) => {
    setMinPrice(newMinPrice);
    setMaxPrice(newMaxPrice);
  };

  const searchByPriceRange = () => {
    setCurrentPage(0);
    setIsPriceRangeSearch(true);
    findByPriceRange({ minPrice, maxPrice }, currentPage, items).then((res) => {
      setTotalCategories(res.totalElements);
      setBooks(res.content);
    }).catch((e) => console.error(e));
  };

  const resetSearch = () => {
    setIsPriceRangeSearch(false);
    setMinPrice("");
    setMaxPrice("");
    setFilters({
      code: "",
      name: "",
      author: "",
      category: "",
      publisher: ""
    });
    setCurrentPage(0);
    databook();
  };

  const handleCategoryChange = (categoryId) => {
    setCurrentPage(0);
    const newFilters = {
      ...filters,
      category: filters.category === categoryId ? "" : categoryId,
    };
    setFilters(newFilters);
    loadBooks({ ...newFilters, page: 0, size: items });
  };

  const loadBooks = (newFilters) => {
    findByCondition({
      ...newFilters,
      page: currentPage,
      size: items,
    }).then((res) => {
      console.log("Data Loaded:", res);
      setTotalCategories(res.totalElements);
      setBooks(res.content);
    });
  };

  const databook = () => {
    getAllBooks(currentPage, items).then((res) => {
      setTotalCategories(res.totalElements);
      setBooks(res.content);
    }).catch((e) => console.error(e));
  };

  const totalPages = Math.ceil(totalCategories / items);

  // 3. Sử dụng useEffect để theo dõi thay đổi
  useEffect(() => {
    if (isPriceRangeSearch) {
      findByPriceRange({ minPrice, maxPrice }, currentPage, items).then((res) => {
        setTotalCategories(res.totalElements);
        setBooks(res.content);
      }).catch((e) => console.error(e));
    } else if (filters.category) {
      loadBooks({
        ...filters,
        page: currentPage,
        size: items,
      });
    } else {
      databook();
    }
    getAllCategories().then((response) => {
      console.log(response);
      setCategories(response.content);
    }).catch((e) => console.error(e));
  }, [currentPage, items, isPriceRangeSearch]);

  // 4. Render UI
  return (
    <>
      <div className="max-w-container mx-auto px-4">
        <Breadcrumbs title="Products" />
        <div className="w-full h-full flex pb-20 gap-10">
          <div className="w-[20%] lgl:w-[25%] hidden mdl:inline-flex h-full">
            <div className="w-full">
              <NavTitle title="Danh mục" icons={false} />
              <div>
                <ul className="flex flex-col gap-4 text-sm lg:text-base text-[#767676]">
                  {categories.map((category) => (
                    <li
                      key={category.id}
                      className="border-b-[1px] border-b-[#F0F0F0] pb-2 flex items-center justify-between"
                    >
                      <label className="flex items-center space-x-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={filters.category === category.id}
                          onChange={() => handleCategoryChange(category.id)}
                          className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
                        />
                        <span>{category.name}</span>
                      </label>
                    </li>
                  ))}
                </ul>
                <div className="space-y-4 mt-20">
                  <div className="flex gap-4">
                    <input
                      type="number"
                      placeholder="Giá thấp nhất"
                      value={minPrice}
                      onChange={(e) => handlePriceChange(e.target.value, maxPrice)}
                      className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                    <input
                      type="number"
                      placeholder="Giá cao nhất"
                      value={maxPrice}
                      onChange={(e) => handlePriceChange(minPrice, e.target.value)}
                      className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={searchByPriceRange}
                      className="flex-1 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
                    >
                      Tìm kiếm
                    </button>
                    <button
                      onClick={resetSearch}
                      className="flex-1 px-4 py-2 bg-white text-black border border-black rounded-md hover:bg-gray-100 transition-colors"
                    >
                      Reset
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>

          <div className="w-full mdl:w-[80%] lgl:w-[75%] h-full flex flex-col gap-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {books.map((book) => (
                <Product
                  key={book.id}
                  id={book.id}
                  name={book.name}
                  imageUrl={book.imageUrl}
                  price={book.price}
                  author={book.author}
                  discount={book.discount}
                  quantity={book.quantity}
                />
              ))}
            </div>

            <nav className="flex justify-center mt-8">
              <ul className="flex items-center space-x-2">
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
      </div>
    </>
  );
};

export default Shop;
