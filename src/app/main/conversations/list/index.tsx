"use client";
import React, { Suspense, useContext } from 'react'
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import useSWR, { SWRResponse } from 'swr';
import { baseUrl, conversation } from '@/app/core/endpoints';
import Card from '../card';
import { Conversation } from '../types';
import styles from './list.module.scss'
import { AppContext } from '@/app/core/Providers/AppContext';
import { User } from '@/app/core/Providers/types';

const fetcher = async (...args: Parameters<typeof fetch>): Promise<Conversation[]> => {
  const response = await fetch(...args);
  const data = await response.json();
  return data;
}


export default function ConversationList() {
  const { user = {} as User } = useContext(AppContext);
  const { _id }  =  user 
  const{ data, error }: SWRResponse<Conversation[], Error> = useSWR( `${baseUrl}${conversation}${_id}`, fetcher, { suspense: true })
  
  return (
    <div className={styles.container}>
      <Suspense fallback={<div>loading...</div>}>
          {data &&
            <AutoSizer>
            {({ height, width }:{ height: number, width: number}) => (
              <List
                className="List"
                height={height}
                itemSize={70}
                itemCount={data.length}
                width={width}
              >
                {({ index, style }) => (
                <div style={{ ...style }} >
                    <Card conversation={data[index]} />
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
