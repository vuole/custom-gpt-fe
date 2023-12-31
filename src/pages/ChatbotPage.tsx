import styled from "styled-components";
import InputBox from "../components/Chatbot/InputBox";
import Messages from "../components/Chatbot/Messages";
import { Center } from "../components";
import { Divider, Typography } from "@mui/material";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import law_image from "../assets/law-image.png";
import { useEffect, useRef, useState } from "react";
import { MessageType } from "../types/Message";
import { useMutation } from "react-query";
import ChatAPI from "../api/ChatAPI";
import { BASE_URL } from "../api";

const ChatBotContainer = styled(Center)`
  height: 100vh;
  width: 100%;
  /* background-color: #a7bcff; */
  background-image: url(${law_image});
  background-size: cover;
  background-position: center;
  @media screen and (max-width: 768px) {
    width: 768px;
    overflow-y: auto;
  }
`;

const ChatBotLayout = styled.div`
  width: 60%;
  height: 80%;
  display: flex;
  flex-direction: column;
`;

const ChatBotHeader = styled(Center)`
  height: 64px;
  background-color: rgba(116, 87, 232, 0.9);
  color: #ffffff;
  border-top-right-radius: 8px;
  border-top-left-radius: 8px;
  display: flex;
  gap: 8px;
`;

export default function ChatbotPage() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndpoint = useRef<HTMLDivElement>(null);

  // const sendQuestionMutation = useMutation({
  //   mutationFn: (params: { question: string }) => ChatAPI.sendQuestion(params),
  //   retry: true,
  // });

  const handleSendQuestion = async (question: string) => {
    setMessages([...messages, { question }]);
    // sendQuestionMutation.mutate(
    //   { question },
    //   {
    //     onSuccess: data => {
    //       setMessages([...messages, { question }, data]);
    //     },
    //     onError: (error: any) => {
    //       const errorMessage = error.response.data.message;
    //       console.log(errorMessage);
    //     },
    //   }
    // );
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({
          question,
        }),
      });
      const data = await res.json();
      setMessages([...messages, { question }, data]);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  //scroll to bottom conversation
  useEffect(() => {
    messagesEndpoint?.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages]);

  return (
    <ChatBotContainer>
      <ChatBotLayout>
        <ChatBotHeader>
          <Typography fontSize={20} fontWeight={600}>
            Chatbot
          </Typography>
          <SmartToyOutlinedIcon />
        </ChatBotHeader>
        <Messages messages={messages} isLoading={isLoading} messagesEndpoint={messagesEndpoint} />
        <Divider />
        <InputBox onSendQuestion={handleSendQuestion} isLoading={isLoading} />
      </ChatBotLayout>
    </ChatBotContainer>
  );
}
