-- CreateTable
CREATE TABLE "ClientProfile" (
    "id" TEXT NOT NULL,
    "clerkUserId" TEXT NOT NULL,
    "alturaCm" INTEGER,
    "pesoKg" DECIMAL(6,2),
    "meta" TEXT,
    "experiencia" TEXT,
    "lesiones" TEXT,
    "disponibilidad" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ClientProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ClientProfile_clerkUserId_key" ON "ClientProfile"("clerkUserId");
