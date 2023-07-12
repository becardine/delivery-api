import { Router } from "express";
import { ensureAuthenticateClient } from "./middlewares/ensure-authenticate-client";
import { ensureAuthenticateDeliveryman } from "./middlewares/ensure-authenticate-deliveryman";
import { AuthenticateClientController } from "./modules/account/authenticate-client/authenticate-client-controller";
import { AuthenticateDeliverymanController } from "./modules/account/authenticate-deliveryman/authenticate-deliveryman-controller";
import { CreateClientController } from "./modules/client/use-cases/create-client/create-client-controller";
import { FindAllDeliveriesController } from "./modules/client/use-cases/deliveries/find-all-deliveries-controller";
import { CreateDeliveryController } from "./modules/delivery/use-cases/create-delivery/create-delivery-controller";
import { FindAllAvailableController } from "./modules/delivery/use-cases/find-all-available/find-all-available-controller";
import { UpdateDeliverymanController } from "./modules/delivery/use-cases/update-deliveryman/update-deliveryman-controller";
import { UpdateEndDateController } from "./modules/delivery/use-cases/update-end-date/update-end-date-controller";
import { CreateDeliverymanController } from "./modules/deliveryman/use-cases/create-deliveryman/create-deliveryman-controller";
import { FindAllDeliveriesDeliverymanController } from "./modules/deliveryman/use-cases/find-all-deliveries/find-all-deliveries-deliveryman-controller";

const routes = Router();

/** Controllers */
const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();
const createDeliveryController = new CreateDeliveryController();
const findAllAvailableController = new FindAllAvailableController();
const updateDeliverymanController = new UpdateDeliverymanController();
const findAllDeliveriesController = new FindAllDeliveriesController();
const findAllDeliveriesDeliverymanUseCase = new FindAllDeliveriesDeliverymanController();
const updateEndDateController = new UpdateEndDateController();


/** Client auth */
routes.post("/client", createClientController.handle);
routes.post("/client/authenticate", authenticateClientController.handle);

/** Deliveryman auth */
routes.post("/deliveryman", createDeliverymanController.handle);
routes.post("/delivery/authenticate", authenticateDeliverymanController.handle);


/** Middlewares */
routes.get(
  "/client/deliveries",
  ensureAuthenticateClient,
  findAllDeliveriesController.handle
);
routes.post(
  "/delivery",
  ensureAuthenticateClient,
  createDeliveryController.handle
);
routes.get(
  "/delivery/available",
  ensureAuthenticateDeliveryman,
  findAllAvailableController.handle
);
routes.put(
  "/delivery/update-deliveryman/:id",
  ensureAuthenticateDeliveryman,
  updateDeliverymanController.handle
);
routes.get(
  "/deliveryman/deliveries",
  ensureAuthenticateDeliveryman,
  findAllDeliveriesDeliverymanUseCase.handle
);
routes.put("/delivery/updateEndDate/:id", ensureAuthenticateDeliveryman, updateEndDateController.handle)

export { routes };
