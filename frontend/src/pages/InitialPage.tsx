import { Flex } from '@mantine/core';
import { AccountInput } from "@molecules/AccountInput";

export function InitialPage() {
    const theme = useMantineTheme();
    const radialGradient = 'radial-gradient(circle, #E3FAFC, #ffffff)'; 

    return (
        <Flex 
            direction="column" 
            justify="center" 
            align="center"
            sx={{ 
                width: "100%", 
                minHeight: "100vh", 
                padding: "20px", 
                backgroundImage: radialGradient
            }}
        >
            <AccountInput />
        </Flex>
    );
};
