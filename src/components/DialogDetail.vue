<template>
  <el-dialog title="Update Employee" :visible.sync="dialogFormVisible">
    <EmployeeForm :employeeForm="employeeData" />
  </el-dialog>
</template>

<script>
import EmployeeForm from "./EmployeeForm.vue";
export default {
  data() {
    return {
      dialogFormVisible: false,
      employeeData: {},
    };
  },
  components: { EmployeeForm },
  created() {
    this.$eventBus.$on("dataForDialog", (data, employeeData) => {
      this.dialogFormVisible = data;
      this.employeeData = {
        ...employeeData,
        preferences:
          typeof employeeData.preferences === "string"
            ? employeeData.preferences.split(", ")
            : employeeData.preferences,
      };
    });
  },
  destroyed() {
    this.$eventBus.$off("dataForDialog", (data, employeeData) => {
      this.dialogFormVisible = data;
      this.employeeData = employeeData;
    });
  },
};
</script>

<style></style>
