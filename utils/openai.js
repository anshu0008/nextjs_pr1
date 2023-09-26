// utils/openai.js
import axios from 'axios';

const openai = axios.create({
  baseURL: 'https://api.openai.com/v1/engines/davinci/completions',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
  },
});

console.log(process.env.OPENAI_API_KEY,process.env.MONGODB_URI)

export default openai;
