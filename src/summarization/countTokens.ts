import {encoding_for_model, TiktokenModel} from "tiktoken";

const DEBUG_TOKEN_COUNT = false;

export default function countTokens(text: string, modelId: TiktokenModel = "text-davinci-003") {
  const encoding = encoding_for_model(modelId)
  const tokens = encoding.encode(text)
  if (DEBUG_TOKEN_COUNT) {
    console.debug(`Token count: ${tokens.length}`)
  }
  encoding.free()
  return tokens.length;
}
