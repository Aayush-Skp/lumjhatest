import type { Metadata } from "next";
import LegalShell from "@/components/legal/LegalShell";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Lumjha collects, uses, and protects your personal information and Customer Data.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalShell
      title="Privacy Policy"
      lastUpdated="June 23, 2026"
      current="privacy"
    >
      <section>
        <h3>1. Introduction</h3>
        <p>
          LUMJHAAI (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;)
          operates a no-code AI agent platform that enables businesses to build,
          deploy, and manage intelligent conversational agents trained on their
          own data. Our platform includes the Engage (chatbot), Discover (site
          search), and Comply (policy vault) modules, along with integrations to
          messaging platforms including Facebook Messenger, WhatsApp Business,
          Instagram, Telegram, TikTok, and Viber.
        </p>
        <p>
          This Privacy Policy explains what personal information we collect, how
          we use and protect it, and the rights you have over it. It applies to
          our website, dashboard, APIs, widgets, and all other services we
          provide (collectively, the &ldquo;Service&rdquo;). By using the Service
          you agree to the practices described here.
        </p>
      </section>

      <section>
        <h3>2. Who Controls Your Data</h3>
        <p>
          LUMJHAAI is the data controller for the account registration and
          platform-usage information described in this policy. For Customer Data
          (the content and documents you upload to power your agents),{" "}
          <strong>you are the data controller</strong> and we act only as a data
          processor on your behalf. See Section&nbsp;5 for full details.
        </p>
      </section>

      <section>
        <h3>3. Information We Collect</h3>

        <h4>3.1 Account &amp; Identity Information</h4>
        <ul>
          <li>
            Name, email address, and password (hashed with bcrypt) when you
            register.
          </li>
          <li>
            Organization name and role when you create or join a workspace.
          </li>
          <li>
            Team member details (name, email, role) when you invite
            collaborators.
          </li>
        </ul>

        <h4>3.2 Customer Data (Content You Upload)</h4>
        <ul>
          <li>
            Documents, PDFs, Word files, CSVs, JSON, and plain text uploaded to
            the knowledge base.
          </li>
          <li>
            Website content crawled from URLs you provide (via sitemap or
            robots.txt discovery).
          </li>
          <li>Policy documents stored in the Comply module.</li>
          <li>Product catalog data from connected Shopify stores.</li>
          <li>Calendar event data from connected Google Calendar accounts.</li>
          <li>
            Any other material submitted through the platform&rsquo;s
            data-source integrations.
          </li>
        </ul>

        <h4>3.3 Conversation &amp; Messaging Data</h4>
        <ul>
          <li>
            Messages and chat sessions processed through your agents (text,
            images, audio, video, documents).
          </li>
          <li>
            End-user metadata received from connected channels: external user
            IDs, display names, profile images, and platform identifiers.
          </li>
          <li>
            Lead information collected through your lead forms (name, email,
            phone, and any custom questionnaire responses).
          </li>
          <li>
            Appointment requests and confirmations processed via Google
            Calendar.
          </li>
        </ul>

        <h4>3.4 Usage &amp; Analytics Data</h4>
        <ul>
          <li>
            Dashboard interactions, feature usage, pages visited, and session
            durations.
          </li>
          <li>
            Agent performance metrics: message volumes, conversation counts,
            token usage, lead conversions, and widget impressions.
          </li>
          <li>Search queries and analytics submitted through Discover widgets.</li>
          <li>Error logs, API response times, and diagnostic telemetry.</li>
          <li>API key usage and developer integration activity.</li>
        </ul>

        <h4>3.5 Billing &amp; Payment Information</h4>
        <ul>
          <li>Subscription plan, billing period, and usage-limit data.</li>
          <li>
            Payment is processed by Stripe; we do not store full card numbers on
            our servers. Stripe&rsquo;s privacy policy governs payment data it
            collects.
          </li>
        </ul>

        <h4>3.6 Cookies &amp; Tracking Technologies</h4>
        <ul>
          <li>
            Authentication cookies and JWT session tokens to keep you signed in.
          </li>
          <li>
            Functional cookies to remember preferences (language, layout
            settings).
          </li>
          <li>Analytics cookies to measure aggregate usage and performance.</li>
        </ul>
      </section>

      <section>
        <h3>4. How We Use Your Data</h3>
        <p>We use the information we collect for the following purposes:</p>
        <ul>
          <li>
            <strong>Service delivery:</strong> Providing and operating all
            platform features including agent creation, knowledge base indexing,
            message routing, analytics, and billing.
          </li>
          <li>
            <strong>RAG processing:</strong> Generating vector embeddings from
            your Customer Data so your agents can retrieve accurate, contextual
            responses. See Section&nbsp;5 for details.
          </li>
          <li>
            <strong>Authentication &amp; security:</strong> Verifying
            identities, enforcing role-based access, rate limiting, and detecting
            abuse or unauthorized access.
          </li>
          <li>
            <strong>Billing &amp; subscriptions:</strong> Managing your plan,
            enforcing usage limits, generating invoices, and processing payments
            through Stripe.
          </li>
          <li>
            <strong>Communications:</strong> Sending account notifications,
            product updates, support responses, and billing alerts. You may opt
            out of marketing emails at any time.
          </li>
          <li>
            <strong>Analytics &amp; improvement:</strong> Aggregated, anonymized
            usage data helps us improve performance, prioritize features, and fix
            issues. We do not sell your data.
          </li>
          <li>
            <strong>Legal compliance:</strong> Retaining records as required by
            applicable law and responding to lawful requests from authorities.
          </li>
        </ul>
      </section>

      <section>
        <h3>5. Customer Data, Ownership &amp; RAG Processing</h3>

        <h4>5.1 You Own Your Data</h4>
        <p>
          All Customer Data — documents, crawled content, conversation history,
          lead data, and any other material you upload or generate through the
          Service — remains <strong>your property</strong>. We do not claim any
          ownership or intellectual property rights in your Customer Data.
        </p>

        <h4>5.2 Limited Processing License</h4>
        <p>
          By using the Service you grant us a limited, non-exclusive, worldwide
          license to host, store, transmit, index, and process your Customer Data{" "}
          <em>solely</em> for the purpose of operating the Service for your
          account. We do not use your Customer Data for any other purpose without
          your explicit written consent.
        </p>

        <h4>5.3 No Model Training on Private Data</h4>
        <p>
          We <strong>do not</strong> use your private Customer Data to train,
          fine-tune, or improve any shared or public AI models. Your uploaded
          documents are processed only to generate vector embeddings stored in
          your isolated Qdrant namespace and to serve responses to your agents.
        </p>

        <h4>5.4 RAG Pipeline</h4>
        <p>
          Our Retrieval-Augmented Generation (RAG) pipeline extracts text from
          your documents, splits it into chunks, generates semantic embeddings
          via our BGE encoder service, and stores those embeddings in a dedicated
          vector namespace. At query time, the most relevant chunks are retrieved
          and provided as context to the AI model generating your agent&rsquo;s
          response. Raw documents are stored in S3; embeddings are stored in
          Qdrant. Both are scoped to your account and logically isolated from
          other customers&rsquo; data.
        </p>
      </section>

      <section>
        <h3>6. Data Isolation &amp; Multi-Tenant Security</h3>
        <p>
          Our platform is designed for multi-tenant operation. We enforce
          isolation between customer accounts through the following measures:
        </p>
        <ul>
          <li>
            <strong>Authentication &amp; authorization:</strong> Every API
            request is validated with JWT tokens. Resource access is scoped to
            the authenticated account and role (owner, admin, member).
          </li>
          <li>
            <strong>Role-based access control (RBAC):</strong> Within your
            workspace, owners can assign admin or member roles, restrict team
            members to specific agents, and control which integrations are
            accessible.
          </li>
          <li>
            <strong>Knowledge base isolation:</strong> Each agent&rsquo;s
            knowledge base is stored and retrieved in a dedicated namespace. No
            agent can access another account&rsquo;s indexed data.
          </li>
          <li>
            <strong>Storage isolation:</strong> Files uploaded to S3 are stored
            under account-scoped prefixes and accessed only via time-limited
            signed URLs.
          </li>
          <li>
            <strong>Widget &amp; API key security:</strong> Embedded widgets are
            authenticated by agent-specific API keys. PIN protection is available
            to restrict chat access on public-facing deployments.
          </li>
        </ul>
      </section>

      <section>
        <h3>7. Technical &amp; Organizational Security Measures</h3>
        <ul>
          <li>
            <strong>Encryption in transit:</strong> All data exchanged between
            your browser, our APIs, and third-party services is encrypted using
            TLS/HTTPS.
          </li>
          <li>
            <strong>Password hashing:</strong> Passwords are hashed using bcrypt
            with appropriate work factors before storage. Plaintext passwords are
            never stored.
          </li>
          <li>
            <strong>Rate limiting:</strong> API endpoints are rate-limited to
            mitigate brute-force and denial-of-service attacks.
          </li>
          <li>
            <strong>AI safety filters:</strong> Agents can be configured with
            topic-blocking rules and moderation actions to prevent misuse.
          </li>
          <li>
            <strong>Secrets management:</strong> Integration credentials (OAuth
            tokens, API keys) are stored encrypted and never exposed in
            client-side code.
          </li>
          <li>
            <strong>Infrastructure:</strong> Our backend services, databases
            (MongoDB, Redis, Qdrant), and message broker (RabbitMQ) are hosted in
            controlled environments with network-level access controls.
          </li>
        </ul>
        <p>
          No system is completely secure. We recommend using strong, unique
          passwords and notifying us immediately at{" "}
          <a href="mailto:info@lumjha.ai">info@lumjha.ai</a> if you suspect any
          unauthorized access to your account.
        </p>
      </section>

      <section>
        <h3>8. Third-Party Integrations &amp; Subprocessors</h3>
        <p>
          To deliver the Service, we share data with the following categories of
          third parties. Each integration is activated only when you explicitly
          connect it.
        </p>
        <ul>
          <li>
            <strong>Messaging platforms (Meta, Telegram, TikTok, Viber):</strong>{" "}
            When you connect Facebook Messenger, WhatsApp Business, Instagram,
            Telegram, TikTok, or Viber, messages flow through those
            platforms&rsquo; APIs. Their respective privacy policies govern
            end-user data on their platforms.
          </li>
          <li>
            <strong>Google (Drive, Calendar):</strong> Connecting Google Drive
            allows us to ingest documents you select. Connecting Google Calendar
            enables appointment booking. We access only the scopes you authorize
            via OAuth.
          </li>
          <li>
            <strong>Shopify:</strong> Connecting your Shopify store allows us to
            index your product catalog for agent responses. We access only
            product data within the authorized scope.
          </li>
          <li>
            <strong>Stripe:</strong> Payment processing is handled by Stripe,
            Inc. We pass billing information to Stripe and receive subscription
            and invoice status in return. We do not store full card details.
          </li>
          <li>
            <strong>Cloud infrastructure providers:</strong> We use cloud
            hosting, object storage (S3-compatible), and managed database
            services. These providers process data on our behalf under data
            processing agreements.
          </li>
          <li>
            <strong>AI model providers:</strong> Agent responses may be generated
            using third-party large language model APIs. Only the relevant
            context chunks retrieved from your knowledge base (not full documents)
            are sent as part of a query. We maintain data processing agreements
            with these providers.
          </li>
        </ul>
        <p>
          We do not sell, rent, or trade your personal information or Customer
          Data to any third party for their own marketing purposes.
        </p>
      </section>

      <section>
        <h3>9. Cookies &amp; Tracking Technologies</h3>
        <p>We use the following cookie categories:</p>
        <ul>
          <li>
            <strong>Essential cookies:</strong> Required for authentication and
            secure session management. Cannot be disabled without breaking the
            Service.
          </li>
          <li>
            <strong>Functional cookies:</strong> Remember your preferences such
            as language and layout settings.
          </li>
          <li>
            <strong>Analytics cookies:</strong> Collect aggregated, anonymized
            data about how the Service is used to help us improve it.
          </li>
        </ul>
        <p>
          You can manage non-essential cookies through your browser settings.
          Disabling cookies may affect Service functionality, particularly
          authentication.
        </p>
      </section>

      <section>
        <h3>10. Data Retention</h3>
        <ul>
          <li>
            <strong>Account data:</strong> Retained while your account is active
            and for a reasonable period after cancellation to fulfill legal or
            contractual obligations, after which it is deleted or anonymized.
          </li>
          <li>
            <strong>Customer Data (documents, embeddings):</strong> Retained
            while your subscription is active. Upon account deletion or explicit
            deletion requests, documents and associated vector embeddings are
            removed from our systems. Residual copies in backups are purged on
            rolling backup-expiration schedules.
          </li>
          <li>
            <strong>Conversation history &amp; leads:</strong> Retained per your
            account settings and applicable plan. You can delete conversation
            history and leads from the dashboard at any time.
          </li>
          <li>
            <strong>Usage &amp; analytics data:</strong> Aggregated metrics are
            retained for service improvement purposes and may be retained for up
            to 24&nbsp;months in anonymized form.
          </li>
          <li>
            <strong>Billing records:</strong> Retained for at least 7&nbsp;years
            as required by financial regulations.
          </li>
        </ul>
      </section>

      <section>
        <h3>11. Your Privacy Rights</h3>
        <p>
          Depending on your location, you may have the following rights regarding
          your personal data:
        </p>
        <ul>
          <li>
            <strong>Access:</strong> Request a copy of the personal data we hold
            about you.
          </li>
          <li>
            <strong>Correction:</strong> Ask us to correct inaccurate or
            incomplete data.
          </li>
          <li>
            <strong>Deletion:</strong> Request deletion of your account and
            associated personal data, subject to legal retention obligations.
          </li>
          <li>
            <strong>Portability:</strong> Request your data in a structured,
            machine-readable format.
          </li>
          <li>
            <strong>Restriction &amp; objection:</strong> Ask us to restrict
            processing or object to certain uses of your data.
          </li>
          <li>
            <strong>Withdraw consent:</strong> Where processing is based on
            consent, withdraw it at any time without affecting prior processing.
          </li>
        </ul>
        <p>
          To exercise any of these rights, contact us at{" "}
          <a href="mailto:info@lumjha.ai">info@lumjha.ai</a>. We will respond
          within 30&nbsp;days (or as required by applicable law).
        </p>
      </section>

      <section>
        <h3>12. International Data Transfers</h3>
        <p>
          Our services are hosted and operated in cloud environments that may be
          located outside your country of residence. When we transfer personal
          data internationally, we rely on appropriate transfer mechanisms (such
          as standard contractual clauses or adequacy decisions) to ensure your
          data receives an equivalent level of protection.
        </p>
      </section>

      <section>
        <h3>13. Children&rsquo;s Privacy</h3>
        <p>
          The Service is intended for business use and is not directed to
          individuals under the age of&nbsp;18. We do not knowingly collect
          personal information from children. If you believe a child has provided
          us with personal information, please contact us and we will delete it.
        </p>
      </section>

      <section>
        <h3>14. Changes to This Policy</h3>
        <p>
          We may update this Privacy Policy to reflect changes in our practices,
          technology, or legal requirements. When we make material changes, we
          will update the &ldquo;Last updated&rdquo; date at the top of this page
          and, where appropriate, notify you by email or in-app notification.
          Continued use of the Service after the revised policy takes effect
          constitutes your acceptance of the changes.
        </p>
      </section>

      <section>
        <h3>15. Contact Us</h3>
        <p>
          For questions about this policy, to exercise your data rights, or to
          report a security concern, please contact us at{" "}
          <a href="mailto:info@lumjha.ai">info@lumjha.ai</a>. You also have the
          right to lodge a complaint with your local data protection authority.
        </p>
      </section>
    </LegalShell>
  );
}
