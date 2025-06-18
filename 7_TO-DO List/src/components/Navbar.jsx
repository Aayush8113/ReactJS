import React from 'react';

const Navbar = () => {
  return (
        <nav className="flex justify-between bg-gray-900 text-white p-4 py-3">
            <div className="logo">
                <span className='font-bold text-xl mx-10'>iTask</span>
            </div>
            <ul className="flex gap-10 mx-10">
                <li className='cursor-pointer hover:font-bold transition-all duration-100'>Home</li>
                <li className='cursor-pointer hover:font-bold transition-all duration-100'>Your Task</li>
            </ul>
        </nav>
  );
}

export default Navbar;