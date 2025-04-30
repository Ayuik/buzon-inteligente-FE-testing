import { Link } from "react-router-dom";
import notFound  from "../assets/not_found.png";
import { useAuth } from "../context/AuthProvider";
import { useEffect, useState } from "react";

export const NotFoundPage = () => {
    const { authState } = useAuth();
    const [destination, setDestination] = useState("/");

    useEffect(() => {
      if(authState && localStorage.getItem("token")) 
        { setDestination("/user/packages") }

    }, [authState])

  return (
    <section className="flex flex-col justify-center gap-y-5 p-5 text-center min-h-screen font-bree">
      <div className="inline-block mx-auto">
        <img className="h-full object-contain" src={notFound} alt="Página no encontrada" />
      </div>
      <section className="flex flex-col justify-center gap-y-5">
        <h1 className="inline-block mx-auto text-4xl">404</h1>
        <p className="inline-block mx-auto text-4xl">Página no encontrada</p>
        <Link
          to={destination}
          className="p-4 mt-4 rounded-full text-white bg-[#00328c] hover:opacity-90 mx-auto cursor-pointer"
        >
          Vuelve a la página principal
        </Link>
      </section>
    </section>
  );
};
