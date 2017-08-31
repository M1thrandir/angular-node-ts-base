export type SpeedDialDirections = "up" | "down" | "left" | "right"
export type FlexDirections = "column" | "column-reverse" | "row" | "row-reverse"

export function getFlexDirection(direction: SpeedDialDirections) {
  switch (direction) {
    case "up":
      return this.flexDirection = "column-reverse"
    case "down":
      return this.flexDirection = "column"
    case "left":
      return this.flexDirection = "row-reverse"
    case "right":
      return this.flexDirection = "row"
    default:
      return this.flexDirection = "column-reverse"
  }
}