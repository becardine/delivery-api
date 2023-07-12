import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prisma-client";

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) { 
    const clientExists = await prisma.client.findFirst({
      where: {
        username,
      },
    });

    if (!clientExists) throw new Error("Incorrect username or password");

    const passwordMatch = await compare(password, clientExists.password);

    if (!passwordMatch) throw new Error("Incorrect username or password");

    const token = sign({ username }, "c3b7b1b9c3c4c5c6c7c8c9cacbcccdcecf", {
      subject: clientExists.id,
      expiresIn: "1d",
    });

    return { token };
  }
}
