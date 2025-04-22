import { Link } from "react-router-dom";
import packageBox from "../../assets/package_box.png";

export const PackageDetailsCard = ({ pkg }) => {
  //TODO: Get data from API and apply params

  return (
    <section className="sm:max-w-lg">
      <div className="p-5 bg-[#00328C] text-[#0050D3] sm:rounded-t-xl">
        <div className="inline p-2 bg-[#FFFFFF] rounded-xl">
          <p className="inline">Nombre del paquete: </p>
          <p className="inline text-[#F9835E]">Barbie</p>
        </div>
      </div>
      <div className="bg-[rgba(190,199,255,0.28)] p-4 sm:rounded-b-xl">
        <div className="grid grid-cols-1 grid-rows-[auto_auto] gap-y-5 sm:gap-x-4 sm:grid-cols-4">
          <div className="row-start-1 flex justify-center bg-[#FFFFFF] sm:rounded-4xl sm:col-start-1 sm:col-end-3">
            <img
              className="object-contain w-40 p-4 sm:max-w-42"
              src={packageBox}
              alt="preview paquete"
            />
          </div>
          <div className="flex aling-center gap-3 col-span-full row-start-2 sm:col-start-3 sm:row-start-1 sm:col-end-6">
            <div className="sm:flex sm:flex-col sm:gap-7 sm:mt-4">
              <p className="pt-0.75">Código de pedido:</p>
              <p className="pt-2">Fecha de entrega:</p>
              <p className="pt-2">Estado: </p>
            </div>
            <div className="sm:flex sm:flex-col sm:gap-7 sm:mt-4 sm:text-center">
              <div className="sm:bg-[#FFFFFF] rounded-xl p-1 text-[#272B8F]">
                <p>SFD2345</p>
              </div>
              <div className="sm:bg-[#FFFFFF] rounded-xl p-1 text-[#272B8F]">
                <p>03/04/2025</p>
              </div>
              <div className="sm:bg-[#FFFFFF] rounded-xl p-1 text-[#272B8F]">
                <p>Pendiente</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex p-4 justify-center sm:p-0">
          <Link
            className="my-4 sm:my-0 sm:mx-auto bg-[rgba(0,50,140,0.93)] text-[#FFFFFF] rounded-xl"
            to="/user/packages"
          >
            <button className="cursor-pointer w-25 p-2">VOLVER</button>
          </Link>
        </div>
      </div>
    </section>
  );
};
