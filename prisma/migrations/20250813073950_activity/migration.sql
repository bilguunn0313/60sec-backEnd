-- CreateEnum
CREATE TYPE "public"."GameType" AS ENUM ('READING', 'FIND_ERROR');

-- AlterEnum
ALTER TYPE "public"."PlanInterval" ADD VALUE 'THREE_MONTHS';

-- AlterTable
ALTER TABLE "public"."Subscription" ALTER COLUMN "status" DROP DEFAULT;

-- CreateTable
CREATE TABLE "public"."Activity" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "gameType" "public"."GameType" NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
