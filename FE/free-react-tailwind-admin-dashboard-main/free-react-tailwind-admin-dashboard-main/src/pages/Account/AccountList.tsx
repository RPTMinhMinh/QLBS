import { FileText, List, Pencil, Phone, RefreshCcw, Search, Tag, Trash2, User } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import { useEffect, useState } from 'react';
import { Account } from '../../types/Account';
import { deleteAccount, findByIdAccount, getAccountByCondition, getAll, updateAccount } from '../../service/AccountService';
import { confirmDelete } from '../../utils/ConfirmationDialog';
import { Role } from '../../types/Role';
import { getAllRole } from '../../service/RoleService';
import Select from "react-select";
import { showLoadingThenExecute } from '../../utils/Utils';

export const AccountList = () => {

  const [accounts, setAccounts] = useState<Account[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalAccount, setTotalAccount] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState<Account>();
  const [role, setRole] = useState<Role[]>([]);

  const [file, setFile] = useState<File | null>(null);

  const [param, setParam] = useState({
    email: '',
    phone: '',
    roleName: '',
  });

  function getAllAccounts() {
    getAll(currentPage, itemsPerPage)
      .then((response: any) => {
        setAccounts(response.content);
        setTotalAccount(response.totalElements);
      })
      .catch((e: any) => console.error(e));
  }
  const [selectedRoles, setSelectedRoles] = useState<number[]>([]);

  useEffect(() => {
    getData();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    getAllRole(0, 0).then((reponse: any) => {
      setRole(reponse.content)
    })
    if (data?.roles) {
      setSelectedRoles(data.roles.map((role) => role.id));
    }
  }, [data]);

  const totalPages = Math.ceil(totalAccount / itemsPerPage);

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

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    getData();
  };

  function getData() {
    if (param.email || param.phone || param.roleName) {
      dataSearch()
    } else {
      getAllAccounts()
    }
  }

  const handleSearch = () => {
    dataSearch()
  }
  function dataSearch() {
    getAccountByCondition(param, currentPage, itemsPerPage).then((response: any) => {
      setAccounts(response.content);
      setTotalAccount(response.totalElements)
    })
  }
  const handleReset = () => {
    setParam({
      email: '',
      phone: '',
      roleName: '',
    })
    getAllAccounts()
  }

  const handleRemove = (id: number) => {
    confirmDelete('Bạn chắc chắn muốn xóa tài khoản này ?', 'Hành động này không thể hoàn tác!', () => {
      deleteAccount(id).then(() => {
        getAllAccounts()
      }).catch((error: any) => console.error(error));
    })
  }

  const handleEdit = (id: number) => {
    findByIdAccount(id).then((response: any) => {
      setData(response.data)
    })
    setModalOpen(true);
  }
  const handleSaveData = async (id: number) => {
    if (!data) return;
    try {
      const formData = new FormData();
      formData.append("fullname", data.fullname);
      formData.append("phone", data.phone);
      formData.append("address", data.address);
      selectedRoles.forEach(roleId => formData.append("roleId", roleId.toString()));
      if (file) {
        formData.append("file", file);
      }
      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }
      showLoadingThenExecute(async () => {
        await updateAccount(id, formData);
      }, 'Cập nhật thành công!', 'Có lỗi xảy ra !', '/account')
      setModalOpen(false);
      getAllAccounts()
    } catch (error) {
      console.error("Lỗi khi cập nhật tài khoản:", error);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Danh sách tài khoản" />
      <div className="flex flex-wrap items-center gap-4 mb-6 p-4 bg-white rounded-xl shadow-md">
        <div className="relative flex-1 min-w-[250px]">
          <FileText
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
          <input
            type="text"
            name="email"
            value={param.email}
            onChange={(e) => setParam({ ...param, email: e.target.value })}
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Email"
          />
        </div>

        <div className="relative flex-1 min-w-[350px]">
          <Tag
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
          <input
            type="text"
            name="phone"
            value={param.phone}
            onChange={(e) => setParam({ ...param, phone: e.target.value })}
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Số điện thoại"
          />
        </div>

        <div className="relative flex-1 min-w-[250px]">
          <User
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
          <select
            value={param.roleName}
            onChange={(e) => setParam({ ...param, roleName: e.target.value })}
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-black outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200">
            <option>Chọn Quyền</option>
            <option value="ADMIN">ADMIN</option>
            <option value="CUSTOMER">CUSTOMER</option>
          </select>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center justify-center gap-2 bg-gray-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-gray-700 transition-all text-lg font-semibold">
          <RefreshCcw size={20} />
          Làm mới
        </button>

        <button
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition-all text-lg font-semibold">
          <Search size={20} />
          Tìm kiếm
        </button>
      </div>
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto text-left">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-4 px-6 font-semibold">STT</th>
                  <th className="py-4 px-6 font-semibold">Ảnh</th>
                  <th className="py-4 px-6 font-semibold">Họ tên</th>
                  <th className="py-4 px-6 font-semibold">Email</th>
                  <th className="py-4 px-6 font-semibold">SDT</th>
                  <th className="py-4 px-6 font-semibold">Địa chỉ</th>
                  <th className="py-4 px-6 font-semibold">Quyền</th>
                  <th className="py-4 px-6 font-semibold">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {accounts.map((account, index) => (
                  <tr key={account.id}>
                    <td className="py-4 px-6">{index + 1}</td>
                    <td className="py-4 px-6">
                      <img
                        src={account.imageUrl}
                        style={{ width: 80, height: 80 }}
                        alt="book Image 1"
                        className="w-16 h-16 object-cover"
                      />
                    </td>
                    <td className="py-4 px-6">{account.fullname}</td>
                    <td className="py-4 px-6">{account.email}</td>
                    <td className="py-4 px-6">{account.phone}</td>
                    <td className="py-4 px-6">{account.address}</td>
                    <td className="py-4 px-6">{account.roles.map((item) => item.name)}</td>
                    <td className="py-4 px-4 flex gap-4 mt-8">
                      <button className="text-yellow-600 hover:text-yellow-800 transition">
                        <Pencil
                          onClick={() => handleEdit(Number(account.id))}
                          size={20} />
                      </button>
                      <button className="text-red-600 hover:text-red-800 transition">
                        <Trash2
                          onClick={() => handleRemove(Number(account.id))}
                          size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-end">
                <li className={`page-item ${currentPage === 0 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={handlePrevPage} disabled={currentPage === 0}>Previous</button>
                </li>
                {Array.from({ length: totalPages }, (_, index) => (
                  <li className={`page-item ${currentPage === index ? 'active' : ''}`} key={index}>
                    <button className="page-link" onClick={() => handlePageChange(index)}>{index + 1}</button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === totalPages - 1 ? 'disabled' : ''}`}>
                  <button className="page-link" onClick={handleNextPage} disabled={currentPage === totalPages - 1}>Next</button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>


      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-[700px] relative">
            <h3 className="text-xl font-semibold mb-4">Chỉnh sửa tài khoản</h3>

            <div className="mb-4 flex gap-4">
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">
                  Họ và tên
                </label>
                <input
                  type="text"
                  value={data?.fullname}
                  onChange={(e) => setData((prev) => prev ? { ...prev, fullname: e.target.value } : prev)}
                  name="fullname"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  disabled
                  value={data?.email}
                  type="text"
                  name="email"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>


            </div>

            <div className="mb-4 flex gap-4">
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">Địa chỉ</label>
                <input
                  value={data?.address}
                  onChange={(e) => setData((prev) => prev ? { ...prev, address: e.target.value } : prev)}
                  type="text"
                  name="address"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-700 font-medium">
                  Số điện thoại
                </label>
                <input
                  value={data?.phone}
                  type="text"
                  onChange={(e) => setData((prev) => prev ? { ...prev, phone: e.target.value } : prev)}
                  name="phone"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">
                Quyền
              </label>
              <Select
                isMulti
                options={role.map((r) => ({
                  value: r.id,
                  label: r.name,
                }))}
                value={role
                  .filter((r) => selectedRoles.includes(r.id))
                  .map((r) => ({ value: r.id, label: r.name }))}
                onChange={(selectedOptions: any) =>
                  setSelectedRoles(selectedOptions.map((option: any) => option.value))
                }
              />
            </div>
            {/* <div className="mb-4">
            <label className="mb-3 block text-black dark:text-white">
              Ảnh đại diện
            </label>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setFile(e.target.files[0]);
                }
              }}
              className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
            />
          </div> */}
            <div className="flex flex-col items-center w-full md:w-auto">
              <div className="h-32 w-32 rounded-full overflow-hidden mb-4">
                <img
                  src={
                    file
                      ? URL.createObjectURL(file)
                      : data?.imageUrl
                  }
                  alt="User"
                  className="object-cover h-full w-full"
                />
              </div>
              <div
                id="FileUpload"
                className="relative mb-5.5 block w-full cursor-pointer appearance-none rounded border border-dashed border-primary bg-gray py-4 px-4 dark:bg-meta-4"
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      const selectedFile = e.target.files[0];
                      setFile(selectedFile);
                    }
                  }}
                  className="absolute inset-0 z-50 m-0 h-full w-full cursor-pointer p-0 opacity-0 outline-none"
                />
                <div className="flex flex-col items-center justify-center space-y-3">
                  <span className="text-primary">Nhấp để tải ảnh lên</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => handleSaveData(Number(data?.id))} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                Lưu
              </button>
              <button
                className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600"
                onClick={() => {
                  setModalOpen(false);
                }}
              >
                Hủy
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  )
}
