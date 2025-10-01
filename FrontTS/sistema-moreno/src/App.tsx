import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";
import LoginPage from "@/pages/login/login";
import Menu from "./pages/Menu";
import { CartaoPortaria } from "./pages/cartao-portaria";
import CadColaborador from "./pages/rh/cadColaborador";
import { ColaboradoresPortaria } from "./pages/colaboradores-portaria";
import ConsultaEntradas from "./pages/rh/consulta-entrada";
import PrivateRoute from "./route/privateRoute";
import Admin from "./pages/Admin";
import { UserProvider } from "./context/UserContext";


function App() {
  return (
    <ThemeProvider>
      <UserProvider>
         <BrowserRouter>
            <Routes>
               {/* Rota pública */}
               <Route path="/" element={<LoginPage />} />

               {/* Rotas protegidas */}
               <Route
                  path="/menu"
                  element={
                  <PrivateRoute>
                     <Menu />
                  </PrivateRoute>
                  }
               />
               <Route
                  path="/Portaria/CartaoPortaria"
                  element={
                  <PrivateRoute>
                     <CartaoPortaria />
                  </PrivateRoute>
                  }
               />
               <Route
                  path="/Portaria/Colaboradores"
                  element={
                  <PrivateRoute>
                     <ColaboradoresPortaria />
                  </PrivateRoute>
                  }
               />
               <Route
                  path="/rh/CadColaboradores"
                  element={
                  <PrivateRoute>
                     <CadColaborador />
                  </PrivateRoute>
                  }
               />
               <Route
                  path="/rh/ConsultaEntradas"
                  element={
                  <PrivateRoute>
                     <ConsultaEntradas entradas={[]} />
                  </PrivateRoute>
                  }
               />
               <Route
                  path="/admin/cadusuarios"
                  element={
                  <PrivateRoute>
                     <Admin />
                  </PrivateRoute>
                  }
               />
            </Routes>

         </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
