import { Request, Response } from "express";
import { CreateDeliveryUseCase } from "./create-delivery-use-case";

export class CreateDeliveryController {
  async handle(request: Request, response: Response) {
    const { item_name } = request.body;
    const { id_client } = request;

    const createDeliveryUseCase = new CreateDeliveryUseCase();
    
    const delivery = await createDeliveryUseCase.execute({
      item_name,
      id_client,
    });
    
    return response.status(201).json(delivery);
  }
}
