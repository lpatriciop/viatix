
import { useState, useEffect } from "react";
import { API_URL } from "../../../config";
import SoftTypography from "../../../components/SoftTypography";

import {
  LocationOn, Visibility,

} from "@mui/icons-material";
import PropTypes from "prop-types";




useDetalleData.propTypes={
  // criterio: PropTypes.string.isRequired,
 // datosCargados:PropTypes.boolean.isRequired,
  setDatosCargados:PropTypes.func.isRequired,
}

function useDetalleData(criterio,setDatosCargados) {
//  setDatosCargados(false);
  const [data,setData]=useState([]);
  const token = localStorage.getItem("token");

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
  const fetchData= async ()=> {
    setDatosCargados(false);
    const endpoint = criterio;

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
          id: item.idViatico,
          empleado:item.empleadoSalida.empleado.nombre + " " +item.empleadoSalida.empleado.apellido,
          salida: item.empleadoSalida.salida.descripcionSalida,
          fechaGasto: new Date(item.fecha).toLocaleDateString(),
          concepto: item.concepto,
          categoria: item.proveedor.categoria.nombreCategoria,
          proveedor: item.proveedor.nombreProveedor,
          estado: item.estado,
          // monto: item.monto.toLocaleString("es-ES", { style: "currency", currency: "USD" }),
          monto: item.monto,
          evidencia: item.evidencia,

          action: (
              <>
                <SoftTypography
                    title="Ver Evidencia"
                    component="a"
                    href={`${API_URL}/viaticos/imagen/${item.idViatico}`}
                    target="_blank"
                    variant="caption"
                    color="success"
                    fontWeight="medium"
                >
                  <Visibility />&nbsp;
                </SoftTypography>


                &nbsp;|&nbsp;
                <SoftTypography
                    title={"Ver Ubicación"}
                    component="a"
                    href={`https://www.google.com/maps/search/?api=1&query=${item.ubicacion}`}
                    variant="caption"
                    color="secondary"
                    fontWeight="medium"
                    target="_blank"
                >
                  <LocationOn/>&nbsp;
                </SoftTypography>
              </>
          ),
        }));
        setData(dataWithActions);
        setDatosCargados(true);
      } else {
        console.error('Error fetching data');
      }
    }catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
     //  setDatosCargados(false);
       fetchData();

    }, [criterio]); // Empty dependency array to run the effect only once

  return (

     {data}
     );
}

export default useDetalleData;