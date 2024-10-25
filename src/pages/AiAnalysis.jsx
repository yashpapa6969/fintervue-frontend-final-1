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
  Flex,
} from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

const AIAnalysis = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const analysisId = localStorage.getItem("ai_analysis_id");
  const tabChangeCount = localStorage.getItem("tabChangeCount") || 0;
  const windowBlurCount = localStorage.getItem("windowBlurCount") || 0;

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!analysisId) {
        setError("No analysis ID found. Please submit an analysis first.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://api.fintervue.com/api/interviewee/fetchAiInterviewAnalysis/${analysisId}`
        );
        
        if (response.data && response.data.processed_transcript) {
          setAnalysisData(response.data.processed_transcript);
        } else {
          setError("No analysis data available. Please try again later.");
        }
      } catch (error) {
        console.error("Error fetching analysis:", error);
        setError("Failed to fetch analysis. Please check your connection or try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalysis();
  }, [analysisId]);

  useEffect(() => {
    console.log("Analysis ID:", analysisId);
  }, [analysisId]);

  const generatePDF = () => {
    const input = document.getElementById('analysis-content');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 30;
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save('interview_analysis.pdf');
    });
  };

  if (loading) {
    return (
      <Container centerContent>
        <Spinner size="xl" color="teal.500" />
        <Text mt={4}>Loading analysis data...</Text>
      </Container>
    );
  }

  if (error) {
    return (
      <Container centerContent>
        <Alert status="error" borderRadius="md" mt={4}>
          <AlertIcon />
          {error}
        </Alert>
      </Container>
    );
  }

  if (!analysisData) {
    return (
      <Container centerContent>
        <Alert status="warning" borderRadius="md" mt={4}>
          <AlertIcon />
          No analysis data found. Please submit an analysis first.
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxW="container.md" py={8}>
      <Box bg="gray.50" p={6} borderRadius="md" shadow="md" id="analysis-content">
        <Flex justifyContent="space-between" alignItems="center" mb={4}>
          <Heading as="h1" color="teal.600">
            AI Interview Analysis Results
          </Heading>
          <Button
            colorScheme="blue"
            onClick={generatePDF}
          >
            Download PDF
          </Button>
        </Flex>

        <VStack spacing={8} align="stretch">
          <Box>
            <Heading as="h2" size="md" mb={2} color="teal.700">
              Abstract Summary
            </Heading>
            <Text fontSize="md">{analysisData.abstract_summary}</Text>
          </Box>

          <Divider />

          <Box>
            <Heading as="h2" size="md" mb={2} color="teal.700">
              Key Points
            </Heading>
            <ReactMarkdown>{analysisData.key_points}</ReactMarkdown>
          </Box>

          <Divider />

          <Box>
            <Heading as="h2" size="md" mb={2} color="teal.700">
              Interview Assessment
            </Heading>
            <ReactMarkdown>{analysisData.interview_assessment}</ReactMarkdown>
          </Box>

          <Divider />

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
          <Divider />
          
          <Box>
            <Heading as="h2" size="md" mb={2} color="teal.700">
              Transcript
            </Heading>
            <Text fontSize="sm" whiteSpace="pre-wrap">
              {analysisData.transcript}
            </Text>
          </Box>
        </VStack>
      </Box>

      <VStack mt={8} spacing={4}>
        <Button
          colorScheme="teal"
          variant="outline"
          onClick={() => window.location.reload()}
        >
          Refresh Analysis
        </Button>
      </VStack>
    </Container>
  );
};

export default AIAnalysis;
