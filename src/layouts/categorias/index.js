// Categorias.js
import React from "react";
import { Card } from "@mui/material";
import DashboardLayout from "viaticos/LayoutContainers/DashboardLayout";
import DashboardNavbar from "viaticos/Navbars/DashboardNavbar";
import Footer from "viaticos/Footer";
import Table from "viaticos/Tables/Table";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import useCategoriasData from "./data/categoriasTableData";
import Icon from "@mui/material/Icon";
import SoftButton from "../../components/SoftButton";


function Categorias() {
const categoriasArray=useCategoriasData();
    const categoriasData = categoriasArray.props.children[0];
    const dialogoDelete = categoriasArray.props.children[1];
    const dialogoEdit = categoriasArray.props.children[2];
    const dialogoNew = categoriasArray.props.children[3];
    const botonNew = categoriasArray.props.children[4];
    const mensaje=categoriasArray.props.children[5]
    const columns = [
        { name: "idCategoria", headerName: "ID", align: "left" },
        { name: "nombreCategoria", headerName: "CATEGORIA", align: "left" },
        { name: "action",headerName: "Acciones", align: "center" },
        // Agrega otras columnas según sea necesario
    ];

    return (

        <DashboardLayout>
            {dialogoDelete}
            {dialogoEdit}
            {dialogoNew}

            <DashboardNavbar />
            <SoftBox py={3}>
                {mensaje}
                <SoftBox mb={3}>
                    <Card>
                        <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                            <SoftTypography variant="h6">Categorías</SoftTypography>
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
                            <Table columns={columns} rows={categoriasData} />


                        </SoftBox>
                    </Card>
                </SoftBox>
            </SoftBox>
            <Footer />
        </DashboardLayout>
    );
}

export default Categorias;
