import React from 'react'

const card = ({children}) => {
  return (
    <div className="bg-gray-900 p-4">
      <div className="max-w-sm w-full bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        {children}
      </div>
    </div>
  )
}

export default card
