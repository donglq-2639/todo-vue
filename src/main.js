import Vue from "vue";
import App from "./App.vue";
import "element-ui/lib/theme-chalk/index.css";
import lang from "element-ui/lib/locale/lang/en";
import locale from "element-ui/lib/locale";
import {
  Button,
  Select,
  Checkbox,
  Radio,
  Input,
  Form,
  FormItem,
  Table,
  TableColumn,
  Switch,
  Option,
  CheckboxGroup,
  RadioGroup,
  DatePicker,
  Col,
  Popconfirm,
  MessageBox,
  Message,
  CheckboxButton,
  Dialog,
  Tag,
  Pagination,
} from "element-ui";
import router from "./router";
import store from "./store";

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Checkbox.name, Checkbox);
Vue.component(CheckboxGroup.name, CheckboxGroup);
Vue.component(Radio.name, Radio);
Vue.component(RadioGroup.name, RadioGroup);
Vue.component(Input.name, Input);
Vue.component(FormItem.name, FormItem);
Vue.component(Form.name, Form);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Switch.name, Switch);
Vue.component(Option.name, Option);
Vue.component(DatePicker.name, DatePicker);
Vue.component(Col.name, Col);
Vue.component(Popconfirm.name, Popconfirm);
Vue.component(CheckboxButton.name, CheckboxButton);
Vue.component(Dialog.name, Dialog);
Vue.component(Tag.name, Tag);
Vue.component(Pagination.name, Pagination);
locale.use(lang);

Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;
Vue.prototype.$eventBus = new Vue();

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
