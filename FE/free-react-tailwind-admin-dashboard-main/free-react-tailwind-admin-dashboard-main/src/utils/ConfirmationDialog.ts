import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

export const confirmDelete = async (
  title: string,
  text: string,
  confirmCallback: () => void
): Promise<void> => {
  try {
    const result = await MySwal.fire({
      title: title,
      text: text,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e3342f',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Xóa ngay',
      cancelButtonText: 'Hủy',
      customClass: {
        popup: 'rounded-xl shadow-xl',
        title: 'text-xl font-semibold',
        confirmButton: 'bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700',
        cancelButton: 'bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600',
      }
    });

    if (result.isConfirmed) {
      confirmCallback();
      await MySwal.fire({
        title: 'Xóa thành công!',
        icon: 'success',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'rounded-xl shadow-xl',
          title: 'text-xl font-semibold',
          confirmButton: 'bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700',
          cancelButton: 'bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600',
        },
        willClose: () => {
          const confirmButton = document.querySelector('.swal2-confirm') as HTMLElement;
          if (confirmButton) confirmButton.style.display = 'inline-block';
        }
      });
    }
  } catch (error) {
    console.error(error);
    await MySwal.fire('Lỗi!', 'Xóa không thành công. Vui lòng thử lại.', 'error');
  }
};
