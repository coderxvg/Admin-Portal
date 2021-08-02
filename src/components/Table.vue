<template>
  <div>
    <div class="searchArea" v-show="showSearchBar">
      <input
        type="text"
        placeholder="Search"
        class="serachInput"
        v-model="Search"
        @keyup="searchData"
      />
      <button class="searchButton" @click="searchData" >
        <i class="fas fa-search"></i>
      </button>
    </div>
    <table class="table">
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
      <tbody>
        <tr v-for="res in computedData" :key="res.id">
          <td scope="row" v-for="obj in res" :key="obj.id">{{ obj }}</td>
        </tr>
      </tbody>
    </table>
    <div class="row pageLabel">
      <div class="col">
        <img
          src="@/assets/leftarrow.png"
          alt=""
          class="iconleft"
          @click.prevent="changePage(-1)"
        />
        Showing Page {{ page }} of {{ currentPages }}
        <img
          src="@/assets/leftarrow.png"
          alt=""
          class="iconright"
          @click.prevent="changePage(1)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      rowData: "",
      rowArray: [],
      headerName: "",
      Search: "",
      filterArray: [],
      filtredRow: false,
      perPage: 7,
      page: 1,
    };
  },
  name: "BaseTable",
  props: {
    tableHeader: {
      type: Array,
      default: () => [],
    },
    tableData: {
      type: Array,
      default: () => [],
    },
    showSearchBar: {
      type: Boolean,
      default: () => false,
    },
  },
  methods: {
    sortData(e) {
      var headerName = e;
      if (headerName) {
        this.sortData(headerName);
      }
    },
    sortData(key) {
      function compareValues(key, order = "asc") {
        return function innerSort(a, b) {
          if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
            return 0;
          }

          const varA =
            typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
          const varB =
            typeof b[key] === "string" ? b[key].toUpperCase() : b[key];

          let comparison = 0;
          if (varA > varB) {
            comparison = 1;
          } else if (varA < varB) {
            comparison = -1;
          }
          return order === "desc" ? comparison * -1 : comparison;
        };
      }
      // console.log(this.tableData);
      this.tableData.sort(compareValues(key, "asc"));
      this.filterArray.sort(compareValues(key, "asc"));
    },

    searchData() {
      this.filtredRow = true;
      this.filterArray = this.fiterData();
    },
    fiterData() {
      return this.tableData.filter((d) =>
        this.Search.split(" ").every((v) =>
          d.name.toLowerCase().includes(v.toLowerCase())
        )
      );
    },
    changePage(val) {
      switch (val) {
        case -1:
          this.page = this.page > 1 ? this.page - 1 : this.page;
          break;
        case 1:
          this.page = this.page < this.pages ? this.page + 1 : this.page;
          break;
      }
    },
  },
  computed: {
    computedData() {
      const firstIndex = (this.page - 1) * this.perPage
      const lastIndex = this.page * this.perPage;

      if (this.filterArray.length == 0) {
        return this.tableData.slice(firstIndex, lastIndex);
      } else {
        return this.filterArray.slice(firstIndex, lastIndex);
      }
    },
    pages() {
      const remainder = this.tableData.length % this.perPage;
      if (remainder > 0) {
        return Math.floor(this.tableData.length / this.perPage) + 1;
      } else {
        return this.tableData.length / this.perPage;
      }
    },
    currentPages(){
      if (this.filterArray.length == 0){
        return this.pages
      }else{
        const remainder = this.filterArray.length % this.perPage;
      if (remainder > 0) {
        return Math.floor(this.filterArray.length / this.perPage) + 1;
      } else {
        return this.filterArray.length / this.perPage;
      }
      }
      
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
.serachInput[type="text"]:focus {
  outline: 2px solid #0277bd;
}
.pageLabel {
  margin-left: 2px;
}
.iconleft {
  height: 15px;
  padding-left: 0;
  padding-right: 3px;
  transform: translateY(-2px);
  cursor: pointer;
}
.iconright {
  height: 15px;
  padding-left: 0;
  padding-right: 3px;
  transform: translateY(-2px);
  transform: rotate(180deg);
  cursor: pointer;
}
</style>