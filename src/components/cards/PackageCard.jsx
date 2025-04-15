import React, { useState } from "react";
import PackageDetailsModal from "../modals/PackageDetailsModal"; 

export default function PackageCard({ pkg }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="max-w-2xs rounded-2xl p-4 shadow bg-[#889DFF] space-y-2
      flex flex-col justify-center items-center gap-2">

        <div className="text-xs sm:text-lg flex flex-col justify-start items-start gap-2">

        <p className="text-gray-500"><span className=" text-blue-900">Nombre: </span>{pkg.name}</p>
        <p className="text-gray-500"><span className=" text-blue-900">Código: </span>{pkg.code}</p>

        <p className={`${pkg.collected ? "text-green-300" : "text-yellow-300"}`}>
          <span>Estado: </span>
          {/* TODO: mapear todos los estados disponibles */}
          Estado: {pkg.collected ? "Recogido" : "Pendiente"} 
        </p>

        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-block mt-2 p-3 sm:p-4 text-xs sm:text-lg text-white bg-[#124094] rounded-2xl hover:bg-[#124094]/80 transition"
        >
          Ver detalles
        </button>

      </div>

      <PackageDetailsModal
        pkg={pkg}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}