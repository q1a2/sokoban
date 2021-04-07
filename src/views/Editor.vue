<template>
  <div class="editor">
    <form>
      <p>Title: <input v-model="$root.$data.currentLevel.name"/></p>
    </form>
    <div class="tileTypes">
      <a href="#" class="tileType" v-for="type in tileTypes" :key="type">
        <img v-if="type === currentType" class="currentTile" :src="'../images/tiles/'+type+'.png'" @click="switchType(type)"/>
        <img v-else :src="'../images/tiles/'+type+'.png'" @click="switchType(type)"/>
      </a>
    </div>
    <div class="map">
      <a href="#" class="mapTile" v-for="tile in $root.$data.currentLevel.tiles" :key="tile.id">
        <img :src="'../images/tiles/'+tile.type+'.png'" @click="edit(tile)"/>
      </a>
    </div>
    <p style="color:#df2020" v-if="$root.$data.currentUser == null">Make sure to log in to save your levels!</p>
    <button @click="save()" v-else>Save</button>
    <p>{{error}}</p>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Editor',
  props: {
    tileTypes: Array,
    currentType: String,
    error: String
  },
  methods: {
    edit(tile) {
      if(tile.type === "P" || tile.type === "F") return;
      if(this.currentType === "P") {
        for(let i = 0; i < this.$root.$data.currentLevel.tiles.length; i++) {
          if(this.$root.$data.currentLevel.tiles[i].type === "P") {
            this.$root.$data.currentLevel.tiles[i].type = "_";
          }
        }
      }
      if(this.currentType === "F") {
        for(let i = 0; i < this.$root.$data.currentLevel.tiles.length; i++) {
          if(this.$root.$data.currentLevel.tiles[i].type === "F") {
            this.$root.$data.currentLevel.tiles[i].type = "_";
          }
        }
      }
      tile.type = this.currentType;
    },
    async save() {
      if(this.$root.$data.currentLevel.name === "") {
        this.error = "Please Choose a Level Title First.";
        return;
      }
      for(let i = 0; i < this.$root.$data.levelList.length; i++) {
        if(this.$root.$data.currentLevel.name === this.$root.$data.levelList[i].name) {
          this.error = "That level name is already taken. Sorry.";
          return;
        }
      }

      this.$root.$data.levelList.push(this.$root.$data.currentLevel);
      console.log(this.$root.$data.currentLevel);
      await axios.post("/api/newLevel",{
        id: this.$root.$data.currentLevel.id,
        name: this.$root.$data.currentLevel.name,
        minMoves: this.$root.$data.currentLevel.minMoves,
        creator: this.$root.$data.currentLevel.creator,
        tiles: this.$root.$data.currentLevel.tiles
      });
      this.reset();
      this.error = "Level saved successfully.";

    },
    switchType(newType) {
      this.currentType = newType;
    },
    reset() {
      this.tileTypes = ["_","P","F","W","B","H"];
      this.currentType = "_";
      this.error = "";

      let tiles = [
        "_","_","_","_","_","_","_","_","_",
        "_","_","_","_","_","_","_","_","_",
        "_","_","W","W","W","W","W","_","_",
        "_","_","W","P","_","_","W","_","_",
        "_","_","W","_","_","_","W","_","_",
        "_","_","W","_","_","F","W","_","_",
        "_","_","W","W","W","W","W","_","_",
        "_","_","_","_","_","_","_","_","_",
        "_","_","_","_","_","_","_","_","_"];
      let idMap = [];
      for(let i = 0; i < tiles.length; i++) {
        idMap.push({type: tiles[i], id: i});
      }
      let id = this.$root.$data.levelList[this.$root.$data.levelList.length - 1].id + 1;

      this.$root.$data.currentLevel = { id: id, name: "", minMoves: 1000, creator: "", tiles: idMap };
      if(this.$root.$data.currentUser != null) {
        this.$root.$data.currentLevel.creator = this.$root.$data.currentUser.username;
      }
    }
  },
  created: function() {
    this.reset();
  }
}
</script>

<style scoped>
.map, .tileTypes{
  width: 342px;
  display: flex;
  flex-wrap: wrap;
  margin: 10px auto;
  border: 2px solid black;
}

.tileType {
  margin: 0;
  padding: 0;
  width: 57px;
  height: 57px;
  border: none;
}

.tileType img {
  width: 57px;
  height: 57px;
}

.tileType .currentTile {
  width: 55px;
  height: 55px;
  border: 1px dashed black;
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
