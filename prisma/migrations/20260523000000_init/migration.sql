-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
-- DERS-16 (Bjureberg et al. 2016): 5 subscales, no awarenessScore, total range 16-80
CREATE TABLE "Assessment" (
    "id" TEXT NOT NULL,
    "candidateName" TEXT NOT NULL,
    "candidateEmail" TEXT NOT NULL,
    "responses" TEXT NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "clarityScore" INTEGER NOT NULL,
    "goalsScore" INTEGER NOT NULL,
    "impulseScore" INTEGER NOT NULL,
    "strategiesScore" INTEGER NOT NULL,
    "nonAcceptanceScore" INTEGER NOT NULL,
    "band" TEXT NOT NULL,
    "timeTaken" INTEGER NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL,
    "completedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Assessment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE INDEX "Assessment_candidateEmail_idx" ON "Assessment"("candidateEmail");

-- CreateIndex
CREATE INDEX "Assessment_completedAt_idx" ON "Assessment"("completedAt");

-- CreateIndex
CREATE INDEX "Assessment_totalScore_idx" ON "Assessment"("totalScore");
