export const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      minimumFractionDigits: 0, 
      maximumFractionDigits: 0,
    }).format(price) + ' VND';
  };