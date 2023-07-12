import { prisma } from "../../../../database/prisma-client";

export class FindAllDeliveriesUseCase {
  async execute(id_client: string) {
    const deliveries = await prisma.client.findMany({
      where: {
        id: id_client
      },
      select: {
        id: true,
        username: true,
        delivery: true,
      },
    });

    return deliveries;
  }
}