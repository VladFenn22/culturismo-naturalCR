-- CreateTable
CREATE TABLE "Lead" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "objetivo" TEXT NOT NULL,
    "experiencia" TEXT NOT NULL,
    "disponibilidad" TEXT NOT NULL,
    "lesiones" TEXT,
    "mensaje" TEXT,
    "source" TEXT,
    "status" TEXT NOT NULL DEFAULT 'new',

    CONSTRAINT "Lead_pkey" PRIMARY KEY ("id")
);
