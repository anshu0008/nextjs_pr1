"use client"

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useState,useEffect } from 'react'
import {signIn,signOut,useSession,getProviders} from 'next-auth/react'


const Nav = () => {

  const {data : session } = useSession();
  const [providers, setProviders] = useState(null);
  const [isToggled, setIsToggled] = useState(false)

  useEffect(()=>{

    const setProvider=async()=>{
      const response=await getProviders();
  
      setProviders(response);
    }
    setProvider();
  },[])

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <Image
          src="/assets/logo.png"
          alt='propmtopia-logo'
          height={80}
          width={80}
          className='object-contain'
        />
        <p className='logo_text'>Storybazz</p>
      </Link>

      {/* desktop navigation */}
    <div className="sm:flex hidden">
      {session?.user ? (
        <div className="flex gap-3 md:gap-5">
          <Link href="/create-prompt" className='black_btn'>Create Post
          </Link>
          <button type='button' className='outline_btn' onClick={signOut}>SignOut</button>

        <Link href="/profile">
          <Image
            src={session?.user?.image}
            height={37}
            width={37}
            className='rounded-full'
            alt='profile'
          />
        </Link>
        </div>
      ) : (
        <>
 {providers &&
              Object.values(providers).map((provider) => (
    <button 
      type='button'
      key={provider.name}
      onClick={()=>signIn(provider.id)}
      className='black_btn'
    >
      SignIn
    </button>
  ))}
        </>
      )}
    </div>

    {/* mobile navigation */}
    <div className="sm:hidden flex relative">
      {session?.user ? (
        <div className="flex">
         <Image
            src={session?.user?.image}
            height={37}
            width={37}
            className='rounded-full'
            alt='profile'
            onClick={()=>{setIsToggled(prev=>!prev)}}
          />

          {isToggled && (
            <div className="dropdown flex-col flex-center">
              <Link
                href="/profile"
                className='dropdown_link'
                onClick={()=>setIsToggled(false)}
              >
                My Profile
              </Link>
              <Link
                href="/create-prompt"
                className='dropdown_link'
                onClick={()=>setIsToggled(false)}
              >
                My Profile
              </Link>
              <button
                type='button'
                onClick={()=>{setIsToggled(false); signOut()}}
                className='mt-5 w-full black_btn'
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
        {providers &&
              Object.values(providers).map((provider) => (
    <button 
      type='button'
      key={provider.name}
      onClick={()=>signIn(provider.id)}
      className='black_btn'
    >
      SignIn
    </button>
  ))}
        </>
      )}
    </div>
    </nav>
  )
}

export default Nav
