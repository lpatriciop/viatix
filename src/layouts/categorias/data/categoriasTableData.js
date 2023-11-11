// useCategoriasData.js
import { useState, useEffect,useRef } from "react";
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
import Button from "@mui/material/Button";
import {Warning} from "@mui/icons-material";

function useCategoriasData() {
  const endpoint = API_URL + "/categorias";
  const [data, setData] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(false);
  const token = localStorage.getItem("token");

//eliminar
  const handleDelete = async (id) => {

    setDeleteItemId(id);
    setDeleteDialogOpen(true);
  };
  const handleCancelDelete = () => {
    setDeleteItemId(null);
    setDeleteDialogOpen(false);
  };
  //fin eliminar
  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/categorias/${deleteItemId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        console.log(`Categoría con ID ${deleteItemId} eliminada exitosamente`);
        fetchData();
      } else {
        console.error('Error al eliminar la categoría');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud de eliminación:', error);
    } finally {
      setDeleteItemId(null);
      setDeleteDialogOpen(false);
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
                    onClick={()=>handleDelete(item.idCategoria)}
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
            <Button
                onClick={handleCancelDelete}
                variant="outlined"
                color="primary"
                fontWeight="medium"
            >
              Cancelar
            </Button>
            <Button
                onClick={handleConfirmDelete}
                variant="contained"
                color="error"
                fontWeight="medium"
            >
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </>
  );
}

export default useCategoriasData;