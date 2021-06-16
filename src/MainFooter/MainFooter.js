import React from "react";
import styles from "./MainFooter.module.css";
import Logo from "../Logo/Logo";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import { Link } from "react-router-dom";

const mainFooter = () => {
  return (
    <div>
      <footer className={styles.MainFooter}>
        <section className={styles.MainFooterTop}>
          <header>
            <h3>API: The Dogs API</h3>
            <nav className={styles.MainFooterTopHeaderNav}>
              <Link to="/">Home</Link>
              <Link to="/find-dog">
                <FontAwesomeIcon icon={faSearch} />
              </Link>
            </nav>
          </header>

          <div className={styles.Item}>
            <h3 className={styles.FooterTitle}>portfolio:</h3>
            <p>
              <a
                className={styles.MyPage}
                href="https://typescript-react-portfolio.web.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://typescript-react-portfolio.web.app/
              </a>
            </p>
          </div>

          <div className={styles.Item}>
            <h3 className={styles.FooterTitle}>phone number:</h3>
            <p>+44 79 038 30 468</p>
          </div>

          <p className={styles.CopyRights}>
            Copyright &copy;2018
            <br /> Code and design by{" "}
            <a
              href="https://my-portfoliowb.web.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Carlos Suarez
            </a>
          </p>
        </section>

        <section className={styles.BottomFooter}>
          <Logo logoClass="Footer" />

          <div className={styles.SectionTwo}>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className={styles.SocialIcon}
                data-wow-delay=".7s"
                data-wow-duration="1.2s"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M492 109.5c-17.4 7.7-36 12.9-55.6 15.3 20-12 35.4-31 42.6-53.6-18.7 11.1-39.4 19.2-61.5 23.5C399.8 75.8 374.6 64 346.8 64c-53.5 0-96.8 43.4-96.8 96.9 0 7.6.8 15 2.5 22.1-80.5-4-151.9-42.6-199.6-101.3-8.3 14.3-13.1 31-13.1 48.7 0 33.6 17.2 63.3 43.2 80.7-16-.4-31-4.8-44-12.1v1.2c0 47 33.4 86.1 77.7 95-8.1 2.2-16.7 3.4-25.5 3.4-6.2 0-12.3-.6-18.2-1.8 12.3 38.5 48.1 66.5 90.5 67.3-33.1 26-74.9 41.5-120.3 41.5-7.8 0-15.5-.5-23.1-1.4C62.8 432 113.7 448 168.3 448 346.6 448 444 300.3 444 172.2c0-4.2-.1-8.4-.3-12.5C462.6 146 479 129 492 109.5z" />
              </svg>
            </a>

            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className={styles.SocialIcon}
                data-wow-delay=".9s"
                data-wow-duration="1.2s"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M426.8 64H85.2C73.5 64 64 73.5 64 85.2v341.6c0 11.7 9.5 21.2 21.2 21.2H256V296h-45.9v-56H256v-41.4c0-49.6 34.4-76.6 78.7-76.6 21.2 0 44 1.6 49.3 2.3v51.8h-35.3c-24.1 0-28.7 11.4-28.7 28.2V240h57.4l-7.5 56H320v152h106.8c11.7 0 21.2-9.5 21.2-21.2V85.2c0-11.7-9.5-21.2-21.2-21.2z" />
              </svg>
            </a>

            <a
              href="https://github.com/CarlosSuarezJS20/puppyLand"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg
                className={styles.SocialIcon}
                data-wow-delay="1.1s"
                data-wow-duration="1.2s"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M190.4 354.1L91.9 256l98.4-98.1-30-29.9L32 256l128.4 128 30-29.9zm131.2 0L420 256l-98.4-98.1 30-29.9L480 256 351.6 384l-30-29.9z" />
              </svg>
            </a>
          </div>
        </section>
      </footer>
    </div>
  );
};

export default mainFooter;
