import { apiClient } from "@/services/api";
import { API_ENDPOINTS } from "@/config/api.config";
import type { RazorpayOptions, RazorpaySuccessResponse } from "@/types/razorpay";

/**
 * Payment service — the create-order half of the AgentVerse payment flow.
 *
 * The frontend never touches Razorpay keys or the Orders API directly: it asks
 * our backend to create an order (which stores a pending registration), then
 * launches Razorpay Checkout with the returned order details. Verification is
 * handled server-side (Phase 2), so nothing here marks a registration complete.
 */

/** Paid tiers only — institution is deferred (no online payment). */
export type CreateOrderPayload =
  | {
      userType: "student";
      name: string;
      email: string;
      phone: string;
      rollNo: string;
      college: string;
      website?: string;
    }
  | {
      userType: "professional";
      name: string;
      email: string;
      phone: string;
      experience: number;
      organization: string;
      website?: string;
    };

/** What the backend returns for a created order. */
export interface CreateOrderResult {
  keyId: string;
  orderId: string;
  /** Amount in paise. */
  amount: number;
  currency: string;
  receipt: string;
}

/** The fields Razorpay Checkout returns on success, sent to the backend to verify. */
export interface VerifyPaymentPayload {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}

/** Backend verification result — the payment is only trusted once this succeeds. */
export interface VerifyPaymentResult {
  status: "PAYMENT_SUCCESS";
  orderId: string;
  paymentId: string;
  event: string;
  userType: "student" | "professional";
  name: string;
  email: string;
  /** Permanent, human-readable Registration ID assigned on finalization. */
  registrationId: string;
}

const RAZORPAY_CHECKOUT_SRC = "https://checkout.razorpay.com/v1/checkout.js";

let checkoutLoader: Promise<void> | null = null;

/**
 * Lazily inject the Razorpay Checkout script exactly once. Resolves when
 * `window.Razorpay` is available; rejects if the script fails to load.
 */
export function loadRazorpayCheckout(): Promise<void> {
  if (typeof window !== "undefined" && window.Razorpay) return Promise.resolve();
  if (checkoutLoader) return checkoutLoader;

  checkoutLoader = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${RAZORPAY_CHECKOUT_SRC}"]`,
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Razorpay failed to load")), {
        once: true,
      });
      if (window.Razorpay) resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = RAZORPAY_CHECKOUT_SRC;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => {
      checkoutLoader = null; // allow a retry on next attempt
      reject(new Error("Razorpay failed to load"));
    };
    document.body.appendChild(script);
  });

  return checkoutLoader;
}

export const paymentService = {
  /** Create a Razorpay order for the given registration payload. */
  createOrder: (payload: CreateOrderPayload) =>
    apiClient.post<CreateOrderResult>(API_ENDPOINTS.paymentsCreateOrder, payload),

  /**
   * Verify a completed payment server-side. Success is only real once this
   * resolves — the frontend must never treat the Checkout callback alone as a
   * completed registration.
   */
  verifyPayment: (payload: VerifyPaymentPayload) =>
    apiClient.post<VerifyPaymentResult>(API_ENDPOINTS.paymentsVerify, payload),

  loadRazorpayCheckout,
};

export type { RazorpayOptions, RazorpaySuccessResponse };
