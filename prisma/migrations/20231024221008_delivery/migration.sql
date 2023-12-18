-- CreateTable
CREATE TABLE "Delivery" (
    "id" SERIAL NOT NULL,
    "method" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "address" TEXT NOT NULL,
    "recipientName" TEXT NOT NULL,
    "recipientPhoneNumber" TEXT NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "Delivery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Delivery_orderId_idx" ON "Delivery"("orderId");
