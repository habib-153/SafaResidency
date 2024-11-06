export interface ICoupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  expirationDate: Date;
  minimumPurchaseAmount?: number;
  usageLimit?: number;
  usedCount?: number;
  isActive: boolean;
}