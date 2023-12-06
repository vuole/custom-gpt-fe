import { Avatar, LinearProgress, Typography } from "@mui/material";
import styled from "styled-components";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { green } from "@mui/material/colors";
import { MessageType } from "../../types/Message";

const MessagesContainer = styled.div`
  flex: 1;
  background-color: rgba(255, 255, 255, 0.8);
  overflow-y: auto;
  padding: 10px 0 0 10px;
`;

const MessagesLayout = styled.div`
  margin-bottom: 10px;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Pre = styled.pre`
  width: fit-content;
  max-width: 90%;
  margin: 0 0 0 48px;
  font-size: 16px;
  font-weight: 500;
  font-family: sans-serif;
  white-space: -moz-pre-wrap; /* Mozilla, supported since 1999 */
  white-space: -pre-wrap; /* Opera */
  white-space: -o-pre-wrap; /* Opera */
  white-space: pre-wrap; /* CSS3 - Text module (Candidate Recommendation) http://www.w3.org/TR/css3-text/#white-space */
  word-wrap: break-word; /* IE 5.5+ */
`;

const FirstGreeting = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const MockData = [
  { question: "Xin chao" },
  {
    message:
      "Chao ban toi co the giup gi cho ban Chao ban toi co the giup gi cho ban Chao ban toi co the giup gi cho ban Chao ban toi co the giup gi cho ban vChao ban toi co the giup gi cho ban",
  },
  { question: "Tu van luat cho toi" },
];

interface MessagesProps {
  messages: MessageType[];
  isLoading: boolean;
  messagesEndpoint: React.RefObject<HTMLDivElement>;
}

export default function Messages({ messages, isLoading, messagesEndpoint }: MessagesProps) {
  return (
    <MessagesContainer>
      {!messages.length && (
        <FirstGreeting>
          <Avatar sx={{ bgcolor: "#ab68ff", width: 50, height: 50 }}>
            <SmartToyOutlinedIcon sx={{ fontSize: 26 }} />
          </Avatar>
          <Typography fontSize={20} fontWeight={600}>
            Hôm nay tôi có thể giúp gì cho bạn?
          </Typography>
        </FirstGreeting>
      )}
      {!!messages.length &&
        messages.map((message, index) => {
          return (
            <MessagesLayout key={index}>
              <InfoContainer>
                <Avatar sx={{ bgcolor: message.question ? green[500] : "#ab68ff" }}>
                  {message.question ? <PersonOutlinedIcon /> : <SmartToyOutlinedIcon />}
                </Avatar>
                <Typography fontWeight={600}>{message.question ? "Bạn" : "Chatbot"}</Typography>
              </InfoContainer>
              <Pre>{message.question ? message.question : message.answer}</Pre>
            </MessagesLayout>
          );
        })}
      {isLoading && <LinearProgress />}
      <div ref={messagesEndpoint}></div>
    </MessagesContainer>
  );
}
