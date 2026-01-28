import React, { createContext, useContext, useState, type ReactNode } from "react";

type MessageType = "success" | "error" | "info";

type Message = {
  id: number;
  type: MessageType;
  text: string;
};

type MessageContextType = {
  message: {
    success: (text: string) => void;
    error: (text: string) => void;
    info: (text: string) => void;
  };
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const addMessage = (type: MessageType, text: string) => {
    const id = Date.now();
    setMessages((prev) => [...prev, { id, type, text }]);
    setTimeout(() => {
      setMessages((prev) => prev.filter((msg) => msg.id !== id));
    }, 3000);
  };

  const message = {
    success: (text: string) => addMessage("success", text),
    error: (text: string) => addMessage("error", text),
    info: (text: string) => addMessage("info", text),
  };

  return (
    <MessageContext.Provider value={{ message }}>
      {children}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 flex flex-col gap-2 z-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`px-4 py-2 rounded-lg shadow text-white ${
              msg.type === "success" ? "bg-green-500" :
              msg.type === "error" ? "bg-red-500" :
              "bg-blue-500"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
    </MessageContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useMessage = (): MessageContextType["message"] => {
  const ctx = useContext(MessageContext);
  if (!ctx) throw new Error("useMessage must be used within MessageProvider");
  return ctx.message;
};
