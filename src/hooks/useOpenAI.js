import OpenAI from "openai";

export const useOpenAI = (key) => {
  const openai = new OpenAI({
    apiKey: key,
    dangerouslyAllowBrowser: true,
  });
  return openai;
};

export default useOpenAI;
