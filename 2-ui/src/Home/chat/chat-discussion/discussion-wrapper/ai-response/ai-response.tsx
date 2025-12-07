import { Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Logo } from "../../../../../shared/Logo";

interface Props {
  content: any;
  citations: any;
}
export const AiResponse = ({ content, citations }: Props) => {
  return (
    <section className="inline-block w-fit max-w-[80%]">
      <div className="flex">
        {/* Fixed width logo container */}
        <div className="w-12">
          <Logo size="sm" />
        </div>

        <div className="flex-1 p-3">
          {content.length === 0 ? (
            <Loader2
              size="24"
              className="animate-spin text-gray-500"
              strokeWidth={2.5}
            />
          ) : (
            <div className="p-2 [&_p]:mb-4 [&_h1]:mb-6 [&_ul]:ml-5 [&_ul]:mb-4 [&_pre]:mb-4">
              <div className="prose prose-sm dark:prose-invert">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
              {citations.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-muted-foreground mb-2">
                    Sources
                  </h3>
                  <ul className="space-y-2">
                    {citations.map((c: any, i: any) => (
                      <li key={i}>
                        <a
                          href={c.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline hover:text-blue-800"
                        >
                          {c.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
