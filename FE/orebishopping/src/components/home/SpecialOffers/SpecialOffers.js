import React, { useEffect, useState } from "react";
import Heading from "../Products/Heading";
import Product from "../Products/Product";
import { specialOffers } from "../../../service/BookService";
import SampleNextArrow from "../NewArrivals/SampleNextArrow";
import SamplePrevArrow from "../NewArrivals/SamplePrevArrow";
import Slider from "react-slick";


const SpecialOffers = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    specialOffers(45).then((res) => {
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
      <Heading heading="Khuyến mại đặc biệt" />
      <Slider {...settings}>
      {data.map((book) =>
          <div className="px-2" key={book.id}>
            {/* id, name, imageUrl, price, author, discount */}
            <Product
              id= {book.id}
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

export default SpecialOffers;
