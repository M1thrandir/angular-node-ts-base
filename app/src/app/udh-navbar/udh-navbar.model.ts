export class LinkInfo {
  constructor(
    public href: string = "",
    public params: object = {},
  ) {}
}

export class Link {
  constructor(
    public name: string = "Link Name Placeholder",
    public iconCssClass: string = "",
    public linkInfo = new LinkInfo("javascript:;"),
    public show: () => boolean = () => true
  ) {
    this.name = name
    this.linkInfo = linkInfo
    this.iconCssClass = iconCssClass
    this.show = show
  }

  hasExternalLink(): boolean {
    return this.linkInfo.href.startsWith("http")
        || this.linkInfo.href.startsWith("https")
        || this.linkInfo.href.startsWith("www")
  }
}
