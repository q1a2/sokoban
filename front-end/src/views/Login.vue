<template>
<div>
  <div class="login" v-if="$root.$data.currentUser === null">
    <h3>Please Log In</h3>
    <input v-model="name" placeholder="Username">
    <p></p>
    <input v-model="pass" placeholder="Password">
    <p></p>
    <div class="buttons">
      <button @click="login()" href="#">Login</button>
      <button @click="register()" href="#">Register</button>
    </div>
    <p style="color:#ff0000">{{error}}</p>
  </div>
  <div class="logout" v-else>
    <h3>{{$root.$data.currentUser.username}}, welcome to sokoban.com!</h3>
    <p>You have beaten {{$root.$data.currentUser.completedLevels}} levels, {{$root.$data.currentUser.minMoveLevels}} in the minimum number of moves.</p>
    <h4>Change your password:</h4>
    <input v-model="pass" placeholder="Password">
    <p></p>
    <div class="buttons">
      <button @click="updatePass()" href="#">Change</button>
      <button @click="deleteAccount()" href="#">Delete Account</button>
    </div>
    <div class="buttons">
      <button @click="logout()" href="#">Log Out</button>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Login',
  data() {
    return {
      name: '',
      pass: '',
      error: '',
    }
  },
  methods: {
    async login() {
      try {
        let response = await axios.post("/api/login",{
          name: this.name,
          pass: this.pass,
        });
        if(response.data.error == undefined) {
          this.$root.$data.currentUser = response.data;
          this.error = "";
          this.pass = "";

          let levelsMadeByThisUser = await axios.get("/api/levels/" + this.name);
          console.log(levelsMadeByThisUser);
          this.$root.$data.levelList = this.$root.$data.levelList.concat(levelsMadeByThisUser.data);

          return true;
        }
        else {
          this.error = response.data.error;
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async register() {
      try {
        let response = await axios.post("/api/register",{
          name: this.name,
          pass: this.pass,
        });
        if(response.data.error == undefined) {
          this.$root.$data.currentUser = response.data;
          this.error = "";
          this.pass = "";
          return true;
        }
        else {
          this.error = response.data.error;
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async updatePass() {
      try {
        console.log(this.$root.$data.currentUser);
        console.log(this.$root.$data.currentUser.username);
        let response = await axios.put("/api/updatePassword",{
          username: this.$root.$data.currentUser.username,
          password: this.pass
        });
        if(response.data.error == undefined) {
          return true;
        }
        else {
          this.error = response.data.error;
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteAccount() {
      try {
        console.log(this.$root.$data.currentUser.username);
        let response = await axios.delete("/api/deleteUser/" + this.$root.$data.currentUser.username);
        if(response.data.error == undefined) {
          this.$root.$data.currentUser = null;
          return true;
        }
        else {
          this.error = response.data.error;
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async logout() {
      try {
        let response = await axios.delete("/api/currentUser/");
        if(response.data.error == undefined) {
          this.$root.$data.currentUser = null;
          return true;
        }
        else {
          this.error = response.data.error;
          return false;
        }
      } catch (error) {
        console.log(error);
      }
    }
  },
  async created() {
    try {
      let response = await axios.get('/api/currentUser/');
      this.$root.$data.currentUser = response.data.user;
    } catch (error) {
      this.$root.$data.currentUser = null;
    }
  }
}
</script>

<style scoped>
.buttons {
  margin-bottom: 5px;
}
</style>
