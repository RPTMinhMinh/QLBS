import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { logoLight } from "../../assets/images";
import { useAuth } from "../../redux/AuthContext";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    email: '',
    password: '',
    login: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setError({...error, email: '', login: ''});
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setError({...error, password: '', login: ''});
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isValid()) {
        const user = await login(email, password);
        const roleArr = user.roles;
        const token = localStorage.getItem("token");

        for (const roleKey of roleArr) {
          if (roleKey.code === 'ADMIN') {
            window.location.href = `http://localhost:3001/?token=${token}`;
          } else if (roleKey.code === 'CUSTOMER') {
            window.location.href = `http://localhost:3000/`;
          }
        }
      }
    } catch (error) {
      console.error("Login error details:", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
        config: error.config
      });

      // Xử lý lỗi từ server
      if (error.response) {
        const serverMessage = error.response.data?.message
            || error.response.data?.error
            || 'Đăng nhập thất bại';

        if (error.response.status === 401) {
          setError({
            email: '',
            password: 'Mật khẩu không chính xác',
            login: serverMessage
          });
        } else if (error.response.status === 404) {
          setError({
            email: 'Email không tồn tại trong hệ thống',
            password: '',
            login: serverMessage
          });
        } else {
          setError({
            email: '',
            password: '',
            login: serverMessage
          });
        }
      } else if (error.request) {
        setError({
          email: '',
          password: '',
          login: 'Không nhận được phản hồi từ server'
        });
      } else {
        setError({
          email: '',
          password: '',
          login: 'Lỗi khi gửi yêu cầu đăng nhập'
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isValid = () => {
    let valid = true;
    const errorCopy = { ...error, email: "", password: "", login: "" };

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

              {/* Hiển thị lỗi đăng nhập */}
              {error.login && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 flex items-start">
                    <svg
                        className="w-5 h-5 mr-2 mt-0.5 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <p className="font-medium">Lỗi đăng nhập</p>
                      <p>{error.login}</p>
                    </div>
                  </div>
              )}

              <div className="flex flex-col gap-3">
                {/* Email */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Email
                  </p>
                  <input
                      onChange={handleEmail}
                      value={email}
                      className={`w-full h-10 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] ${
                          error.email ? "border-red-500" : "border-gray-400"
                      } outline-none`}
                      type="email"
                      placeholder="Nhập email"
                  />
                  {error.email && (
                      <p className="text-red-500 text-sm mt-1">{error.email}</p>
                  )}
                </div>

                {/* Password */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Mật khẩu
                  </p>
                  <input
                      onChange={handlePassword}
                      value={password}
                      className={`w-full h-10 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] ${
                          error.password ? "border-red-500" : "border-gray-400"
                      } outline-none`}
                      type="password"
                      placeholder="Nhập mật khẩu"
                  />
                  {error.password && (
                      <p className="text-red-500 text-sm mt-1">{error.password}</p>
                  )}
                </div>

                <button
                    onClick={handleLogin}
                    disabled={isLoading}
                    className={`bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md duration-300 flex items-center justify-center ${
                        isLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                >
                  {isLoading ? (
                      <>
                        <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Đang xử lý...
                      </>
                  ) : (
                      "Đăng nhập"
                  )}
                </button>

                <div className="flex justify-between items-center mt-2">
                  <p className="text-sm text-center font-titleFont font-medium">
                    Chưa có tài khoản?{" "}
                    <Link to="/signup">
                    <span className="hover:text-blue-600 duration-300">
                      Đăng ký
                    </span>
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
  );
};

export default SignIn;