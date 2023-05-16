export class WebSource {
  title: string;
  url: string;
  snippet: string;
  type: string;
  summary?: string;

  constructor(title: string, url: string, snippet: string, type = 'website') {
    this.title = title;
    this.url = url;
    this.snippet = snippet;
    this.type = type;
  }
}
