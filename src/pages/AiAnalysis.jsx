import { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  Alert,
  AlertIcon,
  Container,
  VStack,
  Button,
  Divider,
  Flex,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const AIAnalysis = () => {
  const [error, setError] = useState(null);
  const analysisId = localStorage.getItem("ai_analysis_id");
  const tabChangeCount = localStorage.getItem("tabChangeCount") || 0;
  const windowBlurCount = localStorage.getItem("windowBlurCount") || 0;

  if (!analysisId) {
    return (
      <Container centerContent>
        <Alert status="info" borderRadius="md" mt={4}>
          <AlertIcon />
          Your interview analysis will be sent to your registered email address. Please check your inbox in the next 24 hours.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={8}>
      <Box bg="gray.50" p={6} borderRadius="md" shadow="md" id="analysis-content">
        <Alert status="success" borderRadius="md" mb={4}>
          <AlertIcon />
          Your interview analysis has been processed. You will receive a detailed report at your registered email address within 24 hours.
        </Alert>

        <VStack spacing={8} align="stretch">
          <Box>
            <Heading as="h2" size="md" mb={2} color="teal.700">
              Session Details
            </Heading>
            <Text fontSize="md">
              Number of times you switched tabs: {tabChangeCount}
            </Text>
            <Text fontSize="md">
              Number of times the window lost focus: {windowBlurCount}
            </Text>
          </Box>

          <Box>
            <Text color="gray.600">
              Thank you for using our AI Interview Analysis service. A comprehensive report including:
              <ul style={{marginLeft: "20px", marginTop: "10px"}}>
                <li>Abstract Summary</li>
                <li>Key Points</li>
                <li>Interview Assessment</li>
                <li>Detailed Transcript</li>
              </ul>
              will be delivered to your email inbox.
            </Text>
          </Box>
        </VStack>
      </Box>

      <VStack mt={8} spacing={4}>
        <Button
          colorScheme="teal"
          onClick={() => window.location.href = '/'}
        >
          Return to Home
        </Button>
      </VStack>
    </Container>
  );
};

export default AIAnalysis;