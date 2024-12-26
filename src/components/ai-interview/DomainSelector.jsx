import {
  Text,
  Grid,
  GridItem,
  Card,
  CardBody,
  Flex,
  Box,
  Spinner
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import SearchBox from "../common/SearchBox";
import { useState, useMemo } from "react";

const MotionBox = motion(Box);

const DomainSelector = ({ onDomainSelect, loading }) => {
  const [searchDomainValue, setSearchDomainValue] = useState("");
  const [allDomains] = useState([
    { name: "Business_Analyst", description: "Business Analyst" },
    { name: "Business_Analyst_Investment_Banking", description: "Business Analyst - Investment Banking" },
    { name: "Business_Analyst_Wealth_Management", description: "Business Analyst - Wealth Management" },
    { name: "Business_Analyst_Financial_Risk_Management", description: "Business Analyst - Financial Risk Management" },
    { name: "Business_Analyst_Regulatory_Compliance", description: "Business Analyst - Regulatory Compliance" },
    { name: "Business_Analyst_Payments", description: "Business Analyst - Payments" },
    { name: "Business_Analyst_Insurance", description: "Business Analyst - Insurance" },
    { name: "Business_Analyst_FinTech", description: "Business Analyst - FinTech" },
    { name: "Asset_Liability_Capital_Markets", description: "Asset Liability Capital Markets" },
    { name: "Asset_Liability_Capital_Management", description: "Asset Liability Capital Management (ALCM)" },
    { name: "Data_Analyst", description: "Data Analyst" },
    { name: "Financial_Risk_Management", description: "Financial Risk Management" },
    { name: "Financial_Analyst", description: "Financial Analyst" },
    { name: "Finance_Engineer", description: "Finance Engineer" },
    { name: "SAP_Developer", description: "SAP Developer" },
    { name: "Administration_HR_Compliance", description: "Administration HR Compliance" },
    { name: "test", description: "Testing" },
    { name: "client_relationship_manager", description: "Client Relations Management (CRM)" }

  ]);
  
  const filteredDomains = useMemo(() => {
    return allDomains.filter((domain) =>
      domain.name.toLowerCase().includes(searchDomainValue.toLowerCase())
    );
  }, [allDomains, searchDomainValue]);

  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      px={{ base: 4, md: 8 }}
      py={{ base: 6, md: 10 }}
      minH="100vh"
      w="100%"
      bg="gray.50"
    >
      <Box 
        w="100%" 
        maxW="1200px"
        mx="auto"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <Text
          fontSize={{ base: "2xl", md: "4xl" }}
          fontWeight="bold"
          mb={4}
          textAlign="center"
          color="gray.800"
        >
          Select Your Domain
        </Text>
        
        <MotionBox
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          mb={6}
          w="100%"
          maxW={{ base: "100%", md: "600px" }}
        >
          <SearchBox
            value={searchDomainValue}
            setValue={setSearchDomainValue}
            className="w-full mb-10 px-4 py-2"
            borderRadius="md"
            borderColor="blue.700"
            placeholder="Search domains..."
            _focus={{ borderColor: "blue.700", boxShadow: "0 0 0 2px blue.300" }}
          />
        </MotionBox>
        
        
        <Grid 
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)", 
            md: "repeat(3, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={6}
          width="100%"
          alignContent="start"
        >
          {Array.isArray(filteredDomains) && filteredDomains.map((domain, index) => (
            <GridItem key={`domain-${index}`}>
              <MotionBox
                whileHover={{ scale: 1.03, boxShadow: "lg" }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  cursor={loading ? "not-allowed" : "pointer"}
                  onClick={() => !loading && onDomainSelect(domain)}
                  opacity={loading ? 0.7 : 1}
                  height="100%"
                  borderRadius="lg"
                  boxShadow="sm"
                  _hover={{ borderColor: "blue.500" }}
                >
                  <CardBody p={6}>
                    <Flex 
                      direction="column" 
                      align="start"
                      height="100%"
                      gap={2}
                    >
                      <Text 
                        fontSize={{ base: "lg", md: "xl" }}
                        fontWeight="bold"
                        color="gray.800"
                      >
                        {domain.description}
                      </Text>
                 
                    </Flex>
                  </CardBody>
                </Card>
              </MotionBox>
            </GridItem>
          ))}
        </Grid>

        {loading && (
          <Flex 
            justify="center" 
            mt={8} 
            p={4} 
            bg="white" 
            borderRadius="md"
            boxShadow="sm"
          >
            <Spinner size="xl" color="blue.500" thickness="3px" />
          </Flex>
        )}
      </Box>
    </MotionBox>
  );
};

export default DomainSelector;
