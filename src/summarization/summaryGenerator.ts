import { Configuration, OpenAIApi } from 'openai'; // add the OpenAI API SDK

export class SummaryGenerator {
  private readonly apiKey: string;
  private openai: OpenAIApi;

  constructor(apiKey: string) {
    const configuration = new Configuration({
      apiKey: apiKey,
    });
    this.apiKey = apiKey;
    this.openai = new OpenAIApi(configuration); // instantiate the OpenAI API
  }

  async summarizeSource(sourceUrl: string): Promise<string> {
    // TODO: Fetch the source text from the sourceUrl

    return this.generateSummary(sourceText);
  }

  private async generateSummary(sourceText: string): Promise<string> {
    const response = await this.openai.complete({
      engine: 'text-davinci-004', // GPT-4 engine (replace with the correct engine name when GPT-4 is released)
      prompt: sourceText,
      maxTokens: 150, // adjust based on your needs
      temperature: 0.3, // lower value makes output more deterministic
    });

    return response.choices[0].text;
  }
}
