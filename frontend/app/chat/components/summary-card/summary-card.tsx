import { Box } from '@/components/ui/box';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { generateNotePdf, Note } from '@/services/agent';
import { useMutation } from '@tanstack/react-query';
import { Copy, FileText, Download } from 'lucide-react-native'; // Assuming Lucide for icons
import ReactMarkdown from 'react-markdown';

type EventSummaryProps = {
  sessionId: string;
  note: Note | undefined;
};

import { useState, useCallback } from 'react';

export const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copy = useCallback(async (text: string) => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard not supported');
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset after 2s
      return true;
    } catch (error) {
      console.error('Copy failed', error);
      setIsCopied(false);
      return false;
    }
  }, []);

  return { isCopied, copy };
};

const EventSummary = ({ sessionId, note }: EventSummaryProps) => {
  const { copy } = useCopyToClipboard();

  const { mutate: generateNotePdfMutate } = useMutation({
    mutationFn: generateNotePdf,
    onSuccess: (blob) => {
      // Handle the browser download trigger
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'note.pdf';
      document.body.appendChild(a);
      a.click();

      // Cleanup
      window.URL.revokeObjectURL(url);
      a.remove();
    },
    onError: (error) => {
      console.error('Download failed:', error);
    },
  });

  return (
    <Box className="mt-2 w-full max-w-[448px] overflow-hidden rounded-xl border-l-4 border-[#10b981] bg-white shadow-xl ring-1 ring-black/5">
      {/* Background Decorative Icon */}
      <Box className="pointer-events-none absolute right-0 top-0 p-4 opacity-5">
        <Icon as={FileText} className="rotate-12 text-slate-900" />
      </Box>

      <VStack space="md" className="relative z-10 p-5">
        {/* Header Section */}
        <HStack className="border-b border-slate-200 pb-3">
          <VStack>
            <Heading size="md" className="font-bold tracking-tight text-slate-900">
              Event Summary
            </Heading>
            <Text className="text-xs font-medium uppercase tracking-wider text-[#059669]">
              Ready for Review
            </Text>
          </VStack>

          <Box className="mx-3 rounded-lg bg-slate-100 p-3">
            <Icon as={FileText} className="text-slate-500" />
          </Box>
        </HStack>

        {/* Data Grid */}
        <Box className="rounded-lg border border-slate-200 bg-slate-100/50 p-3">
          <Text className="text-sm italic leading-relaxed text-slate-500">
            <ReactMarkdown>{note?.summary ?? ''}</ReactMarkdown>
          </Text>
        </Box>

        {/* Action Buttons */}
        <HStack space="sm" className="pt-2">
          <Button
            className="h-9 flex-1 rounded-md border border-slate-200 bg-slate-100"
            variant="outline"
            onPress={() => copy(note?.summary ?? '')}
          >
            <ButtonIcon as={Copy} size="xs" className="mr-2 text-slate-900" />
            <ButtonText className="text-xs font-bold text-slate-900">Copy Note</ButtonText>
          </Button>

          <Button
            className="h-9 flex-1 rounded-md border border-slate-900 bg-slate-900"
            onPress={() => generateNotePdfMutate({ sessionId })}
          >
            <ButtonIcon as={Download} size="xs" className="mr-2 text-white" />
            <ButtonText className="text-xs font-bold text-white">Download PDF</ButtonText>
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default EventSummary;
