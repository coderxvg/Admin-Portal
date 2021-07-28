<template>
  <div class="createarea">
    <sidenav item="create" />
    <div class="createmain">
      <div class="header row">
        <div class="col-lg-10 col-md-9 breadscrum">
          <p>Create Student</p>
        </div>
        <div class="col-lg-2 col-md-3 userarea text-center">
          <p class="username">{{ this.getUser }}</p>
          <button class="logout" @click.prevent="logout">Logout</button>
        </div>
      </div>
      <div class="row">
        <div class="col-8 studentform">
          <h4 class="subheadingtitle">Details</h4>
          <form @submit.prevent="submitDetails">
            <div class="row">
              <div class="col-6">
                <div class="form-group">
                  <label for="exampleInputEmail1">Name</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Name"
                    v-model="name"
                  />
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label for="exampleInputEmail1">City</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter City"
                    v-model="city"
                  />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <div class="form-group">
                  <label for="exampleInputEmail1">State</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter State"
                    v-model="state"
                  />
                </div>
              </div>
              <div class="col-6">
                <div class="form-group">
                  <label for="exampleInputEmail1">Country</label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter Country"
                    v-model="country"
                  />
                </div>
              </div>
            </div>
            <button type="submit" class="btn btn-primary studentsubmit">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div class="row">
        <div class="col studentrecord">
          <h4 class="submitetdtitle">Submited Details</h4>
          <BaseTable :tableHeader=this.ColumnName :tableData=this.postData />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sidenav from "@/components/sidenav.vue";
import { mapGetters } from "vuex";
import { mapMutations } from "vuex";
import axios from 'axios';
import BaseTable from "@/components/Table.vue"

export default {
  data:function(){
       return{
         name:"",
         city:"",
         state:"",
         country:"",
         postData:[],
         ColumnName:[
        {id:1,name:'ID'},
        {id:2,name:'Name'},
        {id:3,name:'City'},
        {id:4,name:'State'},
        {id:5,name:'Country'}
      ]
       }
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
    submitDetails(){
      var data = {
        name: this.name,
        City:this.city,
        State:this.state,
        Country:this.country
      }
       axios
       .post("http://127.0.0.1:8000/student/",data,{
         headers: {
          Authorization: "Token " + this.getToken, //the token is a variable which holds the token
        },
       }).then((res)=>{
        this.postData.push(res.data)
        console.log(this.postData )
       })
       this.name = ""
        this.city = ""
        this.state = ""
        this.country = ""
    }
  },
  computed: {
    ...mapGetters(["getUser","getToken"]),
  },
  components: { sidenav,BaseTable },
};
</script>

<style>
.createarea {
  display: inline;
}
.createmain {
  margin-left: 308px;
}
.studentform {
  margin-left: 15px;
}
.subheadingtitle {
  font-size: 19px;
}
.studentsubmit {
  width: 106px;
  height: 37px;
  border-radius: 0px;
  background-color: #0277bd;
  color: white;
  font-size: 15px;
  margin-bottom: 20px;
}
.submitetdtitle{
   font-size: 19px;
   margin-left: 14px;
}
</style>