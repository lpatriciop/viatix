import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

import {
    Table as MuiTable,
    TableBody,
    TableContainer,
    TableRow,
    TableCell,
    IconButton, TablePagination
} from "@mui/material";
import {ExpandMore, ExpandLess, Web, TravelExplore, Map} from "@mui/icons-material";

import SoftBox from "components/SoftBox";
import SoftAvatar from "components/SoftAvatar";
import SoftTypography from "components/SoftTypography";
import colors from "assets/theme/base/colors";
import typography from "assets/theme/base/typography";
import borders from "assets/theme/base/borders";
import {API_URL} from "../../../config";
import SoftButton from "../../../components/SoftButton";
import SoftInput from "../../../components/SoftInput";
import ExcelExportButton from "../Excel";
const token = localStorage.getItem("token");

function TableGastos({ columns, rows,idEmpleado}) {
 //   console.log("IDEMEPLEADO>",idEmpleado);
    const idE=idEmpleado;
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
//GEOCODING INVERSE:
    const getReverseGeocoding = async (ubicacion) => {

        const [latitude, longitude] = ubicacion.split(",");
        const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (response.ok) {
                const address = data.address;
                const city = address.city || address.town || address.village || address.hamlet;
                const fullAddress = `${address.road || ''} ${address.house_number || ''}, ${city}, ${address.country}`;
              //  console.log(fullAddress);
                return fullAddress;
            } else {
                throw new Error(data.error || 'Failed to fetch reverse geocoding data');
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    };
    const [expandedRows, setExpandedRows] = useState([]);
    const [rowDetails, setRowDetails] = useState({});
    const { light } = colors;
    const { size, fontWeightBold } = typography;
    const { borderWidth } = borders;
    const fetchRowDetails = async (rowId,idS,idE) => {

        const endpoint = `${API_URL}/viaticos/empleado/${idE.idEmpleado}/salida/${idS}`;

        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.ok){
            const details = await response.json();
            // Convertir la coordenada espacial en dirección utilizando getReverseGeocoding
            const updatedDetails = await Promise.all(details.map(async (detail) => {
                const [latitude, longitude] = detail.ubicacion.split(",");
                const address = await getReverseGeocoding(detail.ubicacion);
                return { ...detail, address,latitude,longitude };
            }));

            setRowDetails(prevDetails => ({ ...prevDetails, [rowId]: updatedDetails }));
        }

    };
    const handleRowClick = (row,rowId,ide) => {



        const isCurrentlyExpanded = expandedRows.includes(rowId);
        if (!isCurrentlyExpanded) {
            fetchRowDetails(rowId,row.idSalida,ide);
        }
        setExpandedRows(prevRows =>
            isCurrentlyExpanded
                ? prevRows.filter(id => id !== rowId)
                : [...prevRows, rowId]
        );
    };
    const renderColumns = useMemo(() => columns.map(({ name, headerName, align, width }, key) => {
        {
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
        }
    }), [columns]);
    const renderDetailRow = (rowId) => {
        const details = rowDetails[rowId];
        // console.log(details);
        if (!details) {
            return <TableRow key={`nodata-${rowId}`} ><TableCell>Cargando...</TableCell></TableRow>;
        }
        const totalMonto = details.reduce((total, detail) => total + detail.monto, 0);
        // Renderiza los detalles de la fila aquí
        return(
        <>
            <TableRow  key={`header-${rowId}`}   >
                {/* Agrega aquí las celdas del encabezado */}
                <TableCell><SoftTypography variant="body2" fontWeight="bold" fontSize={size.xxs}>FECHA</SoftTypography></TableCell>
                <TableCell><SoftTypography variant="body2" fontWeight="bold" fontSize={size.xxs}>CONCEPTO</SoftTypography></TableCell>
                <TableCell><SoftTypography variant="body2" fontWeight="bold" fontSize={size.xxs}>PROVEEDOR</SoftTypography></TableCell>
                <TableCell><SoftTypography variant="body2" fontWeight="bold" fontSize={size.xxs}>CATEGORÍA</SoftTypography>
                </TableCell><TableCell><SoftTypography variant="body2" fontWeight="bold" fontSize={size.xxs}>UBICACIÓN</SoftTypography>
                </TableCell><TableCell><SoftTypography variant="body2" fontWeight="bold" fontSize={size.xxs}>EVIDENCIA</SoftTypography>
                </TableCell><TableCell><SoftTypography variant="body2" fontWeight="bold" fontSize={size.xxs}>MONTO</SoftTypography></TableCell>

            </TableRow>

            {details.map((detail, index) => (
                <TableRow key={`detail-${rowId}-${index}`}>

                    <TableCell><SoftTypography variant="body2" color="info" fontSize={size.xxs}>{detail.fecha}</SoftTypography></TableCell>
                    <TableCell><SoftTypography variant="body2"  fontSize={size.xxs}>{detail.concepto}</SoftTypography></TableCell>
                    <TableCell><SoftTypography variant="body2"  fontSize={size.xxs}>{detail.proveedor.nombreProveedor}</SoftTypography></TableCell>
                    <TableCell><SoftTypography variant="body2"  fontSize={size.xxs}>{detail.proveedor.categoria.nombreCategoria}</SoftTypography></TableCell>
                    <TableCell>
                        <SoftTypography variant="body2"  fontSize={size.xxs}>
                            <a title={"Ver Ubicación en Mapa..."}
                               // href={`https://www.openstreetmap.org/?mlat=${detail.latitude}&mlon=${detail.longitude}&zoom=15`}
                               href={`https://www.google.com/maps/search/?api=1&query=${detail.latitude},${detail.longitude}`}
                               target="_blank" rel="noreferrer">{detail.address}</a>
                        <IconButton
                            title={"Ver Ubicación en Mapa..."}
                            //https://www.google.com/maps/@-2.6381782,-80.393133,15.75z?entry=ttu
                            // href={`https://www.google.com/maps/@${detail.ubicacion},15z`}
                            href={`https://www.google.com/maps/search/?api=1&query=${detail.latitude},${detail.longitude}`}
                            target="_blank" rel="noreferrer">
                            <Map/>
                        </IconButton>
                        </SoftTypography>
                    </TableCell>

                    <TableCell>
                        <SoftTypography variant="body2" fontSize={size.xxs}>
                            <a
                                title={"Ver Imagen.."}
                                href={`${API_URL}/viaticos/imagen/${detail.idViatico}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <img
                                    src={`${API_URL}/viaticos/imagen/${detail.idViatico}`}
                                    alt={detail.evidencia}
                                    style={{ maxWidth: "100px" }}
                                />
                            </a>
                        </SoftTypography>
                    </TableCell>
                    <TableCell><SoftTypography variant="body2" color="monto" fontWeight="bold" fontSize={size.xxs}>{detail.monto.toLocaleString("es-ES", { style: "currency", currency: "USD" })}</SoftTypography></TableCell>

                </TableRow>
            ))}
            <TableRow key={`footer-${rowId}`} >
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell><SoftTypography variant="body2" color="monto" fontWeight="bold" fontSize={size.xxs}>TOTAL:</SoftTypography></TableCell>
                <TableCell>
                    <SoftTypography variant="body2" color="primary" fontWeight="bold" fontSize={size.xxs}>
                        {totalMonto.toLocaleString("es-ES", { style: "currency", currency: "USD" })}
                    </SoftTypography>
                </TableCell>
            </TableRow>
        </>
        );
    };
    const renderRows = currentRows.map((row, key) => {
        const isRowExpanded = expandedRows.includes(key);
      //  const rowKey = `row-${key}`;

        // ... (tu código existente para renderizar la fila principal)
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
        // Código para renderizar la fila detallada (colapsable)


        return (
            <>
                <TableRow key={`rowi-${key}`} onClick={() => handleRowClick(row,key,idE)}>
                    {tableRow}
                    <TableCell>
                        <IconButton size="small">
                            {isRowExpanded ? <ExpandLess /> : <ExpandMore />}
                        </IconButton>
                    </TableCell>
                </TableRow>
                {isRowExpanded && renderDetailRow(key)}
            </>
        );
    });

    return (
        <TableContainer>
            <SoftBox display="flex">
                <SoftBox pr={0.3} width="50%">
                    <SoftInput
                        key={"search"}
                        placeholder="Buscar..."
                        icon={{ component: "search", direction: "left" }}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                </SoftBox>
                <SoftBox pr={0.5} width="50%">
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
               //     console.log("Nueva página: ", newPage + 1);
                    setCurrentPage(newPage + 1);
               //     console.log(currentPage)
                }}
                onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 10));
                    setCurrentPage(1);
                }}
            />
        </TableContainer>
    );
}

// Setting default values for the props of Table
TableGastos.defaultProps = {
    columns: [],
    rows: [{}],
};

// Typechecking props for the Table
TableGastos.propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object),
    rows: PropTypes.arrayOf(PropTypes.object),
    idEmpleado:PropTypes.number.isRequired
};


export default TableGastos;
