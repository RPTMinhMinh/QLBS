import React, { useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { logoLight } from "../../assets/images";
import { useAuth } from '../../service/AuthService';

const SignUp = () => {
  const [formData, setFormData] = useState({ fullname: '', email: '', phone: '', password: '', "roleIds": [3] });
  const [message, setMessage] = useState('');
  const [dataOtp, setDataOtp] = useState({ verificationCode: '', registerUserDto: '' });
  const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
  const navigate = useNavigate();
  const { signUp, verifyOtp, resend } = useAuth();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => {
      const updatedFormData = { ...prevData, [id]: value };
      setDataOtp((prevDataOtp) => ({ ...prevDataOtp, registerUserDto: updatedFormData }));
      return updatedFormData;
    });
  };

  const verificationCode = (e) => {
    const { id, value } = e.target;
    const updatedDataOtp = { ...dataOtp, [id]: value };
    setDataOtp(updatedDataOtp);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    document.getElementById("btnSignup").disabled = true;
    signUp(formData).then((response) => {
      if (response.code === 200) {
        setIsOtpModalVisible(true);
      } else {
        document.getElementById("btnSignup").disabled = false;
      }
    });
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    verifyOtp(dataOtp).then((response) => {
      if (response === "Account verified successfully") {
        navigate("/signin");
      }
    });
  };

  const resendCode = () => {
    resend(formData.email);
  };

  return (
    <div className="w-full h-screen flex items-center justify-start">
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
      <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
        <>
          <form
            onSubmit={handleSignUp}
            className="w-full lgl:w-[500px] h-screen flex items-center justify-center">
            <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                Tạo tài khoản
              </h1>
              <div className="flex flex-col gap-3">
                {/* client name */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Họ và tên
                  </p>
                  <input
                    id="fullname"
                    onChange={handleChange}
                    value={formData.fullname}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Nhập họ tên"
                    required
                  />
                </div>
                {/* Email */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Email
                  </p>
                  <input
                    id="email"
                    onChange={handleChange}
                    value={formData.email}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="email"
                    placeholder="Nhập email"
                  />
                </div>
                {/* Phone Number */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Số điện thoại
                  </p>
                  <input
                    id="phone"
                    onChange={handleChange}
                    value={formData.phone}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
                {/* Password */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Mật khẩu
                  </p>
                  <input
                    id="password"
                    onChange={handleChange}
                    value={formData.password}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="password"
                    placeholder="Tạo mật khẩu"
                    maxLength={50}
                  />
                </div>

                <button
                  type="submit" id="btnSignup"
                  onClick={handleSignUp}
                  className='bg-primeColor hover:bg-black hover:text-white cursor-pointer w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300'
                >
                  Tạo tài khoản
                </button>
                <p className="text-sm text-center font-titleFont font-medium">
                  Đã có tài khoản?{" "}
                  <Link to="/signin">
                    <span className="hover:text-blue-600 duration-300">
                      Đăng nhập
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
          {message && <p>{message}</p>}
        </>

        {isOtpModalVisible && (
          <div style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            right: 0,
            bottom: 0,
            display: 'flex',
            width: 500,
            height: 400,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              width: 500,
              height: 250,
              padding: '30px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            }}>
              <div style={{ textAlign: 'center' }}>
                <h5>Nhập mã OTP</h5>
                <span>Mã OTP được gửi về email của bạn</span>
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '20px',
              }}>
                <input
                  id="verificationCode"
                  type="text"
                  maxLength="6"
                  required
                  onChange={verificationCode}
                  style={{
                    width: '60%',
                    height: '45px',
                    textAlign: 'center',
                    fontSize: '18px',
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    outline: 'none',
                    transition: 'background 0.3s',
                    backgroundColor: '#ffffff',
                  }}
                  onFocus={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.8)'}
                  onBlur={(e) => e.target.style.background = '#ffffff'}
                />
              </div>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '20px',
              }}>
                <button onClick={handleOtpSubmit} className="rts-btn btn-primary" style={{
                  backgroundColor: '#28a745',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '10px 15px',
                  cursor: 'pointer',
                  transition: 'background 0.3s',
                }}>Xác nhận
                </button>
                <button className="rts-btn btn-secondary" style={{
                  backgroundColor: '#ffc107',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '10px 15px',
                  cursor: 'pointer',
                  transition: 'background 0.3s',
                }}
                  onClick={resendCode}>Gửi lại mã
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SignUp;
