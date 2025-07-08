/*
  Warnings:

  - You are about to drop the column `createAT` on the `pilgrimagespot` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Pilgrimage` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `pilgrimagespot` DROP COLUMN `createAT`,
    ADD COLUMN `createAt` DATETIME(3) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Pilgrimage_title_key` ON `Pilgrimage`(`title`);
