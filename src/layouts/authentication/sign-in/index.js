import { useState } from "react";

// react-router-dom components
import {Link,useNavigate} from "react-router-dom";

// @mui material components
import Switch from "@mui/material/Switch";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import curved9 from "assets/images/curved-images/curved-6.jpg";
import {API_URL} from "../../../config";

function SignIn() {
  const navigate=useNavigate();
  const [rememberMe, setRememberMe] = useState(true);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const [error, setError] = useState("");

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = '/auth/v1/signin';
   // console.log(API_URL + endpoint);
    try {
      const response = await fetch(API_URL + endpoint, {
        method: 'POST', // Método de la solicitud (puede ser GET, POST, PUT, DELETE, etc.)
        headers: {
          'Content-Type': 'application/json', // Tipo de contenido del cuerpo de la solicitud
        },
        body: JSON.stringify({ username, password }), // Convierte los datos a formato JSON y envíalos en el cuerpo de la solicitud
      });

      if (response.ok) {
        // Si la respuesta del servidor es exitosa (código de estado 200)
        const data =await response.json();

        localStorage.setItem("token",data.token);
        // Redirect to /dashboard
        navigate("/dashboard");
        // Realiza las acciones necesarias después de un inicio de sesión exitoso, como redirigir al usuario a otra página
      } else {
        // Si la respuesta del servidor no es exitosa, maneja el error de inicio de sesión
       // console.error('Error al iniciar sesión');
        setError("Error al iniciar sesión");
      }
    } catch (error) {
      // Si hay un error en la solicitud, maneja el error aquí
      setError('Error al enviar la solicitud:'+ error);
    }
  };
  return (
    <CoverLayout
      title="Bienvenido"
      description="Ingresa tu correo para Ingresar..."
      image={curved9}
    >
      <SoftTypography variant="body2" color="error">
        {error}
      </SoftTypography>
      <SoftBox component="form" role="form" onSubmit={handleSubmit}>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput type="email" placeholder="Email"  value={username}
                     onChange={handleEmailChange}/>
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput type="password" placeholder="Password"  value={password}
                     onChange={handlePasswordChange}/>
        </SoftBox>
        {/*<SoftBox display="flex" alignItems="center">*/}
        {/*  <Switch checked={rememberMe} onChange={handleSetRememberMe} />*/}
        {/*  <SoftTypography*/}
        {/*    variant="button"*/}
        {/*    fontWeight="regular"*/}
        {/*    onClick={handleSetRememberMe}*/}
        {/*    sx={{ cursor: "pointer", userSelect: "none" }}*/}
        {/*  >*/}
        {/*    &nbsp;&nbsp;Remember me*/}
        {/*  </SoftTypography>*/}
        {/*</SoftBox>*/}
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" fullWidth onClick={handleSubmit}>
            Ingresar
          </SoftButton>
        </SoftBox>
        {/*<SoftBox mt={3} textAlign="center">*/}
        {/*  <SoftTypography variant="button" color="text" fontWeight="regular">*/}
        {/*    Don&apos;t have an account?{" "}*/}
        {/*    <SoftTypography*/}
        {/*      component={Link}*/}
        {/*      to="/authentication/sign-up"*/}
        {/*      variant="button"*/}
        {/*      color="info"*/}
        {/*      fontWeight="medium"*/}
        {/*      textGradient*/}
        {/*    >*/}
        {/*      Sign up*/}
        {/*    </SoftTypography>*/}
        {/*  </SoftTypography>*/}
        {/*</SoftBox>*/}
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;
