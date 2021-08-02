<template>
  <section>
    <p class="pagination-container">
      <img src="@/assets/leftarrow.png" class="arrowIcon" @click="ChangePage(-1)">
      <span class="inner-pagination-content">
        
        Showing Page {{ this.page }} of {{ this.pages }}
        
      </span>
      <img src="@/assets/leftarrow.png" class="arrowIconRight" @click="ChangePage(1)">
    </p>
  </section>
</template>

<script>
export default {
  props: ["totalRecords", "perPageOptions"],
  data: function () {
    return {
      page: 1,
      perPage: this.perPageOptions[0],
    };
  },
  computed: {
    pages() {
      const remainder = this.totalRecords % this.perPage;

      if (remainder > 0) {
        return Math.floor(this.totalRecords / this.perPage) + 1;
      } else {
        return this.totalRecords / this.perPage;
      }
    },
  },
  methods: {
    ChangePage(val) {
      switch (val) {
        case 0:
          this.page = 1;
          break;
        case -1:
          this.page = this.page > 1 ? this.page - 1 : this.page;
          break;
        case 1:
          this.page = this.page < this.pages ? this.page + 1 : this.page;
          break;
        case this.pages:
          this.page = this.pages;
          break;
      }
      this.$emit('input', { page: this.page , perPage: this.perPage })
    },
  },
};
</script>

<style>
.arrowIcon{
    height: 15px;
    cursor: pointer;
}
.arrowIconRight{
    transform: rotate(180deg);
    height: 15px;
    cursor: pointer;
}
</style>