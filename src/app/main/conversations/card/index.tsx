"use client";

import React from "react";
import { Conversation } from "../types";
import styles from "./card.module.css";
import * as constants from "../constants";
import { formatMonthYear } from "../utils";

type Props = {
  conversation: Conversation;
};

export default function index(props: Props) {
  alert('ds')
  const { conversation } = props;
  const { users, messages } = conversation;
  const [user] = users;
  const { username } = user;
  const [message] = messages;
  const { text, createdAt } = message;
  const usernameInitialLetters = `${username.charAt(0)}${username.charAt(1)}`;
  const formattedMessage = `${constants.prefix}${text}`;

  return (
    <div className={styles.container}>
      <div className={styles.avatarContainer}>
        <div className={styles.avatar}>{usernameInitialLetters}</div>
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{username} </div>
        <div className={styles.lastMessage}>{formattedMessage} </div>
      </div>
      <div className={styles.date}>{formatMonthYear(createdAt)}</div>
    </div>
  );
}
