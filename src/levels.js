function generateLevel(tiles) {
  let idMap = [];
  for(let i = 0; i < tiles.length; i++) {
    idMap.push({type: tiles[i], id: i});
  }
  return idMap;
}

let levels = [
  {
    id: 1,
    name: "Simple",
    minMoves: 6,
    creator: "default",
    tiles: generateLevel([
          "_","_","_","_","_","_","_","_","_",
          "_","_","_","_","_","_","_","_","_",
          "_","_","W","W","W","W","W","_","_",
          "_","_","W","P","_","_","W","_","_",
          "_","_","W","W","W","B","W","_","_",
          "_","_","W","F","_","H","W","_","_",
          "_","_","W","W","W","W","W","_","_",
          "_","_","_","_","_","_","_","_","_",
          "_","_","_","_","_","_","_","_","_"])
  }
]

export default levels;
