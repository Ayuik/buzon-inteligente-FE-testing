import { getPackages } from "../../services/PackageService";
import { useEffect, useState } from "react";

export const getPackagesData = () => {
  const token = localStorage.getItem("token");
  const [packages, setPackages] = useState([]);
  
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        if (!token || !profileId) return;
        const packagesJson = await getPackages(profileId, token);
        console.log(packagesJson)
        setPackages(packagesJson);
      } catch (error) {
        console.error("Error al obtener los paquetes", error);
      }
    };

    fetchPackages();
  }, [token, profileId]);

  const showPackages = () => {
    return packages;
  }

  return {showPackages}
};
