import { Pencil, Trash2 } from 'lucide-react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb'
import { useEffect, useState } from 'react';
import {addRole, deleteRole, findByIdRole, getAllRole, updateRole} from '../../service/RoleService';
import { Role } from '../../types/Role';
import  { confirmDelete } from '../../utils/ConfirmationDialog';

export const RoleList = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [totalRole, setTotalRole] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditting] = useState(false);
  const [data,setData] = useState({
    id:0,
    code:'',
    name:''
  })

  function getAllRoles(){
    getAllRole(currentPage, itemsPerPage)
      .then((response: any) => {
        setRoles(response.content);
        setTotalRole(response.totalElements);
      })
      .catch((e: any) => console.error(e));
  }

  useEffect(() => {
    getAllRoles()
  },[currentPage, itemsPerPage]);

  const totalPages = Math.ceil(totalRole / itemsPerPage);

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
  };

  const handleRemove = (id:number) => {
    confirmDelete('Bạn chắc chắn mốn xóa quyền này ?','Hành động này không thể hoàn tác!',() => {
      deleteRole(id).then(() => {
          getAllRoles()
      }).catch((error: any) => console.error(error));
    })
  }

  const handleEdit = (id: number) => {
   findByIdRole(id).then((res:any)=>{
    console.log('object',res.data);
    setData(res.data)
    setIsEditting(true);
    setModalOpen(true);
   })
}
const handleSave = () =>{
  if (isEditing) {
    updateRole(Number(data.id), data).then(() => {
      setModalOpen(false);
      getAllRoles();
      alert("Cập nhật quyền thành công!");
      setData({id:0, code: '', name: '' });
    }).catch((error: any) => console.error(error));
  }else{
    addRole(data).then(() =>{
      alert("Thêm quyền thành công!");
      setModalOpen(false)
      setData({id:0, code: '', name: '' });
      getAllRoles();
    })
  }
}

  
  return (
    <>
      <Breadcrumb pageName='Danh sách quyền' />
      {/*<button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700" style={{ width: 150, marginBottom: 10 }} onClick={() => {setIsEditting(false); setModalOpen(true); }} >Thêm Quyền</button>*/}
      <div className="flex flex-col gap-10">
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
          <div className="max-w-full overflow-x-auto">
            <table className="w-full table-auto text-left">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="py-4 px-6 font-semibold">STT</th>
                  <td className="py-4 px-6 font-semibold">Mã Quyền</td>
                  <th className="py-4 px-6 font-semibold">Tên Quyền</th>
                  <th className="py-4 px-6 font-semibold">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {roles.map((role, index) => (
                  <tr key={role.id}>
                    <td className="py-4 px-6">{index + 1}</td>
                    <td className="py-4 px-6">{role.code}</td>
                    <td className="py-4 px-6">{role.name}</td>
                    <td className="py-4 px-4 flex gap-4">
                      {/*<button className="text-yellow-600 hover:text-yellow-800 transition">*/}
                      {/*  <Pencil */}
                      {/*  onClick={() => handleEdit(Number(role.id))} */}
                      {/*  size={20} />*/}
                      {/*</button>*/}
                      <button className="text-red-600 hover:text-red-800 transition">
                        <Trash2 
                        onClick={() => handleRemove(Number(role.id))} 
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
          <div className="bg-white p-6 rounded-xl shadow-xl w-[500px] relative">
            <h3 className="text-xl font-semibold mb-4">{isEditing ? 'Chỉnh sửa quyền' : 'Thêm quyền'}</h3>
            <div className="mb-4" hidden={!isEditing}>
              <label className="block text-gray-700 font-medium">Mã quyền</label>
              <input type="text" name="code" value={data.code} onChange={(e) => {
                if (!isEditing) {
                  setData({ ...data, code: e.target.value });
                }
              }} className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" disabled={isEditing} />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Tên quyền</label>
              <input type="text" name="name" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })}                   className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary" />
              {/* {error.name && <div className='invalid-feedback'>{error.name}</div>} */}
            </div>
            <div className="flex gap-4">
              <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700" onClick={handleSave}>Lưu</button>
              <button className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600" onClick={() => { setData({id:0, code: '', name: '' }); setModalOpen(false); }}>Hủy</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
