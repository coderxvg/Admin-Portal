<template>
<div>

  <table class="table">
            <thead>
              <tr>
                <th scope="col" v-for="header in tableHeader" :key="header.id">{{ header.name }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="res in tableData" :key="res.id" >
                <td scope="row" v-for="obj in res" :key="obj.id">{{ obj}}</td>
              </tr>
              
            </tbody>
          </table>
</div>
</template>

<script>
export default {
data:function(){
  return{
    rowData:"",
    rowArray:[]
  }
},  
name:'BaseTable',
props:["tableHeader","tableData"],



}
</script>

<style>

</style>