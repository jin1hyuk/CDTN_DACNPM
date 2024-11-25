import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User, MessageSquare, Heart } from 'lucide-react';

const Card = ({ color, icon: Icon, title, content }: { color: string; icon: React.ElementType; title: string; content: string }) => (
  <div className={`${color} p-4 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105`}>
    <div className="flex items-center mb-2">
      <Icon size={16} className="mr-2" />
      <h3 className="font-bold text-gray-800">{title}</h3>
    </div>
    <p className="text-sm text-gray-700">{content}</p>
  </div>
);

export default function WelcomePage() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl flex flex-col md:flex-column items-center justify-between">
        <div className="relative w-full md:w-1/2 h-64 mb-8 md:mb-0">
          <div className="absolute top-0 left-0 transform -rotate-6">
            <Card
              color="bg-pink-200"
              icon={User}
              title="#Trust"
              content="This platform is trusted as long as it's not..."
            />
          </div>
          <div className="absolute top-12 left-12 z-10">
            <Card
              color="bg-purple-200"
              icon={Heart}
              title="#Free Speech"
              content="You may or may not like or dislike any discussion, but never act on your will."
            />
          </div>
          <div className="absolute top-24 left-24 z-20">
            <Card
              color="bg-blue-200"
              icon={MessageSquare}
              title="#Free Speech"
              content="You are free to speak, discuss, as long as you don't hurt other people."
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl font-bold mb-4">DigiForum</h1>
          <p className="text-xl mb-8">
            Welcome to Discussion with anyone, You can say anything #FreeSpeech.
          </p>
          <button onClick={()=> navigate('/home')} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300">
            Go to #Threads
          </button>
        </div>
      </div>
    </div>
  );
}