import { prisma } from "../lib/prisma";

export const listarLaudos = async () => {
  return await prisma.laudo.findMany({
    include: {
      agendamento: {
        include: {
          paciente: true,
          medico: true,
          exame: true,
        },
      },
    },
    orderBy: {
      criadoEm: "desc",
    },
  });
};
