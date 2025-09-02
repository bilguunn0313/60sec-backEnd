/*
  Warnings:

  - You are about to drop the column `about` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `birthDate` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Profile` table. All the data in the column will be lost.
  - You are about to drop the `Exercise` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `username` to the `Profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Exercise" DROP CONSTRAINT "Exercise_profileId_fkey";

-- AlterTable
ALTER TABLE "public"."Profile" DROP COLUMN "about",
DROP COLUMN "birthDate",
DROP COLUMN "location",
DROP COLUMN "name",
DROP COLUMN "phone",
ADD COLUMN     "age" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "username" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Reading" ALTER COLUMN "startTime" DROP NOT NULL,
ALTER COLUMN "startTime" DROP DEFAULT;

-- DropTable
DROP TABLE "public"."Exercise";

-- CreateTable
CREATE TABLE "public"."Score" (
    "id" SERIAL NOT NULL,
    "profileId" INTEGER NOT NULL,
    "score" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Score_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WrongWord" (
    "id" SERIAL NOT NULL,
    "words" TEXT NOT NULL,
    "profileId" INTEGER NOT NULL,
    "isCorrect" BOOLEAN NOT NULL,
    "correctAnswer" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WrongWord_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Score" ADD CONSTRAINT "Score_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."WrongWord" ADD CONSTRAINT "WrongWord_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
