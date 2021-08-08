<template>
  <div>
    <el-pagination
      style="margin-top: 10px"
      align="right"
      background
      layout="prev, pager, next"
      :page-size="10"
      :total="employeeCount"
      @current-change="handleChangePage"
      :current-page="getCurrentPage"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
export default {
  computed: {
    ...mapGetters(["getTotalCount", "getPage", "getSearchValue"]),
    employeeCount() {
      return this.getTotalCount;
    },
    getCurrentPage() {
      return this.getPage;
    },
    getSearchData() {
      return this.getSearchValue;
    },
  },
  methods: {
    ...mapActions(["getAllEmployees"]),
    ...mapMutations(["setPage"]),
    handleChangePage(val) {
      this.setPage(val);
      this.getAllEmployees({ page: val, search: this.getSearchData });
    },
  },
};
</script>
