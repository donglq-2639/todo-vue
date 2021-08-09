<template>
  <div>
    <el-table
      :data="employees"
      style="width: 100%"
      :row-class-name="tableRowClassName"
      @cell-click="handleCellClick"
    >
      <el-table-column prop="id" label="EmployeeID" sortable> </el-table-column>
      <el-table-column prop="name" label="Name" sortable> </el-table-column>
      <el-table-column prop="company" label="Company" sortable>
      </el-table-column>
      <el-table-column prop="branch" label="Branch" width="300">
        <template slot-scope="scope">
          <el-select
            v-model="scope.row.branch"
            placeholder="Select"
            @change="handleChangeBranch(scope.row)"
          >
            <el-option
              v-for="item in branchData"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="startDate" label="Start Date" sortable>
      </el-table-column>
      <el-table-column prop="active" label="Active" with="150" sortable>
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.active"
            @click.native.stop
            @change="handleChangeSwitchActive(scope.row)"
          >
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="gender" label="Gender">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.gender === 'Male' ? 'primary' : 'danger'"
            disable-transitions
            >{{ scope.row.gender | shortTextGender }}</el-tag
          >
        </template>
      </el-table-column>
      <el-table-column prop="preferences" label="Preferences">
      </el-table-column>
      <el-table-column prop="remark" label="Remark"> </el-table-column>
      <el-table-column width="100">
        <template slot-scope="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            style="margin-left: 55px"
            @click.stop="handleDeleteRow(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
      {{ page }}
    </el-table>
    <Pagination />
    <DialogDetail />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DialogDetail from "./DialogDetail.vue";
import Pagination from "./Pagination.vue";
export default {
  data() {
    return {
      page: 1,
      pageSize: 10,
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
    };
  },
  components: {
    DialogDetail,
    Pagination,
  },
  computed: {
    ...mapGetters(["getEmployees", "getPage"]),
    employees() {
      return this.getEmployees.slice(
        this.pageSize * this.page - this.pageSize,
        this.pageSize * this.page
      );
    },
    getCurrentPage() {
      return this.getPage;
    },
  },
  created() {
    this.getAllEmployees({ page: this.getCurrentPage });
  },
  methods: {
    ...mapActions(["getAllEmployees", "removeEmployee", "editEmployee"]),
    tableRowClassName({ row }) {
      if (!row.active) {
        return "default-row";
      }
      return "success-row";
    },
    handleCellClick(row) {
      this.$eventBus.$emit("dataForDialog", true, row);
    },
    handleDeleteRow(employee) {
      this.$confirm(
        `This will permanently delete the employee ${employee.name}. Continue?`,
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        }
      )
        .then(() => {
          this.removeEmployee({ id: employee.id });
          this.getAllEmployees({ page: this.getCurrentPage });
          this.$message({
            type: "success",
            message: "Delete completed",
          });
        })
        .catch(() => false);
    },
    handleChangeSwitchActive(data) {
      const { id, active, name } = data;
      this.editEmployee({
        id,
        active,
      });
      this.$message({
        type: "success",
        message: `Employee ${name} is ${active ? "Active" : "Not Active"} `,
      });
    },
    handleChangeBranch(data) {
      const { id, branch, name } = data;
      this.editEmployee({
        id,
        branch,
      });
      this.$message({
        type: "success",
        message: `Employee ${name} updated branch ${branch} `,
      });
    },
  },
  filters: {
    shortTextGender: function (value) {
      if (value === "Male") return (value = "M");
      return (value = "F");
    },
  },
};
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-select {
  width: 250px;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
