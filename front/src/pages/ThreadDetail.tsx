import React, { useEffect } from 'react';
import { Avatar } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import apiPost from '../api/apiPost';
import apiUser from '../api/apiUser';
import { Post } from '../types/Post';
import {User} from '../types/User';
import {toast} from 'react-toastify'
import apiComment from '../api/apiComment';
import { Comment } from '../types/Comment';

export default function ThreadDetail() {
  const {id} = useParams();
  const [thread, setThread] = useState<Post>();
  const [profile, setProfile] = useState<User>();
  const [listComment, setListComment] = useState<Comment[] | any>([]);

  const [comment,setComment] = useState("");

  const fetchDetail = async() => {
    try {
      const res = await apiPost.getPostsApprovedByUserId();
      if(res) {
        setThread(res)
      }
    } catch (error) {
      
    }
  }

  const fetchComment = async() => {
    try {
      const res = await apiComment.getComment(id as string);
      if(res) {
        setListComment(res)
      }
    } catch (error) {
      
    }
  }

  useEffect(()=>{

    new Promise(async() => {
      const res = await apiUser.getMe();
      if(res){
        setProfile(res);
      }
    })
  },[]);

  useEffect(() =>{
    new Promise(async() => {
      await fetchDetail()
    })
    new Promise(async() => {
      await fetchComment()
    })
  },[])

  const handleComment = async() =>{
    try {
      const res = await apiComment.addComment({
        postId: thread?.postId,
        userId: thread?.userId,
        content: comment
      })
      if(res){
        toast.success('Comment Success');
      }
    } catch (error) {
      toast.error('Error comment')
    }
  }
  


  return (
    <div className="bg-gray-900 text-white p-6 max-w-2xl mx-auto">
      <Card className="bg-gray-800 p-6 rounded-lg mb-6">
        <div className="flex items-center mb-4">
          <Avatar src={thread?.user?.profilePictureUrl || ''} alt="Astronaut" className="w-10 h-10 rounded-lg mr-3" />
          <div>
            <h2 className="font-bold">{thread?.user?.fullName||''}</h2>
            <p className="text-sm text-gray-400">6h ago</p>
          </div>
          <span className="ml-auto bg-indigo-600 text-xs font-semibold px-2 py-1 rounded-full">Front-end</span>
        </div>
        <h1 className="text-2xl font-bold mb-2">{thread?.title || ''}</h1>
        <p className="mb-4">
          {thread?.content || ''}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-pink-500 hover:text-pink-400">
              <ThumbsUp className="w-5 h-5 mr-1" />
              10
            </Button>
            <Button variant="ghost" className="text-gray-400 hover:text-gray-300">
              <ThumbsDown className="w-5 h-5 mr-1" />
              10
            </Button>
          </div>
        </div>
      </Card>

      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4">Responses <span className="bg-indigo-600 text-xs px-2 py-1 rounded-full ml-2">18</span></h3>
        <Card className="bg-gray-800 p-4 rounded-lg mb-4">
          <div className="flex items-start">
            <Avatar src={profile?.profilePictureUrl} alt="Ebayyou Anggoro" className="w-10 h-10 rounded-full mr-3" />
            <div className="flex-grow">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What are your comments ?"
                className="w-full bg-gray-700 text-white placeholder-gray-400 rounded-lg p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={2}
              />
              <div className="flex justify-end">
                <Button onClick={handleComment} className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md">
                  Response
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {
          listComment && listComment.length > 0 && listComment.map((item, index) => (
            <Card key={index} className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-start mb-2">
            <Avatar src={item?.user?.profilePictureUrl} alt="Ebayyou Anggoro" className="w-10 h-10 rounded-full mr-3" />
            <div>
              <h4 className="font-bold">{item?.user?.email}</h4>
              <p className="text-sm text-gray-400">6h ago</p>
            </div>
            <div className="ml-auto flex space-x-1">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
            </div>
          </div>
          <p className="mb-4">{item?.content}</p>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" className="text-pink-500 hover:text-pink-400">
              <ThumbsUp className="w-5 h-5 mr-1" />
              10
            </Button>
            <Button variant="ghost" className="text-gray-400 hover:text-gray-300">
              <ThumbsDown className="w-5 h-5 mr-1" />
              10
            </Button>
          </div>
        </Card>
          ))
        }
      </div>
    </div>
  );
}