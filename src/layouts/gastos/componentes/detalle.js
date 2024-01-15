import React from "react";
import { Card, Typography, List, ListItem, ListItemText } from "@mui/material";

function DetallesSalida({ salida, empleados }) {
    return (
        <Card>
            <Typography variant="h6" gutterBottom>
                Detalles de la Salida
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Descripción: {salida.descripcionSalidad}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Ciudad Origen: {salida.ciudadOrigen}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Ciudad Destino: {salida.ciudadDestino}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Fecha de Salida: {salida.fechaSalida}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Fecha de Regreso: {salida.fechaRegreso}
            </Typography>
            <Typography variant="subtitle1" gutterBottom>
                Gasto Estimado: {salida.gastoEstimado}
            </Typography>

            <Typography variant="h6" gutterBottom>
                Empleados Asignados
            </Typography>
            <List>
                {empleados.map((empleado) => (
                    <ListItem key={empleado.id}>
                        <ListItemText primary={empleado.nombre} />
                    </ListItem>
                ))}
            </List>
        </Card>
    );
}

export default DetallesSalida;