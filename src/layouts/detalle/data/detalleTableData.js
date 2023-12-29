
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

import {Add, ArrowBack, Icecream, PlusOne, Warning} from "@mui/icons-material";
import SoftButton from "../../../components/SoftButton";
import {InputLabel, Select, TextField,MenuItem} from "@mui/material";
import Alert from "@mui/material/Alert";



function useDetalleData({idSalida}) {

  const [asignarAlerta, setAsignarAlerta] = useState(false);
  const [mensajeAlerta, setMensajeAlerta] = useState('OK');
  const [tipoAlerta, setTipoAlerta] = useState('success');

  const [data,setData]=useState([]);
  const token = localStorage.getItem("token");
  const [error, setError] = useState('');
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
        setMensajeAlerta("Error al eliminar salida, no se puede eliminar salida con empleados asignados.");
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

  //editar
  //EDITAR

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
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

  const handleEdit = (item) => {

    setEditItemId(item);
    setEditFields({
      nombre: item.nombre,
      username: item.username,
      apellido: item.apellido,
      departamento: item.departamento,
      role:item.role,
      password:item.password,
      dni:item.dni,
    })

    setEditDialogOpen(true);
  };
  const handleCancelEdit = () => {
    setEditItemId(null);
    setEditDialogOpen(false);
  };
  const handleConfirmEdit = async (id) => {

    try {
            const updateEditFields=editFields;
      // Realiza la lógica para guardar la edición, por ejemplo, enviar una solicitud PUT al backend
      const response = await fetch(`${API_URL}/empleados/${id.idEmpleado}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre: updateEditFields.nombre,
          apellido:updateEditFields.apellido,
          username: updateEditFields.username,
          role:updateEditFields.role,
          password:updateEditFields.password,
          dni:updateEditFields.dni,
          departamento:updateEditFields.departamento
          // Otros campos actualizados si los hay
        }),
      });

      if (response.ok) {
        console.log(`Empleado con ID ${id.idEmpleado} editada exitosamente`);
        // Actualiza el estado o vuelve a cargar los datos después de la edición
        fetchData();
      } else {
        console.error('Error al editar la categoría');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud de edición:', error);
    } finally {
      setEditItemId(null);
      setEditDialogOpen(false);
    }
  };

  //NEW

  //--
  const [newDialogOpen, setNewDialogOpen] = useState(false);
  const [newItemId, setNewItemId] = useState(null);
  const [departamentos, setDepartamentos] = useState([]);
  const endpointDepar = API_URL + "/departamentos";

  const handleNew = (item) => {
    setNewItemId(item);
    setEditFields({
      nombre: "",
      username: "",
      apellido: "",
      departamento: 1,
      role:"USER",
      password:"",
      dni:"",
    })
    setNewDialogOpen(true);
  };
  const handleCancelNew = () => {
    setNewItemId(null);
    setNewDialogOpen(false);
  };
  const handleConfirmNew = async () => {

    try {

      if (
          editFields.nombre.trim() === '' ||
          editFields.apellido.trim() === '' ||
          editFields.username.trim() === '' ||
          editFields.role.trim() === '' ||
          editFields.password.trim() === '' ||
          editFields.dni.trim() === ''
      ) {
        setError('Por favor, complete todos los campos obligatorios.');
        return;
       }

      // Realiza la lógica para guardar la edición, por ejemplo, enviar una solicitud PUT al backend
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
      //    Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({

          nombre: editFields.nombre,
          apellido:editFields.apellido,
          email: editFields.username,
          role:editFields.role,
          password:editFields.password,
          dni:editFields.dni,
          idDepartamento:editFields.departamento
        }),
      });

      if (response.ok) {
        console.log(`Empleado  exitosamente`);
        // Actualiza el estado o vuelve a cargar los datos después de la edición
        fetchData();
      } else {
        console.error('Error al editar el empleado');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud de edición:', error);
    } finally {
      setNewItemId(null);

    }
    setNewDialogOpen(false);
  };
  const fetchDataDepartamento=async()=>{
    try {
      const response=await fetch(endpointDepar,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      if(response.ok){
        const dataDepar=await response.json();
        dataDepar.length>0?setDepartamentos(dataDepar):setDepartamentos([{"idDepartamento":"-1","nombreDepartamento":"No departamentos disponibles"}])

      }else {
        console.error('Error fetching data');
      }
    }catch (error){
      console.error('Error fetching data:', error);
    }
  };

  const fetchData= async ()=> {
    const endpoint = `${API_URL}/empleadoSalidas/salida/${idSalida}`;
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
          idEmpleadoSalida: item.id,
           dni: item.empleado.dni,
          nombre: `${item.empleado.nombre} ${item.empleado.apellido}`,
           apellido: item.empleado.apellido,
           // username: item.empleado.username,
           // password: item.empleado.password,
           departamento: item.empleado.departamento.nombreDepartamento,
          // enabled: item.enabled,
        //   role: item.empleado.role,
          action: (
              <>
                <SoftTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="success"
                    fontWeight="medium"
                    style={{marginRight: 8}}
                    onClick={() => handleEdit(item)}

                >
                  <EditIcon/>
                  &nbsp;Editar
                </SoftTypography>

                <SoftTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="error"
                    fontWeight="medium"
                    onClick={(e) => handleDelete(e,item.id)}
                >
                  <ArrowBack/>&nbsp;Retirar
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
    }, []); // Empty dependency array to run the effect only once
  useEffect(() => {
        fetchDataDepartamento();
   //  console.log(newDialogOpen,departamentos);
  }, [newDialogOpen]);

  //pass
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const validatePassword = () => {
    return editFields.password === passwordConfirm;
  };
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
    <Dialog
        open={editDialogOpen}
        onClose={handleCancelEdit}
        aria-labelledby="edit-dialog-title"
        aria-describedby="edit-dialog-description"
    >
      <DialogTitle id="edit-dialog-title">
        Editar Empleado
      </DialogTitle>
      <DialogContent>
        {/* Campo de edición para la categoría */}
        <TextField     label="Nombre"   fullWidth
            value={editFields.nombre}
            onChange={(e) => setEditFields({...editFields,nombre:e.target.value})}
        />
        <TextField     label="Apellido"   fullWidth
                       value={editFields.apellido}
                       onChange={(e) => setEditFields({...editFields,apellido:e.target.value})}
        />
        <TextField     label="Correo"   fullWidth
                       value={editFields.username}
                       onChange={(e) => setEditFields({...editFields,username:e.target.value})}
        />
        <TextField     label="Rol"   fullWidth
                       value={editFields.role}
                       onChange={(e) => setEditFields({...editFields,role:e.target.value})}
        />
      </DialogContent>
      <DialogActions>
        <SoftButton
            onClick={handleCancelEdit}
            variant="gradient"
            color="secondary"
            fontWeight="medium"
        >
          Cancelar
        </SoftButton>
        <SoftButton

            onClick={() => handleConfirmEdit(editItemId)}
            variant="gradient"
            color="success"
            fontWeight="medium"
        >
          Guardar
        </SoftButton>
      </DialogActions>
    </Dialog>
    <Dialog
        open={newDialogOpen}
        onClose={handleCancelNew}
        aria-labelledby="edit-dialog-title"
        aria-describedby="edit-dialog-description"
    >
      <DialogTitle id="edit-dialog-title">
        Crea Nuevo Empleado
      </DialogTitle>
      <DialogContent>
        <TextField     label="Cedula"
                       fullWidth
                       value={editFields.dni}
                       required
                       onChange={(e) => setEditFields({...editFields,dni:e.target.value})}
        />
        <TextField     label="Nombre"   fullWidth
                       value={editFields.nombre}
                       required
                       onChange={(e) => setEditFields({...editFields,nombre:e.target.value})}
        />
        <TextField     label="Apellido"   fullWidth
                       value={editFields.apellido}
                       required
                       onChange={(e) => setEditFields({...editFields,apellido:e.target.value})}
        />
        <TextField
                       type="email"
                       label="Correo"   fullWidth
                       value={editFields.username}
                       required
                       onChange={(e) => setEditFields({...editFields,username:e.target.value})}
        />
        <InputLabel id="role-label">ROL</InputLabel>
        <Select
            label="Rol"
            value={editFields.role}
            onChange={(e) => setEditFields({ ...editFields, role: e.target.value })}
            fullWidth
        >
          <MenuItem value="USER">Usuario</MenuItem>
          <MenuItem value="ADMIN">Administrador</MenuItem>
        </Select>
        <TextField
            type="password"
            label="Password"
            fullWidth
            required
            value={editFields.password}
            onChange={(e) => setEditFields({ ...editFields, password: e.target.value })}
        />
        <TextField
            type="password"
            label="Confirmar Password"
            fullWidth
            required
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <InputLabel id="departamento-label">Departamento</InputLabel>
        <Select
            labelId="departamento-label"
            id="departamento"
            value={editFields.departamento}
            onChange={(e) => setEditFields({ ...editFields, departamento: e.target.value })}
            fullWidth
            disabled={departamentos.length === 0}
        >
         {departamentos.map((departamento) => (
              <MenuItem key={departamento.idDepartamento} value={departamento.idDepartamento} selected>
                {departamento.nombreDepartamento}
              </MenuItem>
          ))}
        </Select>
      </DialogContent>
      <DialogContentText style={{ color: 'red' }}>&nbsp;{error}</DialogContentText>
      <DialogActions>
        <SoftButton
            onClick={handleCancelNew}
            variant="gradient"
            color="secondary"
            fontWeight="medium"
        >
          Cancelar
        </SoftButton>
        <SoftButton

            onClick={() => handleConfirmNew()}
            variant="gradient"
            color="success"
            fontWeight="medium"
        >
          Guardar
        </SoftButton>
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