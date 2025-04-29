import { ProfileCard } from "../../components/profile/ProfileCard";

export const MyAccountPage = () => {
    return (
        <section className="flex-1 p-4 bg-[rgba(190,199,255,0.28)] md:bg-[#FFFF]">
        <h1 className="text-3xl font-bold flex justify-center flex-1 text-[#00328C] mt-10 font-bree">Datos personales</h1>
        <ProfileCard />
        </section>
    );
};