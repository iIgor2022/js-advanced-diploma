/**
 * @todo
 * @param index - индекс поля
 * @param boardSize - размер квадратного поля (в длину или ширину)
 * @returns строка - тип ячейки на поле:
 *
 * top-left
 * top-right
 * top
 * bottom-left
 * bottom-right
 * bottom
 * right
 * left
 * center
 *
 * @example
 * ```js
 * calcTileType(0, 8); // 'top-left'
 * calcTileType(1, 8); // 'top'
 * calcTileType(63, 8); // 'bottom-right'
 * calcTileType(7, 7); // 'left'
 * ```
 * */
export function calcTileType(index, boardSize) {
  // TODO: ваш код будет тут
  const row = Math.floor(index / boardSize);
  const column = index % boardSize;
  function calcColumn() {
    if (column === 0) {
      return 'left';
    }
    if (column === boardSize - 1) {
      return 'right';
    }
    return 'center';
  }
  const position = calcColumn();
  if (row === 0) {
    return position === 'center' ? 'top' : `top-${position}`;
  }
  if (row === boardSize - 1) {
    return position === 'center' ? 'bottom' : `bottom-${position}`;
  }
  return position;
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }

  if (health < 50) {
    return 'normal';
  }

  return 'high';
}
