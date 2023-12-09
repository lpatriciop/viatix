
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

import {Add, Icecream, PlusOne, Warning} from "@mui/icons-material";
import SoftButton from "../../../components/SoftButton";
import {InputLabel, Select, TextField,MenuItem} from "@mui/material";



function useProveedorData() {
  const endpoint = API_URL + "/proveedores";
  const [data,setData]=useState([]);
  const token = localStorage.getItem("token");
  const [error, setError] = useState('');
//DEL
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(false);
  //ELIMINAR
  const handleDelete = async (id) => {
    setDeleteItemId(id);
    setDeleteDialogOpen(true);
  };
  const handleCancelDelete = () => {
    setDeleteItemId(null);
    setDeleteDialogOpen(false);
  };
  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/proveedores/${deleteItemId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log(`Item con ID ${deleteItemId} eliminada exitosamente`);
        fetchData();
      } else {
        console.error('Error al eliminar item');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud de eliminación:', error);
    } finally {
      setDeleteItemId(null);
      setDeleteDialogOpen(false);
    }
  };

  //editar
  const [newDialogOpen, setNewDialogOpen] = useState(false);
  const [newItemId, setNewItemId] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const endpointComplemento = API_URL + "/categorias";
  //EDITAR

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [editFields, setEditFields] = useState({
    ruc: "",
    nombreProveedor: "",
    descripcionProveedor: "",
    categoria: "",
    // Otros campos de edición si los hay
  });

  const handleEdit = (item) => {

    setEditItemId(item);
    setEditFields({
      ruc: item.ruc,
      nombreProveedor: item.nombreProveedor,
      descripcionProveedor: item.descripcionProveedor,
      categoria: item.categoria.nombreCategoria,
    });

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
      const response = await fetch(`${API_URL}/proveedores/${id.idProveedor}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ruc: updateEditFields.ruc,
          nombreProveedor:updateEditFields.nombreProveedor,
          descripcionProveedor: updateEditFields.descripcionProveedor,
          categoria:updateEditFields.categoria
          // Otros campos actualizados si los hay
        }),
      });

      if (response.ok) {
        console.log(`Item con ID ${id.idProveedor} editado exitosamente`);
        // Actualiza el estado o vuelve a cargar los datos después de la edición
        fetchData();
      } else {
        console.error('Error al editar proveedor');
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


  const handleNew = (item) => {
    setNewItemId(item);
    setNewDialogOpen(true);
    setEditFields({
      ruc: "",
      nombreProveedor: "",
      descripcionProveedor: "",
      categoria: categorias.length > 0 ? categorias[0].nombreCategoria : "",
    })

  };
  const handleCancelNew = () => {
    setNewItemId(null);
    setNewDialogOpen(false);
  };
  const handleConfirmNew = async () => {

    try {

      if (
          editFields.ruc.trim() === '' ||
          editFields.nombreProveedor.trim() === '' ||
          editFields.descripcionProveedor.trim() === ''


      ) {
        setError('Por favor, complete todos los campos obligatorios.');
        return;
       }

      // Realiza la lógica para guardar la edición, por ejemplo, enviar una solicitud PUT al backend
      const response = await fetch(`${API_URL}/proveedores?categoriaId=${editFields.categoria}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({

          ruc: editFields.ruc,
          nombreProveedor:editFields.nombreProveedor,
          descripcionProveedor: editFields.descripcionProveedor,
          //categoriaId:editFields.categoria,

        }),
      });

      if (response.ok) {
        console.log(`Item creado  exitosamente`);
        // Actualiza el estado o vuelve a cargar los datos después de la edición
        fetchData();
      } else {
        console.error('Error al editar el item');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud de edición:', error);
    } finally {
      setNewItemId(null);

    }
    setNewDialogOpen(false);
  };
  const fetchDataComplemento=async()=>{
    try {
      const response=await fetch(endpointComplemento,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      if(response.ok){
        const dataComp=await response.json();
        dataComp.length>0?setCategorias(dataComp)
            :setCategorias([{"idCategoria":"-1","nombreCategoria":"No existen categorias"}]);

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
          idProveedor: item.idProveedor,
           ruc: item.ruc,
          nombreProveedor: item.nombreProveedor,
           descripcionProveedor: item.descripcionProveedor,

          // enabled: item.enabled,
           categoria: item.categoria.nombreCategoria,
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
                    onClick={() => handleDelete(item.idEmpleado)}
                >
                  <DeleteIcon/>&nbsp;Eliminar
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
        fetchDataComplemento();
   //  console.log(newDialogOpen,departamentos);
  }, [newDialogOpen,editDialogOpen]);


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
        Editar
      </DialogTitle>
      <DialogContent>

        <TextField     label="RUC"   fullWidth
                       value={editFields.ruc}
                       onChange={(e) => setEditFields({...editFields,ruc:e.target.value})}
        />
        <TextField     label="Nombre"   fullWidth
            value={editFields.nombreProveedor}
            onChange={(e) => setEditFields({...editFields,nombreProveedor:e.target.value})}
        />
        <TextField     label="Descripcion"   fullWidth
                       value={editFields.descripcionProveedor}
                       onChange={(e) => setEditFields({...editFields,descripcionProveedor:e.target.value})}
        />
        <InputLabel id="complemento-label">Categoria</InputLabel>
        <Select
            labelId="complemento-label"
            id="complemento"
            value={editFields.categoria}
            onChange={(e) => setEditFields({ ...editFields, categoria: e.target.value })}
            fullWidth
            disabled={categorias.length === 0}
        >
          {categorias.map((categorias) => (
              <MenuItem key={categorias.idCategoria} value={categorias.nombreCategoria}>
                {categorias.nombreCategoria}
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
        Crea Nuevo Proveedor
      </DialogTitle>
      <DialogContent>
        <TextField     label="RUC"   fullWidth
                       value={editFields.ruc}
                       onChange={(e) => setEditFields({...editFields,ruc:e.target.value})}
        />
        <TextField     label="Nombre"   fullWidth
                       value={editFields.nombreProveedor}
                       onChange={(e) => setEditFields({...editFields,nombreProveedor:e.target.value})}
        />
        <TextField     label="Descripcion"   fullWidth
                       value={editFields.descripcionProveedor}
                       onChange={(e) => setEditFields({...editFields,descripcionProveedor:e.target.value})}
        />
        <InputLabel id="complemento-label">Categoria</InputLabel>
        <Select
            labelId="complemento-label"
            id="complemento"
//            value={editFields.categoria??"Escoja una categoria"}
            value={editFields.categoria || ""}

            onChange={(e) => setEditFields({ ...editFields, categoria: e.target.value })}
            fullWidth
            disabled={categorias.length === 0}
        >
          {categorias.map((categorias) => (
              <MenuItem key={categorias.idCategoria} value={categorias.idCategoria}>
                {categorias.nombreCategoria}
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
      <Add /> &nbsp;Nuevo
    </SoftButton>
  </>);
}

export default useProveedorData;