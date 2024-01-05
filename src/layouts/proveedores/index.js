
import React from "react";
import { Card } from "@mui/material";
import DashboardLayout from "viaticos/LayoutContainers/DashboardLayout";
import DashboardNavbar from "viaticos/Navbars/DashboardNavbar";
import Footer from "viaticos/Footer";
import Table from "viaticos/Tables/Table";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import useProveedorData from "./data/proveedorTableData";
import Icon from "@mui/material/Icon";
import SoftButton from "../../components/SoftButton";


function Proveedores() {
const dataArray=useProveedorData();
    const tablaData = dataArray.props.children[0];
     const dialogoDelete = dataArray.props.children[1];
    const dialogoEdit = dataArray.props.children[2];
     const dialogoNew = dataArray.props.children[3];
     const botonNew = dataArray.props.children[4];
    const mensaje=dataArray.props.children[5]

    const columns = [
        { name: "idProveedor", headerName: "ID", align: "left" },
        { name: "ruc", headerName: "RUC", align: "left" },
        { name: "nombreProveedor", headerName: "Nombre", align: "left" },
        { name: "descripcionProveedor", headerName: "Descripción", align: "left" },
        { name: "categoria", headerName: "Categoría", align: "left" },
        { name: "action", headerName: "Acciones", align: "center" },
        // Agrega otras columnas según sea necesario
    ];


    return (

        <DashboardLayout>
            {dialogoDelete}
            {dialogoEdit}
            {dialogoNew}
            <DashboardNavbar />
            <SoftBox py={3}>
                <SoftBox mb={3}>
                    {mensaje}
                    <Card>
                        <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                            <SoftTypography variant="h6">Proveedores</SoftTypography>
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
                            <Table columns={columns} rows={tablaData} />


                        </SoftBox>
                    </Card>
                </SoftBox>
            </SoftBox>
            <Footer />
        </DashboardLayout>
    );
}

export default Proveedores;
