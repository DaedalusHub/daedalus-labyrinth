import countTokens from "@src/summarization/countTokens";

export default function chunkText(text: string, maxTokens: number) {
  const totalTokenCount = countTokens(text);
  if (totalTokenCount <= maxTokens * 0.6) {
    console.log(`Text has ${totalTokenCount} tokens, which is less than 60% of the max tokens (${maxTokens}).`);
    console.log(`No need to chunk text.`)
    return [text];
  }

  const numOfChunks = Math.ceil(totalTokenCount / maxTokens);
  const avgTokensPerChunk = Math.ceil(totalTokenCount / numOfChunks);

  console.log(`Creating ${numOfChunks} chunks with an average of ${avgTokensPerChunk} tokens each.`)

  let chunks: string[] = [];
  let currentChunk = '';
  let currentChunkTokenCount = 0;

  const sentences = text.split('. ');
  for (let sentence of sentences) {
    const sentenceTokenCount = countTokens(sentence);
    const futureChunkTokenCount = currentChunkTokenCount + sentenceTokenCount;
    if (futureChunkTokenCount <= avgTokensPerChunk) {
      currentChunk = `${currentChunk} ${sentence}`;
      currentChunkTokenCount = futureChunkTokenCount;
    } else {
      console.log(`Chunk created with ${currentChunkTokenCount} tokens.`);
      chunks.push(currentChunk);
      currentChunk = sentence;
      currentChunkTokenCount = sentenceTokenCount;
    }
  }

  if (currentChunk !== '') {
    console.log(`Chunk created with ${currentChunkTokenCount} tokens.`);
    chunks.push(currentChunk);
  }

  console.log(`Text has been split into ${chunks.length} chunks.`);
  console.debug(chunks)

  return chunks;
}
