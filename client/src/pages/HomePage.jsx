import React, { useState } from 'react'
import RightSidebar from '../components/RightSidebar'
import ChatContainer from '../components/ChatContainer'
import Sidebar from '../components/Sidebar'

const HomePage = () => {
    const [selectedUser , setselectedUser] = useState(false)
    return (
        <div className='border w-full h-screen sm:px-[15%] sm:py-[5%]'>
            <div className={`backdrop-blur-xl border-2 border-gray-600 rounded-2xl overflow-hidden h-[100%] grid grid-cols-1 relative 
                ${selectedUser?'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1r]' : 'md:grid-cols-2'}`}>
                <Sidebar selectedUser={selectedUser} setselectedUser={setselectedUser} />
                <ChatContainer selectedUser={selectedUser} setselectedUser={setselectedUser} />
                <RightSidebar selectedUser={selectedUser} setselectedUser={setselectedUser} />
            </div>
        </div>
    )
}

export default HomePage
