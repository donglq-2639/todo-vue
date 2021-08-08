<template>
  <div class="create">
    <h1>Create Employee</h1>
    <EmployeeFrom :disabled="true" type="create" :employeeForm="employeeForm" />
  </div>
</template>
<script>
import EmployeeFrom from "../components/EmployeeForm.vue";
export default {
  data() {
    return {
      employeeForm: {
        name: "",
        company: "",
        startDate: "",
        branch: "",
        active: true,
        preferences: [],
        gender: "",
        remark: "",
      },
    };
  },
  components: {
    EmployeeFrom,
  },
};
</script>

<style>
.create {
  width: 50%;
  max-width: 100%;
  margin: 5rem auto;
}
</style>
