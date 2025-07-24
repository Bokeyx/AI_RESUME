import React from "react";
import "./LegalContents.css";

import homeIcon  from "../lib/img/assets/images/icon.svg";
import mailIcon  from "../lib/img/assets/images/icon_1.svg";
import phoneIcon from "../lib/img/assets/images/icon_2.svg";
import facebook from "../lib/img/assets/images/vector.svg";
import youtube from "../lib/img/assets/images/vector_1.svg";
import instagram from "../lib/img/assets/images/vector_2.svg";

const LegalContents = () => (
  <div className="legal-container">
    {/* ─── 헤더 ─────────────────────────────── */}
    <header className="legal-header">
      <img src={homeIcon} alt="Home" className="home-icon" />
      <span className="logo">AI RESUME</span>
    </header>

    {/* ─── 본문 영역 ───────────────────────────────── */}
    <main className="legal-content">
      {/* ── 제목 ── */}
      <h1>Terms of Use&nbsp;&amp;&nbsp;Policies</h1>

      {/* ───────────────── Terms of Use ───────────── */}
      <section>
        <h2>Terms of Use</h2>
        <p className="updated">Last Updated : May 15, 2025</p>

        <p>
          Welcome to Ai Resume. By accessing or using our website and services
          (the “Service”), you agree to comply with and be bound by these Terms
          of Use (“Terms”). Please review them carefully. If you do not agree to
          these Terms, you should not use the Service.
        </p>

        <h3>1.&nbsp;Acceptance&nbsp;of&nbsp;Terms</h3>
        <p>
          These Terms constitute a legally binding agreement between you and
          Ai Resume. Your access to and use of the Service is conditioned upon
          your acceptance of and compliance with these Terms.
        </p>

        <h3>2.&nbsp;Changes&nbsp;to&nbsp;Terms</h3>
        <p>
          We reserve the right to modify or replace these Terms at any time. We
          will try to provide at least 30 days’ notice prior to any new terms
          taking effect. By continuing to access or use our Service after those
          revisions become effective, you agree to be bound by the revised
          terms. If you do not agree to the new terms, please stop using the
          Service.
        </p>

        <h3>3.&nbsp;Use&nbsp;License</h3>
        <p>
          Permission is granted to temporarily download one copy of the
          materials (information or software) on Ai Resume’s website for
          personal, non-commercial transitory viewing only. This is the grant of
          a license, not a transfer of title, and under this license you&nbsp;may
          not:
        </p>
        <ul>
          <li>Modify or copy the materials</li>
          <li>
            Use the materials for any commercial purpose, or for any public
            display (commercial or non-commercial)
          </li>
          <li>
            Attempt to decompile or reverse-engineer any software contained on
            Ai Resume’s website
          </li>
          <li>
            Remove any copyright or other proprietary notations from the
            materials
          </li>
          <li>
            Transfer the materials to another person or “mirror” the materials
            on any other server
          </li>
        </ul>
      </section>

      {/* ───────────────── Privacy Policy ─────────── */}
      <section>
        <h2>Privacy Policy</h2>
        <p className="updated">Last Updated : May 15, 2025</p>

        <p>
          Your privacy is important to us. This Privacy Policy explains how we
          collect, use, disclose, and safeguard your information when you visit
          our website <strong>www.AiResume.com</strong> (the “Site”). Please
          read this policy carefully. If you do not agree with its terms, please
          do not access the Site.
        </p>

        <h3>Personal&nbsp;Data</h3>
        <p>
          Personally identifiable information such as your name, shipping
          address, e-mail address, telephone number, and demographic information
          (age, gender, hometown, interests) that you voluntarily give to us
          when you register or participate in activities on the Site (e.g.,
          chat, message boards).
        </p>

        <h3>Derivative&nbsp;Data</h3>
        <p>
          Information our servers automatically collect when you access the
          Site, such as actions you perform (likes, re-blogs, replies) and other
          interactions recorded in server log files.
        </p>

        <h3>How&nbsp;We&nbsp;Use&nbsp;Your&nbsp;Information</h3>
        <ul>
          <li>Create and manage your account</li>
          <li>
            Compile anonymous statistical data and analysis for internal use or
            for third parties
          </li>
          <li>Increase the efficiency and operation of the Site</li>
          <li>
            Monitor and analyze usage and trends to improve your experience
          </li>
          <li>
            Send administrative information (account confirmation, technical
            notices, updates, security alerts, support messages)
          </li>
        </ul>
      </section>

      {/* ───────────────── Cookie Policy ──────────── */}
      <section>
        <h2>Cookie Policy</h2>
        <p className="updated">Last Updated : May 15, 2025</p>

        <p>
          This Cookie Policy explains how Ai Resume (“Company”, “we”, “us”,
          “our”) uses cookies and similar technologies to recognize you when you
          visit <strong>AiResume.com</strong>. It explains what these
          technologies are and why we use them, as well as your rights to
          control our use.
        </p>

        <h3>What&nbsp;are&nbsp;cookies?</h3>
        <p>
          Cookies are small data files placed on your computer or mobile device
          when you visit a website. They are widely used to make websites work
          or work more efficiently, and to provide reporting information.
        </p>

        <h3>Why&nbsp;do&nbsp;we&nbsp;use&nbsp;cookies?</h3>
        <p>
          We use first-party and third-party cookies for several reasons. Some
          cookies are required for technical reasons ( “essential” cookies).
          Others help us track user interests to enhance experience. Third
          parties serve cookies for advertising, analytics, and other purposes.
        </p>

        <h3>How&nbsp;can&nbsp;I&nbsp;control&nbsp;cookies?</h3>
        <p>
          You have the right to decide whether to accept or reject cookies via
          our Cookie Consent Manager. Essential cookies cannot be rejected as
          they are strictly necessary to provide services.
        </p>
      </section>
    </main>

    {/* ====== 푸터 ====== */}
    <footer className="df-footer">
      {/* ── TOP : 브랜드 + 구독 ────────────────── */}
      <div className="df-top">
        <div className="df-brand">
          <h2 className="df-logo">AI RESUME</h2>

          {/* 설명 문장 두 줄로만 표시 (불필요한 <br/> 제거) */}
          <p className="df-desc">Discover your potential career path with AI-powered resume analysis.</p>
          <p className="df-desc">Get tailored feedback, optimize your resume, and unlock new opportunities.</p>
        </div>

        <div className="df-subscribe">
          <h3>Stay updated with AI Resume</h3>
          <form onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="YOUR E-MAIL" required />
            <button type="submit">SUBSCRIBE</button>
          </form>
        </div>
      </div>

      <hr className="df-divider" />

      {/* ── MID : Follow + Contact + 저작권 ─────── */}
      <div className="df-mid">
        {/* Follow Us + SNS 아이콘 */}
        <div class="df-left">
        <div className="df-follow">
          <h4>Follow Us</h4>
          <div className="df-sns">
            <a href="https://facebook.com"  aria-label="Facebook"><img src={facebook}  alt="" /></a>
            <a href="https://instagram.com" aria-label="Instagram"><img src={instagram} alt="" /></a>
            <a href="https://youtube.com"   aria-label="YouTube"><img src={youtube}    alt="" /></a>
          </div>
        </div>

        {/* Contact */}
        <div className="df-contact">
          <h4>Contact Us</h4>
          <p><img src={mailIcon}  alt="" aria-hidden="true" /> AiResume@AiResume.com</p>
          <p><img src={phoneIcon} alt="" aria-hidden="true" /> +82-10-1234-5678</p>
        </div>
      </div>

        {/* 저작권 & 링크 (MID 내부로 이동) */}
        <div className="df-rights">
          <span>ⓒ2025 Ai Resume&nbsp;Busan, Republic&nbsp;of&nbsp;Korea. All&nbsp;Rights&nbsp;Reserved</span>
          <a href="#top">Terms&nbsp;of&nbsp;Use&nbsp;&amp;&nbsp;Policies</a>
        </div>
      </div>
    </footer>
  </div>
);

export default LegalContents;
