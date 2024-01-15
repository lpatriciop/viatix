import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "viaticos/LayoutContainers/DashboardLayout";
import DashboardNavbar from "viaticos/Navbars/DashboardNavbar";
import Footer from "viaticos/Footer";
import MiniStatisticsCard from "viaticos/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "viaticos/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "viaticos/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import {API_URL} from "../../config";


function Dashboard() {
  const token = localStorage.getItem("token");
  const [promedioGastos, setPromedioGastos] = useState();
  const GetPromedioGastos=async ()=>{
    try {
      const response = await fetch(`${API_URL}/viaticos/promedioMontos`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPromedioGastos(data);

      } else {
        console.error('Error fetching data');
      }
    }catch (error){
      console.error('Error fetching data:', error);
    }
  };
  useEffect(() => {
    GetPromedioGastos();
  }, [promedioGastos]);

  const { size } = typography;
  const { chart, items } = reportsBarChartData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={7}>
              <BuildByDevelopers />
            </Grid>
            <Grid item xs={12} lg={5}>
              <WorkWithTheRockets />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                  title={{ text: "limite gasto" }}
                  count="$53,000"
                  percentage={{ color: "success", text: "+55%" }}
                  icon={{ color: "info", component: "paid" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                  title={{ text: "salidas del mes" }}
                  count="2,300"
                  percentage={{ color: "success", text: "+3%" }}
                  icon={{ color: "info", component: "public" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                  title={{ text: "empleados" }}
                  count="+3,462"
                  percentage={{ color: "error", text: "-2%" }}
                  icon={{ color: "info", component: "emoji_events" }}
              />
            </Grid>
            <Grid item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                  title={{ text: "promedio de gastos" }}
                  count={"$" + (promedioGastos || 0).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                  percentage={{ color: "success", text: "+5%" }}
                  icon={{
                    color: "info",
                    component: "paid",
                  }}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              <ReportsBarChart
                title="empleados activos"
                description={
                  <>
                    (<strong>+23%</strong>) en la última semana
                  </>
                }
                chart={chart}
                items={items}
              />
            </Grid>
            <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="Promedio de Viáticos"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                      <Icon className="font-bold">arrow_upward</Icon>
                    </SoftBox>
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                      4% más{" "}
                      <SoftTypography variant="button" color="text" fontWeight="regular">
                        in 2023
                      </SoftTypography>
                    </SoftTypography>
                  </SoftBox>
                }
                height="20.25rem"
                chart={gradientLineChartData}
              />
            </Grid>
          </Grid>
        </SoftBox>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={8}>
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <OrderOverview />
          </Grid>
        </Grid>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
