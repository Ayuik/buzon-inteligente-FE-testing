import React, { useState } from "react";

export default function AddPackageModal({ isOpen, onClose, onAddCode }) {
  const [orderName, setOrderName] = useState("");
  const [packages, setPackages] = useState([]);
  const [packageCounter, setPackageCounter] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const handleAddPackage = () => {

    if (orderName.trim() === "") return;

    const newPackage = {
      id: Date.now() + packageCounter,
      name: orderName,
      collected: false,
      code: `PKG${String(packageCounter).padStart(3, "0")}`,
    };

    setPackages([...packages, newPackage]);
    setPackageCounter(packageCounter + 1);
    setOrderName("");
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 1500);

  };

  const handleGenerate = () => {
    
    if (packages.length === 0) return;

    const newOrderCode = `ORD-${Date.now()}`;
    const createdAt = new Date().toISOString().split("T")[0];

    const newCodeEntry = {
      code: newOrderCode,
      createdAt,
      packages,
    };

    console.log("Nuevo pedido generado:", newCodeEntry);

    if (onAddCode) onAddCode(newCodeEntry);
    setPackages([]);
    setPackageCounter(1);
    setOrderName("");

  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">

      <div className="bg-[#BEC7FF] p-6 rounded-2xl shadow-lg w-full max-w-lg mx-4 sm:mx-6 md:mx-auto relative flex flex-col items-center gap-6 max-h-[90vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-3 right-6 text-custom-blue hover:text-red-700 text-3xl"
        >
          ×
        </button>

        {showSuccess ? (

          <div className="text-custom-blue p-8 text-center text-xl font-semibold">
            ✅ ¡Pedido añadido con éxito!
          </div>

        ) : (

          <>
            <input
              type="text"
              placeholder="Nombre del paquete"
              className="w-full sm:w-3/4 px-4 py-2 mt-14 sm:mt-18 bg-white rounded outline-none focus:ring-2 focus:ring-custom-blue/40"
              value={orderName}
              onChange={(e) => setOrderName(e.target.value)}
            />

            <div className="flex flex-col sm:flex-row justify-center w-full gap-4 sm:gap-10 text-white">
              <button
                onClick={handleAddPackage}
                className="bg-custom-blue p-3 rounded-lg hover:bg-custom-blue/80 transition"
              >
                Añadir más
              </button>
              <button
                onClick={handleGenerate}
                className="bg-custom-blue p-3 rounded-lg hover:bg-custom-blue/80 transition"
              >
                Generar código
              </button>
            </div>
          </>

        )}

      </div>

    </div>
  );
}
