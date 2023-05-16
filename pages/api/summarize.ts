import {NextApiRequest, NextApiResponse} from 'next';
import scrapeWebPage from "@src/summarization/scrapeWebPage";
import {generateSummary} from "@src/summarization/generateSummary";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {url, searchPrompt} = req.query;

  if (typeof url !== 'string' || typeof searchPrompt !== 'string') {
    res.status(400).json({message: 'Invalid URL or search prompt'});
    return;
  }

  try {
    const sourceText = await scrapeWebPage(url);
    const summary = await generateSummary(sourceText, searchPrompt);
    res.status(200).json({summary});
  } catch (error) {
    res.status(500).json({message: 'Error generating summary'});
  }
}

