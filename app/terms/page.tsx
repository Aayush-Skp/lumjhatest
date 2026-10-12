import type { Metadata } from "next";
import Link from "next/link";
import LegalPage from "@/components/site/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms governing your access to and use of the Lumjha platform and services.",
};

export default function TermsOfServicePage() {
  return (
    <LegalPage title="Terms of Service" lastUpdated="June 23, 2026">
      <section>
        <h3>1. Introduction</h3>
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally
          binding agreement between you (&ldquo;Client,&rdquo; &ldquo;you,&rdquo;
          or &ldquo;your&rdquo;) and LUMJHAAI (&ldquo;we,&rdquo;
          &ldquo;our,&rdquo; or &ldquo;us&rdquo;) governing your access to and use
          of the LUMJHAAI platform, including the Engage, Discover, and Comply
          modules, associated APIs, embeddable widgets, mobile integrations, and
          all related services (collectively, the &ldquo;Service&rdquo;).
        </p>
        <p>
          By creating an account, accessing, or using the Service, you confirm
          that you have read, understood, and agree to be bound by these Terms
          and our <Link href="/privacy">Privacy Policy</Link>. If you do not
          agree, do not use the Service.
        </p>
      </section>

      <section>
        <h3>2. Definitions</h3>
        <ul>
          <li>
            <strong>Account:</strong> Your registered workspace on the LUMJHAAI
            platform.
          </li>
          <li>
            <strong>Agent:</strong> An AI-powered chatbot or assistant you create
            and deploy through the Service.
          </li>
          <li>
            <strong>Client / Customer:</strong> The business or individual who
            subscribes to and administers an Account.
          </li>
          <li>
            <strong>Customer Data:</strong> All documents, content, product data,
            policies, URLs, calendar information, conversation history, lead data,
            and any other material you upload, crawl, or connect to the Service.
          </li>
          <li>
            <strong>End User:</strong> A person who interacts with your Agent
            through a deployed widget, messaging channel, or API.
          </li>
          <li>
            <strong>Module:</strong> A packaged set of Service features — Engage
            (chatbot), Discover (site search), or Comply (policy vault).
          </li>
          <li>
            <strong>Subscription:</strong> Your selected plan granting access to
            the Service and its features.
          </li>
          <li>
            <strong>Usage Limits:</strong> The maximum number of agents, messages,
            tokens, documents, and integrations permitted under your plan.
          </li>
        </ul>
      </section>

      <section>
        <h3>3. Eligibility &amp; Acceptance</h3>
        <p>
          You must be at least 18&nbsp;years old and legally capable of entering
          into binding contracts to use the Service. If you are using the Service
          on behalf of an organization, you represent and warrant that you have
          authority to bind that organization to these Terms, and references to
          &ldquo;you&rdquo; include that organization.
        </p>
        <p>
          We reserve the right to refuse Service to anyone for any reason that is
          not prohibited by law.
        </p>
      </section>

      <section>
        <h3>4. Account Registration &amp; Security</h3>
        <ul>
          <li>
            You must provide accurate, current, and complete information when
            registering your Account and keep it updated.
          </li>
          <li>
            You are responsible for maintaining the confidentiality of your login
            credentials and API keys.
          </li>
          <li>
            You are responsible for all activities that occur under your Account,
            including actions by team members you invite.
          </li>
          <li>
            You must notify us immediately at{" "}
            <a href="mailto:info@lumjha.ai">info@lumjha.ai</a> if you suspect
            unauthorized access to your Account.
          </li>
          <li>
            You may not share your Account credentials with unauthorized third
            parties or allow multiple concurrent users to share a single login.
          </li>
        </ul>
      </section>

      <section>
        <h3>5. Customer Data Ownership &amp; Rights</h3>

        <h4>5.1 You Own Your Data</h4>
        <p>
          <strong>All Customer Data is and remains your exclusive property.</strong>{" "}
          These Terms do not transfer any intellectual property rights in your
          Customer Data to LUMJHAAI. You retain full ownership of all documents,
          content, conversation history, leads, brand materials, and any other
          data you create, upload, or connect to the Service.
        </p>

        <h4>5.2 License to Process Your Data</h4>
        <p>
          By using the Service, you grant us a limited, non-exclusive,
          non-transferable, worldwide license to host, store, index, transmit,
          and process your Customer Data <em>solely and exclusively</em> for the
          purpose of providing the Service to your Account. This license
          terminates when you delete the relevant data or close your Account,
          subject to our standard backup-expiration schedules.
        </p>

        <h4>5.3 No Use for Public Model Training</h4>
        <p>
          We do not use your Customer Data to train, fine-tune, or improve any
          shared, public, or third-party AI models. Your data is used only within
          the RAG pipeline to generate responses for your own Agents.
        </p>

        <h4>5.4 Data Portability &amp; Deletion</h4>
        <p>
          You may export or delete your Customer Data (documents, leads,
          conversation history) at any time from the dashboard. Upon Account
          termination, we will delete or anonymize your Customer Data in
          accordance with our Privacy Policy. You may also request expedited
          deletion by contacting{" "}
          <a href="mailto:info@lumjha.ai">info@lumjha.ai</a>.
        </p>

        <h4>5.5 Your Responsibilities for Customer Data</h4>
        <p>
          You represent and warrant that: (a)&nbsp;you have all necessary rights,
          licenses, and permissions to upload, process, and use the Customer Data
          in connection with the Service; (b)&nbsp;your Customer Data does not
          violate any applicable law or third-party rights; and (c)&nbsp;you are
          solely responsible for the accuracy, legality, and appropriateness of
          your Customer Data and the Agent outputs derived from it.
        </p>
      </section>

      <section>
        <h3>6. Service Modules &amp; Features</h3>
        <p>
          The Service comprises the following Modules, available according to
          your Subscription plan:
        </p>
        <ul>
          <li>
            <strong>Engage:</strong> Create and deploy conversational AI Agents
            trained on your knowledge base. Includes RAG-powered responses, lead
            capture forms, appointment scheduling (via Google Calendar),
            multi-channel messaging (web widget, Facebook Messenger, WhatsApp
            Business, Instagram, Telegram, TikTok, Viber), and agent analytics.
          </li>
          <li>
            <strong>Discover:</strong> Build a site-search experience for your
            website by crawling and indexing your content. Includes an embeddable
            search widget, search analytics, and multi-site indexing.
          </li>
          <li>
            <strong>Comply:</strong> Store, manage, and surface policy and
            compliance documents through an AI-powered policy vault. Supports
            regulatory document retrieval and policy-specific agent responses.
          </li>
        </ul>
        <p>
          Additional Modules may be available as add-ons or during trial periods.
          Trial access is subject to defined limits and duration, after which
          continued access requires a paid Subscription.
        </p>
      </section>

      <section>
        <h3>7. Knowledge Base &amp; RAG Processing</h3>
        <p>
          The Service processes your Customer Data through a Retrieval-Augmented
          Generation (RAG) pipeline: documents are chunked, embedded via our
          semantic encoding service, and stored in a dedicated vector namespace
          scoped to your Account. At query time, relevant chunks are retrieved
          and used as context for AI-generated responses.
        </p>
        <p>
          Supported data sources include: direct document uploads (PDF, DOCX,
          TXT, CSV, JSON), website crawling, Google Drive, Shopify product
          catalogs, and custom feed APIs.
        </p>
        <p>
          You are responsible for the quality and legality of the content you
          index. We reserve the right to remove content that violates these Terms
          or applicable law.
        </p>
      </section>

      <section>
        <h3>8. Team Access &amp; Permissions</h3>
        <p>
          Accounts support multi-user workspaces with role-based access control:
        </p>
        <ul>
          <li>
            <strong>Owner:</strong> Full administrative control over the Account,
            billing, team, and all Agents.
          </li>
          <li>
            <strong>Admin:</strong> Can manage Agents, knowledge bases,
            integrations, and team members, but cannot change billing or transfer
            Account ownership.
          </li>
          <li>
            <strong>Member:</strong> Access limited to Agents and features
            assigned by an Owner or Admin.
          </li>
        </ul>
        <p>
          You are responsible for the actions of all users under your Account,
          including team members invited by you. You must ensure all team members
          comply with these Terms.
        </p>
      </section>

      <section>
        <h3>9. Third-Party Integrations</h3>
        <p>
          The Service supports integrations with third-party platforms including
          Meta (Facebook Messenger, WhatsApp Business, Instagram), Telegram,
          TikTok, Viber, Google (Drive, Calendar), Shopify, and Stripe. By
          enabling any integration, you agree to the applicable third-party terms
          of service and privacy policies.
        </p>
        <p>
          You are responsible for: (a)&nbsp;maintaining valid authorization for
          each connected platform; (b)&nbsp;complying with each platform&rsquo;s
          usage policies, including Meta&rsquo;s messaging policies and WhatsApp
          Business Policy; and (c)&nbsp;ensuring any messaging you send through
          the Service complies with applicable anti-spam, TCPA, GDPR, and other
          laws.
        </p>
        <p>
          We are not responsible for the availability, accuracy, or actions of
          third-party platforms. Changes to third-party APIs may affect Service
          features without notice.
        </p>
      </section>

      <section>
        <h3>10. API Access &amp; Developer Terms</h3>
        <p>
          Where your plan includes API access, we grant you a limited,
          non-exclusive, non-transferable license to interact with the Service
          programmatically via our APIs. You must:
        </p>
        <ul>
          <li>
            Keep your API keys confidential and rotate them promptly if
            compromised.
          </li>
          <li>
            Not exceed rate limits or Usage Limits associated with your plan.
          </li>
          <li>
            Not use the API to build a competing service or to reverse-engineer
            the Service.
          </li>
          <li>
            Ensure all API-driven interactions comply with these Terms and
            applicable law.
          </li>
        </ul>
        <p>
          We may modify, deprecate, or discontinue API endpoints with reasonable
          notice.
        </p>
      </section>

      <section>
        <h3>11. Acceptable Use Policy</h3>
        <p>You agree not to use the Service to:</p>
        <ul>
          <li>
            Violate any applicable local, national, or international law or
            regulation.
          </li>
          <li>
            Upload or transmit content that is defamatory, obscene, threatening,
            discriminatory, or otherwise unlawful.
          </li>
          <li>
            Upload copyrighted materials without authorization from the rights
            holder.
          </li>
          <li>
            Impersonate any person or entity or misrepresent your affiliation
            with any person or entity.
          </li>
          <li>Introduce malware, viruses, or malicious code into the Service.</li>
          <li>
            Attempt to gain unauthorized access to any part of the Service, other
            Accounts, or related systems.
          </li>
          <li>
            Circumvent, disable, or interfere with security features, rate limits,
            or access controls.
          </li>
          <li>
            Scrape, crawl, or data-mine the Service for purposes other than your
            own authorized use.
          </li>
          <li>
            Deploy Agents that generate misleading, deceptive, or harmful content
            without appropriate disclosures.
          </li>
          <li>
            Use the Service to send unsolicited communications (spam) to End
            Users.
          </li>
        </ul>
        <p>
          We reserve the right to investigate and take appropriate action against
          violations, including removing content, suspending Accounts, and
          reporting to law enforcement.
        </p>
      </section>

      <section>
        <h3>12. AI Limitations &amp; Output Disclaimer</h3>
        <p>
          LUMJHAAI uses large language models and retrieval-augmented generation
          to produce Agent responses. You acknowledge that:
        </p>
        <ul>
          <li>
            AI-generated outputs may be incomplete, inaccurate, outdated, or
            unsuitable for your intended use.
          </li>
          <li>
            Outputs are based on the Customer Data you provide; the quality of
            responses depends on the quality and accuracy of your knowledge base.
          </li>
          <li>
            AI responses do not constitute legal, medical, financial, or
            professional advice.
          </li>
          <li>
            You are solely responsible for reviewing AI-generated content before
            deploying it publicly and for any consequences arising from its use.
          </li>
          <li>
            You must not deploy Agents in safety-critical contexts (e.g., medical
            triage, emergency services) without human oversight.
          </li>
        </ul>
      </section>

      <section>
        <h3>13. Subscriptions &amp; Billing</h3>

        <h4>13.1 Plans &amp; Fees</h4>
        <p>
          Access to the Service requires a paid Subscription or an active free
          trial. Subscription fees, plan features, and Usage Limits are described
          on our pricing page and may be updated from time to time. Continued use
          after a price change constitutes acceptance of the new pricing.
        </p>

        <h4>13.2 Billing &amp; Payment</h4>
        <ul>
          <li>
            Payments are processed by Stripe. By subscribing, you authorize us to
            charge your payment method on a recurring basis.
          </li>
          <li>
            Subscriptions renew automatically at the end of each billing period
            unless canceled before the renewal date.
          </li>
          <li>
            All fees are exclusive of taxes. You are responsible for any
            applicable taxes, levies, or duties.
          </li>
          <li>
            Past-due accounts may result in service suspension. Accounts unpaid
            for an extended period may be terminated.
          </li>
        </ul>

        <h4>13.3 Usage Limits &amp; Overages</h4>
        <p>
          Each plan includes defined limits for agents, messages, tokens,
          documents, and integrations. Usage is tracked in real time. Exceeding
          plan limits may result in throttling or a prompt to upgrade. We are not
          liable for service degradation caused by your exceeding applicable
          limits.
        </p>

        <h4>13.4 Refunds</h4>
        <p>
          Subscription fees are generally non-refundable except where required by
          law. If you believe you were charged in error, contact{" "}
          <a href="mailto:info@lumjha.ai">info@lumjha.ai</a> within 30&nbsp;days
          of the charge.
        </p>

        <h4>13.5 Plan Downgrades</h4>
        <p>
          Downgrading your plan may result in reduced access to features or Agents
          that exceed the lower plan&rsquo;s limits. Excess Agents or data may be
          vaulted (inaccessible but preserved) until your plan is upgraded or the
          data is deleted.
        </p>
      </section>

      <section>
        <h3>14. Intellectual Property</h3>
        <p>
          The Service, including its software, architecture, interface designs,
          RAG pipeline, embedding models, documentation, and all LUMJHAAI
          branding, is owned by LUMJHAAI and protected by intellectual property
          laws. These Terms do not grant you any rights in our intellectual
          property beyond the limited license to use the Service as described
          herein.
        </p>
        <p>
          You may not copy, modify, distribute, sell, reverse-engineer, or create
          derivative works from any part of the Service without our prior written
          consent.
        </p>
      </section>

      <section>
        <h3>15. Confidentiality</h3>
        <p>
          Each party may disclose confidential information to the other in
          connection with the Service. Each party agrees to keep the other&rsquo;s
          confidential information strictly confidential and to use it only for
          purposes of performing obligations under these Terms. This obligation
          does not apply to information that: (a)&nbsp;is or becomes publicly
          available without breach; (b)&nbsp;was already known to the receiving
          party; (c)&nbsp;is disclosed with prior written approval; or
          (d)&nbsp;must be disclosed by law or court order.
        </p>
        <p>
          We treat your Customer Data as confidential and will not disclose it
          except as required to provide the Service or as required by law.
        </p>
      </section>

      <section>
        <h3>16. Service Availability &amp; Maintenance</h3>
        <p>
          We strive to maintain high availability of the Service but do not
          guarantee uninterrupted access. We may perform scheduled maintenance
          (with advance notice where practicable) or emergency maintenance as
          required. We are not liable for downtime caused by factors outside our
          reasonable control, including third-party platform outages, internet
          infrastructure failures, or force majeure events.
        </p>
        <p>
          We reserve the right to modify, update, or discontinue features of the
          Service with reasonable notice. Material changes to core functionality
          will be communicated via email or in-app notification.
        </p>
      </section>

      <section>
        <h3>17. Termination</h3>

        <h4>17.1 Termination by You</h4>
        <p>
          You may cancel your Subscription at any time from the billing settings
          in your Account. Cancellation takes effect at the end of the current
          billing period. You remain responsible for all fees incurred before
          cancellation.
        </p>

        <h4>17.2 Termination by Us</h4>
        <p>
          We may suspend or terminate your Account immediately if: (a)&nbsp;you
          materially breach these Terms and fail to cure within 14&nbsp;days of
          notice; (b)&nbsp;you engage in fraudulent, abusive, or illegal conduct;
          (c)&nbsp;your Account poses a security risk to us or other customers; or
          (d)&nbsp;we are required to do so by law.
        </p>

        <h4>17.3 Effect of Termination</h4>
        <p>
          Upon termination, your right to access the Service ceases immediately.
          We will retain and then delete your Customer Data in accordance with our
          Privacy Policy. Sections&nbsp;5 (Customer Data Ownership), 12 (AI
          Limitations), 14 (Intellectual Property), 15 (Confidentiality), 18
          (Limitation of Liability), 19 (Indemnification), and 21 (Governing Law)
          survive termination.
        </p>
      </section>

      <section>
        <h3>18. Disclaimer of Warranties &amp; Limitation of Liability</h3>

        <h4>18.1 Disclaimer</h4>
        <p>
          THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; AND &ldquo;AS
          AVAILABLE&rdquo; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED,
          INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR
          A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE
          SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR THAT AI-GENERATED OUTPUTS
          WILL BE ACCURATE OR COMPLETE.
        </p>

        <h4>18.2 Limitation of Liability</h4>
        <p>
          TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, LUMJHAAI AND ITS
          OFFICERS, DIRECTORS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY
          INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES,
          INCLUDING LOSS OF PROFITS, REVENUE, DATA, GOODWILL, OR BUSINESS
          INTERRUPTION, ARISING FROM YOUR USE OF OR INABILITY TO USE THE SERVICE,
          EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
        </p>
        <p>
          IN ANY EVENT, OUR TOTAL AGGREGATE LIABILITY TO YOU FOR ALL CLAIMS
          ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICE SHALL NOT
          EXCEED THE GREATER OF (A)&nbsp;THE AMOUNT YOU PAID TO US IN THE
          12&nbsp;MONTHS PRECEDING THE CLAIM OR (B)&nbsp;USD&nbsp;100.
        </p>
      </section>

      <section>
        <h3>19. Indemnification</h3>
        <p>
          You agree to indemnify, defend, and hold harmless LUMJHAAI and its
          affiliates, officers, directors, employees, and agents from and against
          any claims, damages, losses, liabilities, costs, and expenses (including
          reasonable legal fees) arising out of or related to: (a)&nbsp;your use
          of the Service; (b)&nbsp;your Customer Data; (c)&nbsp;your Agents and the
          content they generate; (d)&nbsp;your violation of these Terms; or
          (e)&nbsp;your violation of any applicable law or third-party right.
        </p>
      </section>

      <section>
        <h3>20. Dispute Resolution</h3>
        <p>
          In the event of a dispute, the parties agree to first attempt resolution
          through good-faith negotiation. If the dispute is not resolved within
          30&nbsp;days of written notice, either party may pursue formal legal
          remedies as permitted under applicable law.
        </p>
        <p>
          Nothing in this section limits either party&rsquo;s right to seek
          injunctive or other equitable relief from a court of competent
          jurisdiction to prevent or stop intellectual property infringement or
          unauthorized access to the Service.
        </p>
      </section>

      <section>
        <h3>21. Governing Law</h3>
        <p>
          These Terms are governed by and construed in accordance with applicable
          law. If any provision of these Terms is found to be unenforceable, the
          remaining provisions shall remain in full force and effect. Our failure
          to enforce any right or provision of these Terms shall not constitute a
          waiver of that right or provision.
        </p>
      </section>

      <section>
        <h3>22. Changes to These Terms</h3>
        <p>
          We may update these Terms from time to time. When we make material
          changes, we will update the &ldquo;Last updated&rdquo; date and notify
          you via email or in-app notification at least 14&nbsp;days before the
          changes take effect. Continued use of the Service after the effective
          date constitutes your acceptance of the revised Terms. If you do not
          agree with the changes, you must stop using the Service and cancel your
          Subscription before the effective date.
        </p>
      </section>

      <section>
        <h3>23. General Provisions</h3>
        <ul>
          <li>
            <strong>Entire Agreement:</strong> These Terms and the Privacy Policy
            constitute the entire agreement between you and LUMJHAAI regarding the
            Service and supersede all prior agreements.
          </li>
          <li>
            <strong>Severability:</strong> If any provision is held invalid or
            unenforceable, it will be modified to the minimum extent necessary and
            the remaining provisions remain in effect.
          </li>
          <li>
            <strong>Assignment:</strong> You may not assign or transfer these Terms
            or your Account without our prior written consent. We may assign our
            rights and obligations without restriction.
          </li>
          <li>
            <strong>Force Majeure:</strong> Neither party is liable for delays or
            failures caused by circumstances beyond their reasonable control,
            including natural disasters, government actions, or third-party
            platform outages.
          </li>
          <li>
            <strong>No Waiver:</strong> Failure to enforce any provision does not
            constitute a waiver of future enforcement of that provision.
          </li>
        </ul>
      </section>

      <section>
        <h3>24. Contact Us</h3>
        <p>
          For questions about these Terms, billing, data deletion requests, or
          legal notices, please contact us at{" "}
          <a href="mailto:info@lumjha.ai">info@lumjha.ai</a>.
        </p>
      </section>
    </LegalPage>
  );
}
