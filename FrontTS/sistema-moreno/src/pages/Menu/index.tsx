import { ModeToggle } from "@/components/mode-toggle";
import { Helmet } from "react-helmet-async";
import logoMoreno from "@/assets/logo_moreno.png";
import Barra_Menu from "./barra_menu";

export function Menu() {
  return (
    <>
      <Helmet>
        <title>MENU</title>
        <meta name="description" content="Página de login do sistema" />
      </Helmet>

      <header className="bg-slate-400 dark:bg-gray-700 h-screen flex flex-col">
        <div className="p-4">
          <ModeToggle />
        </div>

        <nav className="flex flex-1 flex-col items-center justify-center text-center">
          <img
            src={logoMoreno}
            alt="Logo Moreno"
            className="w-full max-w-md px-4"
          />
          <Barra_Menu />
        </nav>
      </header>
    </>
  );
}

export default Menu;
