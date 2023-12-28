
import React, {useState,useEffect} from "react";
import {Button, Card, TextField} from "@mui/material";

import DashboardLayout from "viaticos/LayoutContainers/DashboardLayout";
import Footer from "viaticos/Footer";
import Table from "viaticos/Tables/Table";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import useProveedorData from "./data/salidasTableData";

import Header from "./components/Header";
import Grid from "@mui/material/Grid";
import Autocomplete from '@mui/material/Autocomplete';

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {API_URL} from "../../config";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import SoftButton from "../../components/SoftButton";
import useSalidasData from "./data/salidasTableData";
import PropTypes from "prop-types";
import {parseISO} from "date-fns";

function CrearSalida({setReloadListado}){

    const endpoint = API_URL + "/ciudades";
    const token = localStorage.getItem("token");
    const [ciudades, setCiudades] = useState([]);

    const [editFields, setEditFields] = useState({
        descripcionSalidad: "",
        ciudadOrigen:"",
        ciudadDestino: "",
        fechaSalida: parseISO(""),
        fechaRegreso: parseISO(""),
        gastoEstimado: "0.0",
    });
    const useStyles = makeStyles((theme) => ({
        customInput: {
            '& .MuiOutlinedInput-input': {
                width: '100% !important',
            },
        },
    }));
    const fetchCiudades=async ()=>{
        try {
            const response = await fetch(endpoint, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const fetchedData = await response.json();
                setCiudades(fetchedData);

            } else {
                console.error('Error fetching data');
            }
        }catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
    fetchCiudades();
    }, []);
    const classes = useStyles();
    const [error, setError] = useState('');
    const handleConfirmNew = async () => {

        try {

            if (
                editFields.descripcionSalidad.trim() === '' ||
                editFields.gastoEstimado.trim() === ''


            ) {
                setError('Por favor, complete todos los campos obligatorios.');
                return;
            }

            // Realiza la lógica para guardar la edición, por ejemplo, enviar una solicitud PUT al backend
            ///const response = await fetch(`${API_URL}/salidas?origenId=${ciudadOrigen}&ciudadDestino=${ciudadDestino}`, {
            const response = await fetch(`${API_URL}/salidas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({

                    descripcionSalida:editFields.descripcionSalidad,
                    fechaSalida:editFields.fechaSalida,
                    fechaRegreso: editFields.fechaRegreso,
                    gastoEstimado:editFields.gastoEstimado,
                    ciudadOrigen:editFields.ciudadOrigen,
                    ciudadDestino:editFields.ciudadDestino

                    //categoriaId:editFields.categoria,

                }),
            });

            if (response.ok) {
                console.log(`Item creado  exitosamente ${editFields.descripcionSalidad}`);
                setReloadListado(true); // Set the reload trigger to true
         //       fetchData();
            } else {
                console.error('Error al editar el item');
            }
        } catch (error) {
            console.error('Error al procesar la solicitud de edición:', error);
        } finally {


        }

    };


    return(

        <LocalizationProvider dateAdapter={AdapterDateFns}>
        <SoftBox my={6}    >

            <Grid container spacing={2}   >
                <Grid item xs={12} md={8}  >
                    <TextField
                        label="Descripción de Salida"
                        InputLabelProps={{
                            style: { fontSize: '1.2rem' },
                        }}
                        InputProps={{
                            style: {
                                fontSize: '1.0rem',
                                color: 'darkgrey',
                                backgroundColor: 'greenyellow',
                            },
                        }}
                        value={editFields.descripcionSalidad}
                        onChange={(e) => setEditFields({...editFields,descripcionSalidad:e.target.value})}
                        fullWidth
                        className={classes.customInput}
                        multiline
                    />


                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        label="Gasto Estimado"
                        InputLabelProps={{
                            style: { fontSize: '1.2rem' }
                        }}
                        value={editFields.gastoEstimado}
                        onChange={(e) => setEditFields({...editFields,gastoEstimado:e.target.value})}
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <span>$</span>
                                </InputAdornment>
                            ),
                            style: {
                                textAlign: 'right',
                                alignContent:'end'
                            },
                        }}
                    />

                </Grid>
                <Grid item xs={12} md={3}>
                    <Autocomplete
                        options={ciudades}
                        getOptionLabel={(option) => option.nombreCiudad || "Seleccione una ciudad"} // Ajusta esto según la estructura de datos de las ciudades
                        value={editFields.ciudadOrigen||null}
                        onChange={(event, newValue) => {
                            setEditFields({...editFields,ciudadOrigen:newValue });
                        }}
                        renderInput={(params) => <TextField {...params} label="Ciudad Origen" />}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Autocomplete
                        options={ciudades}
                        getOptionLabel={(option) => option.nombreCiudad || "Seleccione una ciudad"} // Ajusta esto según la estructura de datos de las ciudades
                        value={editFields.ciudadDestino||null}
                        onChange={(event, newValue) => {
                            setEditFields({...editFields,ciudadDestino:newValue });
                        }}
                        renderInput={(params) => <TextField {...params} label="Ciudad Destino" />}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6} md={3}>

                    <DatePicker
                        label="Salida"
                        value={editFields.fechaSalida}
                        onChange={(newValue) => {
                            setEditFields({...editFields,fechaSalida:newValue});
                        }}
                        // renderInput={(params) => <TextField {...params} />}

                        fullWidth
                    />


                </Grid>
                <Grid item xs={6} md={3}>
                    <DatePicker
                        label="Regreso"
                        value={editFields.fechaRegreso}
                        onChange={(newValue) => {
                            setEditFields({...editFields,fechaRegreso:newValue });
                        }}
                        // renderInput={(params) => <TextField {...params} />}
                        fullWidth
                    />

                </Grid>
                <Grid item xs={12} md={12}>
                    <SoftButton
                        onClick={()=>handleConfirmNew()}
                        variant="contained" color="primary" fullWidth>
                        Agregar Salida
                    </SoftButton>
                </Grid>

            </Grid>

        </SoftBox>
        </LocalizationProvider>


);
}
function Listado({reloadListado,setReloadListado}){
    // Variable to trigger
    const dataArray=useSalidasData(reloadListado);
    const tablaDatos = dataArray.props.children[0];
    const dialogoAsignar=dataArray.props.children[1]
    const dialogoOk=dataArray.props.children[2]

    //  console.log(tablaDatos);
    // const dialogoAgregar=dataArray.props.children[1];
    const columns = [
        { name: "idSalida", headerName: "ID", align: "left" },
        { name: "descripcionSalida", headerName: "Salida", align: "left" },
        { name: "ciudadOrigen", headerName: "Ciudad Origen", align: "left" },
        { name: "ciudadDestino", headerName: "Ciudad Destino", align: "left" },
        { name: "fechaSalida", headerName: "Fecha de Salida", align: "left" },
        { name: "fechaRegreso", headerName: "Fecha de Regreso", align: "left" },
        { name: "gastoEstimado", headerName: "Gasto Estimado", align: "left" },
        { name: "estado", headerName: "Estado", align: "left" },
        { name: "action", headerName: "Acciones", align: "center" },
        // Agrega otras columnas según sea necesario
    ];
     useEffect(() => {
        setReloadListado(false)
     }, [reloadListado]);

return(

    <SoftBox py={3}>
        {dialogoOk}
    <SoftBox mb={3}>

        <Card>

            <SoftBox
                sx={{
                    "& .MuiTableRow-root:not(:last-child)": {
                        "& td": {
                            borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                                `${borderWidth[1]} solid ${borderColor}`,
                        },
                    },
                }}
            >
                {dialogoAsignar}

                <Table columns={columns} rows={tablaDatos} />


            </SoftBox>
        </Card>
    </SoftBox>
</SoftBox>);
}
CrearSalida.propTypes={
    setReloadListado:PropTypes.func.isRequired,
}
Listado.propTypes = {
    reloadListado: PropTypes.bool.isRequired,
    setReloadListado:PropTypes.func.isRequired,
};
function Salidas() {
    const [reloadListado, setReloadListado] = useState(false);
    return (

        <DashboardLayout>

            <Header/>
            <CrearSalida setReloadListado={setReloadListado}/>
            <Listado reloadListado={reloadListado} setReloadListado={setReloadListado}  />
            <Footer />
        </DashboardLayout>
    );
}

export default Salidas;
