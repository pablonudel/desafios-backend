import { checkAuth } from "./isAuthenticated.js"
import { logger } from "./logger.js"

export const middleware ={
    checkAuth,
    logger
}