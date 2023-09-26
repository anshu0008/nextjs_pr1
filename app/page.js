import Feed from '@components/Feed';

import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
const Home = () => {


  return (
    <section className='w-full flex-center flex-col'>
      <Toaster />
    <h1 className='head_text text-center'>
      Discover & Share
      <br className='max-md:hidden' />
      <span className='orange_gradient text-center'> AI-Powered Prompts to write Story</span>
    </h1>
    <p className='desc text-center'>
      Storybazz is an open-source AI prompting tool for modern world to
      discover, create and share incredible Stories.
    </p>

    
    <Feed />
    
    </section>
  )
}

export default Home
