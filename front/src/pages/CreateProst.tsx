import React from 'react'
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';

function CreateProst() {
  return (
    <div className="flex w-full justify-center">
    <div className="flex-grow max-w-md">
        <h1 className="text-3xl font-bold text-center mb-2">Add Your Threads</h1>
        <p className="text-center text-gray-400 mb-8">
          You can say anything <span className="text-blue-400">#FreeSpeech</span>
        </p>

        <form className="space-y-6">
          <Input
            type="text"
            placeholder="Title"
            className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500"
          />
          <Input
            type="text"
            placeholder="Category"
            className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500"
          />
          <Textarea
            placeholder="Tell people what you have to say"
            rows={4}
            className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500"
          />
          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md transition duration-300">
            Add Thread
          </Button>
        </form>
      </div>
    </div>
  )
}

export default CreateProst