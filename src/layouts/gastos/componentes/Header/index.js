import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";


// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";

// Soft UI Dashboard React examples
import DashboardNavbar from "viaticos/Navbars/DashboardNavbar";


// Images
import imagenEmpleado from "assets/images/empleados_as.jpg";
import curved0 from "assets/images/curved-images/curved-6.jpg";


import PropTypes from 'prop-types';
import {API_URL} from "../../../../config";
import {format} from "date-fns";
import {Check, CheckCircle, Dangerous} from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Document from "../../../../viaticos/Icons/Document";
import Cube from "../../../../viaticos/Icons/Cube";
import SoftButton from "../../../../components/SoftButton";
import Divider from "@mui/material/Divider";
const token = localStorage.getItem("token");
Header.propTypes = {
    idEmpleado: PropTypes.string.isRequired,
};

function Header({idEmpleado}) {


    const EmpleadoDetalle = async ()=>{
        try {
            const response = await fetch(`${API_URL}/empleados/${idEmpleado}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setEmpleado(data);
             //   console.log(data);
            } else {
                console.error('Error fetching data');
            }
        }catch (error){
            console.error('Error fetching data:', error);
        }
    };
    const [empleado, setEmpleado] = useState([]);
    const SumarMonto=async ()=>{
        try {
            const response = await fetch(`${API_URL}/viaticos/sumarMontos/${idSalida}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setGastoReal(data);

            } else {
                console.error('Error fetching data');
            }
        }catch (error){
            console.error('Error fetching data:', error);
        }
    };
    const [gastoReal, setGastoReal] = useState([]);
    const [diferencia, setDiferencia] = useState();
    useEffect(()=>{
        EmpleadoDetalle();
        //SumarMonto();

    },[idEmpleado]);
    // useEffect(() => {
    //     //   console.log(salida.gastoEstimado,gastoReal);
    //     setDiferencia(salida.gastoEstimado-gastoReal);
    // }, [gastoReal]);
    //Terminar Salida
    // const handleTerminarSalida = async () => {
    //     try {
    //             const responset = await fetch(`${API_URL}/salidas/terminar/${idSalida}`, {
    //             method: 'PUT',
    //             headers: {
    //                      'Authorization': `Bearer ${token}`,
    //             },
    //         });
    //           if (responset.ok) {
    //             // Recargar la información del estado aquí
    //             SalidaDetalle();
    //         } else {
    //             console.error("Error al terminar la salida");
    //         }
    //     } catch (error) {
    //         console.error("Error al terminar la salida:", error);
    //     }
    // };
    //si hay datos renderizo...
   // if(salida.length!=0)
        if (empleado.length===0) {
            return <div>Cargando datos...</div>;
        }

    return (
        <SoftBox position="relative">
            <DashboardNavbar absolute light />
            <SoftBox
                display="flex"
                alignItems="center"
                position="relative"
                minHeight="9.75rem"
                borderRadius="xl"
                sx={{
                    backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
                        `${linearGradient(
                            rgba(gradients.info.main, 0.6),
                            rgba(gradients.info.state, 0.6)
                        )}, url(${curved0})`,
                    backgroundSize: "cover",
                    backgroundPosition: "30%",
                    overflow: "hidden",
                }}
            />
            <Card
                sx={{
                    backdropFilter: `saturate(200%) blur(30px)`,
                    backgroundColor: ({ functions: { rgba }, palette: { white } }) => rgba(white.main, 0.8),
                    boxShadow: ({ boxShadows: { navbarBoxShadow } }) => navbarBoxShadow,
                    position: "relative",
                    mt: -8,
                    mx: 3,
                    py: 2,
                    px: 2,
                }}
            >
                <Grid container spacing={3} alignItems="center">
                    <Grid item>
                        <SoftAvatar
                            src={imagenEmpleado}
                            alt="profile-image"
                            variant="rounded"
                            size="xl"
                            shadow="sm"
                        />
                    </Grid>
                    <Grid item>
                        <SoftBox height="100%" mt={0.5} lineHeight={1} display="flex" justifyContent="space-between" flexDirection="column">
                            <SoftTypography variant="h2" fontWeight="medium">
                                {`${empleado.nombre} ${empleado.apellido}`}
                            </SoftTypography>
                            <SoftTypography variant="h6" fontWeight="medium">
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <SoftTypography variant="subtitle1">
                                            {empleado.departamento.nombreDepartamento }
                                        </SoftTypography>
                                    </Grid>

                                </Grid>
                            </SoftTypography>
                            <SoftTypography variant="h6" fontWeight="medium">
                                <Grid container spacing={1}>
                                    <Grid item xs={12}>
                                        <SoftTypography variant="button">
                                            {empleado.username}
                                        </SoftTypography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1}>
                                     <Grid item xs={12}>
                                        <SoftTypography variant="button">
                                           ID: {empleado.dni}
                                        </SoftTypography>
                                    </Grid>
                                </Grid>
                            </SoftTypography>
                        </SoftBox>
                    </Grid>

                </Grid>
            </Card>
        </SoftBox>
    );
}

export default Header;
