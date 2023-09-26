import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";



export const POST = async (request) => {
    const { userId, prompt, tag,promptDetails,vote } = await request.json();

    try {
        await connectToDB();
        const newPrompt = new Prompt({ creator: userId, prompt, tag,vote,promptDetails });

        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response("Failed tto create a new prompt", { status: 500 });
    }
}