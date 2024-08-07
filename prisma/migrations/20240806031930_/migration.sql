/*
  Warnings:

  - The values [PRIMARY,SECONDARY] on the enum `LinkPrecedence` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "LinkPrecedence_new" AS ENUM ('primary', 'secondary');
ALTER TABLE "Contact" ALTER COLUMN "linkPrecedence" TYPE "LinkPrecedence_new" USING ("linkPrecedence"::text::"LinkPrecedence_new");
ALTER TYPE "LinkPrecedence" RENAME TO "LinkPrecedence_old";
ALTER TYPE "LinkPrecedence_new" RENAME TO "LinkPrecedence";
DROP TYPE "LinkPrecedence_old";
COMMIT;
