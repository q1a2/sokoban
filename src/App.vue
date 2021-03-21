<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Instructions</router-link> |
      <router-link to="/levels">Levels</router-link> |
      <router-link to="/editor">Editor</router-link>
    </div>
    <hr/>
    <router-view class="mainPage"/>
    <div class="footer">
      <p class="github-link"><a href="https://github.com/q1a2/sokoban">Github Link</a></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c2c2c;
  background-color: #7f7f7f;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c2c2c;
}

#nav a.router-link-exact-active {
  color: #525252;
}

.mainPage {
  min-height: 415px;
  margin: 15px;
}

.footer {
  margin-top: 15px;
  height: 200px;
  background-color: #c0c0c0;
}

.github-link {
  height: 0px;
  font-size: 18px;
  padding-top: 93px;
  align-self: center;
  text-align: center;
}
</style>
