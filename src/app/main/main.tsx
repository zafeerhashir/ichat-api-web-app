"use client";

import React, { useContext } from "react";
import Conversations from "./conversations";
import styles from "./main.module.scss";
import { baseUrl, conversation } from "@/app/core/endpoints";
import Chat from "./chat";
import useSocket from "@/app/core/Hooks/useSockets";
import events from '@/app/core/events';
import { AppContext } from "@/app/core/Providers/context";
import { User } from "./conversations/types";

export default function Main() {
  const { user = {} as User } = useContext(AppContext);
  const { online } = useSocket();
  const { _id } = user;
  online(_id);

  return (
    <div className={styles.main}>
      <div className={styles.conversationSection}>
        <Conversations/>
      </div>
      <div className={styles.chatSection}>
        <Chat/>
      </div>
    </div>
  );
}
