/*
  Warnings:

  - The `created_at` column on the `accounts` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "accounts" DROP COLUMN "created_at",
ADD COLUMN     "created_at" INTEGER;
