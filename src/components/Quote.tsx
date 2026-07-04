import type { QuoteData } from "../types";

interface QuoteProps {
  quote: QuoteData;
}

export function Quote({ quote }: QuoteProps) {
  return (
    <figure className="kindle-fade mx-auto grid max-w-[29rem] grid-cols-[2.5rem_minmax(0,1fr)] gap-x-4 text-left min-[700px]:mx-0 min-[700px]:max-w-[28rem]">
      <div
        aria-hidden="true"
        className="font-serif text-[4rem] font-bold leading-none text-neutral-400"
      >
        “
      </div>
      <blockquote className="pt-5 text-[clamp(1.15rem,4.2vw,1.55rem)] font-medium leading-[1.38] tracking-normal text-black min-[700px]:text-[clamp(1.25rem,2vw,1.65rem)]">
        {quote.text}
      </blockquote>
      <figcaption className="col-start-2 mt-5 text-[clamp(0.95rem,2.8vw,1.15rem)] font-medium leading-tight text-neutral-700">
        — {quote.author}
      </figcaption>
    </figure>
  );
}
