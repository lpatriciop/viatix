
import React from "react";
import { Card } from "@mui/material";
import DashboardLayout from "viaticos/LayoutContainers/DashboardLayout";
import DashboardNavbar from "viaticos/Navbars/DashboardNavbar";
import Footer from "viaticos/Footer";
import Table from "viaticos/Tables/Table";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import useEmpleadosData from "./data/empleadosTableData";
import Icon from "@mui/material/Icon";
import SoftButton from "../../components/SoftButton";


function Empleados() {
const empleadosArray=useEmpleadosData();
    const empleadosData = empleadosArray.props.children[0];
     const dialogoDelete = empleadosArray.props.children[1];
    const dialogoEdit = empleadosArray.props.children[2];
     const dialogoNew = empleadosArray.props.children[3];
     const botonNew = empleadosArray.props.children[4];
     const alerta=empleadosArray.props.children[5];
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


    return (

        <DashboardLayout>
            {alerta}
            {dialogoDelete}
            {dialogoEdit}
            {dialogoNew}
            <DashboardNavbar />
            <SoftBox py={3}>

                <SoftBox mb={3}>
                    <Card>
                        <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                            <SoftTypography variant="h6">Empleados</SoftTypography>
                            {botonNew}
                        </SoftBox>

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
                            <Table columns={columns} rows={empleadosData} />


                        </SoftBox>
                    </Card>
                </SoftBox>
            </SoftBox>
            <Footer />
        </DashboardLayout>
    );
}

export default Empleados;
