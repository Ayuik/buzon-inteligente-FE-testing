import { Home } from "../components/home/Home";

export const HomeView = () => {
  return (
    <>
{/*         <Header /> */}
        <div className="flex w-full h-full">
            <div id="img-home" className="w-1/2">
                {/* <img src="/img/Captura.PNG" alt="" className="bg-cover"/> */}
            </div>
            <Home />
        </div>
       {/*  <Footer /> */}
    </>
  );
}