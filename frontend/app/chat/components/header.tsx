import MaterialIcon from '@/components/material-icon';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

const Header = () => {
  return (
    <Box className="flex-row items-center justify-between px-6 py-4 border-b border-border-light bg-surface/80 backdrop-blur-md z-10 sticky top-0">
      <HStack space="md" className="items-center">
        <Box className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
          <MaterialIcon name="smart_toy" className="text-[24px]" />
        </Box>
        <VStack>
          <Text className="text-text-main text-lg font-bold leading-none tracking-tight">
            ChefBot<Text className="text-primary">.ai</Text>
          </Text>
          <Text className="text-[10px] text-text-muted font-bold tracking-wider uppercase mt-0.5">
            Culinary Intelligence
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default Header;
