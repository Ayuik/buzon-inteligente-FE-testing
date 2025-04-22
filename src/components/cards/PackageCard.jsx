import { Link } from "react-router-dom";
export default function PackageCard({ pkg }) {

  return (
    <>
      <div className="max-w-2xs rounded-2xl p-6 shadow bg-custom-light-blue space-y-2
      flex flex-col justify-center items-center gap-2">

        <div className="text-xs sm:text-lg flex flex-col justify-start items-start gap-2">

          <p className="text-gray-500"><span className=" text-custom-blue font-bold">Nombre: </span>{pkg.name}</p>
          <p className="text-gray-500"><span className=" text-custom-blue font-bold">Código: </span>{pkg.code}</p>

          <p className={`${pkg.collected ? "text-green-300" : "text-yellow-300"}`}>
            <span>Estado: </span>
            {/* TODO: mapear todos los estados disponibles */}
            {pkg.collected ? "Recogido" : "Pendiente"}
          </p>

        </div>

        <Link to={`/user/packages/${pkg.code}`}>
          <button className="text-white bg-custom-blue hover:bg-custom-blue/50 px-4 py-2 rounded">
            Ver detalles
          </button>
        </Link>
      </div>

    </>
  );
}