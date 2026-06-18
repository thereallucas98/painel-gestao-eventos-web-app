import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001'

/** Normalized error thrown by the API layer; the UI maps it to friendly copy. */
export class ApiError extends Error {
  constructor(
    message: string,
    readonly status?: number,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export const api = axios.create({ baseURL })

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const message = error.response
        ? 'Não foi possível carregar os dados.'
        : 'Não foi possível conectar ao servidor de dados.'
      return Promise.reject(new ApiError(message, error.response?.status))
    }
    return Promise.reject(new ApiError('Erro inesperado ao buscar os dados.'))
  },
)
