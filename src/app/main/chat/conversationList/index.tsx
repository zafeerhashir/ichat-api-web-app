"use client";
import useSWR,  { SWRResponse } from 'swr'
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import React, { Suspense } from 'react'
import { baseUrl, message } from '@/app/core/endpoints';
import Message  from './message';
import { Message as MessageType } from './types'
import styles from './list.module.css'


const fetcher = async (...args: Parameters<typeof fetch>): Promise<MessageType[]> => {
  const response = await fetch(...args);
  const data = await response.json();
  return data;
}

export default function ConversationList() {
  const recepientID = '647efd74476d3902be5818ef';
  const{ data, error }: SWRResponse<MessageType[], Error> = useSWR( `${baseUrl}${message}/${recepientID}`, fetcher, { suspense: true })
  return (
    <div className={styles.container}>
      <Suspense fallback={<div>loading...</div>}>
        {data &&
          <AutoSizer>
          {({ height, width }) => (
            <List
              className="List"
              height={height}
              itemSize={100}
              itemCount={data.length}
              width={width}
            >
              {({ index, style }) => (
              <div style={{ ...style }} >
                  <Message item={data[index]}/>
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