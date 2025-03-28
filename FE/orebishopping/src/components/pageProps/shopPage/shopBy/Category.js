import React, { useEffect, useState } from "react";
// import { FaPlus } from "react-icons/fa";
import { ImPlus } from "react-icons/im";
import NavTitle from "./NavTitle";
import { findByIdCategory, getAllCategories } from "../../../../service/CategoryService";

const Category = () => {

  const [categories, setCategories] = useState([]);
  useEffect(()=> {
    getAllCategories().then((response) => {
      console.log(response);
      setCategories(response.content);
    }).catch((e) => console.error(e));
  }, []);


  return (
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
              className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            />
            <span>{category.name}</span>
          </label>
        </li>
      ))}
    </ul>
      </div>
    </div>
  );
};

export default Category;
