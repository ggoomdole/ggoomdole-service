-- CreateTable
CREATE TABLE `SearchKeyword` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `word` VARCHAR(191) NULL,
    `createAt` INTEGER NULL,
    `updateAt` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Place` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `hours` VARCHAR(191) NULL,
    `avgRate` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `placeId` INTEGER NOT NULL,
    `text` VARCHAR(191) NULL,
    `rate` INTEGER NULL,
    `createAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PilgrimageSpot` (
    `pilgrimageId` INTEGER NOT NULL,
    `spotId` INTEGER NOT NULL,
    `number` INTEGER NULL,
    `introSpot` VARCHAR(191) NULL,
    `request` BOOLEAN NULL,
    `createAT` DATETIME(3) NULL,
    `updateAt` DATETIME(3) NULL,

    PRIMARY KEY (`pilgrimageId`, `spotId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PilgrimageCategory` (
    `pilgrimageId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `createAt` DATETIME(3) NULL,

    PRIMARY KEY (`pilgrimageId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PilgrimageParticipant` (
    `userId` INTEGER NOT NULL,
    `pilgrimageId` INTEGER NOT NULL,
    `type` BOOLEAN NULL,
    `createAt` DATETIME(3) NULL,
    `updateAt` DATETIME(3) NULL,

    PRIMARY KEY (`userId`, `pilgrimageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pilgrimage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NULL,
    `imageUrl` VARCHAR(191) NULL,
    `intro` VARCHAR(191) NULL,
    `search` INTEGER NULL,
    `public` BOOLEAN NULL,
    `createAt` DATETIME(3) NULL,
    `updateAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nickName` VARCHAR(191) NULL,
    `profileImage` VARCHAR(191) NULL,
    `native` ENUM('SHORT_TERM', 'MID_TERM', 'LONG_TERM', 'RESIDENT') NULL,
    `createAt` DATETIME(3) NULL,
    `updateAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SearchKeyword` ADD CONSTRAINT `SearchKeyword_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_placeId_fkey` FOREIGN KEY (`placeId`) REFERENCES `Place`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PilgrimageSpot` ADD CONSTRAINT `PilgrimageSpot_pilgrimageId_fkey` FOREIGN KEY (`pilgrimageId`) REFERENCES `Pilgrimage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PilgrimageSpot` ADD CONSTRAINT `PilgrimageSpot_spotId_fkey` FOREIGN KEY (`spotId`) REFERENCES `Place`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PilgrimageCategory` ADD CONSTRAINT `PilgrimageCategory_pilgrimageId_fkey` FOREIGN KEY (`pilgrimageId`) REFERENCES `Pilgrimage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PilgrimageCategory` ADD CONSTRAINT `PilgrimageCategory_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PilgrimageParticipant` ADD CONSTRAINT `PilgrimageParticipant_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PilgrimageParticipant` ADD CONSTRAINT `PilgrimageParticipant_pilgrimageId_fkey` FOREIGN KEY (`pilgrimageId`) REFERENCES `Pilgrimage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
