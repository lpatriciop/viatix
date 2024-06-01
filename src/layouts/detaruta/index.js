import DashboardLayout from "../../viaticos/LayoutContainers/DashboardLayout";
import Header from "./componentes/Header";
import Footer from "../../viaticos/Footer";
import { useParams } from 'react-router-dom';
import SoftBox from "../../components/SoftBox";
import {Button, Card, TextField} from "@mui/material";

import Table2 from "../../viaticos/Tables/Table2";
import useDetarutaData from "./data/detarutaTableData";

function Listado(idRuta){

    const dataArray=useDetarutaData(idRuta);
    const tablaDatos = dataArray.props.children[0];
    const dialogoDelete=dataArray.props.children[1];
    const dialogoAlerta=dataArray.props.children[4];
    const columns = [
        { name: "idCliente", headerName: "ID", align: "left" },
        { name: "ruc", headerName: "IDENTIFICACIÓN", align: "left" },
        { name: "nombre", headerName: "Nombre", align: "left" },
        { name: "mail", headerName: "Correo", align: "left" },
        { name: "telefono", headerName: "Teléfono", align: "left" },
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

function Detaruta(){
    const {idRuta}=useParams();

    return(
        <DashboardLayout>

            <Header idRuta={idRuta}/>
            <Listado idRuta={idRuta}/>
            <Footer/>
        </DashboardLayout>
    )
}
export default Detaruta;