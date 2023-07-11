import { Router } from 'express'
import { AuthenticateClientController } from './modules/account/authenticate-client/authenticate-client-controller'
import { AuthenticateDeliverymanController } from './modules/account/authenticate-deliveryman/authenticate-deliveryman-controller'
import { CreateClientController } from './modules/clients/use-cases/create-client/create-client-controller'
import { CreateDeliverymanController } from './modules/deliveryman/use-cases/create-deliveryman/create-deliveryman-controller'

const routes = Router()

const createClientController = new CreateClientController()
const authenticateClientController = new AuthenticateClientController()
const createDeliverymanController = new CreateDeliverymanController()
const authenticateDeliverymanController = new AuthenticateDeliverymanController()

routes.post('/client/', createClientController.handle)
routes.post('/client/authenticate', authenticateClientController.handle)

routes.post('/deliveryman/', createDeliverymanController.handle)
routes.post('/delivery/authenticate', authenticateDeliverymanController.handle)

export { routes }
