import DashboardLayout from "../../viaticos/LayoutContainers/DashboardLayout";
import Header from "./componentes/Header";
import Footer from "../../viaticos/Footer";
import { useParams } from 'react-router-dom';
import useDetalleData from "./data/detalleTableData";
import SoftBox from "../../components/SoftBox";
import {Button, Card, TextField} from "@mui/material";
import Table from "viaticos/Tables/Table";

function Listado(idSalida){

    const dataArray=useDetalleData(idSalida);
    const tablaDatos = dataArray.props.children[0];
    const columns = [
        { name: "idEmpleado", headerName: "ID", align: "left" },
        { name: "dni", headerName: "DNI", align: "left" },
        { name: "nombre", headerName: "Nombre", align: "left" },
        { name: "apellido", headerName: "Apellido", align: "left" },
        { name: "username", headerName: "Correo", align: "left" },
        //  { name: "password", headerName: "Contraseña", align: "left" },
        { name: "departamento", headerName: "Departamento", align: "left" },
        // { name: "enabled", headerName: "Enable", align: "left" },
        // { name: "departamento", headerName: "Departamento", align: "left" },
        { name: "role", headerName: "Rol", align: "left" },
        { name: "action", headerName: "Acciones", align: "center" },
        // Agrega otras columnas según sea necesario
    ];

    return(

        <SoftBox py={3}>
            {/*{dialogoOk}*/}
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

                        <Table columns={columns} rows={tablaDatos} />


                    </SoftBox>
                </Card>
            </SoftBox>
        </SoftBox>);
}





function Detalle(){
    const { idSalida } = useParams();
    return(
        <DashboardLayout>
            <Header descripcion={`Descripcion de la Salida: ${idSalida}`}/>
            <Listado idSalida={idSalida}/>
            <Footer/>
        </DashboardLayout>
    )
}
export default Detalle;