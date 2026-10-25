/* ============================================================
   Blog posts — static data until the blog has a CMS.
   Add a post by appending to POSTS; /blogs/[slug] is generated
   from this list at build time.
   ============================================================ */

export const CATEGORIES = ["RAG", "Tech news", "Product", "Guides"] as const;
export type Category = (typeof CATEGORIES)[number];

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "code"; text: string }
  | { type: "quote"; text: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  /** ISO date (YYYY-MM-DD) */
  date: string;
  readMinutes: number;
  author: string;
  featured?: boolean;
  body: Block[];
};

export const POSTS: Post[] = [
  {
    slug: "what-is-rag",
    title: "What is RAG? A plain-English guide to retrieval-augmented generation",
    excerpt:
      "Large language models are fluent but forgetful. Retrieval-augmented generation gives them your documents to read before they answer, which is how an AI agent can talk about your business accurately.",
    category: "RAG",
    date: "2026-10-21",
    readMinutes: 7,
    author: "Lumjha Engineering",
    featured: true,
    body: [
      {
        type: "p",
        text: "A large language model (LLM) learns from a huge snapshot of public text. That makes it great at language, but it has never seen your price list, your returns policy or last week's opening-hours change. Ask it about them and it will either refuse or, worse, guess.",
      },
      {
        type: "p",
        text: "Retrieval-augmented generation (RAG) fixes this without retraining the model. Before the model answers, a retrieval step finds the passages from your own content that are most relevant to the question and places them in the prompt. The model then writes its answer from that material.",
      },
      { type: "h2", text: "The three moving parts" },
      {
        type: "ul",
        items: [
          "Ingestion: your website pages, PDFs and documents are cleaned, split into chunks and converted into embeddings: numeric vectors that capture meaning.",
          "Retrieval: when a question arrives it is embedded the same way, and the closest chunks are pulled from the index, often combined with classic keyword search.",
          "Generation: the model receives the question plus the retrieved chunks, with instructions to answer only from them and to say so when the answer isn't there.",
        ],
      },
      { type: "h2", text: "Why not just fine-tune the model?" },
      {
        type: "p",
        text: "Fine-tuning changes how a model writes, not reliably what it knows. It's slow to update, and you can't point to where an answer came from. With RAG, updating knowledge is as simple as re-crawling a page, and every answer can cite the exact source it used.",
      },
      { type: "h2", text: "Where RAG goes wrong" },
      {
        type: "p",
        text: "Most bad RAG answers are retrieval problems, not model problems. If the right passage never reaches the prompt, no model can answer well. Poor chunking, stale content, and questions phrased differently from your documents are the usual culprits. That's why good systems invest heavily in the retrieval half.",
      },
      {
        type: "quote",
        text: "A RAG system is only as good as the passage it retrieves. Generation is the easy part.",
      },
      { type: "h2", text: "How Lumjha uses it" },
      {
        type: "p",
        text: "Every Lumjha agent is a RAG system over one knowledge base. The same index powers the chat agent on your website and messaging channels, Site Search, and Policy Vault, so an answer on WhatsApp matches the one on your site.",
      },
    ],
  },
  {
    slug: "chunking-strategies-for-business-documents",
    title: "Chunking strategies that actually work for business documents",
    excerpt:
      "Fixed-size chunks are easy and often wrong. Here's how we split menus, policies and product manuals so retrieval finds complete, useful answers.",
    category: "RAG",
    date: "2026-10-14",
    readMinutes: 6,
    author: "Lumjha Engineering",
    body: [
      {
        type: "p",
        text: "Before a document can be searched it has to be split into chunks: pieces small enough to embed precisely, but large enough to carry a complete thought. Get this wrong and retrieval returns half a sentence about refunds and none of the conditions that matter.",
      },
      { type: "h2", text: "Fixed-size chunking" },
      {
        type: "p",
        text: "Cutting every few hundred tokens is simple and predictable, and with some overlap between neighbours it's a reasonable baseline. Its weakness is that it ignores structure: a table row, a numbered clause or an FAQ answer can be sliced in two.",
      },
      { type: "h2", text: "Structure-aware chunking" },
      {
        type: "p",
        text: "Business documents usually have structure worth keeping. Splitting on headings, list items and table rows keeps each chunk about one thing. We also attach the heading path to every chunk (for example, Returns › Opened items) so a chunk still makes sense on its own.",
      },
      { type: "h2", text: "What we've learned" },
      {
        type: "ul",
        items: [
          "Keep FAQ pairs together: the question is the best retrieval key for its answer.",
          "Never split a policy clause; exact-quote answers depend on the full text.",
          "Repeat the page title and section in each chunk's metadata.",
          "Re-chunk when the source changes instead of patching old chunks.",
        ],
      },
      {
        type: "code",
        text: `{
  "text": "Opened items may be returned within 14 days of delivery for store credit.",
  "path": ["Returns policy", "Opened items"],
  "source": "Returns-Policy-2026.pdf",
  "section": "§3.2"
}`,
      },
      {
        type: "p",
        text: "There's no universal chunk size. The right answer depends on the content, so the best test is the questions your customers actually ask.",
      },
    ],
  },
  {
    slug: "why-chatbots-hallucinate",
    title: "Why chatbots hallucinate, and how grounding with citations fixes it",
    excerpt:
      "Hallucinations aren't a bug you can patch out of a model. They're what happens when a model is asked something it has no evidence for. Grounding changes that.",
    category: "RAG",
    date: "2026-09-30",
    readMinutes: 5,
    author: "Lumjha Engineering",
    body: [
      {
        type: "p",
        text: "A language model predicts likely text. When it has strong evidence in its prompt, the likely text is the correct answer. When it doesn't, the likely text is still fluent and confident, just not true. That's a hallucination.",
      },
      { type: "h2", text: "Grounding: answer from evidence or not at all" },
      {
        type: "p",
        text: "Grounding means the model is instructed to answer only from the retrieved passages and to say plainly when they don't contain the answer. Paired with good retrieval, this removes most made-up answers, because the model is no longer filling gaps from memory.",
      },
      { type: "h2", text: "Citations make answers checkable" },
      {
        type: "p",
        text: "Linking each answer to the page or document it came from lets customers verify it and lets your team see why the agent said what it said. When an answer is wrong, the citation points straight at the content that needs fixing.",
      },
      { type: "h2", text: "Saying 'I don't know' is a feature" },
      {
        type: "ul",
        items: [
          "Unanswered questions show you exactly what's missing from your knowledge base.",
          "A graceful fallback (offer a human, take contact details) keeps the lead.",
          "Customers trust an agent more when it admits limits.",
        ],
      },
      {
        type: "p",
        text: "In Lumjha, questions the agent couldn't answer feed Gap Insights, so every 'I don't know' becomes a one-click improvement.",
      },
    ],
  },
  {
    slug: "hybrid-search-keywords-and-embeddings",
    title: "Hybrid search: combining keywords and embeddings for better retrieval",
    excerpt:
      "Vector search understands meaning; keyword search nails exact terms like SKUs and policy numbers. Used together, they beat either one alone.",
    category: "RAG",
    date: "2026-09-16",
    readMinutes: 6,
    author: "Lumjha Engineering",
    body: [
      {
        type: "p",
        text: "Embedding search finds passages that mean the same thing as the question, even when the words differ: 'Can I send it back?' matches a section titled Returns. But it can be fuzzy on exact tokens: a product code, a clause number or a brand name.",
      },
      {
        type: "p",
        text: "Keyword search (BM25 is the classic algorithm) is the opposite: precise on exact terms, blind to synonyms. Hybrid search runs both and merges the results.",
      },
      { type: "h2", text: "Merging the two lists" },
      {
        type: "p",
        text: "A simple, robust way to combine rankings is reciprocal rank fusion: each result scores higher the nearer the top it appears in either list. It needs no tuning between two very different scoring scales.",
      },
      {
        type: "code",
        text: `score(doc) = Σ  1 / (k + rank_in_list(doc))     // k ≈ 60
            lists`,
      },
      { type: "h2", text: "Then rerank" },
      {
        type: "p",
        text: "A reranker, typically a cross-encoder model, reads the question and each candidate passage together and re-orders the shortlist. It's too slow to run over the whole index, but excellent over the top few dozen results.",
      },
      {
        type: "ul",
        items: [
          "Retrieve broadly with hybrid search (recall).",
          "Rerank the shortlist (precision).",
          "Send only the best few passages to the model (cost and focus).",
        ],
      },
    ],
  },
  {
    slug: "exact-quotes-for-policy-answers",
    title: "Exact quotes vs. paraphrase: why policy answers need verbatim retrieval",
    excerpt:
      "For refunds, warranties and HR rules, a helpful paraphrase can be a liability. Policy answers should quote the clause and cite the source.",
    category: "RAG",
    date: "2026-08-26",
    readMinutes: 4,
    author: "Lumjha Product",
    body: [
      {
        type: "p",
        text: "Paraphrasing is what makes AI answers feel natural. For most questions that's exactly right. For policies it's risky: 'within 14 days' can quietly become 'about two weeks', and a condition like 'for store credit' can disappear entirely.",
      },
      { type: "h2", text: "Quote, then explain" },
      {
        type: "p",
        text: "For policy questions the safer pattern is to return the exact clause, untouched, with its document and section, and then add a short plain-language explanation if it helps. The customer or employee sees the binding wording and where it lives.",
      },
      {
        type: "quote",
        text: "“Opened items may be returned within 14 days of delivery for store credit.” (Returns-Policy-2026.pdf, §3.2)",
      },
      { type: "h2", text: "Restricting who can ask" },
      {
        type: "p",
        text: "Some policies are internal: staff handbooks, partner terms, pricing rules. Protecting them behind a PIN or single sign-on keeps the same exact-answer experience available to the right people only.",
      },
      {
        type: "p",
        text: "This is the idea behind Lumjha's Policy Vault: verbatim answers with sources, on your site or in a DM, optionally locked for staff or partners.",
      },
    ],
  },
  {
    slug: "mcp-usb-c-for-ai-agents",
    title: "MCP is becoming the USB-C of AI agents",
    excerpt:
      "The Model Context Protocol gives AI assistants one standard way to plug into tools and data. Here's why it matters for businesses, not just developers.",
    category: "Tech news",
    date: "2026-10-09",
    readMinutes: 5,
    author: "Lumjha Team",
    body: [
      {
        type: "p",
        text: "Every AI assistant used to need its own custom integration for every tool: one connector for your CRM in one assistant, another for the same CRM in the next. The Model Context Protocol (MCP), an open standard first published by Anthropic in late 2024, replaces that mess with one common plug.",
      },
      { type: "h2", text: "How it works" },
      {
        type: "p",
        text: "An MCP server exposes tools (actions the assistant can take) and resources (data it can read) in a standard format. Any MCP-capable client, whether a desktop assistant, a coding tool or your own agent, can discover and use them without bespoke glue code.",
      },
      {
        type: "ul",
        items: [
          "Build a connector once, use it from many AI clients.",
          "Permissions and scopes are explicit, so access can be read-only by default.",
          "Assistants can combine tools from different vendors in one task.",
        ],
      },
      { type: "h2", text: "Why businesses should care" },
      {
        type: "p",
        text: "Adoption has spread quickly across major AI platforms and developer tools. For a business, that means the data in the systems you already use, such as leads, conversations and knowledge bases, can be reached from whichever AI assistant your team prefers, under rules you control.",
      },
      { type: "h2", text: "What to watch" },
      {
        type: "p",
        text: "Security is the open question. Scoped tokens, OAuth, audit logs and read-only defaults are becoming the baseline expectations for any MCP server that touches business data, and they're worth asking about before you connect anything.",
      },
    ],
  },
  {
    slug: "long-context-windows-and-rag",
    title: "Huge context windows are here. Do we still need RAG?",
    excerpt:
      "Models can now read hundreds of thousands of tokens at once. It's tempting to paste in everything, but retrieval still wins on cost, speed and accuracy.",
    category: "Tech news",
    date: "2026-09-23",
    readMinutes: 5,
    author: "Lumjha Engineering",
    body: [
      {
        type: "p",
        text: "Context windows have grown dramatically: frontier models can now take in entire books or codebases in a single prompt. A fair question follows: why bother retrieving a few passages when you could send the whole knowledge base every time?",
      },
      { type: "h2", text: "Cost and latency scale with input" },
      {
        type: "p",
        text: "Models are billed and timed roughly by how much they read. Sending a whole site on every customer message makes each reply slower and many times more expensive than sending the handful of passages that matter.",
      },
      { type: "h2", text: "More context isn't always better context" },
      {
        type: "p",
        text: "Research has shown that models can miss information buried in the middle of very long inputs, an effect often called 'lost in the middle'. Feeding a focused set of relevant passages tends to produce sharper, better-grounded answers.",
      },
      { type: "h2", text: "Where long context helps" },
      {
        type: "ul",
        items: [
          "Fitting more retrieved passages, so fewer answers are missed.",
          "Keeping long conversations coherent across many turns.",
          "Reading a whole document when a question really needs all of it.",
        ],
      },
      {
        type: "p",
        text: "The practical answer is both: retrieval to choose what matters, long context to hold more of it.",
      },
    ],
  },
  {
    slug: "lumjha-mcp-connector",
    title: "Connect ChatGPT, Claude and your own agents to Lumjha with MCP",
    excerpt:
      "The Lumjha MCP connector lets your favourite AI assistant read your leads, conversations and analytics, with scoped access that's read-only by default.",
    category: "Product",
    date: "2026-10-17",
    readMinutes: 3,
    author: "Lumjha Product",
    body: [
      {
        type: "p",
        text: "Your Lumjha agent collects a lot of useful information: leads, full chat histories, the questions customers ask most. With the MCP connector you can reach all of it from the AI assistant you already use.",
      },
      { type: "h2", text: "What you can do" },
      {
        type: "ul",
        items: [
          "Ask 'Who booked an appointment today?' and get the list with chat context.",
          "Summarise this week's unanswered questions and draft answers to add.",
          "Export leads to a spreadsheet or CRM from a single prompt.",
          "On Growth and above, add knowledge (for example a new PDF) straight from your assistant.",
        ],
      },
      {
        type: "code",
        text: `# Ask your AI assistant about today's leads (illustrative)
mcp add lumjha https://<your-lumjha-mcp-endpoint>`,
      },
      { type: "h2", text: "Safe by default" },
      {
        type: "p",
        text: "Connections use scoped access and start read-only. Starter includes read-only MCP; Growth adds full read and write; Pro adds multi-agent scopes and Policy Vault over MCP.",
      },
    ],
  },
  {
    slug: "gap-insights",
    title: "Gap Insights: see what customers couldn't find, and fix it in one click",
    excerpt:
      "Every unanswered question is a hint. Gap Insights collects them across chat, site search and Policy Vault and suggests the answer to add.",
    category: "Product",
    date: "2026-09-09",
    readMinutes: 3,
    author: "Lumjha Product",
    body: [
      {
        type: "p",
        text: "When your agent can't answer, it says so and offers to take the visitor's details. Those moments are also the most valuable feedback you can get about your content.",
      },
      { type: "h2", text: "One list, every surface" },
      {
        type: "p",
        text: "Gap Insights groups unanswered questions from chat, Site Search and Policy Vault, counts how often each comes up, and shows where it was asked. 'Do you ship to Canada?' asked fourteen times this week jumps to the top.",
      },
      { type: "h2", text: "Suggested answers" },
      {
        type: "p",
        text: "For each gap, Lumjha drafts an answer you can review, edit and publish with one click. The agent picks it up immediately on every channel.",
      },
      {
        type: "ul",
        items: [
          "Starter: top unanswered questions, weekly.",
          "Growth: full gap suggestions and one-click fixes.",
          "Pro: cross-surface gaps, per location, with scheduled reports.",
        ],
      },
    ],
  },
  {
    slug: "measuring-rag-quality",
    title: "How to measure a RAG system: the metrics that matter",
    excerpt:
      "'It seems to work' isn't a metric. A small test set and four numbers will tell you whether retrieval or generation needs attention.",
    category: "Guides",
    date: "2026-08-12",
    readMinutes: 6,
    author: "Lumjha Engineering",
    body: [
      {
        type: "p",
        text: "You can't improve what you don't measure. The good news: you don't need a research lab. A few dozen real customer questions with known good answers is enough to start.",
      },
      { type: "h2", text: "Measure retrieval and generation separately" },
      {
        type: "p",
        text: "When an answer is wrong, the first question is whether the right passage was retrieved at all. Scoring the two halves separately tells you where to spend effort.",
      },
      {
        type: "ul",
        items: [
          "Recall@k: did the correct passage appear in the top k results?",
          "MRR (mean reciprocal rank): how near the top did it appear?",
          "Faithfulness: is every claim in the answer supported by the retrieved text?",
          "Answer relevance: does the answer actually address the question asked?",
        ],
      },
      { type: "h2", text: "Build the test set from real traffic" },
      {
        type: "p",
        text: "Pull questions from real conversations, including the awkward ones: typos, slang, two questions in one. Synthetic questions written by your team tend to echo your documents' wording and make retrieval look better than it is.",
      },
      { type: "h2", text: "Re-run it on every change" },
      {
        type: "p",
        text: "Changing chunk size, adding a reranker or switching models can help one kind of question and hurt another. Re-running the same set after each change turns guesswork into a quick, honest comparison.",
      },
    ],
  },
];

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);

/** Newest first. */
export const sortedPosts = () => [...POSTS].sort((a, b) => b.date.localeCompare(a.date));

// UTC so server and client render the same string
const DATE_FMT = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
export const formatDate = (iso: string) => DATE_FMT.format(new Date(`${iso}T00:00:00Z`));

/** Anchor id for an h2, used by the article's table of contents. */
export const headingId = (text: string) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
