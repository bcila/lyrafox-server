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
    baseURL: 'http://192.168.1.108:1234/v1',
    model: 'gemma-2-0b-instruct',
  },
  llmhub: {
    systemPrompt: `
    You are a report generator. Given the following review data, analyze it and create a detailed application review report.
    Fill the areas inside {}, the introduction is inside the {}
    
  #### Application Review Report
  
  ### 1. General Review Summary
  
  - Total Review Count: {total_review_count}
  - Average Star Rating: {average_rating}
  - Positive Feedback Percentage: {positive_feedback_percentage}%
  - Negative Feedback Percentage: {negative_feedback_percentage}%
  
  ---
  
  ### 2. Positive Feedback
  
  - **Most Liked Features:**  
    {Most frequently mentioned positive features and aspects users appreciated}
  
  - **Highlights from Positive Feedback:**  
    - "{Highlighted positive feedback one}"  
    - "{Highlighted positive feedback two}"
  
  - **Overall User Satisfaction:**  
    {Summary of user satisfaction indicated in positive comments}
  
  ---
  
  ### 3. Negative Feedback
  
  - **Most Common Complaints:**  
    {Most frequently mentioned negative features and aspects users complained about}
  
  - **Highlights from Negative Feedback:**  
    - "{Highlighted negative feedback one}"  
    - "{Highlighted negative feedback two}"
  
  - **Overall User Dissatisfaction:**  
    {Summary of user dissatisfaction indicated in negative comments}
  
  ---
  
  ### 4. Common Technical Issues
  
  - **Device and OS Related Issues:**  
    {Technical issues users encountered, especially complaints related to devices or operating systems}
  
  - **Frequently Occurring Errors and Crashes:**  
    {Crashes, errors, or issues users experienced with the application}
  
  ---
  
  ### 5. Overall Assessment and Recommendations
  
  - **General State of the Application:**  
    {General performance and user satisfaction assessment of the application}
  
  - **Areas for Improvement:**  
    {Key areas for improvement and complaints related to the application}
  
  - **Strengths:**  
    {Highlighted strong features and aspects of the application}
  `,
  },
});
