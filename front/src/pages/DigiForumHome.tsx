import { FiBookmark, FiBell, FiMail, FiMessageSquare } from 'react-icons/fi';

// You'll need to create these custom components
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Avatar } from '../components/ui/avatar';

import AvatarImg from '../assets/avatar.png'
import { useNavigate } from 'react-router-dom';
import apiPost from '../api/apiPost';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Post, ReqPost } from '../types/Post';

const DigiForumThreads = () => {

  const [listPost, setListPost] = useState<Post[] | []>([])
  const [post, setPost] = useState();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    imagePath: "",
  });

  // State để lưu thông báo lỗi
  const [errors, setErrors] = useState({
    title: "",
    content: "",
    imagePath: "",
  });

  useEffect(()=>{
    new Promise(async() => {
      await listFetch();
    })
  },[])

  // Hàm xử lý thay đổi dữ liệu input
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Reset lỗi khi người dùng nhập lại
  };

  // Hàm validate các input
  const validate = () => {
    const newErrors = {} as any;
    if (!formData.title.trim()) {
      newErrors.title = "Title is required.";
    }
    if (!formData.content.trim()) {
      newErrors.content = "Content is required.";
    }
    if (!formData.imagePath.trim()) {
      newErrors.imagePath = "Image URL is required.";
    } else if (
      !/^https?:\/\/.*\.(jpg|jpeg|png|gif)$/i.test(formData.imagePath.trim())
    ) {
      newErrors.imagePath = "Invalid image URL. Must be a valid link (e.g., ending in .jpg or .png).";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Trả về true nếu không có lỗi
  };

  // Hàm xử lý submit
  const handleSubmit = async(e: any) => {
    e.preventDefault(); // Ngăn trình duyệt reload
    if (validate()) {
      const res = await apiPost.addPost(formData as ReqPost)
      if(res){
        alert("Form submitted successfully!");
      }
    } else {
      console.log("Validation failed.");
    }
  };

  const listFetch = async() =>{
    try {
      const res = await apiPost.getAllPost();
      if(res.length > 0) {
        setListPost(res)
      }
    } catch (error) {
      toast.error('Fetch error')
    }
  }



  return (
    

        <main>
          <Card className="bg-gray-800 mb-8">
            <div className="flex items-start space-x-4 p-4">
              <Avatar src={AvatarImg} alt="User" />
              
              <form onSubmit={handleSubmit} className="flex-grow space-y-4">
                {/* Input cho Title */}
                <div>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter the title"
                    value={formData.title}
                    onChange={handleChange}
                    className={`w-full bg-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${
                      errors.title ? "focus:ring-red-500" : "focus:ring-blue-500"
                    }`}
                  />
                  {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
                </div>

                {/* Input cho Content */}
                <div>
                  <textarea
                    name="content"
                    placeholder="Enter the content"
                    value={formData.content}
                    onChange={handleChange}
                    className={`w-full bg-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 resize-none ${
                      errors.content ? "focus:ring-red-500" : "focus:ring-blue-500"
                    }`}
                    rows={5}
                  ></textarea>
                  {errors.content && (
                    <p className="text-red-500 text-sm">{errors.content}</p>
                  )}
                </div>

                {/* Input cho ImagePath */}
                <div>
                  <input
                    type="text"
                    name="imagePath"
                    placeholder="Enter image URL"
                    value={formData.imagePath}
                    onChange={handleChange}
                    className={`w-full bg-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 ${
                      errors.imagePath ? "focus:ring-red-500" : "focus:ring-blue-500"
                    }`}
                  />
                  {errors.imagePath && (
                    <p className="text-red-500 text-sm">{errors.imagePath}</p>
                  )}
                </div>

                {/* Nút Submit */}
                <div className="flex justify-between items-center">
                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-full text-sm text-white"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </Card>

          {
          listPost && listPost.length > 0 && listPost.map((thread) => (
            <Card key={thread.content} className="bg-gray-800 mb-4" onClick={()=> navigate(`/detail/${thread.postId}`)}>
              <div className="p-4">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center space-x-3">
                    <Avatar src={thread.user.profilePictureUrl} alt={thread.user.email} />
                    <div>
                      <h3 className="font-bold">{thread.user.username}</h3>
                      <div className="text-sm text-gray-400">{thread.user.email}</div>
                    </div>
                  </div>
                  <div className="bg-indigo-600 bg-opacity-20 text-indigo-400 px-3 py-1 rounded-full text-sm">
                    Front-end
                  </div>
                </div>
                <h2 className="text-xl font-bold mb-2">{thread.title}</h2>
                <p className="text-gray-300 mb-4">{thread.content}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" className="text-gray-400 hover:text-white">
                      <FiBookmark className="mr-2" />
                    </Button>
                    <Button variant="ghost" className="text-gray-400 hover:text-white flex items-center">
                      <FiMessageSquare className="mr-2" />
                      Add response
                      <span className="ml-2 bg-pink-500 text-white px-2 py-0.5 rounded-full text-xs">
                        10
                      </span>
                    </Button>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" className="text-pink-500 hover:text-pink-400">
                      👍 
                    </Button>
                    <Button variant="ghost" className="text-gray-400 hover:text-gray-300">
                      👎 
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </main>
  );
}

export default DigiForumThreads