import React from "react";
import { Link } from "react-router-dom";

export default function PackageCard({ pkg }) {
  return (
    <div className="max-w-2xs border border-blue-200 rounded-2xl p-4 shadow bg-blue-50 space-y-2">
      <h3 className="text-lg font-semibold text-blue-900">{pkg.name}</h3>
      <p className="text-sm text-blue-800">
        Código: <span className="font-mono text-blue-900">{pkg.code}</span>
      </p>
      <p className={`text-sm font-medium ${pkg.collected ? "text-green-600" : "text-yellow-600"}`}>
        Estado: {pkg.collected ? "Recogido" : "Pendiente"}
      </p>
      {/* TODO: Add a link to the package details page */}
      {/* <Link
        to={`/paquete/${pkg.id}`}
        className="inline-block mt-2 px-4 py-2 text-sm text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition"
      >
        Ver detalles
      </Link> */}
    </div>
  );
}