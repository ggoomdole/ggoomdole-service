/*
  Warnings:

  - The `createAt` column on the `searchkeyword` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `updateAt` column on the `searchkeyword` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `pilgrimageparticipant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `pilgrimageparticipant` DROP FOREIGN KEY `PilgrimageParticipant_pilgrimageId_fkey`;

-- DropForeignKey
ALTER TABLE `pilgrimageparticipant` DROP FOREIGN KEY `PilgrimageParticipant_userId_fkey`;

-- AlterTable
ALTER TABLE `searchkeyword` DROP COLUMN `createAt`,
    ADD COLUMN `createAt` DATETIME(3) NULL,
    DROP COLUMN `updateAt`,
    ADD COLUMN `updateAt` DATETIME(3) NULL;

-- DropTable
DROP TABLE `pilgrimageparticipant`;

-- CreateTable
CREATE TABLE `PilgrimageUser` (
    `userId` INTEGER NOT NULL,
    `pilgrimageId` INTEGER NOT NULL,
    `type` BOOLEAN NULL,
    `createAt` DATETIME(3) NULL,
    `updateAt` DATETIME(3) NULL,

    PRIMARY KEY (`userId`, `pilgrimageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PilgrimageUser` ADD CONSTRAINT `PilgrimageUser_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PilgrimageUser` ADD CONSTRAINT `PilgrimageUser_pilgrimageId_fkey` FOREIGN KEY (`pilgrimageId`) REFERENCES `Pilgrimage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
