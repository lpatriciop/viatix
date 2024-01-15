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
import Table2 from "../../viaticos/Tables/Table2";
import TableGastos from "../../viaticos/Tables/TableGastos";

function Listado(idE){
    const idEmpleado=idE;

    const dataArray=useDetalleData(idEmpleado);
    const tablaDatos = dataArray.props.children[0];
    const dialogoDelete=dataArray.props.children[1];
    const dialogoAlerta=dataArray.props.children[2];
    const columns = [
        { name: "idSalida", headerName: "ID", align: "left" },
        { name: "descripcionSalida", headerName: "DESCRIPCIÓN", align: "left" },
        { name: "fechaSalida", headerName: "SALIDA", align: "left" },
         { name: "fechaRegreso", headerName: "REGRESO", align: "left" },
        { name: "ciudadOrigen", headerName: "ORIGEN", align: "left" },
        { name: "ciudadDestino", headerName: "DESTINO", align: "left" },
        { name: "gastoReal", headerName: "GASTOS", align: "right" },
        { name: "estado", headerName: "ESTADO", align: "center" },
    //    { name: "action", headerName: "Acciones", align: "center" },
        // Agrega otras columnas según sea necesario
    ];

    return(

        <SoftBox py={3}>
            {dialogoAlerta}
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
                        {/*{dialogoAsignar}*/}

                        <TableGastos columns={columns} rows={tablaDatos} idEmpleado={idEmpleado} />


                    </SoftBox>
                </Card>
            </SoftBox>
        </SoftBox>);
}

function Gastos(){
    const {idEmpleado}=useParams();

    return(
        <DashboardLayout>

            <Header idEmpleado={idEmpleado}/>
            <Listado idEmpleado={idEmpleado}/>
            <Footer/>
        </DashboardLayout>
    )
}
export default Gastos;