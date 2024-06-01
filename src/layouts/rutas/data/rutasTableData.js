
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
  ArrowForward,
  CheckBox,
  CheckCircle,
  Dangerous,
  GridOn,
  PersonAdd,
  Recycling,
  Warning,
} from "@mui/icons-material";
import SoftButton from "../../../components/SoftButton";
import {IconButton, InputLabel, MenuItem, TextField} from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import Alert from '@mui/material/Alert';
import swal from 'sweetalert';


function useRutasData(reload) {

  const endpoint = API_URL + "/rutas";
  const [data,setData]=useState([]);
  const token = localStorage.getItem("token");
  const [deleteItemId, setDeleteItemId] = useState(false);
  //ELIMINAR
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
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
      const response = await fetch(`${API_URL}/rutas/${deleteItemId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
      //  console.log(`Item con ID ${deleteItemId} eliminada exitosamente`);

        swal("Éxito","Ruta eliminada satisfactoriamente.","success")
        fetchData();
      } else {

       swal("Error","Error al eliminar la ruta, no se puede eliminar rutas con clientes asignados.","error")
      //  console.error('Error al eliminar item');
      }
    } catch (error) {
      swal("Error","Error al procesar la solicitud de eliminación. \n Revise si la salida tiene clientes asignados.","error")
    //  console.log(error);
      //console.error('Error al procesar la solicitud de eliminación:', error);
    } finally {
      setDeleteItemId(null);
      setDeleteDialogOpen(false);
    }
  };
//ASIGNAR
  const [asignarAlerta, setAsignarAlerta] = useState(false);
  const [mensajeAlerta, setMensajeAlerta] = useState('OK');
  const [tipoAlerta, setTipoAlerta] = useState('success');


  const [editItemId, setEditItemId] = useState([]);
  const [editDialogoAsignar, setEditDialogoAsignar] = useState(false);
  const handleAsignar = async () => {

   try {
     if(true){
       // console.log(JSON.stringify({
       //   cliente:{idCliente:cliente.idCliente},
       //   ruta:{id:editItemId.id},
       //   montoMaximoGasto: '0'
       //}));

     }else{
       setMensajeAlerta("Error los campos son obligatorios");
       setTipoAlerta("error");
       setAsignarAlerta(true);
       return;
     }

     const response = await fetch(`${API_URL}/clienteRutas`,{
       method:'POST',
       headers:{
         'Content-Type': 'application/json',
         Authorization: `Bearer ${token}`,
       },
       body: JSON.stringify({
         cliente:{idCliente:cliente.idCliente},
         ruta:{id:editItemId.id},
         montoMaximoGasto: '0'
       }),
     });
     if(response.ok){

       // setMensajeAlerta(`Cliente ${cliente.nombre} Asignado Satisfactoriamente`)
       // setTipoAlerta("success");
       //setAsignarAlerta(true);
       swal("Éxito",`Cliente ${cliente.nombre} Asignado Satisfactoriamente`,"success")
      // console.log("empleadoSalida Creado");
     }else{
       swal("Error",`Error al asignar cliente.`,"error");

     }
   }catch (error){
     swal("Error",`Error al procesar solicitud ${error}`,"error");
    // console.error("error al procesar solicitud " + error)
   }finally {
     setEditDialogoAsignar(false);
   }


  };
  const handleCancelAsignar = () => {
    setEditDialogoAsignar(false);
  };

  const [clientes, setClientes] = useState([]);
  const [cliente, setCliente] = useState([]);


  //FIN ASIGNAR
  const endpointComplemento = API_URL + "/clientes";


  const handleClickAsignar=(e,item)=>{
    e.preventDefault();
    setEditItemId(item)
    setEditDialogoAsignar(true)
  }

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
        //console.log(fetchedData);
        const dataWithActions = fetchedData.map(item => ({
          id: item.id,
          descripcion:item.descripcion,
          ciudad: item.ciudad.nombreCiudad,
          pais: item.ciudad.pais.nombrePais,
          fecha: new Date(item.fecha[0], item.fecha[1] - 1, item.fecha[2]).toLocaleDateString(),

          valor:   item.valor.toLocaleString("es-ES", {
              style: "currency",
              currency: "USD",
            }),
          vendedor:item.empleado.nombre + " " + item.empleado.apellido,
          estado:  item.estado ?<p title="Activo"><CheckCircle  color="success" fontSize="small" /></p>  : <p title="Inactivo"><Dangerous  color="error" fontSize="small" /></p> ,
          action: (
              <>
                <IconButton
                    onClick={(e) => handleClickAsignar(e,item)}
                    title="Asignar Cliente"
                    size="small"
                    disabled={!item.estado}
                ><PersonAdd color={item.estado?"primary":"light"} />
                </IconButton>
                <IconButton
                    href={`#/detaruta/${item.id}`}
                    style={{marginRight: 8}}
                    size="small"
                   // onClick={(e) => handleClickDetalle(e,item)}
                    title="Ir a detalle..."
                ><GridOn color="success"/>
                </IconButton>
                <IconButton
                    onClick={(e) => handleDelete(e,item.id)}
                    title="Eliminar"
                    size="small"
                ><DeleteIcon  color="error"/>
                </IconButton>
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
          const clientesNC = dataComp.map(cliente => ({
            idCliente: cliente.idCliente,
            nombre: `${cliente.ruc} ${cliente.nombre} ${cliente.nombreComercial || ''}`,
            mail:cliente.mail,
          }));

          setClientes(clientesNC);
          setCliente(clientesNC[0]);
        } else {
          setClientes([{"idCliente": "-1", "nombre": "No existen clientes"}]);
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
        maxWidth="sm" // Ajusta el tamaño máximo del diálogo
        fullWidth // Asegura que el diálogo ocupe todo el ancho disponible

    >
      <DialogTitle id="edit-dialog-title" >
        Asignar Cliente a Ruta
      </DialogTitle>
      <DialogContent>
        <InputLabel id="complemento-label">RUTA:
        {editItemId.length !== 0 && (
            <SoftTypography>{editItemId.descripcion}</SoftTypography>
        )}
       Asignar Cliente:</InputLabel>
        <br />
        <Autocomplete
            options={clientes}
            getOptionLabel={(cliente) => cliente.nombre}
            value={cliente}
            onChange={(event, newValue) => { setCliente(newValue) }}
            renderInput={(params) => <TextField {...params} label="Clientes" fullWidth />}
           // sx={{ width: '110%' }}
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
    <Dialog
        open={deleteDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm" // Ajusta el tamaño máximo del diálogo
        fullWidth // Asegura que el diálogo ocupe todo el ancho disponible
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
            onClick={()=>handleConfirmDelete()}
            variant="gradient"
            color="error"
            fontWeight="medium"
        >
          Eliminar
        </SoftButton >
      </DialogActions>
    </Dialog>
  </>);
}

export default useRutasData;