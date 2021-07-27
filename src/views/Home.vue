<template>
  <div class="home">
    <!-- <p>Hello {{ this.getUser}}</p>
    <button class="logout" @click.prevent="logout">Logout</button> -->
    <sidenav item="home" />
    <div class="main">
      <div class="header row">
        <div class="col-lg-10 col-md-9 breadscrum">
          <p>Home</p>
        </div>
        <div class="col-lg-2 col-md-3 userarea text-center">
          <p class="username">{{ this.getUser }}</p>
          <button class="logout" @click.prevent="logout">Logout</button>
        </div>
      </div>
      <div class="row">
        <div class="col studentrecord">
          <div class="row">
            <div class="col-10">
              <h4 class="headingstudent">Student Details</h4>
            </div>
            <div class="col-2 btnallign">
              <button class="addbtn" @click="add">+Add Student</button>
            </div>
          </div>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">City</th>
                <th scope="col">State</th>
                <th scope="col">Country</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="res in results" :key="res.id">
                <th scope="row">{{ res.id }}</th>
                <td>{{ res.name }}</td>
                <td>{{ res.City }}</td>
                <td>{{ res.State }}</td>
                <td>{{ res.Country }}</td>
              </tr>
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import sidenav from "@/components/sidenav.vue";
import axios from "axios";

export default {
  data: function () {
    return {
      results: "",
    };
  },
  components: { sidenav },
  computed: {
    ...mapGetters(["getUser","getToken"]),
  },
  methods: {
    ...mapMutations(["logoutUser"]),
    logout() {
      this.logoutUser();
      localStorage.clear();
      this.$router.push({
        name: "Login",
        path: "/",
      });
    },
    add(){
      this.$router.push({
        name: "CreateStudent",
        path: "/Create",
      });
    }
  },
  mounted: async function() {
    
  await axios
      .get("http://127.0.0.1:8000/student/", {
        headers: {
          Authorization: "Token " + this.getToken, //the token is a variable which holds the token
        },
      })
      .then((res) => {
        //console.log(res.data)
        this.results = res.data;
      });
  },
};
</script>

<style >
.home {
  display: inline;
}
.main {
  margin-left: 300px;
}
.header {
  display: flex;
  padding: 15px 0px 10px 0px;
}
.breadscrum p {
  padding-left: 12px;
  color: black;
  font-family: sans-serif;
  font-size: 29px;
}
.logout {
  width: 106px;
  height: 37px;
  border-radius: 0px;
  background-color: white;
  border-color: #e1f5fe;
  font-size: 15px;
}
.userarea {
  display: flex;
  padding-right: 28px;
}
.username {
  font-size: 18px;
  padding-right: 9px;
  padding-top: 3px;
}
.table {
  background-color: white;
  border-right: 2px solid #dee2e6;
  /* padding-left: 14px; */
  margin-left: 13px;
  border-left: 2px solid #dee2e6;
  border-bottom: 2px solid #dee2e6;
}
.studentrecord {
  padding-right: 38px;
}
.headingstudent {
  margin-left: 13px;
}
.addbtn {
  width: 106px;
  height: 37px;
  border-radius: 0px;
  background-color: #0277bd;
  color: white;
  font-size: 15px;
}

.btnallign {
  text-align: end;
  padding-right: 0px;
  padding-bottom: 5px;
}

@media only screen and (max-width: 1200px) {
  .userarea {
    transform: translateX(-43px);
    padding-right: 0px;
  }
}
</style>
