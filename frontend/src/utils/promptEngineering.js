export const refinePrompt = (originalPrompt, technique) => {
  switch (technique) {
    case "zero-shot":
      return `Given the following prompt, provide a direct answer: "${originalPrompt}"`;
    case "few-shot":
      return `Here are a few examples:
  Example 1: [Input] -> [Output]
  Example 2: [Input] -> [Output]
  Example 3: [Input] -> [Output]
  
  Now, given the following prompt, provide a similar output: "${originalPrompt}"`;
    case "chain-of-thought":
      return `Let's approach this step-by-step:
  1) First, let's understand the prompt: "${originalPrompt}"
  2) Now, let's break it down into smaller parts:
     a) [Part 1]
     b) [Part 2]
     c) [Part 3]
  3) Let's analyze each part:
     a) [Analysis 1]
     b) [Analysis 2]
     c) [Analysis 3]
  4) Finally, let's combine our findings to form a response:
     [Final response]`;
    default:
      return originalPrompt;
  }
};
