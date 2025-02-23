-- CreateEnum
CREATE TYPE "ParkingOptions" AS ENUM ('ONSITE', 'STREET', 'VALET', 'METERED_STREET', 'LOT', 'PAID_ONSITE');

-- CreateEnum
CREATE TYPE "DayOfWeek" AS ENUM ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY');

-- CreateEnum
CREATE TYPE "CancellationPolicy" AS ENUM ('VERY_FLEXIBLE', 'FLEXIBLE', 'THIRTY_DAY', 'NINETY_DAY');

-- CreateEnum
CREATE TYPE "CleaningMeasure" AS ENUM ('GUIDELINES_COMPLIANCE', 'HIGH_TOUCH_DISINFECTION', 'POROUS_MATERIALS_CLEANED', 'PROFESSIONAL_CLEANER', 'SPACED_BOOKINGS');

-- CreateEnum
CREATE TYPE "ProtectiveGear" AS ENUM ('DISINFECTING_WIPES', 'DISPOSABLE_GLOVES', 'DISPOSABLE_MASKS', 'HAND_SANITIZER');

-- CreateEnum
CREATE TYPE "DistanceMeasure" AS ENUM ('LIMITED_CAPACITY', 'OUTDOOR_VENTILATION', 'HEPA_AIR_FILTERS', 'OUTDOOR_SPACE', 'RECONFIGURED_SPACE');

-- CreateEnum
CREATE TYPE "CovidSignage" AS ENUM ('CLEANING_CHECKLIST', 'COVID_GUIDELINES', 'DISTANCE_MARKERS', 'DIRECTIONAL_ARROWS');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Listing" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "address" TEXT,
    "landmark" TEXT,
    "city" TEXT,
    "state" VARCHAR(18),
    "pincode" INTEGER,
    "typeOfSpace" TEXT,
    "overNightStays" BOOLEAN,
    "hasParking" BOOLEAN DEFAULT false,
    "parkingOptions" "ParkingOptions"[],
    "parkingDescription" TEXT,
    "securityCameras" BOOLEAN,
    "name" TEXT,
    "description" TEXT,
    "age" TEXT,
    "size" INTEGER,
    "rules" TEXT,
    "wifiName" TEXT,
    "wifiPassword" TEXT,
    "arrivalInstructions" TEXT,
    "agreesToPolicies" BOOLEAN,
    "cancellationPolicy" "CancellationPolicy",
    "cleaningMeasures" "CleaningMeasure"[],
    "protectiveGear" "ProtectiveGear"[],
    "distanceMeasures" "DistanceMeasure"[],
    "covidSignage" "CovidSignage"[],

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ListingProgress" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "addressCompleted" BOOLEAN DEFAULT false,
    "spaceDetailsCompleted" BOOLEAN DEFAULT false,
    "photosCompleted" BOOLEAN DEFAULT false,
    "policiesCompleted" BOOLEAN DEFAULT false,
    "healthSafetyCompleted" BOOLEAN DEFAULT false,
    "operatingHoursCompleted" BOOLEAN DEFAULT false,
    "cancellationPolicyCompleted" BOOLEAN DEFAULT false,
    "typeOfSpaceCompleted" BOOLEAN DEFAULT false,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ListingProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "listingId" TEXT NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OperatingHours" (
    "id" TEXT NOT NULL,
    "listingId" TEXT NOT NULL,
    "dayOfWeek" "DayOfWeek" NOT NULL,
    "isOpen" BOOLEAN DEFAULT true,
    "openTime" TEXT,
    "closeTime" TEXT,

    CONSTRAINT "OperatingHours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("provider","providerAccountId")
);

-- CreateTable
CREATE TABLE "Session" (
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VerificationToken_pkey" PRIMARY KEY ("identifier","token")
);

-- CreateTable
CREATE TABLE "Authenticator" (
    "credentialID" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "credentialPublicKey" TEXT NOT NULL,
    "counter" INTEGER NOT NULL,
    "credentialDeviceType" TEXT NOT NULL,
    "credentialBackedUp" BOOLEAN NOT NULL,
    "transports" TEXT,

    CONSTRAINT "Authenticator_pkey" PRIMARY KEY ("userId","credentialID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ListingProgress_listingId_key" ON "ListingProgress"("listingId");

-- CreateIndex
CREATE UNIQUE INDEX "OperatingHours_listingId_dayOfWeek_key" ON "OperatingHours"("listingId", "dayOfWeek");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Authenticator_credentialID_key" ON "Authenticator"("credentialID");

-- AddForeignKey
ALTER TABLE "Listing" ADD CONSTRAINT "Listing_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ListingProgress" ADD CONSTRAINT "ListingProgress_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OperatingHours" ADD CONSTRAINT "OperatingHours_listingId_fkey" FOREIGN KEY ("listingId") REFERENCES "Listing"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Authenticator" ADD CONSTRAINT "Authenticator_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
