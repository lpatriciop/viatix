
import { useState, useEffect } from "react";
import { API_URL } from "../../../config";
import SoftTypography from "../../../components/SoftTypography";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
//import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

import {
  Add,
  ArrowBack,
  CheckCircle,
  Dangerous,
  Description,
  Icecream,
  PersonRemove,
  PlusOne,
  Warning
} from "@mui/icons-material";
import SoftButton from "../../../components/SoftButton";
import {InputLabel, Select, TextField,MenuItem} from "@mui/material";
import Alert from "@mui/material/Alert";



function useDetalleData({idEmpleado}) {

  const [asignarAlerta, setAsignarAlerta] = useState(false);
  const [mensajeAlerta, setMensajeAlerta] = useState('OK');
  const [tipoAlerta, setTipoAlerta] = useState('success');

  const [data,setData]=useState([]);
  const token = localStorage.getItem("token");

//DEL
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(false);
  //ELIMINAR
  const handleDelete = async (e,id) => {
    e.preventDefault();
    setDeleteItemId(id);
    setDeleteDialogOpen(true);
  };
  const handleCancelDelete = () => {
    setDeleteItemId(null);
    setDeleteDialogOpen(false);
  };
  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/empleadoSalidas/${deleteItemId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setMensajeAlerta(`Empleado Retirado exitosamente`);
        setTipoAlerta("success");
        setAsignarAlerta(true);
        //console.log(`Empleado con ID ${deleteItemId} eliminada exitosamente`);
        fetchData();
      } else {
        setMensajeAlerta("Error al retirar empleado. No se puede si tiene registrados gastos.");
        setTipoAlerta("error");
        setAsignarAlerta(true);
      }
    } catch (error) {
      console.error('Error al procesar la solicitud de eliminación:', error);
    } finally {
      setDeleteItemId(null);
      setDeleteDialogOpen(false);
    }
  };

  const [editFields, setEditFields] = useState({
    nombre: "",
    username:"",
    apellido:"",
    departamento:0,
    role:"",
    password:"",
    dni:"",
    // Otros campos de edición si los hay
  });



  const handleNew = (item) => {
   // setNewItemId(item);
    setEditFields({
      nombre: "",
      username: "",
      apellido: "",
      departamento: 1,
      role:"USER",
      password:"",
      dni:"",
    })
  //  setNewDialogOpen(true);
  };
  const fetchData= async ()=> {
    const endpoint = `${API_URL}/empleadoSalidas/empleado/todas/${idEmpleado}`;

    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const fetchedData = await response.json();

        const dataWithActions = fetchedData.map(item => ({
          idSalida: item.idSalida,
          descripcionSalida:item.descripcionSalida,
          ciudadOrigen: item.ciudadOrigen.nombreCiudad,
          ciudadDestino: item.ciudadDestino.nombreCiudad,
          fechaSalida: new Date(item.fechaSalida[0], item.fechaSalida[1] - 1, item.fechaSalida[2]).toLocaleDateString(),
          fechaRegreso: new Date(item.fechaRegreso[0], item.fechaRegreso[1] - 1, item.fechaRegreso[2]).toLocaleDateString(),
          gastoReal:   item.gastoReal.toLocaleString("es-ES", {
            style: "currency",
            currency: "USD",
          }),
          estado:  item.estado ?<p title="Activo"><CheckCircle  color="success" fontSize="small" /></p>  : <p title="Inactivo"><Dangerous  color="error" fontSize="small" /></p> ,
          action: (
              <>
                <SoftTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="error"
                    fontWeight="medium"
                    onClick={(e) => handleDelete(e,item.id)}
                >
                  <PersonRemove/>&nbsp;Retirar
                </SoftTypography>
              </>
          ),
        }));
        setData(dataWithActions);
        //console.log(dataWithActions);
      } else {
        console.error('Error fetching data');
      }
    }catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
       fetchData();
    }, [idEmpleado]); // Empty dependency array to run the effect only once

  useEffect(() => {
    const timer = setTimeout(() => {
      setAsignarAlerta(false);
    }, 3000); // 3000 milisegundos = 3 segundos

    return () => clearTimeout(timer);
  }, [asignarAlerta]);

  return (<>
    {data}
    <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Warning color="warning" style={{ marginRight: 8 }} />
        Confirmar Retiro de Empleado
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          ¿Está seguro de retirar el empleado de la salida?
          <br/>Solo lo podrá hacer, si no tiene un viático asignado aún.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <SoftButton
            onClick={handleCancelDelete}
            variant="gradient"
            color="secondary"
            fontWeight="medium"
        >
          Cancelar
        </SoftButton >
        <SoftButton
            onClick={handleConfirmDelete}
            variant="gradient"
            color="error"
            fontWeight="medium"
        >
          Eliminar
        </SoftButton >
      </DialogActions>
    </Dialog>
    {asignarAlerta && (<Alert severity={tipoAlerta} >
      {mensajeAlerta}
    </Alert>)}
    <SoftButton variant="gradient" color="dark"  onClick={handleNew}>
      <Add /> &nbsp;Asignar
    </SoftButton>
  </>);
}

export default useDetalleData;