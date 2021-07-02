/*
  Warnings:

  - You are about to drop the column `waitingListCustomerId` on the `WaitingListCallingHistory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `WaitingListCallingHistory` DROP FOREIGN KEY `WaitingListCallingHistory_ibfk_2`;

-- AlterTable
ALTER TABLE `WaitingListCallingHistory` DROP COLUMN `waitingListCustomerId`,
    ADD COLUMN `customerId` VARCHAR(191),
    ADD COLUMN `customerName` VARCHAR(191),
    ADD COLUMN `phoneNumber` VARCHAR(191);
