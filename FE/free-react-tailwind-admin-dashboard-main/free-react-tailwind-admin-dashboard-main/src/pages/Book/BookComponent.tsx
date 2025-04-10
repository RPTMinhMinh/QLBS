import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb.tsx';
import { useNavigate, useParams } from 'react-router-dom';
import { findByIdBook, updateBook } from '../../service/BookService.ts';
import { useEffect, useState } from 'react';
import { Book } from '../../types/Book.ts';
import { showLoadingThenExecute } from '../../utils/Utils.ts';
import { getAllCategory } from '../../service/CategoryService.ts';
import { Category } from '../../types/Category.ts';
import { Publisher } from '../../types/Publisher.ts';
import { getAllPublisher } from '../../service/PublisherService.ts';

const BookComponent = ({ isEditMode = false }: { isEditMode?: boolean }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState<Book>({
        id: 0,
        code: '',
        name: '',
        author: '',
        price: 0,
        importPrice: 0,
        quantity: 0,
        discount: 0,
        description: '',
        categoryId: 0,
        categoryName: '',
        publisherId: 0,
        publisherName: '',
        imageUrl: '',
    });
    const [file, setFile] = useState<File | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);
    const [publishers, setPublishers] = useState<Publisher[]>([]);
    const [error, setError] = useState({
        name: '',
        author: '',
        price: '',
        importPrice: '',
        quantity: '',
        discount: '',
        description: '',
        categoryId: '',
        publisherId: '',
        file: ''
    });

    useEffect(() => {
        findByIdBook(Number(id))
          .then((response: any) => {
              setData(response.data);
              console.log('data', response.data);
          })
          .catch((error: any) => {
              console.error(error);
          });
    }, [id]);

    useEffect(() => {
        getAllCategory(0, 0).then((response: any) => {
            setCategories(response.content);
        }).catch((e) => console.error(e));
        getAllPublisher(0, 0).then((response: any) => {
            setPublishers(response.content);
        }).catch((e) => console.error(e));
    }, []);

    const validateForm = () => {
        const errors = {
            name: '',
            author: '',
            price: '',
            importPrice: '',
            quantity: '',
            discount: '',
            description: '',
            categoryId: '',
            publisherId: '',
            file: ''
        };
        let isValid = true;

        if (!data.name.trim()) {
            errors.name = 'Tên sách không được để trống';
            isValid = false;
        }

        if (!data.author.trim()) {
            errors.author = 'Tên tác giả không được để trống';
            isValid = false;
        }

        if (!data.price) {
            errors.price = 'Giá không được để trống';
            isValid = false;
        } else if (isNaN(data.price) || data.price <= 0) {
            errors.price = 'Giá phải là số dương';
            isValid = false;
        }

        if (!data.importPrice) {
            errors.importPrice = 'Giá nhập không được để trống';
            isValid = false;
        } else if (isNaN(data.importPrice) || data.importPrice <= 0) {
            errors.importPrice = 'Giá nhập phải là số dương';
            isValid = false;
        }

        if (!data.quantity) {
            errors.quantity = 'Số lượng không được để trống';
            isValid = false;
        } else if (isNaN(data.quantity) || data.quantity <= 0) {
            errors.quantity = 'Số lượng phải là số nguyên dương';
            isValid = false;
        }

        if (data.discount === null || data.discount === undefined) {
            errors.discount = 'Giảm giá không được để trống';
            isValid = false;
        } else if (isNaN(data.discount) || data.discount < 0 || data.discount > 100) {
            errors.discount = 'Giảm giá phải là số từ 0 đến 100';
            isValid = false;
        }

        if (!data.description.trim()) {
            errors.description = 'Mô tả không được để trống';
            isValid = false;
        }

        if (!data.categoryId) {
            errors.categoryId = 'Danh mục không được để trống';
            isValid = false;
        }

        if (!data.publisherId) {
            errors.publisherId = 'Nhà xuất bản không được để trống';
            isValid = false;
        }

        if (isEditMode && !file && !data.imageUrl) {
            errors.file = 'Vui lòng chọn file hình ảnh';
            isValid = false;
        }

        setError(errors);
        return isValid;
    };

    const handleUpdateBook = (id: number) => {
        if (validateForm()) {
            showLoadingThenExecute(async () => {
                const formData = new FormData();
                if (file) {
                    formData.append("file", file);
                }
                formData.append("name", data.name);
                formData.append("author", data.author);
                formData.append("price", `${data.price}`);
                formData.append("importPrice", `${data.importPrice}`);
                formData.append("quantity", `${data.quantity}`);
                formData.append("discount", `${data.discount}`);
                formData.append("description", data.description);
                formData.append("categoryId", `${data.categoryId}`);
                formData.append("publisherId", `${data.publisherId}`);

                await updateBook(id, formData);
            }, "Cập nhật thành công!", "Có lỗi xảy ra, vui lòng thử lại.", "/book");
        }
    };

    return (
      <>
          <Breadcrumb
            pageName={isEditMode ? 'Chỉnh sửa sách' : 'Chi tiết sách'}
          />
          <div className="flex flex-col gap-10">
              <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
                  <div className="mb-4 flex gap-4">
                      <div className="w-1/3">
                          <div className="flex items-center justify-center pt-2">
                              <img src={data?.imageUrl} />
                          </div>
                          <div hidden={!isEditMode} className="mb-6 pt-7.5">
                              <label className="mb-3 block text-black dark:text-white">
                                  Ảnh sách
                              </label>
                              <input
                                type="file"
                                onChange={(e) => {
                                    if (e.target.files && e.target.files.length > 0) {
                                        setFile(e.target.files[0]);
                                    }
                                }}
                                className={`w-full cursor-pointer rounded-lg border-[1.5px] ${
                                  error.file ? "border-red-500" : "border-stroke"
                                } bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary`}
                              />
                              {error.file && <p className="text-red-500 text-sm mt-1">{error.file}</p>}
                          </div>
                      </div>
                      <div className="w-2/3">
                          <div className="mb-4 flex gap-4">
                              <div className="w-1/2">
                                  <label className="block text-gray-700 font-medium">
                                      Mã sách
                                  </label>
                                  <input
                                    type="text"
                                    name="name"
                                    value={data?.code}
                                    readOnly={!isEditMode}
                                    disabled
                                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                  />
                              </div>
                              <div className="w-1/2">
                                  <label className="block text-gray-700 font-medium">
                                      Tên sách
                                  </label>
                                  <input
                                    type="text"
                                    name="organization"
                                    value={data?.name}
                                    readOnly={!isEditMode}
                                    onChange={(e) =>
                                      setData((prev) => ({ ...prev, name: e.target.value }))
                                    }
                                    className={`w-full rounded-lg border-[1.5px] ${
                                      error.name ? "border-red-500" : "border-stroke"
                                    } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                                  />
                                  {error.name && <p className="text-red-500 text-sm mt-1">{error.name}</p>}
                              </div>
                          </div>
                          <div className="mb-4 flex gap-4">
                              <div className="w-1/2">
                                  <label className="block text-gray-700 font-medium">
                                      Giá
                                  </label>
                                  <input
                                    type="text"
                                    name="number"
                                    value={data?.price}
                                    readOnly={!isEditMode}
                                    onChange={(e) =>
                                      setData((prev) => ({
                                          ...prev,
                                          price: Number(e.target.value),
                                      }))
                                    }
                                    className={`w-full rounded-lg border-[1.5px] ${
                                      error.price ? "border-red-500" : "border-stroke"
                                    } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                                  />
                                  {error.price && <p className="text-red-500 text-sm mt-1">{error.price}</p>}
                              </div>

                              <div className="w-1/2">
                                  <label className="block text-gray-700 font-medium">
                                      Giảm giá
                                  </label>
                                  <input
                                    type="number"
                                    name="name"
                                    value={data?.discount}
                                    readOnly={!isEditMode}
                                    onChange={(e) =>
                                      setData((prev) => ({
                                          ...prev,
                                          discount: Number(e.target.value),
                                      }))
                                    }
                                    className={`w-full rounded-lg border-[1.5px] ${
                                      error.discount ? "border-red-500" : "border-stroke"
                                    } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                                  />
                                  {error.discount && <p className="text-red-500 text-sm mt-1">{error.discount}</p>}
                              </div>
                          </div>

                          <div className="mb-4 flex gap-4">
                              <div className="w-1/2">
                                  <label className="block text-gray-700 font-medium">
                                      Tác giả
                                  </label>
                                  <input
                                    type="text"
                                    name="author"
                                    value={data?.author}
                                    readOnly={!isEditMode}
                                    onChange={(e) =>
                                      setData((prev) => ({ ...prev, author: e.target.value }))
                                    }
                                    className={`w-full rounded-lg border-[1.5px] ${
                                      error.author ? "border-red-500" : "border-stroke"
                                    } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                                  />
                                  {error.author && <p className="text-red-500 text-sm mt-1">{error.author}</p>}
                              </div>
                              <div className="w-1/2">
                                  <label className="block text-gray-700 font-medium">
                                      Danh mục
                                  </label>
                                  <div className="relative">
                                      <select
                                        value={data.categoryId}
                                        onChange={(e) =>
                                          setData((prev) => ({
                                              ...prev,
                                              categoryId: Number(e.target.value),
                                          }))
                                        }
                                        className={`w-full rounded border-[1.5px] ${
                                          error.categoryId ? "border-red-500" : "border-stroke"
                                        } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                                      >
                                          <option value="">Chọn danh mục</option>
                                          {categories.map((category) => (
                                            <option key={category.id} value={Number(category.id)}>
                                                {category.name}
                                            </option>
                                          ))}
                                      </select>
                                      {!isEditMode && (
                                        <div className="absolute inset-0 cursor-not-allowed"></div>
                                      )}
                                      {error.categoryId && <p className="text-red-500 text-sm mt-1">{error.categoryId}</p>}
                                  </div>
                              </div>
                          </div>
                          <div className="mb-4 flex gap-4">
                              <div className="w-1/2">
                                  <label className="block text-gray-700 font-medium">
                                      Giá nhập
                                  </label>
                                  <input
                                    type="number"
                                    name="importPrice"
                                    value={data?.importPrice}
                                    readOnly={!isEditMode}
                                    onChange={(e) =>
                                      setData((prev) => ({ ...prev, importPrice: Number(e.target.value) }))
                                    }
                                    className={`w-full rounded-lg border-[1.5px] ${
                                      error.importPrice ? "border-red-500" : "border-stroke"
                                    } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                                  />
                                  {error.importPrice && <p className="text-red-500 text-sm mt-1">{error.importPrice}</p>}
                              </div>
                              <div className="w-1/2">
                                  <label className="block text-gray-700 font-medium">
                                      Nhà xuất bản
                                  </label>
                                  <div className="relative">
                                      <select
                                        value={data.publisherId}
                                        onChange={(e) =>
                                          setData((prev) => ({
                                              ...prev,
                                              publisherId: Number(e.target.value),
                                          }))
                                        }
                                        className={`w-full rounded border-[1.5px] ${
                                          error.publisherId ? "border-red-500" : "border-stroke"
                                        } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                                      >
                                          <option value="">Chọn nhà xuất bản</option>
                                          {publishers.map((publisher) => (
                                            <option key={publisher.id} value={Number(publisher.id)}>
                                                {publisher.name}
                                            </option>
                                          ))}
                                      </select>
                                      {!isEditMode && (
                                        <div className="absolute inset-0 cursor-not-allowed"></div>
                                      )}
                                      {error.publisherId && <p className="text-red-500 text-sm mt-1">{error.publisherId}</p>}
                                  </div>
                              </div>
                          </div>
                          <div className="mb-4">
                              <label className="block text-gray-700 font-medium">Mô tả</label>
                              <textarea
                                rows={4}
                                value={data?.description}
                                readOnly={!isEditMode}
                                onChange={(e) =>
                                  setData((prev) => ({
                                      ...prev,
                                      description: e.target.value,
                                  }))
                                }
                                className={`w-full rounded border-[1.5px] ${
                                  error.description ? "border-red-500" : "border-stroke"
                                } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                              ></textarea>
                              {error.description && <p className="text-red-500 text-sm mt-1">{error.description}</p>}
                          </div>
                          <button
                            hidden={!isEditMode}
                            onClick={() => handleUpdateBook(data.id)}
                            className="w-40 h-12 bg-primary text-white py-2 rounded hover:bg-blue-700 mb-4 float-right"
                          >
                              Cập nhật
                          </button>
                      </div>
                  </div>
                  <div className="flex justify-end mt-6">
                      <button
                        className="bg-primary w-40 h-12 text-white py-2 px-6 rounded"
                        onClick={() => navigate('/book')}
                      >
                          Quay lại
                      </button>
                  </div>
              </div>
          </div>
      </>
    );
};

export default BookComponent;
