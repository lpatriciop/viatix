
/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Soft UI Dashboard React layouts
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
    name: "Empleados",
    key: "empleados",
    route: "/empleados",
    icon: <Office size="12px" />,
    component: <Empleados />,
    noCollapse: true,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Proveedores",
    key: "proveedores",
    route: "/proveedores",
    icon: <Office size="12px" />,
    component: <Proveedores />,
    noCollapse: true,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Categorias",
    key: "categorias",
    route: "/categorias",
    icon: <Office size="12px" />,
    component: <Categorias />,
    noCollapse: true,
    isPrivate: true,
  }
    ,
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


  { type: "title", title: "Opciones de Sesión", key: "account-pages" },
  {
    type: "collapse",
    name: "Perfil",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Billing  />,
    noCollapse: true,
    isPrivate: true,
  },
  {
    type: "collapse",
    name: "Iniciar Sesión",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <SpaceShip size="12px" />,
    component: <SignIn />,
    noCollapse: true,
    isPrivate: false,
  },
  // {
  //   type: "collapse",
  //   name: "Registro",
  //   key: "sign-up",
  //   route: "/authentication/sign-up",
  //   icon: <SpaceShip size="12px" />,
  //   component: <SignUp />,
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
