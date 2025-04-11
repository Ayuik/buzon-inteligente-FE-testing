import ProfileCard from "../../components/profile/ProfileCard";
import Navbar from "../../components/navbar";
import Footer from "../../components/Footer";

export const MyAccountPage = () => {
    return (
        <>
        <Navbar />
        <h1 className="text-xl font-bold">Datos personales</h1>
        <ProfileCard />
        <Footer/>
        </>
    );
};