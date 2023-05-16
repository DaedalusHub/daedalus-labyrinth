import { generateSummary } from '@src/summarization/generateSummary';
import { CreateCompletionRequest, OpenAIApi} from 'openai';
import mocked = jest.mocked;
import countTokens from "@src/summarization/countTokens";
import { expect } from '@jest/globals';

jest.mock('openai');

describe('SummaryGenerator', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should generate summary successfully', async () => {
    const sourceText = 'This is a simple text for testing.';
    const searchPrompt = 'testing';

    const mockedCreateCompletion = {
      model: 'text-davinci-003',
      prompt: `Please generate a concise summary related to ${searchPrompt} for the following text. It should not start with the word summary. Text: ${sourceText}`,
      max_tokens: 4096 - countTokens(`Please generate a concise summary related to ${searchPrompt} for the following text. It should not start with the word summary. Text: ${sourceText}`),
      temperature: 0.3,
    } as CreateCompletionRequest;

    mocked(OpenAIApi.prototype.createCompletion).mockResolvedValue({
      status: 200,
      headers: {},
      statusText: 'OK',
      config: {},
      data: {
        id: "test-id",
        object: "text.completion",
        created: 123456789,
        model: "text-davinci-003",
        choices: [
          {
            text: 'Test summary',
            finish_reason: 'stop',
            index: 0
          },
        ],
      },
    });

    const summary = await generateSummary(sourceText, searchPrompt);

    expect(summary).toBe('Test summary');
    expect(OpenAIApi.prototype.createCompletion).toHaveBeenCalledWith(mockedCreateCompletion);
  });

  it('should handle the exception when OpenAI API throws an error', async () => {
    const sourceText = 'This is a simple text for testing.';
    const searchPrompt = 'testing';

    mocked(OpenAIApi.prototype.createCompletion).mockRejectedValue(new Error('API Error'));

    const summary = await generateSummary(sourceText, searchPrompt);

    expect(summary).toBe('');
  });
});
