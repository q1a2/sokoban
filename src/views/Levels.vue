<template>
  <div class="screen">
    <Game v-if="playing"/>
    <hr v-if="playing"/>
    <div class="levels">
      <div class="level" v-for="level in defaultLevels" :key="level.id">
        <h3 class="levelName">{{level.name}}</h3>
        <div class="map">
          <img class="mapTile" v-for="tile in level.tiles" :key="tile.id" :src="'../images/tiles/'+tile.type+'.png'"/>
        </div>
        <div class="buttons">
          <button class="button" @click="startGame(level)">
            <p>Play</p>
          </button>
        </div>
      </div>
      <div class="level" v-for="level in userLevels" :key="level.id">
        <h3 class="levelName">{{level.name}}</h3>
        <div class="map">
          <img class="mapTile" v-for="tile in level.tiles" :key="tile.id" :src="'../images/tiles/'+tile.type+'.png'"/>
        </div>
        <div class="buttons">
          <button class="button" @click="startGame(level)">
            <p>Play</p>
          </button>
          <button class="button" @click="remove(level)">
            <p>Delete</p>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Game from "../components/Game.vue"
export default {
  name: 'Levels',
  props: {
    playing: Boolean
  },
  components: {
    Game
  },
  computed: {
    defaultLevels() {
      return this.$root.$data.levelList.filter(level => level.creator === "default");
    },
    userLevels() {
      return this.$root.$data.levelList.filter(level => level.creator === "user");
    }
  },
  methods: {
    startGame(level) {
      this.$root.$data.currentLevel = level;
      this.$root.$data.currentState = JSON.parse(JSON.stringify(level.tiles));
      this.playing = true;
    },
    remove(level) {
      level.creator = "none";
      level.name = "";
    }
  },
  created: function() {
    this.playing = false;
  }
}
</script>

<style scoped>
.screen {
  box-sizing: border-box;
}

.levels {
  display: flex;
  margin: 10px auto;
  justify-content: center;
}

.level {
  width: 135px;
  margin: 20px;
}

.levelName {
  width: 135px;
  color: #303030;
  background-color: #c3c3c3;
  border: 1px solid #7f7f7f;
  text-align: center;
  margin: 0;
}

.map {
  width: 135px;
  display: flex;
  flex-wrap: wrap;
  border: 1px solid black;
}
.mapTile {
  margin: 0;
  padding: 0;
  width: 15px;
  height: 15px;
}

.buttons {
  display: flex;
  width: 135px;
  border: 1px solid #c3c3c3;
}

.button {
  flex: 1;
  border-radius: 0;
  background-color: #c3c3c3;
}

</style>
