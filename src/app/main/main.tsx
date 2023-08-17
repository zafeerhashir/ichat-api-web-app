import React from "react";
import Conversations from "./conversations";
import styles from "./main.module.scss";
import { baseUrl, conversation } from "@/app/core/endpoints";
import Chat from "./chat";

export default async function Main() {
  return (
    <div className={styles.main}>
      <div className={styles.commentsSection}>
        <div className={styles.chatHeader}>Chats</div>
        <Conversations/>
      </div>
      <div className={styles.chatSection}>
        <Chat/>
      </div>
    </div>
  );
}
