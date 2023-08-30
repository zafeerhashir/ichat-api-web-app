"use client";

import React, { useContext, useEffect } from "react";
import Conversations from "./conversations";
import styles from "./main.module.scss";
import { baseUrl, conversation } from "@/app/core/endpoints";
import Chat from "./chat";
import useSocket from "@/app/core/Hooks/useSockets";
import events from '@/app/core/events';
import { AppContext } from "@/app/core/Providers/AppContext";
import { User } from "./conversations/types";

export default function Main() {
  const { user = {} as User } = useContext(AppContext);
  const socket = useSocket();
  const { _id:loggedInUserId } = user;

  useEffect(() => {
    socket.emit(events.USER_ONLINE, loggedInUserId);
  }, [loggedInUserId]);
  
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
