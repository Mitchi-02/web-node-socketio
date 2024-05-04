import path from "path"
import { config } from "dotenv"
config()

export const STORAGE_PATH = path.resolve(`${__dirname}/../../public`)
export const ASSETS_PREFIX = '/assets/'
export const ASSETS_URL_PREFIX = `http://localhost:${
  process.env.SERVER_PORT || 3000
}${ASSETS_PREFIX}`