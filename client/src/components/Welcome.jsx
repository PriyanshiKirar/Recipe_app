

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className='flex h-[90vh] relative items-center justify-center overflow-hidden bg-[#FFF5E1]'>
      <div className='w-[50%] h-[80%] flex items-left justify-end py-[3%] px-20 flex-col gap-4'>
        <h1 className='text-[100px] text-shadow-2xl text-[#D35400] w-[80%] leading-[100px] font-bold'>Flavor Fusion</h1>
        <h2 className='text-3xl w-[80%] mt-[2%] font-bold text-[#8B4513]'>Crafting Culinary Delights, One Recipe at a Time.</h2>
        <p className='w-[80%] text-[#5A3E36] text-lg'>Discover new flavors and elevate your cooking experience with our AI-powered recipe generator. Let your taste buds explore a world of delicious possibilities!</p>
        <button 
          className='py-3 mt-[2.5%] w-[20%] rounded-xl text-white bg-[#D35400] shadow-lg hover:bg-[#A04000] transition'
          onClick={() => navigate('/signup')}
        >
          Get Started
        </button>
      </div>

      <div className='relative w-[50%] h-[100%] flex items-center justify-center'>
        <img className='scale-[0.8] left-[-20%] z-[1] top-[30%] absolute' src='../b82a39c07f7abaca8eb5e58660db33dc-removebg-preview.png' alt='' />
        <img className='scale-[0.8] left-[30%] z-[1] top-[20%] absolute' src='../6d7d886ae4665f1e349191526ffac45f-removebg-preview.png' alt='' />
        <img className='scale-[1.2] left-[0%] z-[0] top-[-2%] absolute' src='../e6b52f005370f32dabbf530ebe62851e-removebg-preview.png' alt='' />
        <img className='scale-[0.7] left-[43%] z-[1] top-[15%] absolute' src='../05eb8e7ded3db5a397ef8c6078e57e48-removebg-preview.png' alt='' />
      </div>
    </div>
  );
};

export default Home;
