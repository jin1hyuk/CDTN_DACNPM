import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// You'll need to create these custom components
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';

import { toast } from 'react-toastify';
import Logo from '../assets/Logo Brand.png'
import apiUser from '../api/apiUser';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rePass, setRePass] = useState("");
  const navigate = useNavigate();

  const validate = () =>{
    if (!email || !password || !rePass || !userName) {
      toast.error("All fields are required.");
      return true;
    }

    // Email validation regex for @gmail.com format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid Gmail address.");
      return true;
    }

    // Password match validation
    if (password !== rePass) {
      toast.error("Passwords do not match.");
      return true;
    }
    return false
  }

  const handleRegister = async(e:any) => {
    e.preventDefault()
    try {
      const status = validate()
      if(!status){
        const payload = {
          username: userName,
          email: email,
          password: password,
        }

        const res = await apiUser.signUp(payload);
        if(res){
          console.log(res);
          toast.success('Register success')
          navigate('/login')
        }

      }
    } catch (error) {
      toast.error('fail')
    }
  }


  return (
    <div className="flex h-screen bg-gray-900">
      {/* Left side */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 p-12 flex-col justify-between rounded-r-3xl">
        <div>
          <div className="flex items-center space-x-2 mb-8">
            <div className="bg-white p-2 rounded-full">
              <FaUser className="text-indigo-600 w-6 h-6" />
            </div>
            <span className="text-white text-xl font-semibold">DigiForum.IO</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-6">
            any discussion, anywhere,<br />
            with anyone, only at<br />
            DigiForum.io
          </h1>
        </div>

        <Card className="bg-gray-800 text-white p-6 rounded-xl">
          <div className="flex items-center space-x-4 mb-4">
            <img src={Logo} alt="User" className="rounded-full" />
            <div>
              <h3 className="font-semibold">Eboyyou Anggoro</h3>
              <span className="text-sm text-gray-400">Front-end</span>
            </div>
          </div>
          <p className="text-sm mb-4">
            The three main languages you need to know well are HTML, CSS, and JavaScript. From there you can focus on frameworks, libraries, and other useful tools.
          </p>
          <div className="flex justify-between items-center">
            <button className="text-sm text-gray-400">Add response</button>
            <div className="flex space-x-2">
              <button className="text-pink-500">❤ 2</button>
              <button className="text-gray-400">👎 0</button>
            </div>
          </div>
        </Card>

        <div className="text-white text-sm">
          <a href="#" className="hover:underline">PRIVACY POLICY</a>
          <span className="mx-2">•</span>
          <a href="#" className="hover:underline">TERMS OF SERVICE</a>
        </div>
      </div>

      {/* Right side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-white mb-2">Register</h2>
          <p className="text-gray-400 mb-8">
            You can login with your registered account or quick login with your Google account.
          </p>

          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-700"></div>
            <span className="px-4 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-700"></div>
          </div>

          <form>
          <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                UserName
              </label>
              <Input
                type="text"
                id="name"
                value={userName}
                onChange={(val) => setUserName(val.target.value)}
               
                className="w-full bg-gray-800 text-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                Email
              </label>
              <Input
                type="email"
                id="email"
                value={email}
                onChange={(val) => setEmail(val.target.value)}
                placeholder="yayan@durian.cc"
                className="w-full bg-gray-800 text-white"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-400 mb-1">
                Password
              </label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(val) => setPassword(val.target.value)}
                placeholder="yayan@durian.cc"
                className="w-full bg-gray-800 text-white"
              />
            </div>
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-400">
                  Password
                </label>
                <a href="#" className="text-sm text-indigo-400 hover:underline">
                  Forgot Password?
                </a>
              </div>
              <Input
                type="password"
                id="repass"
                value={rePass}
                onChange={(val) => setRePass(val.target.value)}
                placeholder="••••••••••••••••"
                className="w-full bg-gray-800 text-white"
              />
            </div>
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                id="remember"
                className="rounded bg-gray-800 border-gray-600 text-indigo-600 focus:ring-indigo-500"
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-400">
                Remember me
              </label>
            </div>
            <Button  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white" onClick={(e) =>handleRegister(e)}>
              Register
            </Button>
          </form>

          <p className="mt-4 text-center text-gray-400">
            Have an account?{' '}
            <Link to="/login" className="text-indigo-400 hover:underline">
              Login!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}