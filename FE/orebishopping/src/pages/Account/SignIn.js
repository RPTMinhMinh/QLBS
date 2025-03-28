import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { logoLight } from "../../assets/images";
import api from '../../service/AuthService';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: '',
    password: ''
  })
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (isValid()) {
        const response = await api.login({ email, password });
        localStorage.setItem("token", response.token);
        const decodeToken = await api.decode();
        const roleArr = decodeToken.roles;
        const token = response.token;
        for (const roleKey of roleArr) {
          if (roleKey.code === 'ADMIN') {
            window.location.href = `http://localhost:3001/?token=${token}`;
          }else if(roleKey.code === 'CUSTOMER'){
            window.location.href = `http://localhost:3000/`
          }
        }
      }
    } catch (error) {
      console.error(error);
    }
    function isValid() {
      let valid = true;
      const errorCopy = { email: "", password: "" };

      if (!email.trim()) {
        errorCopy.email = "Email không được để trống";
        valid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorCopy.email = "Email không hợp lệ";
        valid = false;
      }
      if (!password.trim()) {
        errorCopy.password = "Mật khẩu không được để trống";
        valid = false;
      }
      setError(errorCopy);
      return valid;
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img src={logoLight} alt="logoImg" className="w-28" />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">
              Chào mừng bạn đến với OREBI
            </h1>
            <p className="text-base">Cánh cửa mở ra thế giới tri thức</p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Bộ sưu tập khổng lồ
              </span>
              <br />
              Khám phá vô vàn đầu sách, từ những tác phẩm bán chạy nhất hiện nay đến những cuốn sách kinh điển vượt thời gian, từ sách thiếu nhi đến các công trình nghiên cứu học thuật.
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Mua sắm an toàn và tiện lợi
              </span>
              <br />
              Mua sắm sách chỉ với vài cú nhấp chuột và nhận sách tại nhà một cách nhanh chóng
            </p>
          </div>
          <div className="w-[300px] flex items-start gap-3">
            <span className="text-green-500 mt-1">
              <BsCheckCircleFill />
            </span>
            <p className="text-base text-gray-300">
              <span className="text-white font-semibold font-titleFont">
                Truy cập mọi dịch vụ của OREBI
              </span>
              <br />
              Ngoài sách, bạn còn được khám phá thế giới nội dung độc quyền và những ưu đãi hấp dẫn.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full lgl:w-1/2 h-full">

        <form className="w-full lgl:w-[450px] h-screen flex items-center justify-center">
          <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
            <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
              Đăng nhập
            </h1>
            <div className="flex flex-col gap-3">
              {/* Email */}
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Email
                </p>
                <input
                  onChange={handleEmail}
                  value={email}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="email"
                  placeholder="Nhập email"
                />
                {error.email &&
                  <p style={{ textAlign: 'left', color: 'red' }}>{error.email}</p>}
              </div>

              {/* Password */}
              <div className="flex flex-col gap-.5">
                <p className="font-titleFont text-base font-semibold text-gray-600">
                  Mật khẩu
                </p>
                <input
                  onChange={handlePassword}
                  value={password}
                  className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                  type="password"
                  placeholder="Nhập mật khẩu"
                />
                {error.password &&
                  <p style={{ textAlign: 'left', color: 'red' }}>{error.password}</p>}
              </div>

              <button
                onClick={handleLogin}
                className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300"
              >
                Đăng nhập
              </button>
              <p className="text-sm text-center font-titleFont font-medium">
                Chưa có tài khoản?{" "}
                <Link to="/signup">
                  <span className="hover:text-blue-600 duration-300">
                    Đăng kí
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
