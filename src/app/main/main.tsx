"use client";

import React from "react";
import Conversations from "./conversations";
import styles from "./main.module.scss";
import { baseUrl, conversation } from "@/app/core/endpoints";
import Chat from "./chat";

export default function Main() {
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
