<template>
  <div class="home">
    <div class="btn-create">
      <router-link to="/create">
        <el-button icon="el-icon-plus" type="primary"
          >Create Employee</el-button
        >
      </router-link>
    </div>
    <EmployeeList />
  </div>
</template>

<script>
import EmployeeList from "@/components/EmployeeList.vue";
export default {
  name: "Home",
  components: { EmployeeList },
};
</script>

<style scoped>
.btn-create {
  display: flex;
  justify-content: flex-end;
}
</style>
