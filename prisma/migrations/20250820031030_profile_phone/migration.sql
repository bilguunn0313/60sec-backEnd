/*
  Warnings:

  - You are about to drop the column `endTIme` on the `Reading` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "public"."PlanInterval" ADD VALUE 'FREE';

-- AlterTable
ALTER TABLE "public"."Exercise" ALTER COLUMN "startTime" DROP NOT NULL,
ALTER COLUMN "endTIme" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."Profile" ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "location" TEXT,
ADD COLUMN     "phone" TEXT;

-- AlterTable
ALTER TABLE "public"."Reading" DROP COLUMN "endTIme",
ADD COLUMN     "audio" TEXT,
ADD COLUMN     "endTime" TIMESTAMP(3);
