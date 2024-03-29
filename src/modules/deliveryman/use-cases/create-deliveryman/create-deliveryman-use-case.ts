import { hash } from "bcrypt";
import { prisma } from "../../../../database/prisma-client";

interface ICreateDeliveryman {
  username: string;
  password: string;
}

export class CreateDeliverymanUseCase {
  async execute({ username, password }: ICreateDeliveryman) {
    const deliverymanExists = await prisma.client.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive',
        }
      },
    })

    if (deliverymanExists) throw new Error('Deliveryman already exists')

    const hashPassword = await hash(password, 10)

    const deliveryman = await prisma.deliveryman.create({
      data: {
        username,
        password: hashPassword,
      }
    })

    return deliveryman
  }
}
