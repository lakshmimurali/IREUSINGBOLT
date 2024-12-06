import { openai } from '../config/openai';

export const wordInfoService = {
  async getWordInfo(word: string, context: string) {
    const prompt = `
      Analyze the word "${word}" in the following context:
      "${context}"
      
      Provide:
      1. Pronunciation (if applicable)
      2. Meaning in this context
      3. If it's an acronym/abbreviation, provide the correct expansion based on the context
      
      Format the response as JSON with keys: pronunciation, meaning, expansion
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4-turbo-preview",
      response_format: { type: "json_object" }
    });

    return JSON.parse(completion.choices[0].message.content);
  }
};