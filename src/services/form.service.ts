import { apiClient } from "@/services/api";
import { API_ENDPOINTS } from "@/config/api.config";

/**
 * Typed form-submission service. One function per backend form endpoint, with
 * payload types that mirror the backend Zod schemas. Components import these
 * instead of knowing anything about URLs or fetch.
 */

/** Result envelope's `data` for every form submission. */
export interface SubmissionResult {
  persisted: boolean;
  emailed: boolean;
}

export type ContactTopic =
  | "General Inquiry"
  | "Product Demo"
  | "Training"
  | "Partnership"
  // | "Careers"
  | "Press";

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  topic: ContactTopic;
  message: string;
  /** Honeypot — leave empty; bots fill it. */
  website?: string;
}

export type DemoProduct =
  | "BitBench"
  | "Hackathon Evaluation"
  | "HackEval"
  | "AutoDash"
  | "LexAI"
  | "Sanixor Studio"
  | "General";

export interface DemoPayload {
  name: string;
  email: string;
  organization: string;
  product: DemoProduct;
  message?: string;
  website?: string;
}

export interface HiringPayload {
  name: string;
  email: string;
  role: string;
  linkedin?: string;
  portfolio?: string;
  message?: string;
  website?: string;
}

export type AgentVersePayload =
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
    }
  | {
      userType: "institution";
      name: string;
      email: string;
      phone: string;
      organization: string;
      participants: number;
      website?: string;
    };

export const formService = {
  submitContact: (payload: ContactPayload) =>
    apiClient.post<SubmissionResult>(API_ENDPOINTS.contact, payload),

  submitDemo: (payload: DemoPayload) =>
    apiClient.post<SubmissionResult>(API_ENDPOINTS.demo, payload),

  submitHiring: (payload: HiringPayload) =>
    apiClient.post<SubmissionResult>(API_ENDPOINTS.hiring, payload),

  submitAgentVerse: (payload: AgentVersePayload) =>
    apiClient.post<SubmissionResult>(API_ENDPOINTS.agentverse, payload),
};

/* ────────────────────────────────────────────────────────────────────────
   Data-subject rights and grievance intake
   ──────────────────────────────────────────────────────────────────────── */

export type PrivacyRequestType =
  "access" | "correction" | "erasure" | "withdraw-consent" | "nomination";

export interface PrivacyRequestPayload {
  requestType: PrivacyRequestType;
  name: string;
  email: string;
  details?: string;
  /** The requester confirms the data is their own. */
  confirmOwnData: true;
  website?: string;
}

export type GrievanceCategory =
  "privacy" | "payment-or-refund" | "event" | "accessibility" | "content-or-conduct" | "other";

export interface GrievancePayload {
  category: GrievanceCategory;
  name: string;
  email: string;
  reference?: string;
  description: string;
  website?: string;
}

/**
 * What the backend returns for either intake. Deliberately contains no
 * personal data: the requester's identity has not been verified at the point
 * this responds, so it confirms receipt and nothing more.
 */
export interface RequestReceipt {
  requestId: string;
  persisted: boolean;
  acknowledgementBusinessDays: number;
  resolutionDays: number;
}

export const privacyService = {
  /** Record a data-subject rights request. Intake only — nothing is acted on. */
  submitPrivacyRequest: (payload: PrivacyRequestPayload) =>
    apiClient.post<RequestReceipt>(API_ENDPOINTS.privacyRequest, payload),

  /** Record a grievance for redressal. */
  submitGrievance: (payload: GrievancePayload) =>
    apiClient.post<RequestReceipt>(API_ENDPOINTS.grievance, payload),
};

export type RefundReason =
  | "duplicate-payment"
  | "payment-taken-no-registration"
  | "event-cancelled"
  | "event-postponed"
  | "changed-mind"
  | "cannot-attend"
  | "exceptional-circumstances";

export interface RefundRequestPayload {
  reasonCategory: RefundReason;
  name: string;
  email: string;
  registrationId?: string;
  orderId?: string;
  paymentId?: string;
  reason: string;
  website?: string;
}

/**
 * Receipt for a refund request. Contains no payment data — the request is
 * recorded and reviewed by a person; nothing is disclosed back at intake.
 */
export interface RefundReceipt {
  refundId: string;
  status: string;
  persisted: boolean;
  decisionBusinessDays: number;
  initiationBusinessDays: number;
}

export const refundService = {
  /** Record a refund request. No money moves here. */
  submitRefundRequest: (payload: RefundRequestPayload) =>
    apiClient.post<RefundReceipt>(API_ENDPOINTS.refundRequest, payload),
};
