<template>
  <div class="game">
    <div class="Info">
      <h1>{{this.$root.$data.currentLevel.name}}</h1>
      <h3>Minimum Moves: {{this.$root.$data.currentLevel.minMoves}}</h3>
      <h3>Moves: {{this.moves}}</h3>
    </div>
    <div class="victoryMessage" v-if="victory">
      <h1>You Win!</h1>
    </div>
    <div class="map" v-else>
      <a href="#" class="mapTile" v-for="tile in tiles" :key="tile.id">
        <img :src="'../images/tiles/'+tile.type+'.png'" @click="tileClick(tile)"/>
      </a>
    </div>
    <button @click="reset()">Reset</button>
  </div>
</template>


<script>
export default {
  name: 'Game',
  props: {
    moves: Number
  },
  computed: {
    tiles() {
      return this.$root.$data.currentState;
    },
    playerPosition() {
      return this.$root.$data.currentState.filter(tile => tile.type === "P")[0].id;
    },
    victory() {
      return this.$root.$data.currentState.filter(tile => tile.type === "F").length === 0;
    }
  },
  methods: {
      tileClick(tile) {
        if(tile.type === "W" || tile.type === "H") return;

        let overID = -1;
        if(tile.id == this.playerPosition - 9) overID = tile.id-9;
        else if(tile.id == this.playerPosition - 1) overID = tile.id-1;
        else if(tile.id == this.playerPosition + 1) overID = tile.id+1;
        else if(tile.id == this.playerPosition + 9) overID = tile.id+9;
        else return;

        if(tile.type === "_" || tile.type === "F") {
          this.moves++;
          if (tile.type === "F" && this.moves < this.$root.$data.currentLevel.minMoves) {
            this.$root.$data.currentLevel.minMoves = this.moves;
          }
          this.$root.$data.currentState[this.playerPosition].type = "_";
          tile.type = "P";
        }

        else if(tile.type === "B") {
          if(this.$root.$data.currentState[overID].type === "W" || this.$root.$data.currentState[overID].type === "F" || this.$root.$data.currentState[overID].type === "B") {
            return;
          }
          else if(this.$root.$data.currentState[overID].type === "H") {
            this.$root.$data.currentState[this.playerPosition].type = "_";
            tile.type = "P";
            this.$root.$data.currentState[overID].type = "_";
            this.moves++;
          }
          else if(this.$root.$data.currentState[overID].type === "_") {
            this.$root.$data.currentState[this.playerPosition].type = "_";
            tile.type = "P";
            this.$root.$data.currentState[overID].type = "B";
            this.moves++;
          }
        }
      },
      reset() {
        this.moves = 0;
        this.$root.$data.currentState = JSON.parse(JSON.stringify(this.$root.$data.currentLevel.tiles));
      }
  },
  created: function() {
    this.moves = 0;
  }
}
</script>

<style scoped>
.map {
  width: 342px;
  display: flex;
  flex-wrap: wrap;
  margin: 10px auto;
  border: 2px solid black;
}

.mapTile {
  margin: 0;
  padding: 0;
  width: 38px;
  height: 38px;
  border: none;
}
.mapTile:hover {
  width: 36px;
  height: 36px;
  margin: 1px;
}

.mapTile img {
  width: 38px;
  height: 38px
}
</style>
