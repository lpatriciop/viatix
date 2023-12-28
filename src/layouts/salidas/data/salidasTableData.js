
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
import {  ArrowForward,  CheckBox,  GridOn,} from "@mui/icons-material";
import SoftButton from "../../../components/SoftButton";
import {InputLabel, MenuItem,TextField} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Alert from '@mui/material/Alert';


function useSalidasData(reload) {

  const endpoint = API_URL + "/salidas/ordenada";
  const [data,setData]=useState([]);
  const token = localStorage.getItem("token");
  const [deleteItemId, setDeleteItemId] = useState(false);
  //ELIMINAR
  const handleDelete = async (id) => {
    setDeleteItemId(id);
    setDeleteDialogOpen(true);
  };
//ASIGNAR
  const [asignarAlerta, setAsignarAlerta] = useState(false);
  const [mensajeAlerta, setMensajeAlerta] = useState('OK');
  const [tipoAlerta, setTipoAlerta] = useState('success');

  const [editFields, setEditFields] = useState({
    descripcionSalidad: "",
    ciudadOrigen:"",
    ciudadDestino: "",
    fechaSalida: "",
    fechaRegreso: "",
    gastoEstimado: "0.0",
  });
  const [editItemId, setEditItemId] = useState([]);
  const [editDialogoAsignar, setEditDialogoAsignar] = useState(false);
  const handleAsignar = async () => {

   try {
     if(true){

     }else{
       setMensajeAlerta("Error los campos son obligatorios");
       setTipoAlerta("error");
       setAsignarAlerta(true);
       return;
     }

     const response = await fetch(`${API_URL}/empleadoSalidas`,{
       method:'POST',
       headers:{
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
       },
       body: JSON.stringify({
         empleado:empleado,
         salida:editItemId,
         montoMaximoGasto:'100'
       }),
     });
     if(response.ok){

       setMensajeAlerta(`Empleado ${empleado.nombreCompleto} Asignado Satisfactoriamente`)
       setTipoAlerta("success");
       setAsignarAlerta(true);

      // console.log("empleadoSalida Creado");
     }else{
       setMensajeAlerta(`Error al asignar al empleado ${empleado.nombreCompleto}`)
       setTipoAlerta("error");
       setAsignarAlerta(true);
     }
   }catch (error){
     console.error("error al procesar solicitud")
   }finally {
     setEditDialogoAsignar(false);
   }


  };
  const handleCancelAsignar = () => {
    setEditDialogoAsignar(false);
  };


  const [empleados, setEmpleados] = useState([]);
  const [empleado, setEmpleado] = useState([]);
 // const [empleado, setEmpleado] = useState(empleados.length > 0 ? empleados[0].idEmpleado : '');

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
  const handleClickAsignar=(e,item)=>{
    e.preventDefault();
    setEditItemId(item)
    setEditDialogoAsignar(true)
  }
  const  handleClickDetalle=(e,item)=>{

  }
  const fetchData= async ()=> {
    try {
      const response = await fetch(endpoint+"?orderBy=fechaSalidaD", {
        method: 'POST',
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
                    href={`#/detalle/${item.idSalida}`}
                    variant="caption"
                    color="success"
                    fontWeight="medium"
                    style={{marginRight: 8}}
                   // onClick={(e) => handleClickDetalle(e,item)}

                >
                  <GridOn/>
                  &nbsp;Detalles
                </SoftTypography>

                <SoftTypography
                    component="a"
                    href="#"
                    variant="caption"
                    color="secondary"
                    fontWeight="medium"
                    onClick={(e) => handleClickAsignar(e,item)}
                >
                  <ArrowForward/>&nbsp;Asignar
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
        // dataComp.length>0?setEmpleados(dataComp)
        //     :setEmpleados([{"idEmpleado":"-1","nombreCompleto":"No existen empleados"}]);

        if (dataComp.length > 0) {
          const empleadosConNombreCompleto = dataComp.map(empleado => ({
            idEmpleado: empleado.idEmpleado,
            nombreCompleto: `${empleado.nombre} ${empleado.apellido}`,
            role:empleado.role,
          }));

          setEmpleados(empleadosConNombreCompleto);

        } else {
          setEmpleados([{"idEmpleado": "-1", "nombreCompleto": "No existen empleados"}]);
        }
      }else {
        console.error('Error fetching data');
      }
    }catch (error){
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    fetchDataComplemento();
    //  console.log(newDialogOpen,departamentos);
  }, [editDialogoAsignar]);
  useEffect(() => {
    const timer = setTimeout(() => {
      setAsignarAlerta(false);
    }, 3000); // 3000 milisegundos = 3 segundos

    return () => clearTimeout(timer);
  }, [asignarAlerta]);

  return (<>
    {data}
    <Dialog
     open={editDialogoAsignar}
     onClose={handleCancelAsignar}
    aria-labelledby="edit-dialog-title"
    aria-describedby="edit-dialog-description"
    >
      <DialogTitle id="edit-dialog-title">
        Asignar Empleado a Salida
      </DialogTitle>
      <DialogContent>
        <InputLabel id="complemento-label">SALIDA:</InputLabel>
        <SoftTypography>{editItemId.descripcionSalida}</SoftTypography>
        <InputLabel >Asignar Empleado:</InputLabel>
        <br/>
        <Autocomplete
            options={empleados}
            getOptionLabel={(empleado) => empleado.nombreCompleto}
            value={empleado}
            onChange={(event,newValue)=>{setEmpleado(newValue)}}
            renderInput={(params) => <TextField {...params} label="Empleados" />}
            fullWidth
        />


      </DialogContent>
      <DialogActions>
        <SoftButton
            onClick={handleCancelAsignar}
            variant="gradient"
            color="secondary"
            fontWeight="medium"
        >
          Cancelar
        </SoftButton>
        <SoftButton
            alt="Asignar Empleado a Salida"
            onClick={() => handleAsignar()}
            variant="gradient"
            color="success"
            fontWeight="medium"
        >
          Asignar
        </SoftButton>
      </DialogActions>
    </Dialog>
    {asignarAlerta && (<Alert severity={tipoAlerta} >
      {mensajeAlerta}
    </Alert>)}
  </>);
}

export default useSalidasData;