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
