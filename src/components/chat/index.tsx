import { useMutation, usePaginatedQuery, useQuery } from "convex/react";
import { api } from "@vex/api";
import { type ChangeEvent, useCallback, useState } from "react";
import { useAuthCtx } from "@/app/ctx/auth/auth";
import { type Id } from "@vex/dataModel";
import { env } from "@/env";
import { Image } from "@nextui-org/react";

export function ChatList() {
  const chats = useQuery(api.chats.get.all, { id: "" });

  if (!chats) return <div>Loading chats...</div>;

  return (
    <div className="chat-list text-white">
      <h2>Chats</h2>
      {chats.map(chat => (
        <div
          key={chat._id}
          className="chat-item"
          onClick={() => window.location.href = `/chat/${chat._id}`}
        >
          <h3>{chat.name}</h3>
          <p>{chat.is_group ? 'Group' : 'Direct Message'}</p>
          <p>Last active: {new Date(chat.lastMessageTime).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

interface ChatViewProps {
  chat_id: Id<"chats">;
}

export function ChatView({ chat_id }: ChatViewProps) {
  const { user } = useAuthCtx()
  const { status, results, isLoading, loadMore } = usePaginatedQuery(
    api.messages.get.all,
    {
      id: user ? user.uid : "",
      chat_id,
    },
    {
      initialNumItems: 50
    }
  );
  const sendMessage = useMutation(api.messages.functions.sendMessage);
  const toggleLike = useMutation(api.messages.functions.toggleLike);
  const generateUploadUrl = useMutation(api.files.create.url);

  const [messageText, setMessageText] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | undefined>();

  const handleLoadMore = useCallback((n: number) => () => {
    loadMore(n);
  }, [loadMore]);

  const handleSendMessage = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!messageText && !selectedImage) return;

    let storageId;
    if (selectedImage) {
      const uploadUrl = await generateUploadUrl();

      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": selectedImage.type },
        body: selectedImage,
      });

      const storage = await result.json() as {storageId: Id<"_storage">};
      storageId = storage.storageId;
    }

    if (!user) return;

    await sendMessage({
      chat_id,
      uid: user?.uid,
      body: messageText,
      storageId
    });

    setMessageText("");
    setSelectedImage(undefined);
  }, [messageText, selectedImage, user, chat_id, sendMessage, generateUploadUrl]);

  const handleToggleLike = (id: Id<"messages">) => async () => {
    if (!user) return;

    await toggleLike({
      uid: user?.uid,
      id,
    });
  };

  const handleSelectFile = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedImage(file);
  };



  return (
    <div className="chat-view">
      <div className="messages-container">
        {status === "CanLoadMore" && (
          <button onClick={handleLoadMore(10)}>Load more messages</button>
        )}

        {results.map(message => (
          <div key={message._id} className="message">
            <div className="message-header">
              <span className="author">{message.author}</span>
              <span className="time">{new Date(message._creationTime).toLocaleString()}</span>
            </div>

            <div className="message-body">{message.body}</div>

            {message.image_id && (
              <Image
                src={`${env.NEXT_PUBLIC_CONVEX_URL}/api/storage/${message.image_id}`}
                alt="Message attachment"
                className="message-image"
              />
            )}

            <button
              className={`like-button ${message.likes.includes(user?.uid ?? "" ) ? 'liked' : ''}`}
              onClick={handleToggleLike(message._id)}
            >
              ❤️ {message.likes.length}
            </button>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="message-form">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          placeholder="Type a message..."
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleSelectFile}
        />

        <button type="submit" disabled={isLoading}>Send</button>
      </form>
    </div>
  );
}
