
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

import {Add, CheckBox, Icecream, PlusOne, Warning} from "@mui/icons-material";
import SoftButton from "../../../components/SoftButton";
import {InputLabel, MenuItem, Select, TextField} from "@mui/material";


function useSalidasData(reload) {
  const endpoint = API_URL + "/salidas";
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
//ASIGNAR
  const [editFields, setEditFields] = useState({
    descripcionSalidad: "",
    ciudadOrigen:"",
    ciudadDestino: "",
    fechaSalida: "",
    fechaRegreso: "",
    gastoEstimado: "0.0",
  });
  const [editItemId, setEditItemId] = useState(null);
  const [editDialogoAsignar, setEditDialogoAsignar] = useState(false);
  const handleAsignar = (item) => {

    setEditItemId(item);
    setEditFields({
      idSalida: item.idSalida,
      ciudadOrigen: item.ciudadOrigen,
      ciudadDestino: item.ciudadDestino,
      fechaSalida: item.fechaSalida,
      fechaRegreso: item.fechaRegreso,
      gastoEstimado: item.gastoEstimado,
      estado: item.estado,
    });

    setEditDialogoAsignar(true);
  };
  const handleCancelAsignar = () => {
    setEditItemId(null);
    setEditDialogoAsignar(false);
  };
  const [empleado, setEmpleado] = useState(null);
  const [empleados, setEmpleados] = useState([]);
  //FIN ASIGNAR
  const endpointComplemento = API_URL + "/empleados";
  const handleCancelDelete = () => {
    setDeleteItemId(null);
    setDeleteDialogOpen(false);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`${API_URL}/salidas/${deleteItemId}`, {
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
  const handleEdit = (item) => {

    setEditItemId(item);
    setEditFields({
      idSalida: item.idSalida,
      ciudadOrigen: item.ciudadOrigen,
      ciudadDestino: item.ciudadDestino,
      fechaSalida: item.fechaSalida,
      fechaRegreso: item.fechaRegreso,
      gastoEstimado: item.gastoEstimado,
      estado: item.estado,
    });

    setEditDialogOpen(true);
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
       // console.log(fetchedData);
        const dataWithActions = fetchedData.map(item => ({
          idSalida: item.idSalida,
          descripcionSalida:item.descripcionSalida,
          ciudadOrigen: item.ciudadOrigen.nombreCiudad,
          ciudadDestino: item.ciudadDestino.nombreCiudad,
          fechaSalida: new Date(item.fechaSalida[0], item.fechaSalida[1] - 1, item.fechaSalida[2]).toLocaleDateString(),
          fechaRegreso: new Date(item.fechaRegreso[0], item.fechaRegreso[1] - 1, item.fechaRegreso[2]).toLocaleDateString(),
          gastoEstimado: item.gastoEstimado,
          estado: <CheckBox checked={item.estado} />,
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
                    onClick={() => handleAsignar(item.idSalida)}
                >
                  <DeleteIcon/>&nbsp;Asignar
                </SoftTypography>
              </>
          ),
        }));
        setData(dataWithActions);
        // console.log(dataWithActions);
      } else {
        console.error('Error fetching data');
      }
    }catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
       fetchData();

    },[reload] ); // Empty dependency array to run the effect only once
  // const fetchDataComplemento=async()=>{
  //   try {
  //     const response=await fetch(endpointComplemento,
  //         {
  //           method: 'GET',
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         });
  //     if(response.ok){
  //       const dataComp=await response.json();
  //       dataComp.length>0?setEmpleados(dataComp)
  //           :setEmpleados([{"idEmpleado":"-1","nombreCompleto":"No existen empleados"}]);
  //
  //     }else {
  //       console.error('Error fetching data');
  //     }
  //   }catch (error){
  //     console.error('Error fetching data:', error);
  //   }
  // };
  // useEffect(() => {
  // //  fetchDataComplemento();
  //   //  console.log(newDialogOpen,departamentos);
  // }, [editDialogoAsignar]);
  return (<>
    {data}
<></>

  </>);
}

export default useSalidasData;