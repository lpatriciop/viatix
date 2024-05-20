import React from 'react';
import PropTypes from 'prop-types';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import IconButton from '@mui/material/IconButton';
import { PictureAsPdf } from '@mui/icons-material';
import CircularProgress from '@mui/material/CircularProgress';

// Definición correcta de estilos con @react-pdf/renderer
const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        backgroundColor: '#E4E4E4',
        padding: 10,
    },
    table: {
        display: 'table',
        width: '100%',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
    },
    tableRow: {
        flexDirection: 'row',
    },
    tableCell: {
        margin: 'auto',
        marginTop: 5,
        marginBottom: 5,
        fontSize: 12,
        padding: 5,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000',
    },
});

const PDFExportButton = ({ columns, rows }) => {
    const MyDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.table}>
                    {columns.map((column, columnIndex) => (
                        <View key={`header-${columnIndex}`} style={styles.tableRow}>
                            <Text style={styles.tableCell}>{column.headerName}</Text>
                        </View>
                    ))}
                    {rows.map((row, rowIndex) => (
                        <View key={`row-${rowIndex}`} style={styles.tableRow}>
                            {columns.map((column, columnIndex) => (
                                <Text key={`cell-${rowIndex}-${columnIndex}`} style={styles.tableCell}>
                                    {row[column.name]}
                                </Text>
                            ))}
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );

    const fileName = 'document.pdf';

    return (
        <PDFDownloadLink document={<MyDocument />} fileName={fileName}>
            {({ loading }) => (
                <IconButton title="Descargar en PDF" size="medium">
                    {loading ? <CircularProgress size={24} /> : <PictureAsPdf color="error" />}
                </IconButton>
            )}
        </PDFDownloadLink>
    );
};

PDFExportButton.propTypes = {
    columns: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            headerName: PropTypes.string.isRequired,
        })
    ).isRequired,
    rows: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default PDFExportButton;
