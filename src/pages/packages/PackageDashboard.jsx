import React from "react";
import { codesData } from "./mockData";
import PackageCard from "../../components/cards/PackageCard";
// import NewOrderButton from "./NewOrderButton";

export default function PackageDashboard() {
  //TODO:get the data from the API
  const allPackages = codesData.flatMap((code) => code.packages);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6 space-y-6">

        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-blue-900">Hola, Juan</h1>
          {/* TODO: Add a button to create a new order as a component or just a simple button */}
          {/* <NewOrderButton /> */}
        </div>

        <div className="w-full p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allPackages.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>

    </div>
  );
}
