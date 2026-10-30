import React, { useState } from 'react';
import { Share2, Link2, Printer, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { buildShareUrl } from '../../lib/share';
import { useToast } from '../ui/toast';

interface ShareButtonProps {
  path: string;
  state?: Record<string, string | number | boolean>;
  className?: string;
  label?: string;
  showPrint?: boolean;
}

export const ShareButton: React.FC<ShareButtonProps> = ({
  path,
  state = {},
  className,
  label = 'Share',
  showPrint = true,
}) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleShare = async () => {
    const url = buildShareUrl(path, state);
    if (navigator.share && navigator.canShare?.({ url })) {
      try {
        await navigator.share({ url });
        return;
      } catch {
        /* user cancelled or unsupported -> fall through to copy */
      }
    }
    await navigator.clipboard.writeText(url);
    setCopied(true);
    toast('Link copied to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" size="sm" onClick={handleShare} className={className}>
        {copied ? <Check className="w-3.5 h-3.5 text-brand" /> : <Share2 className="w-3.5 h-3.5" />}
        {copied ? 'Copied' : label}
      </Button>
      {showPrint && (
        <Button variant="outline" size="sm" onClick={handlePrint} className={className}>
          <Printer className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Print</span>
        </Button>
      )}
    </div>
  );
};