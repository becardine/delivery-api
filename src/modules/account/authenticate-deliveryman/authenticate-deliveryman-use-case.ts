import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prisma-client";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) { 
    const deliverymanExists = await prisma.deliveryman.findFirst({
      where: {
        username,
      },
    });

    if (!deliverymanExists) throw new Error("Incorrect username or password");

    const passwordMatch = await compare(password, deliverymanExists.password);

    if (!passwordMatch) throw new Error("Incorrect username or password");

    const token = sign({ username }, "secret", {
      subject: deliverymanExists.id,
      expiresIn: "1d",
    });

    return { token };
  }
}
