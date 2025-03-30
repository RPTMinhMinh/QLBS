import { useEffect, useState } from 'react'
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Category } from '../../types/Category';
import { Publisher } from '../../types/Publisher';
import { getAllCategory } from '../../service/CategoryService';
import { getAllPublisher } from '../../service/PublisherService';
import { addBook } from '../../service/BookService';
import { showLoadingThenExecute } from '../../utils/Utils';

export const AddBook = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const [publisher, setPublisher] = useState<Publisher[]>([]);
  const [code, setCode] = useState();
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [importPrice, setImportPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [discount, setDiscount] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [publisherId, setPublisherId] = useState('');
  const [file, setFile] = useState<File | null>(null);

  function getAllCategories() {
    getAllCategory(0, 10).then((response: any) => {
      setCategory(response.content);
    }).catch((e: any) => console.error(e));
  }

  function getAllPublishers() {
    getAllPublisher(0, 10).then((response: any) => {
      setPublisher(response.content);
    }).catch((e: any) => console.error(e));
  }

  useEffect(() => {
    getAllCategories();
    getAllPublishers();
  }, []);

  const handleAddData = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Vui lòng chọn file hình ảnh.");
      return;
    }
    showLoadingThenExecute(async () => {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("author", author);
      formData.append("price", parseFloat(price).toString()); // Chuyển đổi sang số
      formData.append("importPrice", parseFloat(importPrice).toString()); // Chuyển đổi sang số
      formData.append("quantity", parseInt(quantity).toString()); // Chuyển đổi sang số nguyên
      formData.append("discount", parseFloat(discount).toString()); // Chuyển đổi sang số
      formData.append("description", description);
      formData.append("categoryId", parseInt(categoryId).toString());
      formData.append("publisherId", parseInt(publisherId).toString());
      if (file) {
        formData.append("file", file);
      }
      await addBook(formData);
    }, "Thêm sách thành công!", "Có lỗi xảy ra, vui lòng thử lại.", "/book");
  };

  return (
    <>
      <Breadcrumb pageName="Thêm khóa học" />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form action="#">
            <div className="p-6.5">
              <div className="mb-4.5 flex gap-4">
                <input
                  hidden
                  value={code}
                // onChange={(e) => setCode(e.target.value)}
                />
                <div className="w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Tên Sách <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nhập tên sách"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {/* {error.name && <div className='invalid-feedback'>{error.name}</div>} */}
                </div>
                <div className="w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Tên tác giả <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Nhập tên tác giả"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {/* {error.aim && <div className='invalid-feedback'>{error.aim}</div>} */}

                </div>
              </div>

              <div className="mb-4.5 flex gap-4">
                <div className="w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Giá <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="Nhập giá sách bán"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {/* {error.price && <div className='invalid-feedback'>{error.price}</div>} */}
                </div>
                <div className="w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Giá nhập
                  </label>
                  <input
                    type="number"
                    value={importPrice}
                    onChange={(e) => setImportPrice(e.target.value)}
                    placeholder="Nhập giá nhập vào"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {/* {error.discount && <div className='invalid-feedback'>{error.discount}</div>} */}
                </div>
              </div>
              <div className="mb-4.5 flex gap-4">
                <div className="w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Giảm giá <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="number"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    placeholder="Nhập giảm giá sách"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {/* {error.discount && <div className='invalid-feedback'>{error.discount}</div>} */}
                </div>
                <div className="w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Số lượng <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Nhập số lượng sách"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  />
                  {/* {error.discount && <div className='invalid-feedback'>{error.discount}</div>} */}
                </div>
              </div>

              <div className="mb-4.5 flex gap-4">
                <div className="w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Danh mục <span className="text-meta-1">*</span>
                  </label>
                  <select
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="" disabled selected>
                      Chọn danh mục
                    </option>
                    {category.map((category) => (
                      <option key={category.id} value={Number(category.id)}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nhà xuất bản <span className="text-meta-1">*</span>
                  </label>
                  <select
                    value={publisherId}
                    onChange={(e) => setPublisherId(e.target.value)}
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                  >
                    <option value="" disabled selected>
                      Chọn Nhà xuất bản
                    </option>
                    {publisher.map((publisher) => (
                      <option key={publisher.id} value={Number(publisher.id)}>
                        {publisher.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mb-6">


                <label className="mb-2.5 block text-black dark:text-white">
                  Mô tả
                </label>
                <textarea
                  rows={6}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Nhập mô tả sách"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                ></textarea>
              </div>
              <div className="mb-6">
                <label className="mb-3 block text-black dark:text-white">
                  Ảnh khóa học
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
              </div>

              <button
                onClick={handleAddData}
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
                Thêm Sách
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
