import { useRef, useState } from "react";
import { useAi } from "./useAi";

const initialState = [];

function App() {
  const [messages, setMessages] = useState(initialState);
  const askAi = useAi((aiAnswer) => {
    setMessages((prev) => [...prev, { username: "ai", text: aiAnswer }]);
  });
  const lastElementRef = useRef(null);

  const sendMessage = (event) => {
    if (event.key === "Enter") {
      const text = event.currentTarget.value;
      askAi(text);

      setMessages([...messages, { username: "Me", text }]);
      event.currentTarget.value = "";
      lastElementRef.current.scrollIntoView();
    }
  };

  return (
    <div className="page">
      <nav className="navbar">Chat</nav>

      <div className="messages">
        {messages.map((message, i) => {
          return (
            <Message key={i} username={message.username} text={message.text} />
          );
        })}
        <div className="h-40 w-full" />
        <div ref={lastElementRef} />
      </div>

      <input
        type="text"
        className="message-input"
        onKeyDown={sendMessage}
        placeholder="Tippe eine Nachricht"
      />
    </div>
  );
}

function Message(props) {
  const isMe = props.username === "Me";

  return (
    <div className={`message ${isMe ? "right" : ""}`}>
      <div className={`username ${isMe ? "me" : ""}`}>{props.username}</div>
      {props.text}
    </div>
  );
}

export default App;
