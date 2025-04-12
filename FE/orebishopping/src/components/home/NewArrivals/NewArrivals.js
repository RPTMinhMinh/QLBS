import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import {
  newArrOne,
  newArrTwo,
  newArrThree,
  newArrFour,
} from "../../../assets/images/index";
import SampleNextArrow from "./SampleNextArrow";
import SamplePrevArrow from "./SamplePrevArrow";
import { newArrivedBook } from "../../../service/BookService";

const NewArrivals = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    newArrivedBook().then((res) => {
      console.log(res.data);
      setData(res.data);
    }).catch((e) => console.error(e));
  }, [])
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: Math.min(4, data.length),
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };
  return (
    <div className="w-full pb-16">
      <Heading heading="Sản phẩm mới" />
      <Slider {...settings}>
      {data.map((book) =>
          <div className="px-2 !w-[96%] !inline-block" key={book.id}>
            {/* id, name, imageUrl, price, author, discount */}
            <Product
                id={book.id}
                imageUrl={book.imageUrl}
                name={book.name}
                price={book.price}
                author={book.author}
                discount={book.discount}
            />
          </div>
      )}
      </Slider>
    </div>
  );
};

export default NewArrivals;
