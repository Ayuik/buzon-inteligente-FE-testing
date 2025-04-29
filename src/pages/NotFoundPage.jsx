import { Link } from "react-router-dom";
import notFound  from "../assets/not_found.png";

export const NotFoundPage = () => {
  return (
    <section className="flex flex-col justify-center gap-y-5 p-5 text-center min-h-screen font-bree">
      <div className="inline-block mx-auto">
        <img className="h-full object-contain" src={notFound} alt="Página no encontrada" />
      </div>
      <section className="flex flex-col justify-center gap-y-5">
        <h1 className="inline-block mx-auto text-4xl">404</h1>
        <p className="inline-block mx-auto text-4xl">Página no encontrada</p>
        <Link
          to="/"
          className="inline-block mx-auto p-4 hover:bg-[#00328C] text-xl text-white bg-[#4574FF] rounded-xl"
        >
          Vuelve a la página principal
        </Link>
      </section>
    </section>
  );
};
