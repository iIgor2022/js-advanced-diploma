import { calcTileType } from '../utils';

test.each([
  { index: 0, boardSize: 8, expected: 'top-left' },
  { index: 7, boardSize: 8, expected: 'top-right' },
  { index: 3, boardSize: 8, expected: 'top' },
  { index: 8, boardSize: 8, expected: 'left' },
  { index: 13, boardSize: 8, expected: 'center' },
  { index: 55, boardSize: 8, expected: 'right' },
  { index: 56, boardSize: 8, expected: 'bottom-left' },
  { index: 60, boardSize: 8, expected: 'bottom' },
  { index: 63, boardSize: 8, expected: 'bottom-right' },
])('Testing calcTileType function', ({ index, boardSize, expected }) => {
  expect(calcTileType(index, boardSize)).toBe(expected);
});
