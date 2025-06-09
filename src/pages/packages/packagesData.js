import { getPackages } from "../../services/PackageService";
import { useEffect, useState } from "react";
import { useProfile } from "../../context/ProfileProvider";


export const getPackagesData = () => {
  const token = localStorage.getItem("token");
  const { userProfile } = useProfile();
  const [packages, setPackages] = useState([]);

  const profileId = userProfile.profileId;

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        if (!token || !profileId) return;
        const packagesJson = await getPackages(profileId, token);        
        setPackages(packagesJson);
      } catch (error) {
        console.error("Error al obtener los paquetes", error);
      }
    };

    fetchPackages();
  }, [token, profileId]);

  return packages;
};
