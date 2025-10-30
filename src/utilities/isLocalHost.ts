/**
 * Verifica si el entorno de ejecución es local (desarrollo).
 */
export const isLocalhost = (): boolean => {
  return process.env.NODE_ENV === 'development'
}
