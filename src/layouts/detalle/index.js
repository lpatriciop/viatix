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

function Listado(idSalida){

    const dataArray=useDetalleData(idSalida);
    const tablaDatos = dataArray.props.children[0];
    const dialogoDelete=dataArray.props.children[1];
    const dialogoAlerta=dataArray.props.children[4];
    const columns = [
        { name: "idEmpleadoSalida", headerName: "ID", align: "left" },
        { name: "dni", headerName: "IDENTIFICACIÓN", align: "left" },
        { name: "nombre", headerName: "Nombre", align: "left" },
         { name: "apellido", headerName: "Apellido", align: "left" },
        { name: "departamento", headerName: "Departamento", align: "left" },
        { name: "action", headerName: "Acciones", align: "center" },
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

                        <Table2 columns={columns} rows={tablaDatos} />


                    </SoftBox>
                </Card>
            </SoftBox>
        </SoftBox>);
}

function Detalle(){
    const {idSalida}=useParams();

    return(
        <DashboardLayout>

            <Header idSalida={idSalida}/>
            <Listado idSalida={idSalida}/>
            <Footer/>
        </DashboardLayout>
    )
}
export default Detalle;