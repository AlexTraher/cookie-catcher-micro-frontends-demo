// export type Direction = "LEFT" | "RIGHT" | "NONE";
declare global {
  interface ObjectConstructor {
      keys<T>(obj: T): Array<keyof T>
  }
}



// export type Direction = typeof DIRECTION[number];

export const Direction = {
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  NONE: "NONE",
} as const;

export const KeyCodes = {
  RIGHT: "ArrowRight",
  LEFT: "ArrowLeft"
} as const;

export const DIRECTIONS = Object.values(Direction);

export type Direction = typeof DIRECTIONS[number];

export const KEYCODE_TO_DIRECTION = {
  "ArrowRight": Direction.RIGHT,
  "ArrowLeft": Direction.LEFT,
  "NONE": Direction.NONE,
} as const;

export const DIRECTION_TO_CHANGE = {
  [Direction.RIGHT]: 1,
  [Direction.LEFT]: -1,
  [Direction.NONE]: 0,
} as const;

// export const SUPPORTED_KEYS = Object.keys(KEYCODE_TO_DIRECTION);
