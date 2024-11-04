// import React, { useRef } from 'react';
// import '../styles/Post.css';

// interface PostProps {
//   id: number;
//   title: string;
//   content: string;
//   images: string[];
//   likes: number;
//   onLike: () => void;
// }

// const Post: React.FC<PostProps> = ({ title, content, images, likes, onLike }) => {
//   const carouselRef = useRef<HTMLDivElement | null>(null);
//   let isDown = false; // Trạng thái kéo
//   let startX: number; // Vị trí bắt đầu
//   let scrollLeft: number; // Vị trí cuộn hiện tại

//   // Hàm xử lý sự kiện chuột khi nhấn
//   const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (carouselRef.current) {
//       isDown = true;
//       startX = e.pageX - carouselRef.current.offsetLeft;
//       scrollLeft = carouselRef.current.scrollLeft;
//       carouselRef.current.style.cursor = 'grabbing'; // Thay đổi con trỏ
//     }
//   };

//   // Hàm xử lý sự kiện chuột khi rời khỏi vùng
//   const handleMouseLeave = () => {
//     isDown = false; // Dừng kéo
//     if (carouselRef.current) {
//       carouselRef.current.style.cursor = 'grab'; // Đặt lại con trỏ
//     }
//   };

//   // Hàm xử lý sự kiện chuột khi nhả ra
//   const handleMouseUp = () => {
//     isDown = false; // Dừng kéo
//     if (carouselRef.current) {
//       carouselRef.current.style.cursor = 'grab'; // Đặt lại con trỏ
//     }
//   };

//   // Hàm xử lý sự kiện chuột khi di chuyển
//   const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!isDown || !carouselRef.current) return; // Nếu không kéo, không làm gì
//     const x = e.pageX - carouselRef.current.offsetLeft; // Vị trí hiện tại
//     const walk = (x - startX) * 2; // Tính khoảng cách kéo
//     carouselRef.current.scrollLeft = scrollLeft - walk; // Cập nhật vị trí cuộn
//   };

//   // Hàm xử lý sự kiện chạm màn hình
//   const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
//     if (carouselRef.current) {
//       isDown = true; // Đánh dấu là đang kéo
//       startX = e.touches[0].pageX - carouselRef.current.offsetLeft;
//       scrollLeft = carouselRef.current.scrollLeft;
//       carouselRef.current.style.cursor = 'grabbing'; // Thay đổi con trỏ
//     }
//   };

//   // Hàm xử lý sự kiện chạm khi di chuyển
//   const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
//     if (!isDown || !carouselRef.current) return; // Nếu không kéo, không làm gì
//     const x = e.touches[0].pageX - carouselRef.current.offsetLeft;
//     const walk = (x - startX) * 2; // Tính khoảng cách kéo
//     carouselRef.current.scrollLeft = scrollLeft - walk; // Cập nhật vị trí cuộn
//   };

//   // Hàm xử lý sự kiện chạm màn hình khi nhả
//   const handleTouchEnd = () => {
//     isDown = false; // Dừng kéo
//     if (carouselRef.current) {
//       carouselRef.current.style.cursor = 'grab'; // Đặt lại con trỏ
//     }
//   };

//   return (
//     <div className="post">
//       <h1>{title}</h1>
//       <p>{content}</p>
//       <div
//         className="image-carousel"
//         ref={carouselRef}
//         onMouseDown={handleMouseDown}
//         onMouseLeave={handleMouseLeave}
//         onMouseUp={handleMouseUp}
//         onMouseMove={handleMouseMove}
//         onTouchStart={handleTouchStart}
//         onTouchMove={handleTouchMove}
//         onTouchEnd={handleTouchEnd}
//       >
//         {images.map((image, index) => (
//           <img key={index} src={image} alt={`Post image ${index + 1}`} />
//         ))}
//       </div>
//       <div className="like-section">
//         <button className="like-button" onClick={onLike}>
//           Like
//         </button>
//         <span className="like-count">{likes} Likes</span>
//       </div>
//     </div>
//   );
// };

// export default Post;

import React, { useRef, useState } from 'react';
import '../styles/Post.css';
// import HeartIcon from '../../../assets/images/heart-regular.svg';
// import HeartIconDis from '../../../assets/images/heart-solid.svg';
import { FaHeart, FaHeartBroken } from 'react-icons/fa';

interface PostProps {
  id: number;
  title: string;
  content: string;
  images: string[];
  likes: number;
  dislikes: number;
}

const Post: React.FC<PostProps> = ({ title, content, images, likes: initialLikes, dislikes: initialDislikes}) => {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  let isDown = false; // Trạng thái kéo
  let startX: number; // Vị trí bắt đầu
  let scrollLeft: number; // Vị trí cuộn hiện tại

  // Sử dụng useState để quản lý số lượng like
  const [likes, setLikes] = useState<number>(initialLikes); // Khởi tạo số lượng like từ props
  const [dislikes, setDislikes] = useState<number>(initialDislikes); // Khởi tạo số lượng dislike từ props
  const [liked, setLiked] = useState<boolean>(false); // Trạng thái đã thích
  const [disliked, setDisliked] = useState<boolean>(false); // Trạng thái đã dislike

  // const handleLikeToggle = () => {
  //   setLiked((prevLiked) => {
  //     const newLiked = !prevLiked; // Đảo ngược trạng thái liked
  //     setLikes((prevLikes) => (newLiked ? prevLikes + 1 : prevLikes - 1)); // Cập nhật số lượng like
  //     return newLiked; // Trả về trạng thái mới
  //   });
  // };

  // const handleLikeToggle = () => {
  //   if (liked) {
  //     // Nếu đã like, giảm số lượng likes
  //     setLikes(likes - 1);
  //   } else {
  //     // Nếu chưa like, tăng số lượng likes
  //     setLikes(likes + 1);
  //   }
  //   setLiked(!liked); // Đổi trạng thái liked
  // };

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn sự kiện lan lên cấp cha
    // Nếu đã dislike, hủy dislike trước khi tăng like
    if (disliked) {
      setDisliked(false); // Hủy dislike
      setDislikes((prevDislikes) => prevDislikes - 1); // Giảm số lượng dislike
    }
  
    // Tăng giảm like
    setLiked((prevLiked) => {
      const newLiked = !prevLiked; // Đảo ngược trạng thái liked
      setLikes((prevLikes) => (newLiked ? prevLikes + 1 : prevLikes - 1)); // Cập nhật số lượng like
      return newLiked; // Trả về trạng thái mới
    });
  };
  
  const handleDislikeToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Ngăn sự kiện lan lên cấp cha
    // Nếu đã like, hủy like trước khi tăng dislike
    if (liked) {
      setLiked(false); // Hủy like
      setLikes((prevLikes) => prevLikes - 1); // Giảm số lượng like
    }
  
    // Tăng giảm dislike
    setDisliked((prevDisliked) => {
      const newDisliked = !prevDisliked; // Đảo ngược trạng thái disliked
      setDislikes((prevDislikes) => (newDisliked ? prevDislikes + 1 : prevDislikes - 1)); // Cập nhật số lượng dislike
      return newDisliked; // Trả về trạng thái mới
    });
  };

  // // Hàm xử lý sự kiện chuột khi nhấn
  // const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
  //   // Chỉ cho phép kéo khi nhấn vào vùng không phải ảnh
  //   const target = e.target as HTMLElement;
  //   if (target.tagName === 'IMG') {
  //     return; // Nếu nhấn vào ảnh, không cho phép kéo
  //   }
    
  //   if (carouselRef.current) {
  //     isDown = true; // Đánh dấu là đang kéo
  //     startX = e.pageX - carouselRef.current.offsetLeft; // Vị trí bắt đầu
  //     scrollLeft = carouselRef.current.scrollLeft; // Vị trí cuộn hiện tại
  //     carouselRef.current.style.cursor = 'grabbing'; // Thay đổi con trỏ
  //   }
  // };

  // // Hàm xử lý sự kiện chuột khi nhả ra
  // const handleMouseUp = () => {
  //   isDown = false; // Dừng kéo
  //   if (carouselRef.current) {
  //     carouselRef.current.style.cursor = 'grab'; // Đặt lại con trỏ
  //   }
  // };

  // // Hàm xử lý sự kiện chuột khi rời khỏi vùng
  // const handleMouseLeave = () => {
  //   handleMouseUp(); // Gọi hàm handleMouseUp khi rời khỏi vùng
  // };

  // // Hàm xử lý sự kiện chuột khi di chuyển
  // const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  //   if (!isDown || !carouselRef.current) return; // Nếu không kéo, không làm gì
  //   const x = e.pageX - carouselRef.current.offsetLeft; // Vị trí hiện tại
  //   const walk = (x - startX) * 2; // Tính khoảng cách kéo
  //   carouselRef.current.scrollLeft = scrollLeft - walk; // Cập nhật vị trí cuộn
  // };

  // // Hàm xử lý sự kiện chạm màn hình
  // const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
  //   if (carouselRef.current) {
  //     isDown = true; // Đánh dấu là đang kéo
  //     startX = e.touches[0].pageX - carouselRef.current.offsetLeft; // Vị trí bắt đầu
  //     scrollLeft = carouselRef.current.scrollLeft; // Vị trí cuộn hiện tại
  //     carouselRef.current.style.cursor = 'grabbing'; // Thay đổi con trỏ
  //   }
  // };

  // // Hàm xử lý sự kiện chạm khi di chuyển
  // const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
  //   if (!isDown || !carouselRef.current) return; // Nếu không kéo, không làm gì
  //   const x = e.touches[0].pageX - carouselRef.current.offsetLeft; // Vị trí hiện tại
  //   const walk = (x - startX) * 2; // Tính khoảng cách kéo
  //   carouselRef.current.scrollLeft = scrollLeft - walk; // Cập nhật vị trí cuộn
  // };

  // // Hàm xử lý sự kiện chạm màn hình khi nhả
  // const handleTouchEnd = () => {
  //   isDown = false; // Dừng kéo
  //   if (carouselRef.current) {
  //     carouselRef.current.style.cursor = 'grab'; // Đặt lại con trỏ
  //   }
  // };

  return (
    <div className="post">
      <h1>{title}</h1>
      <p>{content}</p>
      <div
        className="image-carousel"
        // ref={carouselRef}
        // onMouseDown={handleMouseDown}
        // onMouseLeave={handleMouseLeave}
        // onMouseUp={handleMouseUp}
        // onMouseMove={handleMouseMove}
        // onTouchStart={handleTouchStart}
        // onTouchMove={handleTouchMove}
        // onTouchEnd={handleTouchEnd}
        onDragStart={(e) => e.preventDefault()} // Ngăn kéo ảnh ra ngoài
      >
        {images.map((image, index) => (
          <img key={index} src={image} alt={`Post image ${index + 1}`} />
        ))}
      </div>
      <div className="like-section">
        <div className="like-section__div" onClick={handleLikeToggle}>
          <button className="like-button">
            <FaHeart className="icon" />
          </button>
          <span className="like-count"> {likes} Likes</span>
        </div>
        

        <div like-section__div onClick={handleDislikeToggle} >
          <button className="dislike-button">
            <FaHeartBroken className="icon" />
          </button>
          <span className="dislike-count"> {dislikes} Dislikes</span>
        </div>
      </div>
    </div>
  );
};

export default Post;

