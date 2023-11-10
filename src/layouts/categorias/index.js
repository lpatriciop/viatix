

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "viaticos/LayoutContainers/DashboardLayout";
import DashboardNavbar from "viaticos/Navbars/DashboardNavbar";
import Footer from "viaticos/Footer";
import Table from "viaticos/Tables/Table";
import {useHistory} from "react-router-dom";
import {useState,useEffect} from "react";
import {API_URL} from "../../config";

// Data
// import authorsTableData from "layouts/tables/data/authorsTableData";
// import projectsTableData from "layouts/tables/data/projectsTableData";
const endpoint = API_URL+ '/categorias';
function Categorias() {
  // const { columns, rows } = authorsTableData;
  // const { columns: prCols, rows: prRows } = projectsTableData;
 const [categorias,setCategorias]=useState([]);
 const token=localStorage.getItem("token");
  useEffect(() => {
    const fetchData= async ()=>
    {
      try {
        const response=await fetch(endpoint, {
          method: 'GET', // Método de la solicitud (puede ser GET, POST, PUT, DELETE, etc.)
         // mode:'no-cors',// QUITAR PRODUCCION
          headers: {
                  Authorization: `Bearer ${token}`,
          },

        });
        if(response.ok){
           const data= await response.json();
            // console.log("data ",data);
          setCategorias(data);
        }else {
          console.error("Error al obtener datos respuesta",response.statusMessage);
        }
      }catch (error){
        console.error("Error al obtener datos try",error);
      }

    };
   fetchData();
  }, []);
  const columns=[
     {name:'idCategoria',headerName:'id',align:'center',width:'50%'},
     {name:'nombreCategoria', headerName:'Categoria',align:'left',width:'auto'}
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Categorías</SoftTypography>
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={categorias} />
            </SoftBox>
          </Card>
        </SoftBox>

      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Categorias;
