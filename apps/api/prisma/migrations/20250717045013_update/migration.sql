/*
  Warnings:

  - Made the column `rate` on table `review` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `review` MODIFY `rate` INTEGER NOT NULL;
