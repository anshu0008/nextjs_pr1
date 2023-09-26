"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import toast from 'react-hot-toast';

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");
  const [clicked, setClicked] = useState(false);
  const [votePost, setVotePost] = useState(post.vote);


  const handleProfile = () => {
    if (post.creator._id == session?.user.id) router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleClick = async (e) => {
    setClicked(true);
    const response = await fetch(`/api/vote`, {
      method: "PATCH",
      body: JSON.stringify({
        _id: post._id,
      }),
    });

    if (response.ok) {
      setVotePost(votePost+1);
      toast.success("Liked....")
    }else{
      toast.error("Something Went wrong !!!")
    }
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);

    setTimeout(() => setCopied(""), 3000);
  };

  useEffect(()=>{
    console.log(post.creator._id);
  })
  return (
    <div className="prompt_card">
  
      <div className="flex justify-between items-start gap-5">
        <div
          className="fex-1 flex justify-start items-center gap-3 cursor-pointer"
          onClick={handleProfile}
        >
          <Image
            src={post.creator.image}
            alt="user-profile"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <div className="flex justify-between items-start">
        <p
          className="font-inter text-sm blue_gradient cursor-pointer"
          onClick={() => handleTagClick && handleTagClick(post.tag)}
        >
          #{post.tag}
        </p>
        <div className="flex gap-2" onClick={(e) => handleClick(e)}>
          <Image
            src={clicked ? "/assets/redHeart.svg" : "/assets/heart.svg"}
            alt="votes"
            width={20}
            height={20}
            className="cursor-pointer"
          />
          <p>{votePost}</p>
        </div>
      </div>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
