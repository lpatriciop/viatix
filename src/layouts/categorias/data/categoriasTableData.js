// useCategoriasData.js
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
import {TextField} from "@mui/material";
import Alert from "@mui/material/Alert";



function useCategoriasData() {
  const endpoint = API_URL + "/categorias";
  const [data, setData] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(false);
  //--
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editItemId, setEditItemId] = useState(null);
  const [categoriaValue,setCategoriaValue]=useState();
  //--
  const [newDialogOpen, setNewDialogOpen] = useState(false);
  const [newItemId, setNewItemId] = useState(null);
  const [newCategoriaValue,setNewCategoriaValue]=useState();

  const token = localStorage.getItem("token");

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
      const response = await fetch(`${API_URL}/categorias/${deleteItemId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        //console.log(`Categoría con ID ${deleteItemId} eliminada exitosamente`);
        setMensajeAlerta(`Categoría eliminada exitosamente`);
        setTipoAlerta("success");
        setAsignarAlerta(true);
        fetchData();
      } else {
        setMensajeAlerta("Error al eliminar la categoría. No se puede eliminar si está en uso.");
        setTipoAlerta("error");
        setAsignarAlerta(true);

        console.error('Error al eliminar la categoría');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud de eliminación:', error);
    } finally {
      setDeleteItemId(null);
      setDeleteDialogOpen(false);
    }
  };
// FIN ELIMINAR
//EDITAR
  const handleEdit = (e,item) => {
    e.preventDefault();
    setEditItemId(item);
    setCategoriaValue(item.nombreCategoria);
    setEditDialogOpen(true);
  };
  const handleCancelEdit = () => {
    setEditItemId(null);
    setEditDialogOpen(false);
  };
  const handleConfirmEdit = async (id) => {

    try {
      // Aquí debes obtener el valor actualizado del campo de edición, ya sea utilizando un estado local o un estado global
      // Ejemplo con un estado local:
       const updatedCategoriaValue = categoriaValue;

      // Realiza la lógica para guardar la edición, por ejemplo, enviar una solicitud PUT al backend
      const response = await fetch(`${API_URL}/categorias/${id.idCategoria}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombreCategoria: updatedCategoriaValue,
          // Otros campos actualizados si los hay
        }),
      });

      if (response.ok) {
       // console.log(`Categoría con ID ${id} editada exitosamente`);
        // Actualiza el estado o vuelve a cargar los datos después de la edición
        setMensajeAlerta(`Categoría editada exitosamente`);
        setTipoAlerta("success");
        setAsignarAlerta(true);
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
  const handleNew = (item) => {

    setNewItemId(item);
    setNewCategoriaValue("");
    setNewDialogOpen(true);
  };
  const handleCancelNew = () => {
    setNewItemId(null);
    setNewDialogOpen(false);
  };
  const handleConfirmNew = async () => {

    try {


      // Realiza la lógica para guardar la edición, por ejemplo, enviar una solicitud PUT al backend
      const response = await fetch(`${API_URL}/categorias`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({

          nombreCategoria: newCategoriaValue,
          // Otros campos actualizados si los hay
        }),
      });

      if (response.ok) {
        // console.log(`Categoría  exitosamente`);
        setMensajeAlerta(`Categoría creada exitosamente`);
        setTipoAlerta("success");
        setAsignarAlerta(true);
        fetchData();
      } else {
        console.error('Error al editar la categoría');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud de edición:', error);
    } finally {
      setNewItemId(null);
      setNewDialogOpen(false);
    }
  };


  const fetchData = async () => {
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
          ...item,
          action: (
              <>
                <SoftTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="success"
                    fontWeight="medium"
                    style={{ marginRight: 8 }}
                    onClick={(e)=>handleEdit(e,item)}

                >
                  <EditIcon />
                  &nbsp;Editar
                </SoftTypography>

                <SoftTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="error"
                    fontWeight="medium"
                    onClick={(e)=>handleDelete(e,item.idCategoria)}
                >
                  <DeleteIcon />&nbsp;Eliminar
                </SoftTypography>
              </>
          ),
        }));
        setData(dataWithActions);
         //console.log(dataWithActions);
      } else {
        console.error('Error fetching data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {

    fetchData();

  }, []); // Empty dependency array to run the effect only once
  const [asignarAlerta, setAsignarAlerta] = useState(false);
  const [mensajeAlerta, setMensajeAlerta] = useState('OK');
  const [tipoAlerta, setTipoAlerta] = useState('success');
  useEffect(() => {
    const timer = setTimeout(() => {
      setAsignarAlerta(false);
    }, 3000); // 3000 milisegundos = 3 segundos

    return () => clearTimeout(timer);
  }, [asignarAlerta]);
//  return data;
  return (
      <>
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
            Editar Categoría
          </DialogTitle>
          <DialogContent>
            {/* Campo de edición para la categoría */}
            <TextField

                label="Categoría"
                //variant="outlined"
                fullWidth
                  // Puedes usar un estado para almacenar el valor del campo de edición
                value={categoriaValue} onChange={(e) => setCategoriaValue(e.target.value)}
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
            Crea Nueva Categoría
          </DialogTitle>
          <DialogContent>
            {/* Campo de edición para la categoría */}
            <TextField

                label="Categoría"
                //variant="outlined"
                fullWidth
                // Puedes usar un estado para almacenar el valor del campo de edición
                value={newCategoriaValue} onChange={(e) => setNewCategoriaValue((e.target.value))}
            />
          </DialogContent>
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
        <Add /> &nbsp;Nueva Categoría
        </SoftButton>
        {asignarAlerta && (<Alert severity={tipoAlerta} >
          {mensajeAlerta}
        </Alert>)}
      </>
  );
}

export default useCategoriasData;