-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "BloodGroup" AS ENUM ('A_POS', 'A_NEG', 'B_POS', 'B_NEG', 'O_POS', 'O_NEG', 'AB_POS', 'AB_NEG');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" TEXT NOT NULL,
    "photoURL" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "mobileNumber" VARCHAR(20),
    "zilla" VARCHAR(50),
    "district" VARCHAR(50),
    "zipCode" VARCHAR(10),
    "bloodGroup" "BloodGroup",
    "lastBloodDonateDate" TIMESTAMP(3),
    "resetOtp" INTEGER,
    "resetOtpExpires" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastSignInAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_mobileNumber_key" ON "User"("mobileNumber");

-- CreateIndex
CREATE INDEX "User_bloodGroup_idx" ON "User"("bloodGroup");

-- CreateIndex
CREATE INDEX "User_district_idx" ON "User"("district");
