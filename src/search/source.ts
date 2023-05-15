export class Source {
  title: string;
  url: string;
  snippet: string;
  type: string;

  constructor(title: string, url: string, snippet: string, type = 'website') {
    this.title = title;
    this.url = url;
    this.snippet = snippet;
    this.type = type;
  }
}
