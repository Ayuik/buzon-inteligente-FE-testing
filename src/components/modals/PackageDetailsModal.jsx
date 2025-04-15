import React from "react";
import Img from "../../assets/package_box.png";

export default function PackageDetailsModal({ pkg, isOpen, onClose }) {
  if (!isOpen || !pkg) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="bg-[#E1E5FF] rounded-xl shadow-lg w-full max-w-3xl relative max-h-[90vh] overflow-y-auto">

        <div className="bg-[#00328C] rounded-t-xl p-6">
          <h2 className="text-xl text-[#00328C] text-center bg-white p-3 rounded-md mx-auto max-w-full sm:max-w-2/3">
            Nombre del paquete: <span className="text-[#F9835E] font-semibold">{pkg.name}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 items-start mt-8">

          <div className="bg-white py-6 rounded-2xl flex justify-center items-center">
            <img
              src={Img}
              alt="Foto del paquete"
              className="w-[200px] h-auto object-contain"
            />
          </div>

          <div className="w-full space-y-6">
            {[
              { label: "Código:", value: pkg.code },
              { label: "Fecha de entrega:", value: pkg.deliveryDate || "Sin definir" },
              { label: "Estado:", value: pkg.collected ? "Recogido" : "Pendiente" },
            ].map(({ label, value }, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row items-center md:gap-4"
              >
                <p className="font-semibold text-black md:min-w-[140px]">{label}</p>
                <p className="bg-white text-[#00328C] p-2 rounded mt-1 md:mt-0 w-1/2">{value}</p>
              </div>
            ))}
          </div>


        </div>

        <div className="text-center mb-6">
          <button
            onClick={onClose}
            className="bg-[#00328C] text-white px-10 py-2 rounded-2xl hover:bg-blue-700 transition"
          >
            Volver
          </button>
        </div>

      </div>
    </div>
  );
}
