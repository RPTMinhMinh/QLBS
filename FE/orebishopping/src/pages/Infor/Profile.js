import React, { useEffect, useState } from 'react';
import api from '../../service/AuthService';
import { changePassword, updateAccount } from '../../service/AccountService';
import { showLoadingThenExecute } from '../../constants/swals';

export const Profile = () => {
    const [data, setData] = useState({
        id: 0,
        email: '',
        fullname: '',
        phone: '',
        address: '',
        imageUrl: '',
        roleIds: [],
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [file, setFile] = useState(null);

    useEffect(() => {
        api.getUser().then((res) => {
            setData(res.data);
        }).catch((e) => console.error(e));
    }, []);

    const handleChange = async (event) => {
        event.preventDefault();
        const request = {
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmPassword: confirmPassword
        };
        
        changePassword(data.id, request).then((res) => {
            if(res.data === null){
                alert(res.message);
                return;
            }
            alert("Đổi mật khẩu thành công! Vui lòng đăng nhập lại !")
            setTimeout(() => {
                localStorage.removeItem("token");
                window.location.href = "/signin";
            }, 1000);
        }).catch((e) => {
            console.error(e)
        })
    };

    const handleSave = (e) => {
        e.preventDefault()
        showLoadingThenExecute(
            async () => {
                const formData = new FormData();
                formData.append("fullname", data.fullname);
                formData.append("phone", data.phone);
                formData.append("address", data.address);
                data.roleIds.forEach((role) => {
                    formData.append("roleId", role);
                });
                if (file) {
                    formData.append("file", file);
                }

                console.log(formData.get("fullname")); 
                await updateAccount(data.id, formData);
            },
            "Cập nhật thành công!",
            "Cập nhật thất bại, vui lòng thử lại!",
            "/profile"
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
                        {/* Avatar Section */}
                        <div className="col-span-2 flex flex-col items-center justify-center">
                            <img
                                className="w-32 h-32 rounded-full object-cover shadow-lg"
                                src={file ? URL.createObjectURL(file) : data.imageUrl}
                                alt="Ảnh đại diện"
                            />
                            <label htmlFor="fileUpload" className="mt-4 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition duration-300">
                                <i className="fa-solid fa-image"></i>
                                <span>Chọn ảnh</span>
                            </label>
                            <input
                                id="fileUpload"
                                type="file"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files.length > 0) {
                                        setFile(e.target.files[0]);
                                    }
                                }}
                                className="hidden"
                            />
                        </div>

                        {/* Profile Information Section */}
                        <div className="col-span-4">
                            <form>
                                <h2 className="text-3xl font-semibold mb-6">Thông tin cá nhân</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Tên</label>
                                        <input
                                            type="text"
                                            name="fullname"
                                            value={data.fullname}
                                            onChange={(e) => setData({ ...data, fullname: e.target.value })}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Địa chỉ</label>
                                        <input
                                            type="text"
                                            name="address"
                                            value={data.address}
                                            onChange={(e) => setData({ ...data, address: e.target.value })}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Số điện thoại</label>
                                        <input
                                            type="text"
                                            name="phone"
                                            value={data.phone}
                                            onChange={(e) => setData({ ...data, phone: e.target.value })}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                            disabled
                                        />
                                    </div>
                                </div>

                                {/* Buttons Section */}
                                <div className="mt-6 flex gap-4">
                                    <button
                                        type="submit"
                                        onClick={handleSave}
                                        className="px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        Lưu thay đổi
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(true)}
                                        className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                                    >
                                        Đổi mật khẩu
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Password Change Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-2xl font-semibold mb-4">Đổi mật khẩu</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Mật khẩu cũ</label>
                                <input
                                    type="password"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Mật khẩu mới</label>
                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Xác nhận mật khẩu</label>
                                <input
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                                    required
                                />
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end gap-4">
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                Hủy
                            </button>
                            <button
                                onClick={handleChange}
                                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
