import { Request, Response } from "express"
import { CreateClientUseCase } from "./create-client-use-case"

export class CreateClientController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body

    const createClientUseCase = new CreateClientUseCase()

    const client = await createClientUseCase.execute({ username, password })

    return response.status(201).json(client)
  }
}