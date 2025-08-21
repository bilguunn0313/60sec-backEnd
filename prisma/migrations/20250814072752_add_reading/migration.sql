/*
  Warnings:

  - The values [BASIC] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `Activity` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "public"."Role_new" AS ENUM ('USER', 'ADMIN');
ALTER TABLE "public"."User" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "public"."User" ALTER COLUMN "role" TYPE "public"."Role_new" USING ("role"::text::"public"."Role_new");
ALTER TYPE "public"."Role" RENAME TO "Role_old";
ALTER TYPE "public"."Role_new" RENAME TO "Role";
DROP TYPE "public"."Role_old";
ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT 'USER';
COMMIT;

-- DropForeignKey
ALTER TABLE "public"."Activity" DROP CONSTRAINT "Activity_userId_fkey";

-- AlterTable
ALTER TABLE "public"."User" ALTER COLUMN "role" SET DEFAULT 'USER';

-- DropTable
DROP TABLE "public"."Activity";

-- DropEnum
DROP TYPE "public"."GameType";

-- CreateTable
CREATE TABLE "public"."Reading" (
    "id" SERIAL NOT NULL,
    "sentences" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTIme" TIMESTAMP(3) NOT NULL,
    "profileId" INTEGER NOT NULL,
    "accuracy" TEXT NOT NULL,

    CONSTRAINT "Reading_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Exercise" (
    "id" SERIAL NOT NULL,
    "words" TEXT[],
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTIme" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "correctAnswer" TEXT NOT NULL,

    CONSTRAINT "Exercise_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Reading" ADD CONSTRAINT "Reading_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
