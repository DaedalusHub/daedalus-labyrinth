import {Configuration, CreateCompletionRequest, OpenAIApi} from 'openai';
import chunkText from "@src/summarization/chunkText";
import countTokens from "@src/summarization/countTokens";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateSummary(sourceText: string, searchPrompt: string) {
  if (!configuration.apiKey) {
    console.error('Missing OPENAI_API_KEY environment variable');
    return '';
  }
  console.debug("configuration: ", configuration)

  const maxTokensPerRequest = 4096;

  const textChunks = chunkText(sourceText, maxTokensPerRequest);

  let combinedSummary = '';
  if (textChunks.length > 1) {
    combinedSummary += 'Due to size, the content has been broken up into chunks:\n';
  }


  const openai = new OpenAIApi(configuration);
  console.debug("openai: ", openai)

  for (let i = 0; i < textChunks.length; i++) {
    console.log(`Generating summary for chunk ${i + 1}`);
    const prompt = `Please generate a concise summary related to ${searchPrompt} for the following text. It should not start with the word summary. Text: ${textChunks[i]}`;
    const availableTokens = maxTokensPerRequest - countTokens(prompt);
    const completionRequest = {
      model: 'text-davinci-003',
      prompt: prompt,
      max_tokens: availableTokens,
      temperature: 0.3,
    } as CreateCompletionRequest;

    console.debug("completionRequest: ", completionRequest)

    try {
      const response = await openai.createCompletion(completionRequest);
      if (!response.data.choices[0].text) {
        console.error('No text in response from OpenAI API');
      } else {
        if (textChunks.length > 1) {
          combinedSummary += `Chunk ${i + 1} Summary: ${response.data.choices[0].text}\n`;
        } else {
          combinedSummary += response.data.choices[0].text;
        }
      }
    } catch (error) {
      console.error('Error generating summary.');
      if (process.env.VERBOSE_DEBUG === 'true') {
        console.error(error);
      }
      return '';
    }
  }

  console.log('Generated summary successfully.');
  return combinedSummary;
}
