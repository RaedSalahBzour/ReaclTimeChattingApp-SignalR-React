import { useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

const SendMessageForm = ({ sendMessage }) => {
  const [msg, setMessage] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (msg.trim()) {
      sendMessage(msg);
      setMessage("");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup className="mb-3">
        <InputGroup.Text>Chat</InputGroup.Text>
        <Form.Control
          type="text"
          value={msg}
          onChange={e => setMessage(e.target.value)}
          placeholder="Enter your message"
        />
        <Button type="submit" variant="primary" disabled={!msg}>
          Send
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SendMessageForm;
