import { Request, Response } from "express"
import { AuthenticateDeliverymanUseCase } from "./authenticate-deliveryman-use-case"

export class AuthenticateDeliverymanController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body

    const authenticateDeliverymanUseCase = new AuthenticateDeliverymanUseCase()

    const token = await authenticateDeliverymanUseCase.execute({ username, password })

    return response.status(201).json(token)
  }
}