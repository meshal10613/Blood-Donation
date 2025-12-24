/*
  Warnings:

  - You are about to drop the column `zilla` on the `User` table. All the data in the column will be lost.
  - The `district` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Division" AS ENUM ('DHAKA', 'CHATTAGRAM', 'RAJSHAHI', 'KHULNA', 'BARISHAL', 'SYLHET', 'RANGPUR', 'MYMENSINGH');

-- CreateEnum
CREATE TYPE "District" AS ENUM ('DHAKA', 'FARIDPUR', 'GAZIPUR', 'GOPALGANJ', 'KISHOREGANJ', 'MADARIPUR', 'MANIKGANJ', 'MUNSHIGANJ', 'NARAYANGANJ', 'NARSINGDI', 'TANGAIL', 'SHARIATPUR', 'BANDARBAN', 'BRAHMANBARIA', 'CHANDPUR', 'CHATTAGRAM', 'COXSBAZAR', 'CUMILLA', 'KHAGRACHHARI', 'LAKSHMIPUR', 'NOAKHALI', 'RANGAMATI', 'BOGURA', 'CHAPAINAWABGANJ', 'JOYPURHAT', 'NAOGAON', 'NATORE', 'PABNA', 'RAJSHAHI', 'SIRAJGANJ', 'BAGERHAT', 'CHUADANGA', 'JASHORE', 'JHENAIDAH', 'KHULNA', 'KUSHTIA', 'MAGURA', 'MEHERPUR', 'NARAIL', 'SATKHIRA', 'BARGUNA', 'BARISHAL', 'BHOLA', 'JHALOKATHI', 'PATUAKHALI', 'PIROJPUR', 'HABIGANJ', 'MOULVIBAZAR', 'SUNAMGANJ', 'SYLHET', 'DINAJPUR', 'GAIBANDHA', 'KURIGRAM', 'LALMONIRHAT', 'NILPHAMARI', 'PANCHAGARH', 'RANGPUR', 'THAKURGAON', 'JAMALPUR', 'MYMENSINGH', 'NETROKONA', 'SHERPUR');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "zilla",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "division" "Division",
DROP COLUMN "district",
ADD COLUMN     "district" "District";

-- CreateIndex
CREATE INDEX "User_district_idx" ON "User"("district");
