import React from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Products/Product";
import { paginationItems } from "../../../constants";
import FavoriteList from "../../../pages/FavoriteList/FavoriteList";

const items = paginationItems;
function Items({ currentItems }) {
  return (
    <>
      {currentItems &&
        currentItems.map((book) => (
          <div key={book.id} className="w-full">
            <Product
             key={book.id} 
             id={book.id}
             name={book.name}
             imageUrl={book.imageUrl}
             price={book.price}
             author={book.author}
             discount={book.discount}
            />
          </div>
        ))}
    </>
  );
}

const Pagination = ({ currentPage, setCurrentPage, totalItems, itemsPerPage }) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (event) => {
    setCurrentPage(event.selected);
  };

  return (
    <div className="flex justify-center items-center py-6">
      <ReactPaginate
        nextLabel="→"
        previousLabel="←"
        onPageChange={handlePageClick}
        pageCount={pageCount}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        containerClassName="flex space-x-2 text-lg font-semibold"
        pageLinkClassName="w-10 h-10 flex justify-center items-center border border-gray-300 rounded-lg hover:bg-gray-200 transition"
        activeClassName="bg-blue-600 text-white"
        previousLinkClassName="w-10 h-10 flex justify-center items-center border border-gray-300 rounded-lg hover:bg-gray-200 transition"
        nextLinkClassName="w-10 h-10 flex justify-center items-center border border-gray-300 rounded-lg hover:bg-gray-200 transition"
      />
    </div>
  );
};

export default Pagination;



