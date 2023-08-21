"use client";
import React, { useContext } from "react";
import { Conversation } from "../types";
import styles from "./card.module.scss";
import * as constants from "../constants";
import { formatMonthYear, formatUsername, getInitials } from "@/app/core/utilts";
import { AppContext } from "@/app/core/Providers/context";

type Props = {
  conversation: Conversation;
};

export default function Index(props: Props) {
  const { setConversation } = useContext(AppContext);
  const { conversation } = props;
  if(!conversation) return;
  const { users, messages } = conversation;
  const [_ ,recipientUser] = users;
  const { username } = recipientUser;
  const [message] = messages;
  const { text, createdAt } = message;
  const formattedMessage = `${constants.prefix}${text}`;


  const onClick = () => {
    setConversation(conversation)
  }

  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatar}>{getInitials(username)}</div>
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{formatUsername(username)} </div>
        <div className={styles.lastMessage}>{formattedMessage} </div>
      </div>
      <div className={styles.date}>{formatMonthYear(createdAt)}</div>
    </div>
  );
}
