"use client";
import useSWR,  { SWRResponse } from 'swr'
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import React, { Suspense, useContext, useRef, useState } from 'react'
import { baseUrl, message } from '@/app/core/endpoints';
import Message  from './message';
import { Message as MessageType } from './types'
import styles from './list.module.css'
import { AppContext } from '@/app/core/Providers/context';
import { Conversation } from '../../conversations/types';


const fetcher = async (...args: Parameters<typeof fetch>): Promise<MessageType[]> => {
  const response = await fetch(...args);
  const data = await response.json();
  return data;
}

export default function ConversationList() {
  const { conversation = {} as Conversation, setMessages, messages = [] } = useContext(AppContext);
  const listRef = useRef<List>(null);
  const { _id } = conversation;
  const{ data, error }: SWRResponse<MessageType[], Error> = useSWR( `${baseUrl}${message}/${_id}`, fetcher, { suspense: true })
  
  React.useEffect(() => {
    if(data?.length)
    {
      setMessages(data)
    }
  },[_id])

    // Scroll to bottom whenever data changes
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