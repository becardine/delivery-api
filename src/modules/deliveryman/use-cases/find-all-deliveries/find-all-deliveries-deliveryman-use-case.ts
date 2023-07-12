import { prisma } from "../../../../database/prisma-client";

export class FindAllDeliveriesDeliverymanUseCase {
  async execute(id_deliveryman: string) {

    const deliveries = await prisma.deliveryman.findMany({
      where: {
        id: id_deliveryman,
      },
      select: {
        delivery: true,
        id: true,
        username: true
      },
    });

    return deliveries;
  }
}