<template>
  <div class="loginarea">
    <form action="" class="formarea" @submit.prevent="login">
      <div class="row form-group">
        <div class="col formtitle">
          <h2 class="login">Login</h2>
        </div>
      </div>

      <div class="row form-group">
        <input
          v-model="username"
          class="form-control"
          type="text"
          placeholder="username"
        />
      </div>

      <div class="row form-group">
        <input
          v-model="password"
          class="form-control"
          type="password"
          placeholder="password"
        />
      </div>
      <div class="row form-group">
        <div class="col submitbtn">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  data: () => {
    return {
      username: "",
      password: "",
      token: "",

    };
  },
  methods: {
    ...mapMutations(["setUser", "setToken"]),
    async login() {
      await axios
        .post("http://127.0.0.1:8000/api-token-auth/", {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          //console.log(res.data.token)
          this.token = res.data.token
          this.setUser(this.username)
          this.setToken(this.token)
          this.$router.push({
            name: "Home",
            path: "/Home",
          });
          console.log("Logedin");
        })
        .catch((error) => {
          this.error = true
          this.errormessage = "Invalid credentials"
        });
    },
  },
};
</script>

<style>
.loginarea {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -72%);
  width: 465px;
  background-color: #0277bd;
  height: 287px;
  padding-top: 39px;
  padding-right: 499px;
  padding-left: 17px;
  color: white;
}

.formtitle {
  padding-left: 0px;
  text-align: center;
}

.submitbtn {
  text-align: end;
  padding-right: 0px;
}
.form-control {
  border-radius: 0px;
}
.btn {
  width: 176px;
  height: 37px;
  border-radius: 0px;
  background-color: #E1f5fe;
  color: black;
}
.btn:hover{
  background-color: #b3e5fc;
  color: black;
}

.login {
  margin-bottom: 0px;
}
.formarea {
  width: 400px;
  margin-left: 40px;
}
.errmsg{
  padding: 0px;
  color: red;
  margin: 0;
}

</style>
