import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-[#00328C] text-white text-center p-4 font-bree">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center  text-sm min-h-[80px]">
        <div className="md:text-left text-center w-full md:w-1/2 mb-2 md:mb-0">
          <p>2025 © Arkímedes. Todos los derechos reservados</p>
        </div>
        <div className="md:text-right text-center w-full md:w-1/2 flex justify-end gap-12">
          <p>Términos de uso</p>
          <p>Política de Privacidad</p>
        </div>
      </div>
    </footer>
  );
};
