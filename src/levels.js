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
    name: "Start",
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
  },
  {
    id: 2,
    name: "Staircase",
    minMoves: 29,
    creator: "default",
    tiles: generateLevel([
          "W","W","W","W","W","W","W","W","W",
          "W","W","W","W","W","W","W","W","W",
          "W","W","_","_","_","W","W","W","W",
          "W","W","P","B","B","_","W","W","W",
          "W","W","W","_","_","_","W","W","W",
          "W","W","W","W","_","H","W","W","W",
          "W","W","W","W","W","H","W","W","W",
          "W","W","W","W","W","F","W","W","W",
          "W","W","W","W","W","W","W","W","W"])
  },
  {
    id: 3,
    name: "Switch Sides",
    minMoves: 50,
    creator: "default",
    tiles: generateLevel([
          "W","W","W","W","W","W","W","W","W",
          "W","W","W","W","W","W","W","W","W",
          "W","_","_","W","W","W","W","W","W",
          "W","_","_","B","_","W","W","F","W",
          "W","_","_","B","P","W","W","_","W",
          "W","_","_","B","_","H","H","H","W",
          "W","W","W","W","W","W","W","W","W",
          "W","W","W","W","W","W","W","W","W",
          "W","W","W","W","W","W","W","W","W"])
  },
  {
    id: 4,
    name: "Double Push",
    minMoves: 35,
    creator: "default",
    tiles: generateLevel([
          "W","W","W","W","W","W","W","W","W",
          "W","_","_","_","_","_","W","W","W",
          "W","_","_","_","W","P","_","W","W",
          "W","W","_","_","_","B","_","W","W",
          "W","W","_","_","W","B","W","W","W",
          "W","W","W","W","W","H","W","W","W",
          "W","W","W","W","W","H","W","W","W",
          "W","W","W","W","W","F","W","W","W",
          "W","W","W","W","W","W","W","W","W"])
  },
  {
    id: 5,
    name: "Triple Feat",
    minMoves: 92,
    creator: "default",
    tiles: generateLevel([
          "W","W","W","W","W","W","W","W","W",
          "W","W","W","W","W","W","W","W","W",
          "W","_","_","_","_","W","_","_","W",
          "W","_","B","B","_","P","_","_","W",
          "W","_","B","_","W","_","_","_","W",
          "W","_","_","_","W","H","W","_","W",
          "W","W","W","W","H","H","_","_","W",
          "W","W","W","W","F","W","W","W","W",
          "W","W","W","W","W","W","W","W","W"])
  },
  {
    id: 6,
    name: "Blocked In",
    minMoves: 55,
    creator: "default",
    tiles: generateLevel([
          "W","W","W","W","W","W","W","W","W",
          "W","P","_","_","H","H","_","F","W",
          "W","_","B","B","W","W","W","W","W",
          "W","W","W","_","W","W","W","W","W",
          "W","_","_","_","W","W","W","W","W",
          "W","_","W","_","_","_","W","W","W",
          "W","_","_","_","W","_","W","W","W",
          "W","W","W","_","_","_","W","W","W",
          "W","W","W","W","W","W","W","W","W"])
  }
]

export default levels;
