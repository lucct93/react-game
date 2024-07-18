export const ItemTypes = {
  QUESTION: 'QUESTION',
};

export const GAME_LEVELS: Record<
  number,
  {
    row: number;
    col: number;
    operators: string[];
    numCount: number;
    maxRange: number;
  }
> = {
  1: {
    row: 3,
    col: 3,
    operators: ['+', '-'],
    numCount: 2,
    maxRange: 20,
  },
  2: {
    row: 4,
    col: 4,
    operators: ['+', '-'],
    numCount: 2,
    maxRange: 20,
  },
  3: {
    row: 4,
    col: 4,
    operators: ['+', '-', 'x'],
    numCount: 2,
    maxRange: 20,
  },
};

export const GAME_RATE_STAR: Record<number, number> = {
  60: 3,
  30: 2,
  0: 1,
};
