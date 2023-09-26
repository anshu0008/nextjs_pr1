
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET=async(request)=>{
    try{
        await connectToDB();

        const prompts=await Prompt.find({}).populate('creator').sort({vote:-1});


        return new Response(JSON.stringify(prompts),{status:200});
    }catch(err){
        return new Response("Error in getting new Post",{status:500})
    }
}