import { useEffect, useState } from 'react';
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

    if (!name.trim()) {
      errors.name = 'Tên sách không được để trống';
      isValid = false;
    }

    if (!author.trim()) {
      errors.author = 'Tên tác giả không được để trống';
      isValid = false;
    }

    if (!price.trim()) {
      errors.price = 'Giá không được để trống';
      isValid = false;
    } else if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
      errors.price = 'Giá phải là số dương';
      isValid = false;
    }

    if (!importPrice.trim()) {
      errors.importPrice = 'Giá nhập không được để trống';
      isValid = false;
    } else if (isNaN(parseFloat(importPrice)) || parseFloat(importPrice) <= 0) {
      errors.importPrice = 'Giá nhập phải là số dương';
      isValid = false;
    }

    if (!quantity.trim()) {
      errors.quantity = 'Số lượng không được để trống';
      isValid = false;
    } else if (isNaN(parseInt(quantity)) || parseInt(quantity) <= 0) {
      errors.quantity = 'Số lượng phải là số nguyên dương';
      isValid = false;
    }

    if (!discount.trim()) {
      errors.discount = 'Giảm giá không được để trống';
      isValid = false;
    } else if (isNaN(parseFloat(discount)) || parseFloat(discount) < 0 || parseFloat(discount) > 100) {
      errors.discount = 'Giảm giá phải là số từ 0 đến 100';
      isValid = false;
    }

    if (!description.trim()) {
      errors.description = 'Mô tả không được để trống';
      isValid = false;
    }

    if (!categoryId.trim()) {
      errors.categoryId = 'Danh mục không được để trống';
      isValid = false;
    }

    if (!publisherId.trim()) {
      errors.publisherId = 'Nhà xuất bản không được để trống';
      isValid = false;
    }

    if (!file) {
      errors.file = 'Vui lòng chọn file hình ảnh';
      isValid = false;
    }

    setError(errors);
    return isValid;
  };

  const handleAddData = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      showLoadingThenExecute(async () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("author", author);
        formData.append("price", parseFloat(price).toString());
        formData.append("importPrice", parseFloat(importPrice).toString());
        formData.append("quantity", parseInt(quantity).toString());
        formData.append("discount", parseFloat(discount).toString());
        formData.append("description", description);
        formData.append("categoryId", parseInt(categoryId).toString());
        formData.append("publisherId", parseInt(publisherId).toString());
        if (file) {
          formData.append("file", file);
        }
        await addBook(formData);
      }, "Thêm sách thành công!", "Có lỗi xảy ra, vui lòng thử lại.", "/book");
    }
  };

  return (
    <>
      <Breadcrumb pageName="Thêm sách" />
      <div className="flex flex-col gap-9">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <form action="#">
            <div className="p-6.5">
              <div className="mb-4.5 flex gap-4">
                <input
                  hidden
                  value={code}
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
                    className={`w-full rounded border-[1.5px] ${
                      error.name ? "border-red-500" : "border-stroke"
                    } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                  />
                  {error.name && <p className="text-red-500 text-sm mt-1">{error.name}</p>}
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
                    className={`w-full rounded border-[1.5px] ${
                      error.author ? "border-red-500" : "border-stroke"
                    } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                  />
                  {error.author && <p className="text-red-500 text-sm mt-1">{error.author}</p>}
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
                    className={`w-full rounded border-[1.5px] ${
                      error.price ? "border-red-500" : "border-stroke"
                    } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                  />
                  {error.price && <p className="text-red-500 text-sm mt-1">{error.price}</p>}
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
                    className={`w-full rounded border-[1.5px] ${
                      error.importPrice ? "border-red-500" : "border-stroke"
                    } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                  />
                  {error.importPrice && <p className="text-red-500 text-sm mt-1">{error.importPrice}</p>}
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
                    className={`w-full rounded border-[1.5px] ${
                      error.discount ? "border-red-500" : "border-stroke"
                    } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                  />
                  {error.discount && <p className="text-red-500 text-sm mt-1">{error.discount}</p>}
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
                    className={`w-full rounded border-[1.5px] ${
                      error.quantity ? "border-red-500" : "border-stroke"
                    } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                  />
                  {error.quantity && <p className="text-red-500 text-sm mt-1">{error.quantity}</p>}
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
                    className={`w-full rounded border-[1.5px] ${
                      error.categoryId ? "border-red-500" : "border-stroke"
                    } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
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
                  {error.categoryId && <p className="text-red-500 text-sm mt-1">{error.categoryId}</p>}
                </div>
                <div className="w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nhà xuất bản <span className="text-meta-1">*</span>
                  </label>
                  <select
                    value={publisherId}
                    onChange={(e) => setPublisherId(e.target.value)}
                    className={`w-full rounded border-[1.5px] ${
                      error.publisherId ? "border-red-500" : "border-stroke"
                    } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
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
                  {error.publisherId && <p className="text-red-500 text-sm mt-1">{error.publisherId}</p>}
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
                  className={`w-full rounded border-[1.5px] ${
                    error.description ? "border-red-500" : "border-stroke"
                  } bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                ></textarea>
                {error.description && <p className="text-red-500 text-sm mt-1">{error.description}</p>}
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
                  className={`w-full cursor-pointer rounded-lg border-[1.5px] ${
                    error.file ? "border-red-500" : "border-stroke"
                  } bg-transparent outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:py-3 file:px-5 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary`}
                />
                {error.file && <p className="text-red-500 text-sm mt-1">{error.file}</p>}
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
  );
};
