-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('BASIC', 'ADMIN');

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "role" "public"."Role" NOT NULL DEFAULT 'BASIC';
