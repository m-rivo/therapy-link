import { isLocalhost } from './isLocalHost'

export const getServerSideURL = (): string => {
  if (process.env.NEXT_PUBLIC_SERVER_URL) {
    return process.env.NEXT_PUBLIC_SERVER_URL
  }

  if (isLocalhost()) {
    return 'http://localhost:3000'
  }
  return 'http://localhost:3000'
}
