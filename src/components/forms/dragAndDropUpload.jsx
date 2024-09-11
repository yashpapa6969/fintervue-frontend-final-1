import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Text } from "@chakra-ui/react";

const DragAndDropUpload = ({ handleResumeUpload }) => {
    const onDrop = useCallback(
        (acceptedFiles) => {
            // Assuming only one file is uploaded
            const file = acceptedFiles[0];
            handleResumeUpload({ target: { files: [file] } });
        },
        [handleResumeUpload]
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: ".pdf,.doc,.docx",
    });

    return (
        <Box
            {...getRootProps()}
            className="w-full h-[100px] flex flex-col justify-center items-center"
            borderWidth="2px"
            borderRadius="lg"
            borderColor={isDragActive ? "blue.100" : "gray.300"}
            borderStyle="dashed"
            p={6}
            textAlign="center"
            cursor="pointer"
            bg={isDragActive ? "blue.50" : "gray.50"}
            transition="background-color 0.2s"
            _hover={{ bg: "gray.100" }}
        >
            <input {...getInputProps()} />
            {isDragActive ? (
                <Text fontSize="lg" color="blue.600">
                    Drop your resume here...
                </Text>
            ) : (
                <Text fontSize="lg">
                    Drag and drop your resume here, or click to select the file (PDF, DOC, DOCX)
                </Text>
            )}
        </Box>
    )
}

export default DragAndDropUpload;