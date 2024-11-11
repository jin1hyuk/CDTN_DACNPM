import React from 'react';
// import Draggable from 'react-draggable'; // Import thư viện draggable
import '../styles/CoverPhoto.css';
// import coverPhoto from '../../../assets/images/minq_pixi.jpg'; // Import hình ảnh
import coverPhoto from '../../../assets/images/IMG_9247.jpg'; // Import hình ảnh

const CoverPhoto: React.FC = () => {
  // const [position, setPosition] = useState({ x: 0, y: 0 });
  // const coverRef = useRef<HTMLDivElement | null>(null);
  // const [isDragging, setIsDragging] = useState(false); // Trạng thái kéo
  // const [imageSize, setImageSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  // Tải ảnh và lấy kích thước
  // useEffect(() => {
  //   const img = new Image();
  //   img.src = coverPhoto;

  //   img.onload = () => {
  //     setImageSize({ width: img.width, height: img.height });
  //   };
  // }, []);

  // const handleMouseDown = (e: React.MouseEvent) => {
  //   const startX = e.clientX - position.x;
  //   const startY = e.clientY - position.y;

  //   setIsDragging(true); // Bắt đầu kéo

  //   const handleMouseMove = (e: MouseEvent) => {
  //     if (isDragging && coverRef.current) {
  //       // Lấy kích thước của div chứa
  //       const coverRect = coverRef.current.getBoundingClientRect();
  //       const coverWidth = coverRect.width;
  //       const coverHeight = coverRect.height;

  //       // Tính toán vị trí mới
  //       let newX = e.clientX - startX;
  //       let newY = e.clientY - startY;

  //       // Giới hạn vị trí bên trái
  //       if (newX > 0) newX = 0; // Không cho phép kéo ra ngoài bên trái
  //       if (newX < coverWidth - imageSize.width) newX = coverWidth - imageSize.width; // Không cho phép kéo ra ngoài bên phải

  //       // Giới hạn vị trí bên trên
  //       if (newY > 0) newY = 0; // Không cho phép kéo ra ngoài trên
  //       if (newY < coverHeight - imageSize.height) newY = coverHeight - imageSize.height; // Không cho phép kéo ra ngoài dưới

  //       setPosition({ x: newX, y: newY });
  //     }
  //   };

  //   const handleMouseUp = () => {
  //     setIsDragging(false); // Kết thúc kéo
  //     window.removeEventListener('mousemove', handleMouseMove);
  //     window.removeEventListener('mouseup', handleMouseUp);
  //   };

  //   window.addEventListener('mousemove', handleMouseMove);
  //   window.addEventListener('mouseup', handleMouseUp);
  // };

  // return (
  //   <div className="cover-photo" ref={coverRef} onMouseDown={handleMouseDown}>
  //     <img 
  //       src={coverPhoto} 
  //       alt="Cover" 
  //       className="cover-photo__image" 
  //       style={{
  //         left: `${position.x}px`, // Đặt vị trí bên trái của ảnh
  //         top: `${position.y}px`, // Đặt vị trí bên trên của ảnh
  //         position: 'absolute', // Đảm bảo rằng ảnh được định vị chính xác
  //       }} 
  //     />
  //   </div>
  // );

  return (
    <div className="cover-photo">
      <img 
        src={coverPhoto} 
        alt="Cover" 
        className="cover-photo__image" 
      />
    </div>
  );
};

export default CoverPhoto;