import React from 'react'

const ActiveChat = () => {
  return (
    <div className="flex-1 flex flex-col">
    <div className="flex-1 p-4">
      <div className="mb-4">
        <div className="flex gap-3 items-center mb-2">
          <img
            src="https://i.pravatar.cc/40?img=1"
            alt="Christino Morillo"
            className="w-10 h-10 rounded-full"
          />
          <span className="font-bold">CHRISTINO MORILLO</span>
          <span className="text-gray-400 text-sm">05:40pm</span>
        </div>
        <div className="bg-gray-100 rounded-lg p-3 mb-2">
          When are you coming?
        </div>
        <div className="flex gap-3 items-center justify-end">
          <div className="bg-green-400 text-white rounded-lg p-3">
            Hi Dear, I'll be there by 7:30pm. Btw, where are u?
          </div>
          <span className="text-gray-400 text-sm">06:30pm</span>
        </div>
      </div>
    </div>
    <div className="p-4 border-t flex items-center gap-3">
      <input
        type="text"
        placeholder="Type here..."
        className="flex-1 p-2 rounded-lg border focus:outline-none focus:ring focus:ring-orange-400"
      />
      <button className="bg-orange-500 text-white px-4 py-2 rounded-lg">
        Send
      </button>
    </div>
  </div>
  )
}

export default ActiveChat
