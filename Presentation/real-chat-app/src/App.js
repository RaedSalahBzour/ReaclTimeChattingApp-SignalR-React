import { Col, Container, Row } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import WaitingRoom from "./components/WaitingRoom";
import { useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import ChatRoom from "./components/ChatRoom";

function App() {
  const [connection, setConnection] = useState();
  const [messages, setMessages] = useState([]);

  const joinChatRoom = async (username, chatroom) => {
    try {
      //initiate a connection
      const connection = new HubConnectionBuilder()
        .withUrl("https://localhost:7028/Chat")
        .configureLogging(LogLevel.Information)
        .build();
      //set up handler
      connection.on("JoinSpecificGroup", (username, msg) => {
        setMessages(messages => [...messages, { username, msg }]);
      });

      connection.on("ReceiveSpecificMessage", (username, msg) => {
        setMessages(messages => [...messages, { username, msg }]);
      });

      await connection.start();
      await connection.invoke("JoinSpecificGroup", { username, chatroom });
      setConnection(connection);
    } catch (error) {
      console.log(error);
    }
  };
  const sendMessage = async message => {
    try {
      await connection.invoke("SendMessage", message);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <main>
        <Container>
          <Row className="px-5 my-5">
            <Col sm="12"></Col>
            <h1 className="font-weight-light">Welcome to Chat App</h1>
          </Row>
          {!connection ? (
            <WaitingRoom joinChatRoom={joinChatRoom}></WaitingRoom>
          ) : (
            <ChatRoom messages={messages} sendMessage={sendMessage}></ChatRoom>
          )}
        </Container>
      </main>
    </div>
  );
}

export default App;
