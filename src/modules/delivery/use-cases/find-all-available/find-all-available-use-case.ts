import { prisma } from "../../../../database/prisma-client";

export class FindAllAvailableUseCase {
  async execute() {
    const deliveries = await prisma.delivery.findMany({
      where: {
        end_at: null,
        id_deliveryman: null,
      },
      include: {
        client: true,
        deliveryman: true,
      },
    });

    return deliveries;
  }
}