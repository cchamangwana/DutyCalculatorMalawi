"use client"

import React, { useState } from 'react';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Select,
    Button,
    Text,
    Container,
    ListItem,
    ListIcon,
    List,
} from '@chakra-ui/react';
import { MdCheckCircle } from "react-icons/md";

const DutyCalculator: React.FC = () => {
    const [engineCapacity, setEngineCapacity] = useState<string>('1000-1499cc');
    const [age, setAge] = useState<string>('0-8 years');
    const [combinedCost, setCombinedCost] = useState<string>('');
    const [freight, setFreight] = useState<string>('');
    const [exchangeRate, setExchangeRate] = useState<number>(1300);
    const [totalDuty, setTotalDuty] = useState<number>(0);
    const [importDuty, setImportDuty] = useState<number>(0);
    const [importExcise, setImportExcise] = useState<number>(0);
    const [importVAT, setImportVAT] = useState<number>(0);
    const [customsValueMK, setCustomsValueMK] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    function formatNumberWithCommas(number: number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    const calculateDuty = () => {
        setIsLoading(true);

        setTimeout(() => {

            const dutyRates: Record<string, Record<string, Record<string, number>>> = {
                "1000-1499cc": {
                    "0-8 years": { importDuty: 25, importExcise: 0, importVAT: 16.5 },
                    "8-12 years": { importDuty: 25, importExcise: 30, importVAT: 16.5 },
                    "12 years and above": { importDuty: 25, importExcise: 60, importVAT: 16.5 },
                },
                "1500-1999cc": {
                    "0-8 years": { importDuty: 25, importExcise: 15, importVAT: 16.5 },
                    "8-12 years": { importDuty: 25, importExcise: 45, importVAT: 16.5 },
                    "12 years and above": { importDuty: 25, importExcise: 75, importVAT: 16.5 },
                },

                "2000-2499cc": {
                    "0-8 years": { importDuty: 25, importExcise: 35, importVAT: 16.5 },
                    "8-12 years": { importDuty: 25, importExcise: 60, importVAT: 16.5 },
                    "12 years and above": { importDuty: 25, importExcise: 90, importVAT: 16.5 },
                },
                "2500-2999cc": {
                    "0-8 years": { importDuty: 25, importExcise: 45, importVAT: 16.5 },
                    "8-12 years": { importDuty: 25, importExcise: 70, importVAT: 16.5 },
                    "12 years and above": { importDuty: 25, importExcise: 100, importVAT: 16.5 },
                },
                "Exceeding 3000cc": {
                    "0-8 years": { importDuty: 25, importExcise: 55, importVAT: 16.5 },
                    "8-12 years": { importDuty: 25, importExcise: 80, importVAT: 16.5 },
                    "12 years and above": { importDuty: 25, importExcise: 110, importVAT: 16.5 },
                },
            };

            // Use dutyRates to get the selected duty rates based on engine capacity and age
            const selectedEngineRates = dutyRates[engineCapacity];
            const selectedDutyRates = selectedEngineRates[age];

            // Calculate Customs Value in Malawi Kwacha using the combined cost in dollars
            const customsValueMK = (parseFloat(combinedCost) + parseFloat(freight)) * exchangeRate;

            // Calculate Import Duty
            const importDuty = (selectedDutyRates.importDuty / 100) * customsValueMK;

            // Calculate Import Excise
            const importExcise = (selectedDutyRates.importExcise / 100) * customsValueMK;

            // Calculate Import VAT
            const importVAT = (selectedDutyRates.importVAT / 100) * (importDuty + importExcise);

            // Calculate the total duty payable
            const calculatedDuty = importDuty + importExcise + importVAT;

            setImportDuty(importDuty);
            setImportExcise(importExcise);
            setImportVAT(importVAT);
            setCustomsValueMK(customsValueMK);
            setTotalDuty(calculatedDuty);

            setIsLoading(false);

        }, 750);
    };


    return (
        <Container mt={15}>
            <Box>
                <FormControl>
                    <FormLabel>Engine Capacity</FormLabel>
                    <Select value={engineCapacity} onChange={(e) => setEngineCapacity(e.target.value)}>
                        <option value="1000-1499cc">1000cc-1499cc</option>
                        <option value="1500-1999cc">1500cc-1999cc</option>
                        <option value="2000-2499cc">2000cc-2499cc</option>
                        <option value="2500-2999cc">2500cc-2999cc</option>
                        <option value="Exceeding 3000cc">Exceeding 3000cc</option>
                    </Select>
                </FormControl>

                <FormControl>
                    <FormLabel>Age</FormLabel>
                    <Select value={age} onChange={(e) => setAge(e.target.value)}>
                        <option value="0-8 years">0-8 years</option>
                        <option value="8-12 years">8-12 years</option>
                        <option value="12 years and above">12 years and above</option>
                    </Select>
                </FormControl>

                <FormControl>
                    <FormLabel>Vehicle Purchase Price (Dollars)</FormLabel>
                    <Input
                        value={combinedCost}
                        onChange={(e) => setCombinedCost(e.target.value)}
                        type="number"
                    />
                    <Text fontSize="sm" mt={1} color="gray.600">
                        The Vehicle Purchase Price includes the total cost of the vehicle, including its FOB cost, insurance, and freight value in dollars.
                    </Text>
                </FormControl>

                <FormControl>
                    <FormLabel>Port Charges & Border Clearing (Dollars)</FormLabel>
                    <Input
                        value={freight}
                        onChange={(e) => setFreight(e.target.value)}
                        type="number"
                        placeholder="Enter amount in dollars"
                    />
                    <Text fontSize="sm" mt={1} color="gray.600">
                        The provided amount should encompass both port charges and border clearing costs.
                    </Text>
                </FormControl>

                <FormControl>
                    <FormLabel>Exchange Rate</FormLabel>
                    <Input
                        value={exchangeRate}
                        onChange={(e) => setExchangeRate(parseFloat(e.target.value))}
                        type="number"
                    />
                </FormControl>

                <Button
                    onClick={calculateDuty}
                    colorScheme="blue"
                    isLoading={isLoading}
                    loadingText='Calculating'
                    // colorScheme="teal"
                    variant="solid"
                    size="md"
                    width="100%"
                    mt={4}
                    _hover={{ bg: "blue.500" }}
                    _active={{ bg: "blue.600" }}
                >
                    Calculate Duty
                </Button>

                {totalDuty > 0 && (
                    <Box mt={3}>
                        <Text fontSize="lg">Vehicle Cost in MKW: {formatNumberWithCommas(Math.ceil(customsValueMK))}</Text>
                        <Text fontSize="md">Total Duty Payable: MK {formatNumberWithCommas(Math.ceil(totalDuty))}</Text>
                        <Text fontSize="sm" mt={2} color="gray.600">
                            Breakdown:
                            <List spacing={0}>
                                <ListItem>
                                    <ListIcon as={MdCheckCircle} color='green.500' />
                                    Import Duty: K{formatNumberWithCommas(Math.ceil(importDuty))}
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={MdCheckCircle} color='green.500' />
                                    Import Excise: K{formatNumberWithCommas(Math.ceil(importExcise))}
                                </ListItem>
                                <ListItem>
                                    <ListIcon as={MdCheckCircle} color='green.500' />
                                    Import VAT: K{formatNumberWithCommas(Math.ceil(importVAT))}
                                </ListItem>
                            </List>
                        </Text>

                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default DutyCalculator;