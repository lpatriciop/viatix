
import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";


// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import swal from "sweetalert";

// Soft UI Dashboard React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import burceMars from "assets/images/logo-ct.png";
import curved0 from "assets/images/curved-images/curved0.jpg";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {CircularProgress, TextField} from "@mui/material";
import SoftButton from "../../../../components/SoftButton";
import {Add} from "@mui/icons-material";
import {API_URL} from "../../../../config";
import PropTypes from "prop-types";


Header.propTypes = {
    endpoint: PropTypes.string.isRequired,
    setEndpoint:PropTypes.func.isRequired,
};
function Header({endpoint,setEndpoint}) {
    const [tabsOrientation, setTabsOrientation] = useState("horizontal");
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        // A function that sets the orientation state of the tabs.
        function handleTabsOrientation() {
            return window.innerWidth < breakpoints.values.sm
                ? setTabsOrientation("vertical")
                : setTabsOrientation("horizontal");
        }

        /**
         The event listener that's calling the handleTabsOrientation function when resizing the window.
         */
        window.addEventListener("resize", handleTabsOrientation);

        // Call the handleTabsOrientation function to set the state with the initial value.
        handleTabsOrientation();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleTabsOrientation);
    }, [tabsOrientation]);
    const today = new Date();
    const handleSetTabValue = (event, newValue) => setTabValue(newValue);
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);
    const [loading, setLoading] = useState(false);
    // const [endpoint, setEndpoint] = useState(API_URL + "/account-move-lines/limit/100");
    const handleBuscar = () => {
        if (startDate===null || endDate===null) {
            swal("Adevertencia",`Debe escoger una fecha de incio y fin`,"warning");
            return;
        }
        // if (startDate >= endDate) {
        //     swal("Advertencia", "La fecha de inicio debe ser mayor a la de fin", "warning");
        //     return;
        // }


        // setEndpoint(`${API_URL}/account-move-lines/entre-timestamp/${startDate}/${endDate}`)
        const formattedStartDate = startDate.toISOString().split('T')[0];
        const formattedEndDate = endDate.toISOString().split('T')[0];
        //setEndpoint(`${API_URL}/account-move-lines/entre-timestamp/${formattedStartDate} 00:00:00/${formattedEndDate} 00:00:00`);
        setEndpoint(`${API_URL}/viaticos/gastosFechas?fechaInicio=${formattedStartDate}T00:00:00&fechaFin=${formattedEndDate}T23:59:59`);
    };
    return (
        <SoftBox position="relative">
            {/*<DashboardNavbar absolute light />*/}
            <SoftBox
                display="flex"
                alignItems="center"
                position="relative"
                minHeight="5.75rem"
                borderRadius="xl"
                sx={{
                    backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
                        `${linearGradient(
                            rgba(gradients.info.main, 0.6),
                            rgba(gradients.info.state, 0.6)
                        )}, url(${curved0})`,
                    backgroundSize: "cover",
                    backgroundPosition: "50%",
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
                            src={burceMars}
                            alt="profile-image"
                            variant="rounded"
                            size="xl"
                            shadow="sm"
                        />
                    </Grid>
                    <Grid item>
                        <SoftBox height="100%" mt={0.5} lineHeight={1}>
                            <SoftTypography variant="h5" fontWeight="medium">
                               Reporte de Gastos
                            </SoftTypography>
                            <SoftTypography variant="button" color="text" fontWeight="medium">
                                Fechas
                            </SoftTypography>
                        </SoftBox>
                    </Grid>
                    <Grid item xs={12} md={12} lg={12} sx={{ ml: "auto" }}>
                        <SoftBox height="100%" mt={1.5} lineHeight={1}>

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Fecha de inicio"
                                value={startDate}
                                onChange={(date) => setStartDate(date)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                            <DatePicker
                                label="Fecha de fin"
                                value={endDate}
                                onChange={(date) => setEndDate(date)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>

                        <SoftButton variant="gradient" color="dark" onClick={()=>handleBuscar()} disabled={loading}>
                            {loading ? <CircularProgress size={20} color="inherit" /> : <><Add /> &nbsp;Buscar</>}
                        </SoftButton>
                        </SoftBox>
                    </Grid>
                </Grid>
            </Card>
        </SoftBox>
    );
}

export default Header;