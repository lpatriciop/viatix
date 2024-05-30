
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";


import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";


// Soft UI Dashboard React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import SpaceShip from "examples/Icons/SpaceShip";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Cube from "examples/Icons/Cube";
import SignOut from "./layouts/authentication/sign-out";
import SignUp from "./layouts/authentication/sign-up";
import Categorias from "./layouts/categorias";
import Empleados from "./layouts/empleados";
import Proveedores from "./layouts/proveedores";
import Salidas from "./layouts/salidas";
import Detalle from "./layouts/detalle";
import {Category, ContactPage, Groups, Summarize} from "@mui/icons-material";
import ReporteGastos from "./layouts/reportegastos";
import Separator from "./layouts/authentication/components/Separator";
import Rutas from "./layouts/rutas";


const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Rutas",
    key: "rutas",
    route: "/rutas",
    icon: <CreditCard size="12px" />,
    component: <Rutas />,
    noCollapse: true,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Salidas",
    key: "salidas",
    route: "/salidas",
    icon: <CreditCard size="12px" />,
    component: <Salidas />,
    noCollapse: true,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Empleados",
    key: "empleados",
    route: "/empleados",
    icon: <Groups size="12px" />,
    component: <Empleados />,
    noCollapse: true,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Proveedores",
    key: "proveedores",
    route: "/proveedores",
    icon: <ContactPage size="12px" />,
    component: <Proveedores />,
    noCollapse: true,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Categorias",
    key: "categorias",
    route: "/categorias",
    icon: <Category size="12px" />,
    component: <Categorias />,
    noCollapse: true,
    isPrivate: true,
  }
    ,



  { type: "title", title: "Reportes", key: "account-pages" },
  {
    type: "collapse",
    name: "Reporte Gastos",
    key: "reportegastos",
    route: "/reportegastos",
    icon: <Summarize size="12px" />,
    component: <ReporteGastos  />,
    noCollapse: true,
    isPrivate: true,
  },
  { type: "title", title: "Sesión", key: "sesions" },
   {
    // type: "collapse",
    // name: "Iniciar Sesión",
    key: "sign-in",
    route: "/authentication/sign-in",
    // icon: <SpaceShip size="12px" />,
    component: <SignIn />,
    // noCollapse: true,
    // isPrivate: false,

  },
  //{
  //   type: "collapse",
  //   name: "Tablas",
  //   key: "tables",
  //   route: "/tables",
  //   icon: <SpaceShip size="12px" />,
  //   component: <Tables />,
  //   noCollapse: true,
  //   isPrivate: false,
  // },
  {
    type: "collapse",
    name: "Cerrar Sesión",
    key: "sign-out",
    route: "/authentication/sign-out",
    icon: <SpaceShip size="12px" />,
    component: <SignOut />,
    noCollapse: true,
    isPrivate: true,
  },

];

export default routes;
