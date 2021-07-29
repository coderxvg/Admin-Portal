<template>
  <div>
    <div class="searchArea" v-show="showSearchBar">
      <input type="text" placeholder="Search" class="serachInput" v-model="Search" />
      <button class="searchButton" @click="searchData">
        <i class="fas fa-search"></i>
      </button>
    </div>
    <table class="table" v-show="!filtredRow">
      <thead>
        <tr>
          <th
            scope="col"
            v-for="header in tableHeader"
            :key="header.id"
            @click="sortData($event.target.innerText)"
          >
            {{ header.name }}
          </th>
        </tr>
      </thead>
      <tbody >

        <tr v-for="res in tableData" :key="res.id">
          <td scope="row" v-for="obj in res" :key="obj.id">{{ obj }}</td>
        </tr>
      </tbody>
    </table>
    <table class="table" v-show="filtredRow">
      <thead>
        <tr>
          <th
            scope="col"
            v-for="header in tableHeader"
            :key="header.id"
            @click="sortData($event.target.innerText)"
          >
            {{ header.name }}
          </th>
        </tr>
      </thead>
      <tbody >

        <tr v-for="res in filterArray" :key="res.id">
          <td scope="row" v-for="obj in res" :key="obj.id">{{ obj }}</td>
        </tr>
      </tbody>
    </table>

  </div>
</template>

<script>
export default {
  data: function () {
    return {
      rowData: "",
      rowArray: [],
      headerName: "",
      Search:"",
      filterArray:[],
      filtredRow:false
    };
  },
  name: "BaseTable",
  props: {
    tableHeader: {
      type: Array,
      default:() =>[]
    },
    tableData: {
      type: Array,
      default:() =>[]
    },
    showSearchBar:{
      type:Boolean,
      default:() => false
    }
  },
  methods: {
    sortData(e) {
      var headerName = e;
      if (headerName === "ID") {
        this.sortByID();
      }
      if (headerName === "Name") {
        this.sortByName();
      }
      if (headerName === "City") {
        this.sortByCity();
      }
      if (headerName === "State") {
        this.sortByState();
      }
      if (headerName === "Country") {
        this.sortByCountry();
      }
    },
    sortByName() {
      function compare(a, b) {
        if (a.name.toUpperCase() < b.name.toUpperCase()) return -1;
        if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
        return 0;
      }
      this.tableData.sort(compare);
      this.filterArray.sort(compare);
      // console.log(this.tableData);
    },
    sortByID() {
      function compare(a, b) {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
      }
      this.tableData.sort(compare);
      this.filterArray.sort(compare);
      // console.log(this.tableData);
    },
    sortByCity() {
      function compare(a, b) {
        if (a.City.toUpperCase() < b.City.toUpperCase()) return -1;
        if (a.City.toUpperCase() > b.City.toUpperCase()) return 1;
        return 0;
      }
      this.tableData.sort(compare);
      this.filterArray.sort(compare);
      // console.log(this.tableData);
    },
    sortByState() {
      function compare(a, b) {
        if (a.State.toUpperCase() < b.State.toUpperCase()) return -1;
        if (a.State.toUpperCase() > b.State.toUpperCase()) return 1;
        return 0;
      }
      this.tableData.sort(compare);
      this.filterArray.sort(compare);
      // console.log(this.tableData);
    },
    sortByCountry() {
      function compare(a, b) {
        if (a.Country.toUpperCase() < b.Country.toUpperCase()) return -1;
        if (a.Country.toUpperCase() > b.Country.toUpperCase()) return 1;
        return 0;
      }
      this.tableData.sort(compare);
      this.filterArray.sort(compare);
      // console.log(this.tableData);
    },
    searchData(){
      this.filtredRow =true
      this.filterArray =  this.fiterData();   
    },
    fiterData(){
      return this.tableData.filter(d => this.Search.split(' ').every(v => d.name.toLowerCase().includes(v.toLowerCase())))
    }
  },
};
</script>

<style>
th {
  cursor: pointer;
}
.searchArea {
  display: flex;
  float: right;
  padding-bottom: 6px;
}
.searchButton {
  width: 50px;
  background-color: #0277bd;
  color: white;
  box-shadow: 0px 1px 0px 0px #d4d4d4;
}
.serachInput {
  padding: 0.33em 0.75em;
  font-size: 1rem;
  font-weight: 400;
}
.serachInput[type=text]:focus{
   outline: 2px solid #0277bd;
}
</style>