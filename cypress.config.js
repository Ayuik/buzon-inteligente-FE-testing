import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      
      // Implementar los eventos de nodo aquí
    },
    baseUrl: 'http://localhost:5173',
  },
});
