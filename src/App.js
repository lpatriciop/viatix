import {createContext, useState, useEffect, useMemo } from "react";
import {Routes, Route, Navigate, useLocation, useNavigate} from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";
import SoftBox from "components/SoftBox";
import Sidenav from "viaticos/Sidenav";
import Configurator from "viaticos/Configurator";
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import routes from "routes";
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";
import brand from "assets/images/logo-ct.png";
import Detalle from "./layouts/detalle";
import Gastos from "./layouts/gastos";


export default function App() {
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();

  const navigate=useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");


  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
      allRoutes.map((route) => {
          if (route.isPrivate && !isAuthenticated) {
              return <Route path="*" element={<Navigate to="/authentication/sign-in" />} key={"sign-in"} />;
          }
        if (route.collapse) {
          return getRoutes(route.collapse);
        }

        if (route.route) {
          return <Route exact path={route.route} element={route.component} key={route.key} />;
        }

        return null;
      });

  const configsButton = (
      <SoftBox
          display="flex"
          justifyContent="center"
          alignItems="center"
          width="3.5rem"
          height="3.5rem"
          bgColor="white"
          shadow="sm"
          borderRadius="50%"
          position="fixed"
          right="2rem"
          bottom="2rem"
          zIndex={99}
          color="dark"
          sx={{ cursor: "pointer" }}
          onClick={handleConfiguratorOpen}
      >
        <Icon fontSize="default" color="inherit">
          settings
        </Icon>
      </SoftBox>
  );



  return isAuthenticated ? (


          <ThemeProvider theme={theme}>
            <CssBaseline />
            {layout === "dashboard" && (
                <>
                  <Sidenav
                      color={sidenavColor}
                      brand={brand}
                      brandName="Viáticos & Rutas"
                      routes={routes}

                      onMouseEnter={handleOnMouseEnter}
                      onMouseLeave={handleOnMouseLeave}
                  />
                  <Configurator />
                  {configsButton}
                </>
            )}
            {layout === "vr" && <Configurator />}
            <Routes>
              {getRoutes(routes)}
              {/*<Route path="*" element={<Navigate to="/dashboard" />} />*/}
                <Route path="*" element={<Navigate to="/authentication/sign-in" />} key={"sign-in"} />
                <Route path="/detalle/:idSalida" element={<Detalle />} />
                <Route path="/gastos/:idEmpleado" element={<Gastos />} />
            </Routes>
          </ThemeProvider>



  ) : (
      <ThemeProvider theme={theme}>
          <CssBaseline />
          {layout === "authentication/sign-in" && (
              <>
                  <Sidenav
                      color={sidenavColor}
                      brand={brand}
                      brandName="Viáticos & Rutas"
                      routes={routes}

                      onMouseEnter={handleOnMouseEnter}
                      onMouseLeave={handleOnMouseLeave}
                  />
                  <Configurator />
                  {configsButton}
              </>
          )}
          {layout === "vr" && <Configurator />}
          <Routes>
              {getRoutes(routes)}

              <Route path="*" element={<Navigate to="/authentication/sign-in" />}  key={"sign-in"}/>
          </Routes>
      </ThemeProvider>
  );
}
