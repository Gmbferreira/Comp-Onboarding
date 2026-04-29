const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const API_ROUTES = {
  // Endpoints relacionados aos produtos/cardápio
  pratos: {
    list: `${BASE_URL}/api/pratos`,
    getById: (id: number) => `${BASE_URL}/api/pratos/${id}`,
    // Caso o backend suporte filtro via URL futuramente:
    byCategory: (cat: string) => `${BASE_URL}/api/pratos?categoria=${cat}`,
  },

  // Endpoints relacionados aos pedidos
  pedidos: {
    create: `${BASE_URL}/api/pedidos`,
    list: `${BASE_URL}/api/pedidos`, // Para uma futura página de histórico
    getById: (id: string) => `${BASE_URL}/api/pedidos/${id}`,
  },

  //Endpoint de cadastro
  auth: {
    cliente: {
      login: "http://localhost:8080/cliente/login",
      registro: "http://localhost:8080/cliente/registro",
    },
    admin: {
      login: "http://localhost:8080/administrador/login",
      registro: "http://localhost:8080/administrador/registro",
    },
  },
};
