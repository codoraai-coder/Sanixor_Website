/**
 * All public legal / policy routes.
 *
 * Each page is a thin binding of a policy's metadata (version, dates, route)
 * to its content document. The shared `LegalPage` supplies the chrome, the
 * table of contents, anchors and the version block, so these stay uniform
 * and a new policy is a few lines rather than a new bespoke page.
 */
import { LegalPage } from "@/components/legal/LegalPage";
import { GrievanceForm, PrivacyRequestForm } from "@/components/legal/PrivacyRequestForm";
import { POLICIES } from "@/config/policies.config";

import { privacyDocument } from "@/content/legal/privacy";
import { termsDocument } from "@/content/legal/terms";
import { refundDocument } from "@/content/legal/refund";
import {
  accessibilityDocument,
  cookieDocument,
  securityDocument,
} from "@/content/legal/site-policies";
import {
  dataDeletionDocument,
  dataRightsDocument,
  grievanceDocument,
  subprocessorsDocument,
} from "@/content/legal/data-policies";
import {
  acceptableUseDocument,
  disclaimerDocument,
  intellectualPropertyDocument,
} from "@/content/legal/usage-policies";

export function Privacy() {
  return <LegalPage meta={POLICIES.privacy} document={privacyDocument} />;
}

export function Terms() {
  return <LegalPage meta={POLICIES.terms} document={termsDocument} />;
}

export function RefundPolicy() {
  return <LegalPage meta={POLICIES["refund-policy"]} document={refundDocument} />;
}

export function CookiePolicy() {
  return <LegalPage meta={POLICIES["cookie-policy"]} document={cookieDocument} />;
}

export function SecurityPolicy() {
  return <LegalPage meta={POLICIES.security} document={securityDocument} />;
}

export function AccessibilityStatement() {
  return <LegalPage meta={POLICIES.accessibility} document={accessibilityDocument} />;
}

export function Subprocessors() {
  return <LegalPage meta={POLICIES.subprocessors} document={subprocessorsDocument} />;
}

export function DataRights() {
  return (
    <LegalPage
      meta={POLICIES["data-rights"]}
      document={dataRightsDocument}
      slotHeading="Make a request"
      slot={<PrivacyRequestForm defaultType="access" />}
    />
  );
}

export function DataDeletion() {
  return (
    <LegalPage
      meta={POLICIES["data-deletion"]}
      document={dataDeletionDocument}
      slotHeading="Request deletion"
      slot={<PrivacyRequestForm defaultType="erasure" />}
    />
  );
}

export function Grievance() {
  return (
    <LegalPage
      meta={POLICIES.grievance}
      document={grievanceDocument}
      slotHeading="Raise a grievance"
      slot={<GrievanceForm />}
    />
  );
}

export function AcceptableUse() {
  return <LegalPage meta={POLICIES["acceptable-use"]} document={acceptableUseDocument} />;
}

export function IntellectualProperty() {
  return (
    <LegalPage meta={POLICIES["intellectual-property"]} document={intellectualPropertyDocument} />
  );
}

export function Disclaimer() {
  return <LegalPage meta={POLICIES.disclaimer} document={disclaimerDocument} />;
}
