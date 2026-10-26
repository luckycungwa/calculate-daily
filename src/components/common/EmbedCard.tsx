import React, { useEffect, useState } from 'react';
import { Check, Code2, Copy, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { useToast } from '../ui/toast';

interface EmbedCardProps {
  slug: string;
  name: string;
}

/**
 * Copy-paste iframe snippet for the embeddable calculator view.
 *
 * The origin is read after mount rather than during render. Prerendering runs
 * against the build's canonical origin while the browser may be on a preview or
 * local host, and a server/client mismatch here would produce a hydration
 * warning for purely presentational text.
 */
function buildSnippet(origin: string, slug: string, name: string): string {
  const src = `${origin}/embed/${slug}`;
  return [
    `<iframe src="${src}" title="${name}" width="100%" height="820" style="border:0;max-width:100%" loading="lazy"></iframe>`,
    '<script>',
    "  addEventListener('message', function (event) {",
    `    if (event.origin !== '${origin}' || !event.data || event.data.type !== 'calculatedaily:height') return;`,
    "    document.querySelectorAll('iframe').forEach(function (frame) {",
    '      if (frame.contentWindow === event.source) frame.height = event.data.height;',
    '    });',
    '  });',
    '</script>',
  ].join('\n');
}

export const EmbedCard: React.FC<EmbedCardProps> = ({ slug, name }) => {
  const [origin, setOrigin] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const snippet = origin ? buildSnippet(origin, slug, name) : '';

  const handleCopy = async () => {
    if (!snippet) return;
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      toast('Embed code copied');
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      toast('Clipboard is unavailable. Select the code and copy it manually.', 'warning');
    }
  };

  return (
    <Card>
      <CardContent className="space-y-3 p-6">
        <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500">
          <Code2 className="h-4 w-4" />
          <h2 className="text-base font-bold text-zinc-950 dark:text-zinc-50">Embed this calculator</h2>
        </div>
        <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Put this calculator on your own site with the snippet below. The frame contains the tool only, reports
          its own height, and carries a visible link back to the full page. Embedding is free; keep the attribution
          link as it is, and do not wrap the frame in a way that hides it.
        </p>
        {snippet ? (
          <>
            <pre className="overflow-x-auto rounded-lg border border-zinc-200 bg-zinc-50 p-3 text-[11px] leading-relaxed text-zinc-800 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-200">
              <code>{snippet}</code>
            </pre>
            <div className="flex flex-wrap items-center gap-2">
              <Button type="button" size="sm" onClick={handleCopy}>
                {copied ? (
                  <>
                    <Check className="mr-1.5 h-3.5 w-3.5" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy embed code
                  </>
                )}
              </Button>
              <a
                href={`/embed/${slug}`}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
              >
                Preview the embed
                <ExternalLink className="h-3 w-3" />
              </a>
              <span className="text-[11px] text-zinc-500">
                Fixed height is used first; the script shrinks it to fit after load.
              </span>
            </div>
          </>
        ) : (
          <p className="text-xs text-zinc-500">Preparing the embed code for this page...</p>
        )}
      </CardContent>
    </Card>
  );
};
