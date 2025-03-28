import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../../components/pageProps/Breadcrumbs";

const About = () => {
  const location = useLocation();
  const [prevLocation, setPrevLocation] = useState("");
  useEffect(() => {
    setPrevLocation(location.state.data);
  }, [location]);
  return (
    <div className="bg-white text-black font-sans">
    {/* Header Section */}
    <div className="text-center py-16">
      <h1 className="text-5xl font-bold mb-4">Về Chúng Tôi</h1>
      <p className="text-lg text-gray-700">
        Khám phá câu chuyện và sứ mệnh của Orebi.
      </p>
    </div>

    {/* Content Section */}
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="space-y-8">
        {/* Mission Section */}
        <div>
          <h2 className="text-3xl font-semibold mb-4">Sứ Mệnh Của Chúng Tôi</h2>
          <p className="text-gray-700 leading-relaxed">
            Tại Orebi, chúng tôi cam kết mang đến những sản phẩm chất lượng cao, dịch vụ tuyệt vời và trải nghiệm mua sắm trực tuyến không thể quên. Chúng tôi tin rằng mỗi sản phẩm đều mang theo một câu chuyện và giá trị riêng.
          </p>
        </div>

        {/* Story Section */}
        <div>
          <h2 className="text-3xl font-semibold mb-4">Câu Chuyện Của Orebi</h2>
          <p className="text-gray-700 leading-relaxed">
            Orebi được thành lập vào năm 2025 với mục tiêu trở thành điểm đến hàng đầu cho những người yêu thích sự tinh tế và chất lượng. Từ một cửa hàng nhỏ, chúng tôi đã phát triển thành một thương hiệu được tin cậy trên toàn quốc.
          </p>
        </div>

        {/* Values Section */}
        <div>
          <h2 className="text-3xl font-semibold mb-4">Giá Trị Cốt Lõi</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Chất lượng sản phẩm luôn là ưu tiên hàng đầu.</li>
            <li>Dịch vụ khách hàng tận tâm và chuyên nghiệp.</li>
            <li>Cam kết với sự bền vững và trách nhiệm xã hội.</li>
          </ul>
        </div>
      </div>
    </div>


  </div>
  );
};

export default About;
