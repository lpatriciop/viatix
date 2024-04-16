import DashboardLayout from "../../viaticos/LayoutContainers/DashboardLayout";
import Header from "./componentes/Header";
import Footer from "../../viaticos/Footer";
import { useParams } from 'react-router-dom';
import useDetalleData from "./data/detalleTableData";
import SoftBox from "../../components/SoftBox";
import {Button, Card, TextField} from "@mui/material";
import Table from "viaticos/Tables/Table";
import {API_URL} from "../../config";
import { useState, useEffect } from "react";
import LoadingOverlay from "react-loading-overlay-ts";
import PropTypes from "prop-types";

Listado.propTypes={
  endpoint: PropTypes.string.isRequired,

}
function Listado({endpoint}){

    const [datosCargados, setDatosCargados] = useState(false);
    const dataArray=useDetalleData(endpoint,setDatosCargados);
    const tablaDatos = dataArray.data;

    const columns = [
        { name: "id", headerName: "GASTO", align: "left" },
        { name: "empleado", headerName: "EMPLEADO", align: "left" },
        { name: "salida", headerName: "SALIDA", align: "left" },
        { name: "fechaGasto", headerName: "FECHA", align: "left" },
        { name: "concepto", headerName: "CONCEPTO", align: "left" },
        { name: "categoria", headerName: "CATEGORÍA", align: "left" },
        { name: "proveedor", headerName: "PROVEEDOR", align: "left" },
        { name: "estado", headerName: "ESTADO", align: "left" },
        { name: "monto", headerName: "VALOR USD$", align: "right" },
        // { name: "evidencia", headerName: "EVIDENCIA", align: "left" },
        { name: "action", headerName: "Acciones", align: "center" },
    ];



    return(
        <LoadingOverlay
            active={!datosCargados}
            spinner
            text='Cargando datos...'
        >
        <SoftBox py={3}>
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
                        {/*{dialogoAsignar}*/}

                        <Table columns={columns} rows={tablaDatos} idEmpleado={endpoint} />


                    </SoftBox>
                </Card>
            </SoftBox>
        </SoftBox>
        </LoadingOverlay>
    );
}

function ReporteGastos(){
 //   const {criterio}=useParams();
    const today = new Date();
    const formattedToday = today.toISOString().split('T')[0];
    const [endpoint, setEndpoint] = useState(`${API_URL}/viaticos/gastosFechas?fechaInicio=${formattedToday}T00:00:00&fechaFin=${formattedToday}T23:59:59`);
    return(
        <DashboardLayout>

            <Header endpoint={endpoint} setEndpoint={setEndpoint}/>
            <Listado endpoint={endpoint} />
            <Footer/>
        </DashboardLayout>
    )
}
export default ReporteGastos;