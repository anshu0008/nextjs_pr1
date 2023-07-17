"use client"

import React,{useState,useEffect} from 'react'
import Profile from '@components/Profile'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const MyProfile = () => {
  const router=useRouter();
  const {data:session}=useSession();
  const [posts,setPosts]= useState([]);

  useEffect(()=>{
    const fetchPost=async()=>{
      try{
        const response=await fetch(`/api/users/${session?.user.id}/posts`);


        const data=await response.json();

        setPosts(data);
      }catch(err){
        console.log(err);
      }
    }

    if(session?.user.id) fetchPost();
  },[session?.user.id]);


  const handleEdit=(post)=>{
    router.push(`/update-prompt?id=${post._id}`)
  }

  const handleDelete=async(post)=>{
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((item) => item._id !== post._id);

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  }
  return (
    <div>
        <Profile
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          name="My"
          data={posts}
          desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination"
        />

    </div>
  )
}

export default MyProfile