import styled from "@emotion/styled";
import SLTextField from "../TextField/SLTextField";
import SendIcon from "@mui/icons-material/Send";
import { IconButton } from "@mui/material";
import { MessageType } from "../../types/Message";
import { useMutation } from "react-query";
import ChatAPI from "../../api/ChatAPI";
import { useState } from "react";

const InputBoxContainer = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  height: fit-content;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  padding: 5px 10px;
  display: flex;
  gap: 10px;
`;

interface InputBoxProps {
  onSendQuestion: (question: string) => void;
  isLoading: boolean;
}

export default function InputBox({ onSendQuestion, isLoading }: InputBoxProps) {
  const [question, setQuestion] = useState<string>("");
  const handleEnterPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && e.shiftKey === false) {
      e.preventDefault();
      if (question) {
        setQuestion("");
        onSendQuestion(question);
      }
    }
  };
  return (
    <InputBoxContainer>
      <SLTextField
        value={question}
        placeholder="Nhập câu hỏi của bạn"
        size="small"
        multiline
        maxRows={4}
        fullWidth
        onKeyDown={e => handleEnterPress(e)}
        onChange={e => setQuestion(e.target.value)}
        sx={{
          padding: "5px",
          "& .MuiOutlinedInput-root": {
            borderRadius: "20px",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          },
        }}
        disabled={isLoading}
      />
      <IconButton onClick={() => {}} disabled={isLoading}>
        <SendIcon sx={{ color: "#0095C5", fontSize: "20px" }} />
      </IconButton>
    </InputBoxContainer>
  );
}
