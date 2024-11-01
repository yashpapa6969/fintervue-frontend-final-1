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
      { name: "finance", description: "Finance Engineer" },
      { name: "SAP", description: "SAP Developer" },
    ]);
  
    const filteredDomains = useMemo(() => {
      return allDomains.filter((domain) =>
        domain.name.toLowerCase().includes(searchDomainValue.toLowerCase())
      );
    }, [allDomains, searchDomainValue]);
  
    return (
      <MotionBox
        className="flex flex-col items-center"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
        px={{ base: 4, md: 6 }}
        pb={{ base: 20, md: 24 }}
        pt={{ base: 4, md: 6 }}
        minH="100vh"
        w="100%"
      >
        <Box 
          w="100%" 
          maxW="1200px"
          mx="auto"
          flex="1"
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <SearchBox 
            value={searchDomainValue}
            onChange={setSearchDomainValue}
            placeholder="Search domains..."
            mb={6}
            maxW={{ base: "100%", md: "400px" }}
          />
          
          <Grid 
            templateColumns={{
              base: "repeat(1, 1fr)",
              sm: "repeat(2, 1fr)", 
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            }}
            gap={{ base: 4, md: 6, lg: 8 }}
            width="100%"
            flex="1"
            alignContent="start"
          >
            {Array.isArray(filteredDomains) && filteredDomains.map((domain, index) => (
              <GridItem key={`domain-${index}`}>
                <MotionBox
                  whileHover={{ scale: 1.05, boxShadow: "lg" }}
                  whileTap={{ scale: 0.95 }}
                  transition="0.3s ease"
                >
                  <Card
                    cursor={loading ? "not-allowed" : "pointer"}
                    onClick={() => !loading && onDomainSelect(domain)}
                    opacity={loading ? 0.7 : 1}
                    height="100%"
                  >
                    <CardBody>
                      <Flex 
                        direction="column" 
                        align="start"
                        height="100%"
                      >
                        <Text 
                          fontSize={{ base: "lg", md: "xl" }}
                          fontWeight="semibold" 
                          mb={1} 
                          color="blue.700"
                        >
                          {domain.name}
                        </Text>
                        <Text 
                          color="gray.600"
                          fontSize={{ base: "sm", md: "md" }}
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
            <Flex justify="center" mt={4}>
              <Spinner size="xl" color="blue.500" />
            </Flex>
          )}
        </Box>
      </MotionBox>
    );
  };
  
  export default DomainSelector;