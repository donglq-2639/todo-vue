<template>
  <el-form
    :rules="validateForm"
    ref="employeeForm"
    :model="employeeForm"
    label-width="120px"
  >
    <div class="wrap-name">
      <el-form-item label="Name:" prop="name">
        <el-col :span="23" style="margin-left: 0">
          <el-input v-model="employeeForm.name"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="Company:" prop="company">
        <el-col :span="21">
          <el-select
            v-model="employeeForm.company"
            placeholder="Please select Company"
            style="width: 100%"
          >
            <el-option
              label="Sun Asterisk"
              value="Sun Asterisk"
            ></el-option> </el-select
        ></el-col>
      </el-form-item>
    </div>
    <div class="wrap-name">
      <el-form-item label="Start Date" prop="startDate">
        <el-col :span="23">
          <el-date-picker
            type="date"
            placeholder="Pick a date"
            v-model="employeeForm.startDate"
            style="width: 100%"
            format="yyyy/MM/dd"
            value-format="yyyy/MM/dd"
          ></el-date-picker></el-col
      ></el-form-item>

      <el-form-item label="Branch:" prop="branch">
        <el-col :span="21">
          <el-select
            v-model="employeeForm.branch"
            placeholder="Please select Branch"
            style="width: 100%"
          >
            <el-option
              v-for="item in branchData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option></el-select
        ></el-col>
      </el-form-item>
    </div>

    <div class="group">
      <el-form-item label="Active:">
        <el-col :span="4"
          ><el-switch
            v-model="employeeForm.active"
            :disabled="disabled"
          ></el-switch
        ></el-col>
      </el-form-item>
      <el-form-item label="Gender:" prop="gender">
        <el-radio-group v-model="employeeForm.gender" size="medium">
          <el-radio border label="Male"></el-radio>
          <el-radio border label="Fe-Male"></el-radio>
        </el-radio-group>
      </el-form-item>
    </div>
    <el-form-item label="Preferences:" prop="preferences">
      <el-col :span="14">
        <el-checkbox-group v-model="employeeForm.preferences" class="group">
          <el-checkbox-button
            v-for="item in preferencesData"
            :key="item.value"
            :label="item.label"
            name="preferences"
          >
          </el-checkbox-button>
        </el-checkbox-group>
      </el-col>
    </el-form-item>
    <el-form-item label="Remark">
      <el-col :span="23">
        <el-input type="textarea" v-model="employeeForm.remark"></el-input
      ></el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit('employeeForm')">{{
        type === "create" ? "Create" : "Update"
      }}</el-button>
      <el-button @click="goBack">Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    type: String,
    employeeForm: {},
  },
  data() {
    return {
      branchData: [
        {
          value: "Sun Asterisk Ha Noi",
          label: "Sun Asterisk Ha Noi",
        },
        {
          value: "Sun Asterisk Da Nang",
          label: "Sun Asterisk Da Nang",
        },
        {
          value: "Sun Asterisk Ho Chi Minh",
          label: "Sun Asterisk Ho Chi Minh",
        },
      ],
      preferencesData: [
        { label: "Football" },
        { label: "Tennis" },
        { label: "Volleyball" },
        { label: "Swimming" },
        { label: "Esports" },
        { label: "Drink Beer" },
        { label: "Ping pong" },
      ],
      validateForm: {
        name: [
          {
            required: true,
            message: "Please input Employee Name",
            trigger: "blur",
          },
          {
            min: 3,
            max: 15,
            message: "Length should be 3 to 15",
            trigger: "blur",
          },
        ],
        company: [
          {
            required: true,
            message: "Please select Company",
            trigger: "change",
          },
        ],
        branch: [
          {
            required: true,
            message: "Please select Branch",
            trigger: "change",
          },
        ],
        startDate: [
          {
            required: true,
            message: "Please pick a date",
            trigger: "change",
          },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "Please select at least one activity type",
            trigger: "change",
          },
        ],
        gender: [
          {
            required: true,
            message: "Please select activity gender",
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    ...mapActions(["createEmployee", "editEmployee"]),
    onSubmit(employeeForm) {
      this.$refs[employeeForm].validate((valid) => {
        if (valid) {
          if (this.type === "create") {
            this.createEmployee(this.employeeForm);
            this.$router.push("/");
          } else {
            this.editEmployee(this.employeeForm);
            this.$message({
              type: "success",
              message: "Update Completed",
            });
            this.$eventBus.$emit("dataForDialog", false, this.employeeForm);
          }
          return true;
        }
        return;
      });
    },
    goBack() {
      this.type === "create"
        ? this.$router.push("/")
        : this.$eventBus.$emit("dataForDialog", false, this.employeeForm);
    },
  },
};
</script>
<style>
.group {
  display: flex;
}
.wrap-name {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
</style>
