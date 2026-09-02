import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes.generated'

export const createRoot = ViteReactSSG({ routes })
