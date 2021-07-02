-- CreateTable
CREATE TABLE `WaitingListCallingHistory` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `messageId` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `waitingListId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `WaitingListCallingHistory` ADD FOREIGN KEY (`waitingListId`) REFERENCES `WaitingList`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
