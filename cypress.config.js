import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    chromeWebSecurity: false, // Debe estar aquí, dentro de "e2e"
    setupNodeEvents(on, config) {
      
      // Implementar los eventos de nodo aquí
    },
  },
});
