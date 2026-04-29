const BASE_URL = "http://localhost:8080";

export const API_ROUTES = {
  pratos: {
    list: `${BASE_URL}/pratos`,
    getById: (id: number) => `${BASE_URL}/pratos/${id}`,

    byCategory: (id: number) => `${BASE_URL}/pratos/categoria/${id}`,
  },

  // Endpoints de pedidos
  pedidos: {
    create: `${BASE_URL}/api/pedidos`,
    list: `${BASE_URL}/api/pedidos`,
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
