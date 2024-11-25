import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Avatar } from "./ui/avatar"
import { FiUser,FiHash } from "react-icons/fi"
import { useNavigate } from "react-router-dom"

function RightSideBar() {
  const navigate =  useNavigate();

  const redirectLogin = () =>{
    navigate('/login')
  }

  return (
    <div className="w-64 bg-gray-800 p-4">
        <Card className="bg-gray-700 p-4 rounded-lg mb-8">
          <Button onClick={redirectLogin} className="w-full bg-indigo-600 hover:bg-indigo-700">Login</Button>
        </Card>

        <div className="mb-8">
          <h2 className="font-bold mb-4 flex items-center justify-between">
            List of Users
            <FiUser className="text-gray-400" />
          </h2>
          <div className="space-y-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Avatar src={`/placeholder.svg?height=32&width=32&text=${index + 1}`} alt={`User ${index + 1}`} />
                <div>
                  <div className="text-sm">Ebayyou Anggoro</div>
                  <div className="text-xs text-gray-400">user-{index + 1}</div>
                </div>
              </div>
            ))}
          </div>
          <Button variant="link" className="text-indigo-400 hover:text-indigo-300 mt-4 text-sm">
            see more
          </Button>
        </div>

        <div>
          <h2 className="font-bold mb-4 flex items-center justify-between">
            Whats Happening?
            <FiHash className="text-gray-400" />
          </h2>
          <div className="space-y-4">
            {['Front-end', 'Back-end', 'Mobile-dev', 'Data-analyst', 'Machine-learning', 'Blockchain-dev'].map((topic, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FiHash className="text-gray-400" />
                  <span className="text-sm">{topic}</span>
                </div>
                <span className="text-xs text-gray-400">6h ago</span>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}

export default RightSideBar