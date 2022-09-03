export const createTable = (): Array<Array<string>> => {
  const letters = "abcdefgh";
  const positions = [];

  for (var i = 0; i < letters.length; i++) {
    const row = [];
    for (var j = 0; j < 8; j++) {
      row.push(`${letters[i]}${j + 1}`);
    }
    positions.push(row);
  }
  return positions;
};
