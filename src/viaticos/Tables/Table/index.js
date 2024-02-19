/**
 =========================================================
 * Soft UI Dashboard React - v4.0.1
 =========================================================

 * Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
 * Copyright 2023 Creative Tim (https://www.creative-tim.com)

 Coded by www.creative-tim.com

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 */

import { useMemo } from "react";
import { useState } from "react";
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// uuid is a library for generating unique id
import { v4 as uuidv4 } from "uuid";

// @mui material components
import {Table as MuiTable, TablePagination} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftAvatar from "components/SoftAvatar";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React base styles
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";
import SoftInput from "../../../components/SoftInput";
import {navbarRow} from "../../Navbars/DashboardNavbar/styles";
import SoftButton from "../../../components/SoftButton";
import IconButton from "@mui/material/IconButton";
import ExcelExportButton from "../Excel";

function Table({ columns, rows }) {
  //Busqueda:
  const [searchValue, setSearchValue] = useState("");
  //paginacion>
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = rows.filter((row) => {
      // Filtrar las filas según el valor de búsqueda

      if (searchValue === "") {
          return true; // Mostrar todas las filas si no hay valor de búsqueda
      } else {
          // Filtrar las filas que contengan el valor de búsqueda en alguna de sus columnas
          return columns.some(({ name }) => {
              if (Array.isArray(row[name])) {

                  return row[name][1].toLowerCase().includes(searchValue.toLowerCase());
              } else if (typeof row[name] === "string") { // Check if the value is a string

                  return row[name].toLowerCase().includes(searchValue.toLowerCase());
              } else {
                  return false; // Skip non-string values
              }
          });
      }
  }).slice(indexOfFirstRow, indexOfLastRow);

  const { light } = colors;
  const { size, fontWeightBold } = typography;
  const { borderWidth } = borders;

  const renderColumns = columns.map(({ name,headerName, align, width }, key) => {
    let pl;
    let pr;

    if (key === 0) {
      pl = 3;
      pr = 3;
    } else if (key === columns.length - 1) {
      pl = 3;
      pr = 3;
    } else {
      pl = 1;
      pr = 1;
    }

    return (
        <SoftBox
            key={name}
            component="th"
            width={width || "auto"}
            pt={1.5}
            pb={1.25}
            pl={align === "left" ? pl : 3}
            pr={align === "right" ? pr : 3}
            textAlign={align}
            fontSize={size.xxs}
            fontWeight={fontWeightBold}
            color="secondary"
            opacity={0.7}
            borderBottom={`${borderWidth[1]} solid ${light.main}`}
        >
          {headerName.toUpperCase()}
        </SoftBox>
    );
  });

  //const renderRows = rows.map((row, key) => {
  const renderRows = currentRows.map((row, key) => {
  const rowKey = `row-${key}`;

  const tableRow = columns.map(({ name, align }) => {
      let template;

      if (Array.isArray(row[name])) {
        template = (
            <SoftBox
                key={uuidv4()}
                component="td"
                p={1}
                borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
            >
              <SoftBox display="flex" alignItems="center" py={0.5} px={1}>
                <SoftBox mr={2}>
                  <SoftAvatar src={row[name][0]} name={row[name][1]} variant="rounded" size="sm" />
                </SoftBox>
                <SoftTypography variant="button" fontWeight="medium" sx={{ width: "max-content" }}>
                  {row[name][1]}
                </SoftTypography>
              </SoftBox>
            </SoftBox>
        );
      } else {
        template = (
            <SoftBox
                key={uuidv4()}
                component="td"
                p={1}
                textAlign={align}
                borderBottom={row.hasBorder ? `${borderWidth[1]} solid ${light.main}` : null}
            >
              <SoftTypography
                  variant="button"
                  fontWeight="regular"
                  color="secondary"
                  sx={{ display: "inline-block", width: "max-content" }}
              >
                {row[name]}
              </SoftTypography>
            </SoftBox>
        );
      }

      return template;
    });

    return <TableRow key={rowKey}>{tableRow}</TableRow>;
  });

  return useMemo(
      () => (
          <TableContainer>
              <SoftBox display="flex" >
                  <SoftBox pr={0.3} width="50%">
                      <SoftInput
                          key={"search"}
                          placeholder="Buscar..."
                          icon={{ component: "search", direction: "left" }}
                          onChange={(e) => setSearchValue(e.target.value)}
                      />
                  </SoftBox>
                  <SoftBox pr={0.5} width="50%" >
                      <ExcelExportButton data={rows}/>
                  </SoftBox>
              </SoftBox>
            <MuiTable>
              <SoftBox component="thead">
                <TableRow>{renderColumns}</TableRow>
              </SoftBox>
              <TableBody>{renderRows}</TableBody>

            </MuiTable>
            <TablePagination
                rowsPerPageOptions={[]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={currentPage - 1}
                // onPageChange={(event, newPage) => setCurrentPage(newPage + 1)}
                onPageChange={(event, newPage) => {
                 // console.log("Nueva página: ", newPage + 1);
                  setCurrentPage(newPage + 1);
                 // console.log(currentPage)
                }}
                onRowsPerPageChange={(event) => {
                  setRowsPerPage(parseInt(event.target.value, 10));
                  setCurrentPage(1);
                }}
            />
          </TableContainer>

      ),
      [columns, rows,currentPage,rowsPerPage,currentRows]
  );
}

// Setting default values for the props of Table
Table.defaultProps = {
  columns: [],
  rows: [{}],
};

// Typechecking props for the Table
Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  rows: PropTypes.arrayOf(PropTypes.object),
};

export default Table;
