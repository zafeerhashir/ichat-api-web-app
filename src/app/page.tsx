"use client";

import Image from 'next/image'
import styles from './page.module.css'
import Main from './main/main'
import Link from 'next/link';
import Login from './authentication/login';
import { useContext } from 'react';
import { AppContext } from './core/Providers/context';

export default function Routes() {
  const { authenticated } = useContext(AppContext);
  if(authenticated) {
    return   <Main/>
  }
  return <Login/>
}
