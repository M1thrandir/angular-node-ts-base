export class Link {
  public name: string
  public externalLink: string
  public internalLink: string
  public internalParams: Object
  public iconPath: string
  public show: () => boolean
  public showParam: any

  constructor(name: string, iconPath?: string,
              externalLink?: string, internalLink?: string,
              internalParams?: Object, show?: () => boolean,
              showParam?: any) {
    this.name = name
    this.externalLink = externalLink
    this.internalLink = internalLink
    this.internalParams = internalParams
    this.iconPath = iconPath
    this.show = show
    this.showParam = showParam
  }
}
