/*
  Warnings:

  - You are about to drop the `WaitingListCallingHistory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `WaitingListCallingHistory` DROP FOREIGN KEY `WaitingListCallingHistory_ibfk_1`;

-- DropTable
DROP TABLE `WaitingListCallingHistory`;

-- CreateTable
CREATE TABLE `WaitingListCallHistory` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `messageId` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `waitingListId` VARCHAR(191) NOT NULL,
    `customerId` VARCHAR(191),
    `customerName` VARCHAR(191),
    `phoneNumber` VARCHAR(191),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WaitingListCallHistory` ADD FOREIGN KEY (`waitingListId`) REFERENCES `WaitingList`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
