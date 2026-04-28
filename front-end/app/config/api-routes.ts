const BASE_URL = "http://localhost:8080";

export const API_ROUTES = {
  // Endpoints relacionados aos produtos/cardápio
  pratos: {
    list: `${BASE_URL}/pratos`,
    getById: (id: number) => `${BASE_URL}/pratos/${id}`,
    // Caso o backend suporte filtro via URL futuramente:
    byCategory: (cat: string) => `${BASE_URL}/pratos?categoria=${cat}`,
  },

  // Endpoints relacionados aos pedidos
  pedidos: {
    create: `${BASE_URL}/api/pedidos`,
    list: `${BASE_URL}/api/pedidos`, // Para uma futura página de histórico
    getById: (id: string) => `${BASE_URL}/api/pedidos/${id}`,
  },

  // Caso implementemos cadastro
  auth: {
    login: `${BASE_URL}/api/auth/login`,
    register: `${BASE_URL}/api/auth/register`,
  },
};
