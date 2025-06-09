import { createContext, useContext, useEffect, useState } from "react";
import { getUserProfile } from "../services/ProfileService";
import { useAuth } from "./AuthProvider";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState('');
    const { userId } = useAuth();
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            return;
        }

        const validateProfile = async () => {
            try{
                const profile = await getUserProfile(userId, token);
                setUserProfile(profile);
            }catch(error){
                console.log(error);
            }
        }
        validateProfile();
    }, [userId]);
    return ( 
        <ProfileContext.Provider value={{userProfile}}>
            {children}
        </ProfileContext.Provider>
    );
}
export const useProfile = () => useContext(ProfileContext);