"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "../puja.module.css";

const imagePath = "/puja/satyanarayan-bhagwan.jpg";

export function DevotionalImage() {
  const [isAvailable, setIsAvailable] = useState(false);

  return (
    <div
      className={styles.devotionalImage}
      role="img"
      aria-label="Satyanarayan Bhagwan"
    >
      <div className={styles.devotionalPlaceholder} aria-hidden="true">
        <span>॥ श्री ॥</span>
        <small>Satyanarayan Bhagwan</small>
      </div>
      <Image
        className={isAvailable ? styles.devotionalPhotoVisible : styles.devotionalPhoto}
        src={imagePath}
        alt=""
        width={440}
        height={500}
        sizes="(max-width: 767px) 160px, 200px"
        priority
        onLoad={() => setIsAvailable(true)}
        onError={() => setIsAvailable(false)}
      />
    </div>
  );
}
