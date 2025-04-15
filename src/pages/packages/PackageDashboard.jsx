import React, { useState } from "react";
import { codesData } from "./mockData";
import PackageCard from "../../components/cards/PackageCard";
import AddPackageModal from "../../components/modals/AddPackageModal";

export default function PackageDashboard() {
  const [showModal, setShowModal] = useState(false);
  const allPackages = codesData.flatMap((code) => code.packages);

  return (
    <div className="min-h-screen flex flex-col items-center justify-evenly bg-gray-50 p-6">

      <h1 className="text-4xl font-bold text-blue-900 text-center">Hola, Juan</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center mx-auto px-4">
        {allPackages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>

      <button
        onClick={() => setShowModal(true)}
        className="bg-[#00328C] text-white px-14 py-3 rounded-lg hover:bg-blue-700 transition"
      >
        Nuevo pedido
      </button>

      <AddPackageModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}
