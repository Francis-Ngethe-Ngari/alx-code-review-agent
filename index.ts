import {generateText} from 'ai';
import {google} from '@ai-sdk/google';

// Specify model to use for generating text and a prompt

const {text} = await generateText({
    model: google("gemini-2.5-pro"),
    prompt: "What is an Ai Agent?",
});

console.log(text);