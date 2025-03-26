import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import 'stream-chat-react/dist/css/v2/index.css';
import { Chat, Channel, Window, ChannelHeader, MessageList, MessageInput } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import Register from './components/Register'; 
import Login from './components/Login'; 
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import UserList from './components/UserList';

const App = () => {
  return (
    <Router>
      <div className="container-fluid">
        <div className="row">
          <div className="col-2 p-0">
            <Sidebar />
          </div>
          <div className="col-10 main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/register" element={<Register />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

const ChatPage = () => {
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);

  const setupChat = async () => {
    try {
      const userId = prompt('Enter your User ID:');
      const username = prompt('Enter your Username:');

      if (!userId || !username) {
        alert('User ID and Username are required');
        return;
      }

      const { data } = await axios.post('http://localhost:5000/create-token', { userId, username });
      const client = StreamChat.getInstance('3farf8pa44yp');

      await client.connectUser({ id: userId, name: username }, data.token);

      const channel = client.channel('messaging', 'chat-room', { name: 'General Chat' });

      await channel.create().catch((error) => {
        if (error.message.includes('already exists')) {
          console.log('Channel already exists, joining...');
        } else {
          throw error;
        }
      });

      await channel.watch();
      setChatClient(client);
      setChannel(channel);
    } catch (error) {
      console.error('Error during chat setup:', error);
      alert('Failed to set up chat. Check the console for details.');
    }
  };

  return (
    <div>
      <button onClick={setupChat}>Start Chat</button>
      {chatClient && channel && (
        <Chat client={chatClient} theme="messaging light">
          <Channel channel={channel}>
            <Window>
              <ChannelHeader />
              <MessageList />
              <MessageInput />
            </Window>
          </Channel>
        </Chat>
      )}
    </div>
  );
};

export default App;
