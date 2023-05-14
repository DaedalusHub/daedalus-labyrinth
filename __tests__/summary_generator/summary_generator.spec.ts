import { SummaryGenerator } from '@src/summarization/summary_generator';

describe('SummaryGenerator', () => {
  let summaryGenerator: SummaryGenerator;

  beforeEach(() => {
    // Initialize with a placeholder API key
    summaryGenerator = new SummaryGenerator('placeholderKey');
  });

  it('should throw an error when summarizeSource is called', async () => {
    await expect(
      summaryGenerator.summarizeSource('https://example.com')
    ).rejects.toThrow('Not Implemented');
  });
});
