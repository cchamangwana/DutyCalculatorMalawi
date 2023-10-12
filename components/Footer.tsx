import React from 'react';
import { Text, Box, Container, chakra, useColorMode, useColorModeValue, } from '@chakra-ui/react';

const Footer = () => {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <chakra.section
            bg={useColorModeValue('gray.100', 'gray.900')}
            style={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
                zIndex: 1,
            }}
        >
            <Container maxWidth="6xl">
                <Box mt={4} textAlign="center">
                    <Text fontSize="sm" color="gray.600" mb={3}>
                        This website is for informational purposes only. The calculations provided are estimates and should not be considered as official financial advice.
                    </Text>
                    <hr />
                    <Text fontSize="sm" color="gray.600" p={2} mb={4}>
                        &copy; {new Date().getFullYear()} Duty Calculator All rights reserved.
                    </Text>
                </Box>
            </Container>
        </chakra.section >
    );
};

export default Footer;
