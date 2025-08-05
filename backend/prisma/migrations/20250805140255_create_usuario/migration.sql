/*
  Warnings:

  - The primary key for the `Agendamento` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Agendamento` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Agendamento" DROP CONSTRAINT "Agendamento_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Agendamento_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Laudo" (
    "id" SERIAL NOT NULL,
    "conteudo" TEXT NOT NULL,
    "agendamentoId" INTEGER NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Laudo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Laudo_agendamentoId_key" ON "Laudo"("agendamentoId");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- AddForeignKey
ALTER TABLE "Laudo" ADD CONSTRAINT "Laudo_agendamentoId_fkey" FOREIGN KEY ("agendamentoId") REFERENCES "Agendamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
