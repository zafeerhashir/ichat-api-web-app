"use client";
import useSWR,  { SWRResponse } from 'swr'
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import React, { Suspense, useContext, useRef } from 'react'
import { baseUrl, message } from '@/app/core/endpoints';
import { Message as MessageType } from './types'
import styles from './list.module.css'
import { AppContext } from '@/app/core/Providers/AppContext';
import { Conversation } from '../../conversations/types';
import useSocket from '@/app/core/Hooks/useSockets';
import events from '@/app/core/events';
import Message from './message';

const fetcher = async (...args: Parameters<typeof fetch>): Promise<MessageType[]> => {
  const response = await fetch(...args);
  const data = await response.json();
  return data;
}

export default function ConversationList() {
  const { conversation = {} as Conversation, setMessages, messages = [] } = useContext(AppContext);
  const listRef = useRef<List>(null);
  const { _id } = conversation;
  const{ data }: SWRResponse<MessageType[], Error> = useSWR( `${baseUrl}${message}/${_id}`, fetcher, { suspense: true })
  const sockets = useSocket();

  const updateMessagesOnPrivateMessage = (fromUser: string, toUser: string, text: string) => {
      if (messages && messages.length > 0) {
        const [item] = messages;
        const updatedMessages = [
          ...messages,
          { ...item, from: { _id: fromUser }, to: { _id: toUser }, text } as MessageType,
        ];
        setMessages(updatedMessages);
      }
  };
  
  sockets.subscribe(events.PRIVATE_MESSAGE, updateMessagesOnPrivateMessage);
  
  React.useEffect(() => {
    if(data?.length)
    {
      setMessages(data)
    }
  },[_id])

    React.useEffect(() => {
      if (messages) {
        scrollToBottom();
      }
    }, [messages.length]);

  const scrollToBottom = () => {
    if (listRef.current) {
      listRef.current.scrollToItem(messages.length - 1, 'start');
    }
  };

  return (
    <div className={styles.container}>
      <Suspense fallback={<div>loading...</div>}>
        {messages &&
          <AutoSizer>
          {({ height, width }) => (
            <List
              className="List"
              height={height}
              itemSize={100}
              itemCount={messages.length}
              width={width}
              ref={listRef}
            >
              {({ index, style }) => (
              <div style={{ ...style }} className={styles.itemContainer} >
                  <Message item={messages[index]}/>
              </div>
              )}
            </List>
          )}
          </AutoSizer>
        }
      </Suspense>
  </div>

  )
}