import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Logo from '../utils/tiktik-logo.png';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { IUser } from '../types';
import { useRouter } from 'next/router';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import { createOrGetUser } from '../utils';

const Navbar = () => {
  const [user, setUser] = useState<IUser | null>();
  const [searchValue, setSearchValue] = useState('');
  const router = useRouter();

  const handleSearch = () => {};

  return (
    <div className="w-full flex justify-between items-center border-b-2 border-gray-200 py-2 px-4">
      <Link href="/">
        <div className="w-[100px] md:w-[129px] md:h-[30px] h-[38px]">
          <Image
            className="cursor-pointer"
            src={Logo}
            alt="logo"
            layout="responsive"
          />
        </div>
      </Link>
      <div className="hidden md:block relative">
        <form
          onSubmit={handleSearch}
          className="absolute md:static top-10 -left-20 bg-white"
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="search account and videos"
            className="bg-primary p-3 md:text-md font-medium border-2 border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 w-[300px] md:w-[350px] rounded-full md:top-0"
          />
          <button
            onClick={handleSearch}
            className="absolute md:right-5 right-6 top-4 border-1-2 border-gray-300 pl-4 text-2xl text-gray-400"
          >
            <BiSearch />
          </button>
        </form>
      </div>
      <div>
        {user ? (
          <div className="flex gap-5 md:gap-10">
            <Link href="/upload">
              <button>
                <IoMdAdd className="text-xl" />{' '}
                <span className="hidden md:block">Upload </span>
              </button>
            </Link>
            {user.image && (
              <Link href={`/profile/${user._id}`}>
                <div>
                  <Image src={user.image} alt='user' width={40} height={40} className='cursor-pointer rounded-full'/>
                </div>
              </Link>
            )}
            <button type='button' className='cursor-pointer border-2 p-2 rounded-full outline-none shadow-md' onClick={()=>googleLogout()}><AiOutlineLogout color='red' fontSize={21}/></button>
          </div>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response)}
            onError={() => console.log('error')}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
