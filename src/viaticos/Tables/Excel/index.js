import React from 'react';
import * as XLSX from 'xlsx';
import PropTypes from 'prop-types';
import IconButton from "@mui/material/IconButton";
import Grid2 from "@mui/material/Unstable_Grid2";
import DeleteIcon from "@mui/icons-material/Delete";
import {Download} from "@mui/icons-material";
const ExcelExportButton = ({ data }) => {
    const exportToExcel = () => {

        try {
            // Create a new workbook
            const workbook = XLSX.utils.book_new();

            // Convert the table data to a worksheet
            const worksheet = XLSX.utils.json_to_sheet(data);

            // Add the worksheet to the workbook
            XLSX.utils.book_append_sheet(workbook, worksheet, "Tabla de Salidas");

            // Generate the Excel file
            const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });

            // Create a Blob for download
            const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");

            // Get the current React route path
            const currentPath = window.location.href;
            const parts = currentPath.split("/");
            const lastPart = parts[parts.length - 1];

            // Set the download filename with the current route path
            a.download = lastPart + ".xlsx";
            a.href = url;
            // a.download = "tabla_salidas.xlsx";
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Error exporting to Excel:", error);
        }
    };

    return (
        // <IconButton onClick={exportToExcel}></IconButton>
    <IconButton
        onClick={exportToExcel}
        title="Descargar en Excel"
        size="medium"
    ><Download  color="success"/>
    </IconButton>
    );


};
ExcelExportButton.propTypes= {
    data: PropTypes.arrayOf(PropTypes.object).isRequired
};
export default ExcelExportButton;
