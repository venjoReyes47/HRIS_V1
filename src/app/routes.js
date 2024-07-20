// ----------------------------------------------------------------AUTH ------------------------------------------------------------------ //
import Login from "./modules/Auth/pages/Login";
import Dashboard from "./modules/Admin/Dashboard";



import StudentList from "./modules/Admin/Student/List";
import StudentForm from "./modules/Admin/Student/Form";
import StudentUpdate from "./modules/Admin/Student/Update"
import StudentDelete from "./modules/Admin/Student/Delete"



import ApplicantDetails from "./modules/Admin/Student/Details";
import PositionList from "./modules/Admin/Position/List";


import UserList from "./modules/Admin/HrisUser/List";
import UserForm from "./modules/Admin/User/Form";
import UserUpdate from "./modules/Admin/User/Update";
import UserDelete from "./modules/Admin/User/Delete"

var routes = [
  // AUTH
  {
    path: "/login",
    name: "Login",
    component: Login,
    layout: "/auth"
  },

  // ADMIN
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    layout: "/admin",
    subLayout: "",
    breadcrumbs: [{
      title: "Dashboard",
      pathname: "/admin/dashboard"
    }]
  },

  // STUDENTS
  {
    path: "/applicants",
    name: "Student List",
    component: StudentList,
    layout: "/admin",
    subLayout: "",
    breadcrumbs: [{
      title: "Student List",
      pathname: "/admin/students"
    }]
  },
  {
    path: "/applicant-details/:id",
    name: "Employee Details",
    component: ApplicantDetails,
    layout: "/admin",
    subLayout: "",
    breadcrumbs: [{
      title: "Student-Masterfile",
      pathname: "/admin/applicant-details"
    }]
  },

  {
    path: "/positions",
    name: "Positions",
    component: PositionList,
    layout: "/admin",
    subLayout: "",
    breadcrumbs: [{
      title: "Positions",
      pathname: "/admin/positions"
    }]
  },
  {
    path: "/student-registration",
    name: "Student Registration Form",
    component: StudentForm,
    layout: "/admin",
    subLayout: "",
    breadcrumbs: [{
      title: "Student Registration Form",
      pathname: "/admin/student-registration"
    }]
  },
  {
    path: "/student-update/:id",
    name: "Student Update",
    component: StudentUpdate,
    layout: "/admin",
    subLayout: "/student",
    breadcrumbs: [{
      title: "Student Update",
      pathname: "/admin/student-update"
    }]
  },
  {
    path: "/student-delete/:id",
    name: "Student Delete",
    component: StudentDelete,
    layout: "/admin",
    subLayout: "/student",
    breadcrumbs: [{
      title: "Student Update",
      pathname: "/admin/student-delete"
    }]
  },

  // USERS
  {
    path: "/users",
    name: "User List",
    component: UserList,
    layout: "/admin",
    subLayout: "",
    breadcrumbs: [{
      title: "User List",
      pathname: "/admin/users"
    }]
  },
  {
    path: "/user-registration",
    name: "Add User",
    component: UserForm,
    layout: "/admin",
    subLayout: "",
    breadcrumbs: [{
      title: "User Registration Form",
      pathname: "/admin/user-registration"
    }]
  },
  {
    path: "/user-update/:id",
    name: "User Update",
    component: UserUpdate,
    layout: "/admin",
    subLayout: "/user",
    breadcrumbs: [{
      title: "User Update",
      pathname: "/admin/user-update"
    }]
  },
  {
    path: "/user-delete/:id",
    name: "User Delete",
    component: UserDelete,
    layout: "/admin",
    subLayout: "/user",
    breadcrumbs: [{
      title: "User Update",
      pathname: "/admin/user-delete"
    }]
  },
];

export default routes;
