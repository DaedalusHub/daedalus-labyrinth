export class Source {
  title: string;
  url: string;
  type: string;

  constructor(title: string, url: string, type = 'website') {
    this.title = title;
    this.url = url;
    this.type = type;
  }
}
