
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
  Abc, AbcSharp,
  Add,
  ArtTrack,
  AssignmentInd, BrandingWatermark,
  Email,
  GridOn,
  Icecream, Password,
  Person,
  PlusOne,
  Warning
} from "@mui/icons-material";
import SoftButton from "../../../components/SoftButton";
import {InputLabel, Select, TextField, MenuItem, IconButton,InputAdornment} from "@mui/material";
import Grid from "@mui/material/Grid";
import SoftAlert from "../../../components/SoftAlert";



function useEmpleadosData() {
  const endpoint = API_URL + "/empleados";
  const [data,setData]=useState([]);
  const token = localStorage.getItem("token");
  const [error, setError] = useState('');

//DEL
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(false);
  //ELIMINAR
  const handleDelete = (e,id) => {
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
      const response = await fetch(`${API_URL}/empleados/${deleteItemId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setAlertMessage(`Empleado con ID ${deleteItemId} eliminado exitosamente`);
        setShowAlert(true);setColorAlert("success");
     //   console.log(`Empleado con ID ${deleteItemId} eliminada exitosamente`);
        fetchData();
      } else {
        setAlertMessage(`No se puede eliminar un empleado, si tiene registrados viáticos o si es Admministrador`);
        setShowAlert(true);setColorAlert("error");
       // console.error('Error al eliminar empleado');
      }
    } catch (error) {
      setAlertMessage(`Error al procesar la solicitud.`);
      setShowAlert(true);setColorAlert("error");
      //console.error('Error al procesar la solicitud de eliminación:', error);
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

  const handleEdit = (e,item) => {
    e.preventDefault();
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
        console.log(updateEditFields);
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

        setAlertMessage(`Empleado con ID ${id.idEmpleado} editada exitosamente`);
        setShowAlert(true);setColorAlert("success");
       // console.log(`Empleado con ID ${id.idEmpleado} editada exitosamente`);
        // Actualiza el estado o vuelve a cargar los datos después de la edición
        fetchData();
      } else {
        setAlertMessage(`Empleado no se pudo editar`);
        setShowAlert(true);setColorAlert("error");
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
        setAlertMessage(`Empleado creado exitosamente`);
        setShowAlert(true);setColorAlert("success");
    //    console.log(`Empleado  exitosamente`);
        // Actualiza el estado o vuelve a cargar los datos después de la edición
        fetchData();
      } else {
        setAlertMessage(`Error al crear el empleado`);
        setShowAlert(true);setColorAlert("error");
      //  console.error('Error al editar el empleado');
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
          idEmpleado: item.idEmpleado,
          dni: item.dni,
          // nombre: `${item.nombre} ${item.apellido}`,
          nombre: `${item.nombre}`,
          apellido: item.apellido,
          username: item.username,
          password: item.password,
          departamento: item.departamento.nombreDepartamento,
          // enabled: item.enabled,
          role: item.role,
          action: (
              <>

                <IconButton
                  //  href={`#/detalle/${item.id}`}
                    style={{marginRight: 8}}
                    size="small"
                    onClick={(e) => handleEdit(e,item)}
                    title="Editar Empleado"
                ><EditIcon color="success"/>
                </IconButton>
                <IconButton
                    href={`#/gastos/${item.idEmpleado}`}
                    style={{marginRight: 8}}
                    size="small"
                    // onClick={(e) => handleClickDetalle(e,item)}
                    title="Detalle de Gastos"
                ><ArtTrack color="monto"/>
                </IconButton>
                <IconButton
                    //  href={`#/detalle/${item.id}`}
                    style={{marginRight: 8}}
                    size="small"
                    onClick={(e) => handleDelete(e,item.idEmpleado)}
                    title="Eliminar Empleado?"
                ><DeleteIcon color="error"/>
                </IconButton>

              </>
          ),
        }));
        setData(dataWithActions);
        //console.log(dataWithActions);

      }else {

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

  //ALERTAS:
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [colorAlert, setColorAlert] = useState();
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3000); // 3000 milisegundos = 3 segundos

    return () => clearTimeout(timer);
  }, [showAlert]);
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
        Confirmar eliminación
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          ¿Está seguro de eliminar este ítem?
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
        <SoftTypography variant="h5" fontWeight="medium">
        <EditIcon/> Editar Empleado
        </SoftTypography>


      </DialogTitle>

      <DialogContent>
        {/* Separación */}
        <div style={{ marginBottom: "16px" }}></div>
        <TextField
            label="Cedula"
            fullWidth
            value={editFields.dni}
            required
            onChange={(e) => setEditFields({ ...editFields, dni: e.target.value })}
            InputProps={{
              startAdornment: (
                  <InputAdornment position="start">
                    <AssignmentInd/>
                  </InputAdornment>
              ),
            }}
        />
        {/* Separación */}
        <div style={{ marginBottom: "16px" }}></div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
                label="Nombre"
                fullWidth
                value={editFields.nombre}
                required
                onChange={(e) => setEditFields({ ...editFields, nombre: e.target.value })}
                InputProps={{
                  startAdornment: (
                      <InputAdornment position="start">
                        <Abc />
                      </InputAdornment>
                  ),
                }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
                label="Apellido"
                fullWidth
                value={editFields.apellido}
                required
                onChange={(e) => setEditFields({ ...editFields, apellido: e.target.value })}
                InputProps={{
                  startAdornment: (
                      <InputAdornment position="start">
                        <AbcSharp />
                      </InputAdornment>
                  ),
                }}
            />
          </Grid>
        </Grid>
        {/* Separación */}
        <div style={{ marginBottom: "16px" }}></div>
        <TextField
            type="email"
            label="Correo"   fullWidth
            value={editFields.username}
            required
            onChange={(e) => setEditFields({...editFields,username:e.target.value})}
            InputProps={{
              startAdornment: (
                  <InputAdornment position="start">
                    <Email/>
                  </InputAdornment>
              ),
            }}
        />

        <SoftTypography variant="caption" fontWeight="medium">Rol</SoftTypography>
        <Select
            label="Rol"
            value={editFields.role}
            onChange={(e) => setEditFields({ ...editFields, role: e.target.value })}
            fullWidth
        >
          <MenuItem value="USER">Usuario</MenuItem>
          <MenuItem value="ADMIN">Administrador</MenuItem>
        </Select>
        {/* Separación */}
        <div style={{ marginBottom: "16px" }}></div>
        <TextField
            type="password"
            label="Password"
            fullWidth
            required
            value={editFields.password}
            onChange={(e) => setEditFields({ ...editFields, password: e.target.value })}
            InputProps={{
              startAdornment: (
                  <InputAdornment position="start">
                    <Password/>
                  </InputAdornment>
              ),
            }}
        />
        {/* Separación */}
        <div style={{ marginBottom: "16px" }}></div>
        <TextField
            type="password"
            label="Confirmar Password"
            fullWidth
            required
            value={editFields.password}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            InputProps={{
              startAdornment: (
                  <InputAdornment position="start">
                    <Password/>
                  </InputAdornment>
              ),
            }}
        />
        <SoftTypography variant="caption" fontWeight="medium">Departamento</SoftTypography>
        <Select
            labelId="departamento-label"
            id="departamento"
            value={editFields.departamento}
            onChange={(e) => setEditFields({ ...editFields, departamento: e.target.value })}
            fullWidth
            disabled={departamentos.length === 0}
        >
          {departamentos.map((departamento) => (
              <MenuItem key={departamento} value={departamento} selected={editFields.departamento === departamento.idDepartamento}>
                {departamento.nombreDepartamento}
              </MenuItem>
          ))}
        </Select>
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
       <BrandingWatermark/> Crea Nuevo Empleado
      </DialogTitle>
      <DialogContent>
        {/* Separación */}
        <div style={{ marginBottom: "16px" }}></div>
        <TextField
            label="Cedula"
            fullWidth
            value={editFields.dni}
            required
            onChange={(e) => setEditFields({ ...editFields, dni: e.target.value })}
            InputProps={{
              startAdornment: (
                  <InputAdornment position="start">
                    <AssignmentInd/>
                  </InputAdornment>
              ),
            }}
        />
        {/* Separación */}
        <div style={{ marginBottom: "16px" }}></div>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
                label="Nombre"
                fullWidth
                value={editFields.nombre}
                required
                onChange={(e) => setEditFields({ ...editFields, nombre: e.target.value })}
                InputProps={{
                  startAdornment: (
                      <InputAdornment position="start">
                        <Abc />
                      </InputAdornment>
                  ),
                }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
                label="Apellido"
                fullWidth
                value={editFields.apellido}
                required
                onChange={(e) => setEditFields({ ...editFields, apellido: e.target.value })}
                InputProps={{
                  startAdornment: (
                      <InputAdornment position="start">
                        <AbcSharp />
                      </InputAdornment>
                  ),
                }}
            />
          </Grid>
        </Grid>
        {/* Separación */}
        <div style={{ marginBottom: "16px" }}></div>
        <TextField
            type="email"
            label="Correo"   fullWidth
            value={editFields.username}
            required
            onChange={(e) => setEditFields({...editFields,username:e.target.value})}
            InputProps={{
              startAdornment: (
                  <InputAdornment position="start">
                    <Email/>
                  </InputAdornment>
              ),
            }}
        />

        <SoftTypography variant="caption" fontWeight="medium">Rol</SoftTypography>
        <Select
            label="Rol"
            value={editFields.role}
            onChange={(e) => setEditFields({ ...editFields, role: e.target.value })}
            fullWidth
        >
          <MenuItem value="USER">Usuario</MenuItem>
          <MenuItem value="ADMIN">Administrador</MenuItem>
        </Select>
        {/* Separación */}
        <div style={{ marginBottom: "16px" }}></div>
        <TextField
            type="password"
            label="Password"
            fullWidth
            required
            value={editFields.password}
            onChange={(e) => setEditFields({ ...editFields, password: e.target.value })}
            InputProps={{
              startAdornment: (
                  <InputAdornment position="start">
                    <Password/>
                  </InputAdornment>
              ),
            }}
        />
        {/* Separación */}
        <div style={{ marginBottom: "16px" }}></div>
        <TextField
            type="password"
            label="Confirmar Password"
            fullWidth
            required
            value={editFields.password}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            InputProps={{
              startAdornment: (
                  <InputAdornment position="start">
                    <Password/>
                  </InputAdornment>
              ),
            }}
        />
        <SoftTypography variant="caption" fontWeight="medium">Departamento</SoftTypography>
        <Select
            labelId="departamento-label"
            id="departamento"
            value={editFields.departamento}
            onChange={(e) => setEditFields({ ...editFields, departamento: e.target.value })}
            fullWidth
            disabled={departamentos.length === 0}
        >
          {departamentos.map((departamento) => (
              <MenuItem key={departamento} value={departamento} selected={editFields.departamento === departamento.idDepartamento}>
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

    <SoftButton variant="gradient" color="dark"  onClick={handleNew}>
      <Add /> &nbsp;Nuevo Empleado
    </SoftButton>

    {showAlert && (
        <SoftAlert color={colorAlert} dismissible>
          {alertMessage}
        </SoftAlert>)}
  </>);
}

export default useEmpleadosData;