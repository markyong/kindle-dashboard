import type { QuoteData } from "../../types";
import "./index.css";

interface QuoteProps {
  quote: QuoteData;
}

export function Quote({ quote }: QuoteProps) {
  return (
    <figure className="quote">
      <div aria-hidden="true" className="quote-mark">
        “
      </div>

      <div className="quote-body">
        <blockquote className="quote-text">{quote.text}</blockquote>

        <figcaption className="quote-author">— {quote.author}</figcaption>
      </div>
    </figure>
  );
}
