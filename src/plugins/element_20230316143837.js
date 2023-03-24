import Vue from 'vue'
import {
    Button,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    Table,
    TableColumn,
    Checkbox,
    Pagination,
    Breadcrumb,
    BreadcrumbItem,
    Form,
    FormItem,
    Col,
    DatePicker,
    TimeSelect,
    TimePicker,
    Dialog,
    Tree,
    MessageBox,
    Message,
    Upload,
    Dropdown,
    DropdownMenu,
    DropdownItem,
} from 'element-ui'

Vue.use(Button)
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Checkbox);
Vue.use(Pagination);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Col);
Vue.use(DatePicker);
Vue.use(TimeSelect);
Vue.use(TimePicker);
Vue.use(Dialog);
Vue.use(Tree);
Vue.use(Upload);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);


Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;