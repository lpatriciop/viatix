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
import imagenSalidas from "assets/images/salidas.jpg";
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
    idSalida: PropTypes.string.isRequired,
};

function Header({idSalida}) {


    const SalidaDetalle = async ()=>{
        try {
            const response = await fetch(`${API_URL}/salidas/${idSalida}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setSalida(data);

            } else {
                console.error('Error fetching data');
            }
        }catch (error){
            console.error('Error fetching data:', error);
        }
    };
    const [salida, setSalida] = useState([]);
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
        SalidaDetalle();
        SumarMonto();

    },[idSalida]);
    useEffect(() => {
        //   console.log(salida.gastoEstimado,gastoReal);
        setDiferencia(salida.gastoEstimado-gastoReal);
    }, [gastoReal]);
    //Terminar Salida
    const handleTerminarSalida = async () => {
        try {
                const responset = await fetch(`${API_URL}/salidas/terminar/${idSalida}`, {
                method: 'PUT',
                headers: {
                         'Authorization': `Bearer ${token}`,
                },
            });
              if (responset.ok) {
                // Recargar la información del estado aquí
                SalidaDetalle();
            } else {
                console.error("Error al terminar la salida");
            }
        } catch (error) {
            console.error("Error al terminar la salida:", error);
        }
    };
    //si hay datos renderizo...
   // if(salida.length!=0)
        if (salida.length===0) {
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
                            src={imagenSalidas}
                            alt="profile-image"
                            variant="rounded"
                            size="xl"
                            shadow="sm"
                        />
                    </Grid>
                    <Grid item>
                        <SoftBox height="100%" mt={0.5} lineHeight={1} display="flex" justifyContent="space-between" flexDirection="column">
                            <SoftTypography variant="h5" fontWeight="medium">
                                {salida.descripcionSalida}
                            </SoftTypography>
                            <SoftTypography variant="h6" fontWeight="medium">
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        ORIGEN:
                                    </Grid>
                                    <Grid item xs={6}>
                                        <SoftTypography variant="button">{salida.ciudadOrigen.nombreCiudad}</SoftTypography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        FECHA SALIDA:
                                    </Grid>
                                    <Grid item xs={6}>
                                        <SoftTypography variant="button">{format(new Date(salida.fechaSalida), 'dd/MM/yyyy')}</SoftTypography>
                                    </Grid>
                                </Grid>
                            </SoftTypography>
                            <SoftTypography variant="h6" fontWeight="medium">
                                <Grid container spacing={1}>
                                    <Grid item xs={6}>
                                        DESTINO:
                                    </Grid>
                                    <Grid item xs={6}>
                                        <SoftTypography variant="button">{salida.ciudadDestino.nombreCiudad}</SoftTypography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        FECHA REGRESO:
                                    </Grid>
                                    <Grid item xs={6}>
                                        <SoftTypography variant="button">{format(new Date(salida.fechaRegreso), 'dd/MM/yyyy')}</SoftTypography>
                                    </Grid>
                                </Grid>
                            </SoftTypography>
                        </SoftBox>
                    </Grid>
                    <Grid item mt={3.5}  textAlign="right">
                        <SoftBox height="80%" shadow>
                            <SoftTypography variant="h6" fontWeight="medium">
                                Gasto Estimado
                            </SoftTypography>
                            <SoftTypography variant="h5">
                                {salida.gastoEstimado.toLocaleString("es-ES", {
                                    style: "currency",
                                    currency: "USD",
                                })}
                            </SoftTypography>
                            <SoftTypography variant="h6" fontWeight="medium">
                                ESTADO
                            </SoftTypography>


                            <SoftTypography variant="h5">
                                {salida.estado ?<p title="Activo"><CheckCircle  color="success" fontSize="large" /></p>  : <p title="Inactivo"><Dangerous  color="error" fontSize="large" /></p> }
                            </SoftTypography>
                        </SoftBox>
                    </Grid>
                    <Grid item mt={1.7}  textAlign="right">
                        <SoftBox height="80%" shadow>
                            <SoftTypography variant="h6" fontWeight="medium">
                                Gasto Real
                            </SoftTypography>
                            <SoftTypography variant="h5">
                                {gastoReal.toLocaleString("es-ES", {
                                    style: "currency",
                                    currency: "USD",
                                })}
                            </SoftTypography>
                            <SoftTypography variant="h6" fontWeight="medium">
                                DIFERENCIA
                            </SoftTypography>


                            <SoftTypography variant="h5" color={diferencia < 0 ? "error" : "inherit"}>
                                {diferencia.toLocaleString("es-ES", {
                                    style: "currency",
                                    currency: "USD",
                                })}
                            </SoftTypography>
                        </SoftBox>
                    </Grid>
                    <Grid item  mt={3.5} >
                        <AppBar position="static">

                                <SoftButton color="primary" icon={<Document />} onClick={() => window.location.href = "#/salidas"} >Asignar Empleado</SoftButton>
                         <Divider/>
                            <SoftButton color="secondary" icon={<Document />}  onClick={handleTerminarSalida}>Terminar Salida</SoftButton>
                                {/*<Tab label="Configuración" icon={<Settings />} />*/}

                        </AppBar>
                    </Grid>
                </Grid>
            </Card>
        </SoftBox>
    );
}

export default Header;
