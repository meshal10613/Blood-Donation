/*
  Warnings:

  - The values [DHAKA,FARIDPUR,GAZIPUR,GOPALGANJ,KISHOREGANJ,MADARIPUR,MANIKGANJ,MUNSHIGANJ,NARAYANGANJ,NARSINGDI,TANGAIL,SHARIATPUR,BANDARBAN,BRAHMANBARIA,CHANDPUR,CHATTAGRAM,COXSBAZAR,CUMILLA,KHAGRACHHARI,LAKSHMIPUR,NOAKHALI,RANGAMATI,BOGURA,CHAPAINAWABGANJ,JOYPURHAT,NAOGAON,NATORE,PABNA,RAJSHAHI,SIRAJGANJ,BAGERHAT,CHUADANGA,JASHORE,JHENAIDAH,KHULNA,KUSHTIA,MAGURA,MEHERPUR,NARAIL,SATKHIRA,BARGUNA,BARISHAL,BHOLA,JHALOKATHI,PATUAKHALI,PIROJPUR,HABIGANJ,MOULVIBAZAR,SUNAMGANJ,SYLHET,DINAJPUR,GAIBANDHA,KURIGRAM,LALMONIRHAT,NILPHAMARI,PANCHAGARH,RANGPUR,THAKURGAON,JAMALPUR,MYMENSINGH,NETROKONA,SHERPUR] on the enum `District` will be removed. If these variants are still used in the database, this will fail.
  - The values [DHAKA,CHATTAGRAM,RAJSHAHI,KHULNA,BARISHAL,SYLHET,RANGPUR,MYMENSINGH] on the enum `Division` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "District_new" AS ENUM ('Dhaka', 'Faridpur', 'Gazipur', 'Gopalganj', 'Kishoreganj', 'Madaripur', 'Manikganj', 'Munshiganj', 'Narayanganj', 'Narsingdi', 'Tangail', 'Shariatpur', 'Bandarban', 'Brahmanbaria', 'Chandpur', 'Chattagram', 'CoxsBazar', 'Cumilla', 'Khagrachhari', 'Lakshmipur', 'Noakhali', 'Rangamati', 'Bogura', 'Chapainawabganj', 'Joypurhat', 'Naogaon', 'Natore', 'Pabna', 'Rajshahi', 'Sirajganj', 'Bagerhat', 'Chuadanga', 'Jashore', 'Jhenaidah', 'Khulna', 'Kushtia', 'Magura', 'Meherpur', 'Narail', 'Satkhira', 'Barguna', 'Barishal', 'Bhola', 'Jhalokathi', 'Patuakhali', 'Pirojpur', 'Habiganj', 'Moulvibazar', 'Sunamganj', 'Sylhet', 'Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat', 'Nilphamari', 'Panchagarh', 'Rangpur', 'Thakurgaon', 'Jamalpur', 'Mymensingh', 'Netrokona', 'Sherpur');
ALTER TABLE "User" ALTER COLUMN "district" TYPE "District_new" USING ("district"::text::"District_new");
ALTER TYPE "District" RENAME TO "District_old";
ALTER TYPE "District_new" RENAME TO "District";
DROP TYPE "public"."District_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "Division_new" AS ENUM ('Dhaka', 'Chattagram', 'Rajshahi', 'Khulna', 'Barishal', 'Sylhet', 'Rangpur', 'Mymensingh');
ALTER TABLE "User" ALTER COLUMN "division" TYPE "Division_new" USING ("division"::text::"Division_new");
ALTER TYPE "Division" RENAME TO "Division_old";
ALTER TYPE "Division_new" RENAME TO "Division";
DROP TYPE "public"."Division_old";
COMMIT;
