import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";

const socket = io.connect(
  "https://0f1f-2804-14c-65d5-6e4a-6d7c-ca1d-3ddb-7e38.sa.ngrok.io"
);
function App() {
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  // const sendMessage = () => {
  //   socket.emit("send_message", { message });
  // };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  return (
    <div className='App'>
      <input
        placeholder='Número da sala'
        onChange={(event) => setRoom(event.target.value)}
      />
      <button onClick={joinRoom}>Entrar na sala</button>
      <input
        onChange={(event) => setMessage(event.target.value)}
        placeholder='Mensagem...'
      />
      <button onClick={sendMessage}>Enviar Mensagem</button>
      <h1>Mensagem:</h1>
      <h3>{messageReceived}</h3>
    </div>
  );
}

export default App;
