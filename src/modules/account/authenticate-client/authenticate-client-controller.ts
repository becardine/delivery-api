import { Request, Response } from "express"
import { AuthenticateClientUseCase } from "./authenticate-client-use-case"

export class AuthenticateClientController {
  async handle(request: Request, response: Response) {
    const { username, password } = request.body

    const authenticateClientUseCase = new AuthenticateClientUseCase()

    const token = await authenticateClientUseCase.execute({ username, password })

    return response.status(201).json(token)
  }
}