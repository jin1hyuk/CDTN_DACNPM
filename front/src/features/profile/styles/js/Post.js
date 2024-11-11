const images = document.querySelectorAll('.image-carousel img');
const scrollbar = document.querySelector('.image-carousel');

images.forEach(image => {
  image.addEventListener('mouseenter', () => {
    scrollbar.style.overflowX = 'auto'; // Hiện thanh cuộn khi hover vào hình ảnh
  });
  
  image.addEventListener('mouseleave', () => {
    scrollbar.style.overflowX = 'hidden'; // Ẩn thanh cuộn khi không hover
  });
});