/*
  Warnings:

  - Added the required column `waitingListCustomerId` to the `WaitingListCallingHistory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `WaitingListCallingHistory` ADD COLUMN `waitingListCustomerId` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `WaitingListCallingHistory` ADD FOREIGN KEY (`waitingListCustomerId`) REFERENCES `WaitingListCustomer`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
