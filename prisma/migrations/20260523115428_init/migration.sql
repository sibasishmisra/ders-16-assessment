-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Assessment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "candidateName" TEXT NOT NULL,
    "candidateEmail" TEXT NOT NULL,
    "responses" TEXT NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "awarenessScore" INTEGER NOT NULL,
    "clarityScore" INTEGER NOT NULL,
    "goalsScore" INTEGER NOT NULL,
    "impulseScore" INTEGER NOT NULL,
    "strategiesScore" INTEGER NOT NULL,
    "nonAcceptanceScore" INTEGER NOT NULL,
    "timeTaken" INTEGER NOT NULL,
    "startedAt" DATETIME NOT NULL,
    "completedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "Admin"("email");

-- CreateIndex
CREATE INDEX "Assessment_candidateEmail_idx" ON "Assessment"("candidateEmail");

-- CreateIndex
CREATE INDEX "Assessment_completedAt_idx" ON "Assessment"("completedAt");
