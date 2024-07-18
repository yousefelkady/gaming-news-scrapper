import React from 'react'
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/logo.png";
import styles from './navbar.module.css';

export default function navbar() {
  return (
    <nav className={styles.navbar}>
          <Image src={logo} alt={"Gaming News Logo"} width={50} quality={100} />
          <Link href="/">Home</Link>
          <Link href="/Dashboard">Dashboard</Link>
          <Link href="/articles">News</Link>
          <Link href="/articles">Categories</Link>
        </nav>
  )
}
