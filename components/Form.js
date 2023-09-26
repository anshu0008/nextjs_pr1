import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Loader from "./Loader";
import TypeText from "./TypeText";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  const chatContainer = useRef(null);
  const inputRef = useRef(null);

  const [promptData, setPromptData] = useState("");
  const [resultData, setResultData] = useState("");
  const [check, setCheck] = useState(false);

  const apiKey = "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";
  const client = axios.create({
    headers: { Authorization: "Bearer " + apiKey },
  });

  const handleKeyUp = (e) => {
    if (e.keyCode === 13) {
      handleSubmit1(e);
    }
  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    const params = {
      prompt: promptData,
      max_tokens: 100,
    };
    setCheck(!check);
    try {
      const result = await client.post(
        "https://api.openai.com/v1/engines/davinci/completions",
        params
      );
      setCheck(false);
      let data=post.promptDetails + result.data.choices[0].text;

        setResultData(post.promptDetails + result.data.choices[0].text);
        // setResultData(promptData + resultData);
        setPost({ ...post, prompt: post.promptDetails + result.data.choices[0].text});
        
    } catch (err) {
      console.error("Error generating text:", err);
    } 
  };
  useEffect(() => {
    const inputElement = inputRef.current;
    if (inputElement) {
      inputElement.addEventListener('keyup', handleKeyUp);
    }
    
    // Clean up the event listener when the component unmounts
    return () => {
      if (inputElement) {
        inputElement.removeEventListener('keyup', handleKeyUp);
      }
    };
    
  }, []);

  return (
    <section className="w-full max-w-full flex-start flex-col justify-center items-start">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-[80vw] flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your Story
          </span>

          <div
            className="flex flex-start flex-wrap w-full rounded-lg h-fit bg-white mt-2 p-5 text-lg text-gray-500"
            ref={chatContainer}
          >
            {check ? <Loader /> : <TypeText text={resultData} />}
          </div>
        </label>

        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Field of Prompt{" "}
            <span className="font-normal">
              (#product, #webdevelopment, #idea, etc.)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            type="text"
            placeholder="#Tag"
            required
            className="form_input"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>

          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
      <form
        className="relative bottom-0 mt-5 mb-5 flex justify-center items-center"
        onSubmit={(e)=>handleSubmit1(e)}
      >
        <input
        type="text"
        value={post.promptData}
        // ref={inputRef}
          className="w-[80vw] p-5 bg-black text-sm text-white h-fit rounded-lg"
          placeholder="Write your story ..."
          onChange={(e) => {setPost({ ...post, promptDetails: e.target.value });setPromptData(e.target.value)} }
        />
        <button type="submit" className="absolute right-[10px]">
          <img src="assets/send.svg" alt="send" className="w-[35px] h-[35px]" />
        </button>
      </form>
    </section>
  );
};

export default Form;
