<template>
<div class="text">
  <p>This page isn't really part of this project, so please do not grade it.
    It is just here to help you understand how this website works.</p>
  <p>Sokoban (at least my rendition of it) is a game where the goal is to get your character to the end.</p>
  <h3>How to use this Website</h3>
  <p>To play, go to "Levels" and click "Play" under any level. Click on any adjacent tile to your character to move.
    The goal is to reach the checkered zone by pushing blocks around to fill holes.</p>
  <p>As well, in the editor, you may select a type of block you want and click where you would like to have that type of block.
    You are restricted to only having one player and end goal. When finished, click "Save", and your level will then show up
    in the "Levels" page.</p>
  <h3>Do I Follow the Rubric?</h3>
  <ul>
    <li>My "mock data" is a set of pre-made levels borrowed mostly from the famous set of puzzles known as "Microbans."
      It contains level ids, level maps, minimum number of moves and a level map. This data is at least as advanced as
      the data used in the grocery store lab.</li>
    <li>Players are able to read data (loading levels), write data (save levels), and edit data (playing levels/making levels).</li>
    <li>The game engine was written in vue using lots of "v-for"s and click handlers.</li>
    <li>There are two pages.</li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'Instructions'
}
</script>

<style scoped>
.text {
  margin: 15px;
}
</style>
