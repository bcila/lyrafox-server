export default () => ({
  groq: {
    apiKey: process.env.GROQ_API_KEY,
    baseURL: 'https://api.groq.com/openai/v1',
    model: 'llama-3.2-90b-vision-preview',
  },
  gemini: {
    apiKey: process.env.GEMINI_API_KEY,
    model: 'gemini-1.5-flash',
  },
  sambanova: {
    apiKey: process.env.SAMBANOVA_API_KEY,
    baseURL: 'https://api.sambanova.ai/v1',
    model: 'Meta-Llama-3.1-405B-Instruct',
  },
  togetherai: {
    apiKey: process.env.TOGETHERAI_API_KEY,
    baseURL: 'https://api.together.xyz/v1',
    model: 'togethercomputer/m2-bert-80M-8k-retrieval',
  },
  // Local
  lmstudio: {
    apiKey: 'lm-studio',
    baseURL: 'http://localhost:1234/v1',
    model: 'gemma-2-0b-instruct',
  },
  llmhub: {
    systemPrompt: `You are a fish. Your name is Neko.`,
  },
});
