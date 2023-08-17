"use client";
import React, { Suspense } from 'react'
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import useSWR, { SWRResponse } from 'swr';
import { baseUrl, conversation } from '@/app/core/endpoints';
import Card from '../card';
import { Conversation } from '../types';

const fetcher = async (...args: Parameters<typeof fetch>): Promise<Conversation[]> => {
  const response = await fetch(...args);
  const data = await response.json();
  return data;
}


export default function ConversationList() {

  const{ data, error }: SWRResponse<Conversation[], Error> = useSWR( `${baseUrl}${conversation}`, fetcher, { suspense: true })
  return (
    <Suspense fallback={<div>loading...</div>}>
        {data &&
          <AutoSizer>
          {({ height, width }) => (
            <List
              className="List"
              height={height}
              itemSize={200}
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
  )
}
