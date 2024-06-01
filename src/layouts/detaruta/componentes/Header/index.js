import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";


// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import swal from 'sweetalert';
// Soft UI Dashboard React examples
import DashboardNavbar from "viaticos/Navbars/DashboardNavbar";


// Images
import imagenRutas from "assets/images/controlrutas.jpeg";
import curved0 from "assets/images/curved-images/curved-6.jpg";
import LoadingOverlay from 'react-loading-overlay-ts';

import PropTypes from 'prop-types';
import {API_URL} from "../../../../config";
import {format} from "date-fns";
import {Check, CheckCircle, Dangerous} from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";

import Document from "../../../../viaticos/Icons/Document";
import SoftButton from "../../../../components/SoftButton";
import Divider from "@mui/material/Divider";
const token = localStorage.getItem("token");


Header.propTypes = {
    idRuta: PropTypes.string.isRequired,
};

function Header({idRuta}) {

    const [dataLoaded, setDataLoaded] = useState(false);
    const RutaDetalle = async ()=>{
            try {
            const response = await fetch(`${API_URL}/rutas/${idRuta}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setSalida(data);
                setDataLoaded(true);
               // console.log(data);
            } else {
                console.error('Error fetching data');
            }
        }catch (error){
            console.error('Error fetching data:', error);
        }
    };
    const [salida, setSalida] = useState([]);

    const [gastoReal, setGastoReal] = useState([]);
    const [diferencia, setDiferencia] = useState();
     useEffect(()=>{
    //
         RutaDetalle();
    //     SumarMonto();
    //
     },[]);

   const handleTerminarSalida =async (estado) => {
       swal({
           title: "¿Estás seguro?",
           text: estado?"¿Quieres terminar la salida?":"¿Quieres abrir la salida?",
           icon: "warning",
           buttons: ["Cancelar", "Aceptar"],
           dangerMode: true,
       }).then(async(confirm) => {
           if (confirm) {
        try {
                const responset = await fetch(`${API_URL}/rutas/terminar/${idRuta}`, {
                method: 'PUT',
                headers: {
                         'Authorization': `Bearer ${token}`,
                },
            });
              if (responset.ok) {
                // Recargar la información del estado aquí
                  swal("Actualizada","Ruta Actualiza Correctamente","success");
                  RutaDetalle();
            } else {
                console.error("Error al terminar la salida");
            }
        } catch (error) {
            console.error("Error al terminar la salida:", error);
        }
           }});
    };

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
                <LoadingOverlay
                    active={!dataLoaded}
                    spinner
                    text='Cargando datos...'
                >
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
                <Grid container spacing={2} alignItems="center">
                    <Grid item>
                        <SoftAvatar
                            src={imagenRutas}
                            alt="profile-image"
                            variant="rounded"
                            size="xxl"
                            shadow="sm"
                        />
                    </Grid>
                    <Grid item >
                        <SoftBox height="100%"  lineHeight={1} display="flex" justifyContent="space-between" flexDirection="column">
                            <SoftTypography variant="h5" fontWeight="medium">
                                {salida.descripcion ? salida.descripcion : ""}
                            </SoftTypography>
                            <SoftTypography variant="h6" fontWeight="medium">
                                <Grid container spacing={1}>
                                    <Grid item xs={3}>
                                        RESPONSABLE:
                                    </Grid>
                                    <Grid item xs={6}>
                                        <SoftTypography variant="button">
                                            {salida.empleado && salida.empleado.nombre ?
                                                `${salida.empleado.nombre} ${salida.empleado.apellido}` : ""}

                                        </SoftTypography>
                                        <Divider/>
                                        <SoftTypography variant="button">
                                            {salida.empleado && salida.empleado.username ?
                                                `${salida.empleado.username}` : ""}

                                        </SoftTypography>
                                    </Grid>

                                    <Grid item xs={6}>
                                        FECHA:
                                    </Grid>
                                    <Grid item xs={6}>
                                        {salida.fecha && salida.fecha ?
                                            <SoftTypography
                                                variant="button">{format(new Date(salida.fecha), 'dd/MM/yyyy')}</SoftTypography>
                                            : ""
                                        }
                                    </Grid>
                                </Grid>
                            </SoftTypography>

                        </SoftBox>
                    </Grid>
                    <Grid item   textAlign="right">
                        <SoftBox height="80%" shadow>


                            {/*<SoftTypography variant="h6" fontWeight="medium">*/}
                            {/*    ESTADO*/}
                            {/*</SoftTypography>*/}


                            <SoftTypography variant="h5">
                                {salida.estado ?<p title="Activo"><CheckCircle  color="success" fontSize="large" /></p>  : <p title="Inactivo"><Dangerous  color="error" fontSize="large" /></p> }
                            </SoftTypography>

                        </SoftBox>
                    </Grid>

                    <Grid item  >
                        <AppBar position="relative">

                                <SoftButton color="primary" icon={<Document />} onClick={() => window.location.href = "#/rutas"} >Asignar Clientes</SoftButton>
                         <Divider/>
                            <SoftButton disabled color="secondary" icon={<Document />}  onClick={()=>handleTerminarSalida(salida.estado)}>{salida.estado?"Terminar Ruta":"Abrir Ruta"}</SoftButton>
                                {/*<Tab label="Configuración" icon={<Settings />} />*/}

                        </AppBar>
                    </Grid>
                </Grid>
            </Card>
                </LoadingOverlay>
        </SoftBox>
    );
}

export default Header;
