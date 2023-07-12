import { Request, Response } from "express";
import { UpdateDeliverymanUseCase } from "./update-deliveryman-use-case";

export class UpdateDeliverymanController {
  async handle(request: Request, response: Response) {
    const { id_deliveryman } = request;
    const { id: id_delivery } = request.params;

    const updateDeliverymanUseCase = new UpdateDeliverymanUseCase();

    const delivery = await updateDeliverymanUseCase.execute({
      id_delivery,
      id_deliveryman,
    });
    
    return response.status(200).json(delivery);
  }
}