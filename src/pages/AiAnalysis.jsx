import { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Text,
  Spinner,
  Alert,
  AlertIcon,
  Container,
  VStack,
  Button,
  Divider,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";

const AIAnalysis = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const analysisId = localStorage.getItem("ai_analysis_id");

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await axios.get(
          `https://x3oh1podsi.execute-api.ap-south-1.amazonaws.com/api/interviewee/fetchAiInterviewAnalysis/${analysisId}`
        );
        setAnalysisData(response.data.postanalysis);
      } catch (error) {
        console.error("Error fetching analysis:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    if (analysisId) {
      fetchAnalysis();
    } else {
      setLoading(false);
    }
  }, [analysisId]);

  if (loading) {
    return (
      <Container centerContent>
        <Spinner size="xl" color="teal.500" />
        <Text mt={4}>Loading analysis data...</Text>
      </Container>
    );
  }

  if (!analysisId) {
    return (
      <Container centerContent>
        <Alert status="info" borderRadius="md" mt={4}>
          <AlertIcon />
          No analysis found. Please submit an analysis first.
        </Alert>
      </Container>
    );
  }

  if (error) {
    return (
      <Container centerContent>
        <Alert status="error" borderRadius="md" mt={4}>
          <AlertIcon />
          Error fetching analysis. Please try again later.
        </Alert>
      </Container>
    );
  }

  if (!analysisData) {
    return (
      <Container centerContent>
        <Alert status="warning" borderRadius="md" mt={4}>
          <AlertIcon />
          No analysis data available.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={8}>
      <Box bg="gray.50" p={6} borderRadius="md" shadow="md">
        <Heading as="h1" mb={6} textAlign="center" color="teal.600">
          AI Interview Analysis Results
        </Heading>

        <VStack spacing={8} align="stretch">
          {/* Abstract Summary */}
          <Box>
            <Heading as="h2" size="md" mb={2} color="teal.700">
              Abstract Summary
            </Heading>
            <Text fontSize="md">{analysisData.abstract_summary}</Text>
          </Box>

          <Divider />

          {/* Key Points */}
          <Box>
            <Heading as="h2" size="md" mb={2} color="teal.700">
              Key Points
            </Heading>
            <ReactMarkdown>{analysisData.key_points}</ReactMarkdown>
          </Box>

          <Divider />

          {/* Interview Assessment */}
          <Box>
            <Heading as="h2" size="md" mb={2} color="teal.700">
              Interview Assessment
            </Heading>
            <ReactMarkdown>{analysisData.interview_assessment}</ReactMarkdown>
          </Box>

          <Divider />

          {/* Transcript */}
          <Box>
            <Heading as="h2" size="md" mb={2} color="teal.700">
              Transcript
            </Heading>
            <Text fontSize="sm" whiteSpace="pre-wrap">
              {analysisData.transcript}
            </Text>
          </Box>
        </VStack>

        <Button
          mt={8}
          colorScheme="teal"
          variant="outline"
          onClick={() => window.location.reload()}
        >
          Refresh Analysis
        </Button>
      </Box>
    </Container>
  );
};

export default AIAnalysis;