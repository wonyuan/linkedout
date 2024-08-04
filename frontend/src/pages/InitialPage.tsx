import { Flex } from '@mantine/core';
import { AccountInput } from "@molecules/AccountInput";

export function InitialPage() {
    const radialGradient = 'radial-gradient(circle, #C5F6FA 10%, #ffffff 90%)'; 

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
}



/*import { Flex, Center, Box } from '@mantine/core';
import { AccountInput } from "@molecules/AccountInput";

export function InitialPage() {
    return (
        <Box>
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundImage: 'url(https://png.pngtree.com/background/20220725/original/pngtree-online-education-training-doodle-webinar-picture-image_1771923.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(2px)',
                }}
            />
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Flex 
                    direction="column" 
                    justify="center" 
                    align="center"
                    sx={{ 
                        width: "100%", 
                        padding: "20px",
                    }}
                >
                    <AccountInput />
                </Flex>
            </Box>
        </Box>
    );
}*/
