// SignOutRoute.js (por ejemplo)
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function SignOut() {
    const navigate = useNavigate();
    console.log("in OUT!!")
    useEffect(() => {
        // Realiza cualquier operación necesaria para cerrar sesión aquí, como limpiar tokens o cookies
        // Después de cerrar sesión, redirige al usuario a la página de inicio o a la página de autenticación
        console.log("OUT!!")
        // Realiza cualquier lógica necesaria para cerrar sesión, como eliminar el token del almacenamiento local o enviar una solicitud al servidor.
        localStorage.removeItem("token");
        navigate('/authentication/sign-in');
    }, [navigate]);

    return null; // No necesitas renderizar ningún contenido ya que el usuario será redirigido
}

export default SignOut;
