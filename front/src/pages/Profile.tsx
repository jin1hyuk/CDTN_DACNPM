import React, { useEffect, useState } from 'react'
import { Card } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Avatar } from '../components/ui/avatar'
import { FiBookmark,FiMessageSquare,
    FiThumbsUp,
    FiThumbsDown } from 'react-icons/fi'
import { setToLocalStorage,getFromLocalStorage } from '../libs/utils'
import apiUser from '../api/apiUser'
import apiPost from '../api/apiPost'
import apiLike from '../api/apiLike'
import { User } from '../types/User'
import { Post } from '../types/Post'
import { UpdateProfilePopup } from '../components/UpdateProfile'

function Profile() {
    const [profile, setProfile] = useState<User>();
    const [listPost, setListPost] = useState<Post[]| []>([]);
    const [like, setLike] = useState({
      true: '',
      false: '',
    })

    const [isOpen, setIsOpen] = useState(false);

    useEffect(()=>{

      new Promise(async() => {
        const res = await apiUser.getMe();
        if(res){
          setProfile(res);
        }
      })
    },[]);

    useEffect(()=>{
      if(profile?.id){
        new Promise(async () => {
          const res = await apiPost.getPostsApprovedByUserId();
          if(res){
            setListPost(res);
          }
        })
        new Promise(async () => {
          const res = await apiLike.getTrueLike(profile?.id!);
          if(res){
            setLike((prev) =>(
              {
                ...prev,
                true: res.length ?? 0
              }
            ))
          }
        })
        new Promise(async () => {
          const res = await apiLike.getFalseLike(profile?.id!);
          if(res){
            setLike((prev) =>(
              {
                ...prev,
                false: res.length ?? 0
              }
            ))
          }
        })
      }
    },[JSON.stringify(profile)])

    const onClose = () =>{
      setIsOpen(false)
    }

    const onUpdate = (newInfo: Partial<User>) =>{
      setIsOpen(false)
    }

  return (
    <div className="flex-grow p-8">
    <div className="mb-8">
      <div className="h-40 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 rounded-t-lg"></div>
      <div className="bg-gray-800 p-6 rounded-b-lg relative">
        <Avatar
          src={profile?.profilePictureUrl ?? ''}
          alt="Ebayyou Anggoro"
          className="w-32 h-32 rounded-full border-4 border-gray-800 absolute -top-16 left-6"
        />
        <div className="mt-20">
          <h1 className="text-2xl font-bold">{profile?.fullName}</h1>
          <p className="text-gray-400 text-sm">{profile?.email}</p>
          <p className="mt-2">{profile?.address}</p>
          <div className="flex mt-4 space-x-4">
            <Button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-full">Threads</Button>
            <Button variant="ghost" className="text-gray-300 hover:text-white px-4 py-2 rounded-full" onClick={()=> setIsOpen(true)}>Update Profile</Button>
          </div>
        </div>
      </div>
    </div>

    {
      listPost && listPost.length > 0 && listPost.map((item) =>(
        <Card className="bg-gray-800 mb-4" key={item.postId}>
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-3">
            <Avatar src={profile?.profilePictureUrl} alt="demo" />
            <div>
              <h3 className="font-bold">{profile?.fullName}</h3>
              <div className="text-sm text-gray-400">6h ago</div>
            </div>
          </div>
          <div className="bg-indigo-600 bg-opacity-20 text-indigo-400 px-3 py-1 rounded-full text-sm">
            Front-end
          </div>
        </div>
        <h2 className="text-xl font-bold mb-2">{item.title}</h2>
        <p className="text-gray-300 mb-4">{item.content}</p>
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
              <FiThumbsUp className="mr-2" /> {like.true}
            </Button>
            <Button variant="ghost" className="text-gray-400 hover:text-gray-300">
              <FiThumbsDown className="mr-2" /> {like.false}
            </Button>
          </div>
        </div>
      </div>
    </Card>
      ))
    }
    <UpdateProfilePopup isOpen={isOpen} onClose={onClose} onUpdate={onUpdate} user={profile}/>
  </div>
  )
}

export default Profile