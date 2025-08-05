-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'MEDICO';

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "papel" "Role" NOT NULL DEFAULT 'PACIENTE';
