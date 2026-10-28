import type { Block } from "@/app/blogs/posts";

/*
  Blog bodies are stored as blocks; the admin edits them as plain text:

    ## Heading            → h2
    - item                → bullet list (consecutive lines)
    > quote               → pull quote
    ```  …  ```           → code block
    anything else         → paragraph (blank line between paragraphs)
*/

export function blocksToText(blocks: Block[]): string {
  return blocks
    .map((b) => {
      switch (b.type) {
        case "h2":
          return `## ${b.text}`;
        case "ul":
          return b.items.map((item) => `- ${item}`).join("\n");
        case "quote":
          return `> ${b.text}`;
        case "code":
          return "```\n" + b.text + "\n```";
        default:
          return b.text;
      }
    })
    .join("\n\n");
}

export function textToBlocks(text: string): Block[] {
  const blocks: Block[] = [];
  const lines = text.replace(/\r\n/g, "\n").split("\n");
  let para: string[] = [];
  const flush = () => {
    if (para.length) blocks.push({ type: "p", text: para.join(" ").trim() });
    para = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (trimmed.startsWith("```")) {
      flush();
      const code: string[] = [];
      for (i++; i < lines.length && !lines[i].trim().startsWith("```"); i++) code.push(lines[i]);
      blocks.push({ type: "code", text: code.join("\n") });
    } else if (trimmed.startsWith("## ")) {
      flush();
      blocks.push({ type: "h2", text: trimmed.slice(3).trim() });
    } else if (trimmed.startsWith("- ")) {
      flush();
      const items = [trimmed.slice(2).trim()];
      while (i + 1 < lines.length && lines[i + 1].trim().startsWith("- ")) items.push(lines[++i].trim().slice(2).trim());
      blocks.push({ type: "ul", items });
    } else if (trimmed.startsWith(">")) {
      flush();
      const quote = [trimmed.replace(/^>\s?/, "")];
      while (i + 1 < lines.length && lines[i + 1].trim().startsWith(">")) quote.push(lines[++i].trim().replace(/^>\s?/, ""));
      blocks.push({ type: "quote", text: quote.join(" ").trim() });
    } else if (!trimmed) {
      flush();
    } else {
      para.push(trimmed);
    }
  }
  flush();
  return blocks;
}
