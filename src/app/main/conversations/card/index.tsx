"use client";
import React, { useContext, useMemo } from "react";
import { Conversation, User } from "../types";
import styles from "./card.module.scss";
import * as constants from "../constants";
import { formatMonthYear, formatUsername, getInitials } from "@/app/core/utilts";
import { AppContext } from "@/app/core/Providers/AppContext";
import { getRecipientUser } from "../../chat/utils";

type Props = {
  conversation: Conversation;
};

export default function Index(props: Props) {
  const { conversation } = props;
  const { users, messages } = conversation;
  const { setConversation, user= {} as User } = useContext(AppContext);
  const recipientUser = useMemo(() => getRecipientUser(users, user), [conversation])
  const { username } = recipientUser as User;
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
