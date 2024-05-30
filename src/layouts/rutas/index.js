
import React, {useState,useEffect} from "react";
import {Button, Card, TextField} from "@mui/material";

import DashboardLayout from "viaticos/LayoutContainers/DashboardLayout";
import Footer from "viaticos/Footer";
import Table from "viaticos/Tables/Table";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import useProveedorData from "./data/rutasTableData";

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

import PropTypes from "prop-types";
import {parseISO} from "date-fns";
import swal from 'sweetalert';
import useRutasData from "./data/rutasTableData";
function CrearRuta({setReloadListado}){

    const endpoint = API_URL + "/ciudades";
    const endpointVendedores = API_URL + "/empleados";
    const token = localStorage.getItem("token");
    const [ciudades, setCiudades] = useState([]);
    const [vendedores, setVendedores] = useState([]);
    const [empleado, setEmpleado] = useState([]);
    const [editFields, setEditFields] = useState({
        descripcion: "",
        ciudad:"",
        fecha: parseISO(""),
        valor: "0.0",
        empleado:""
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
    const fetchVendedores=async ()=>{
        try {
            const response = await fetch(endpointVendedores, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
           // if (response.ok) {
                const fetchedData = await response.json();
               if(fetchedData.length>0) {
                   const vendedoresNC= fetchedData.map(empleado=>(
                       {
                           idEmpleado: empleado.idEmpleado,
                           nombreCompleto: `${empleado.nombre} ${empleado.apellido}`,
                           nombre:empleado.nombre,
                           role:empleado.role,
                       }
                   ));
            //   }
                setEmpleado(fetchedData[0]);
                setVendedores(vendedoresNC);
            } else {
                console.error('Error fetching data');
            }
        }catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    useEffect(() => {
    fetchCiudades();
    fetchVendedores();
    }, []);
    const classes = useStyles();
    const [error, setError] = useState('');
    const handleConfirmNew = async () => {

        try {
             // console.log(editFields);
            if (
                editFields.descripcion.trim() === '' ||
                editFields.fecha.toDateString()==="Invalid Date" ||
                editFields.ciudad.nombreCiudad===undefined ||
                editFields.empleado.nombre===undefined
            ) {
                //swal();
                swal("Adevertencia",`Por favor, complete todos los campos son obligatorios.`+editFields.empleado.nombre,"warning");
                return;
            }

            // if(editFields.ciudadOrigen.nombreCiudad===editFields.ciudadDestino.nombreCiudad){
            //     swal("Adevertencia",`La ciudad de Origen y Destino no pueden ser las mismas`,"warning");
            //     return;
            // }

            // if (editFields.fechaSalida.getTime() >= editFields.fechaRegreso.getTime()) {
            //     swal("Advertencia", "La fecha de salida debe ser antes de la fecha de regreso.", "warning");
            //     return;
            // }

            if(editFields.valor<=0){
                swal("Adevertencia",`El gasto estimado debe ser mayor a cero.`,"warning");
                return;
            }
            // Realiza la lógica para guardar la edición, por ejemplo, enviar una solicitud PUT al backend
            ///const response = await fetch(`${API_URL}/salidas?origenId=${ciudadOrigen}&ciudadDestino=${ciudadDestino}`, {
            const response = await fetch(`${API_URL}/rutas`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({

                    descripcion:editFields.descripcion,
                    fecha:editFields.fecha,
                    valor:editFields.valor,
                    ciudad:editFields.ciudad,
                    empleado:editFields.empleado,
                    estado:true
                    //categoriaId:editFields.categoria,

                }),
            });

            if (response.ok) {
              //  console.log(`Item creado  exitosamente ${editFields.descripcionSalidad}`);
                setReloadListado(true); // Set the reload trigger to true
                swal("Exito",`Item creado  exitosamente ${editFields.descripcion}`,"success");
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
                        label="Descripción de Ruta"
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
                        value={editFields.descripcion}
                        onChange={(e) => setEditFields({...editFields,descripcion:e.target.value})}
                        fullWidth
                        className={classes.customInput}
                        multiline
                    />


                </Grid>
                <Grid item xs={12} md={4}>
                    <TextField
                        label="Valor Estimado Ventas "
                        InputLabelProps={{
                            style: { fontSize: '1.2rem' }
                        }}
                        value={editFields.valor}
                        onChange={(e) => setEditFields({...editFields,valor:e.target.value})}
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
                <Grid item xs={12} md={6}>
                    <Autocomplete
                        options={vendedores}
                        getOptionLabel={(empleado) => empleado.nombreCompleto || "Seleccione un Vendedor"} // Ajusta esto según la estructura de datos de las ciudades
                        value={editFields.empleado||null}
                        onChange={(event, newValue) => {
                            setEditFields({...editFields,empleado:newValue });
                        }}
                        renderInput={(params) => <TextField {...params} label="Empleado" />}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Autocomplete
                        options={ciudades}
                        getOptionLabel={(option) => option.nombreCiudad || "Seleccione una ciudad"} // Ajusta esto según la estructura de datos de las ciudades
                        value={editFields.ciudad||null}
                        onChange={(event, newValue) => {
                            setEditFields({...editFields,ciudad:newValue });
                        }}
                        renderInput={(params) => <TextField {...params} label="Ciudad" />}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={6} md={3}>

                    <DatePicker
                        label="Fecha Ruta"
                        value={editFields.fecha}
                        onChange={(newValue) => {
                            setEditFields({...editFields,fecha:newValue});
                        }}
                         renderInput={(params) => <TextField {...params} />}

                        fullWidth
                    />


                </Grid>
                <Grid item xs={12} md={12}>
                    <SoftButton
                        onClick={()=>handleConfirmNew()}
                        variant="contained" color="primary" fullWidth>
                        Agregar Ruta
                    </SoftButton>
                </Grid>

            </Grid>

        </SoftBox>
        </LocalizationProvider>


);
}
function Listado({reloadListado,setReloadListado}){
    // Variable to trigger
    const dataArray=useRutasData(reloadListado);
    const tablaDatos = dataArray.props.children[0];
    const dialogoAsignar=dataArray.props.children[1]
    const dialogoOk=dataArray.props.children[2]
    const dialogoDelete=dataArray.props.children[3]

    //  console.log(tablaDatos);
    // const dialogoAgregar=dataArray.props.children[1];
    const columns = [
        { name: "id", headerName: "ID", align: "left" },
        { name: "descripcion", headerName: "RUTA", align: "left" },
        { name: "ciudad", headerName: "CIUDAD", align: "left" },
        { name: "pais", headerName: "PAÍS", align: "left" },
        { name: "fecha", headerName: "FECHA", align: "left" },
        { name: "valor", headerName: "VALOR", align: "left" },
        { name: "vendedor", headerName: "RESPONSABLE", align: "left" },
        { name: "estado", headerName: "ESTADO", align: "left" },
        { name: "action", headerName: "Acciones", align: "center" },
        // Agrega otras columnas según sea necesario
    ];
     useEffect(() => {
        setReloadListado(false)
     }, [reloadListado]);

return(

    <SoftBox py={3}>
        {dialogoOk}
        {dialogoDelete}

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
CrearRuta.propTypes={
    setReloadListado:PropTypes.func.isRequired,
}
Listado.propTypes = {
    reloadListado: PropTypes.bool.isRequired,
    setReloadListado:PropTypes.func.isRequired,
};
function Rutas() {
    const [reloadListado, setReloadListado] = useState(false);
    return (

        <DashboardLayout>

            <Header/>
            <CrearRuta setReloadListado={setReloadListado}/>
            <Listado reloadListado={reloadListado} setReloadListado={setReloadListado}  />
            <Footer />
        </DashboardLayout>
    );
}

export default Rutas;
