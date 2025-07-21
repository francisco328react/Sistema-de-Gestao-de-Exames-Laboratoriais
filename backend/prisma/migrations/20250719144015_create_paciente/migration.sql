-- CreateTable
CREATE TABLE "Paciente" (
    "id" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "dataNasc" TIMESTAMP(3) NOT NULL,
    "telefone" TEXT,
    "endereco" TEXT,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Paciente_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_cpf_key" ON "Paciente"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Paciente_userId_key" ON "Paciente"("userId");

-- AddForeignKey
ALTER TABLE "Paciente" ADD CONSTRAINT "Paciente_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
