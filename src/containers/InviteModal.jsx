import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { createPortal } from "react-dom";

const generateInviteLink = (userId) => `${window.location.origin}/register`;

const InviteModal = ({ userId, isOpen, onClose }) => {
  const portalRoot = document.getElementById("modal-root");
  const [copied, setCopied] = useState(false);
  const overlayRef = useRef(null);
  const inviteLink = generateInviteLink(userId);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  if (!isOpen) return null;
  return createPortal(
    <Overlay ref={overlayRef} onClick={handleOverlayClick}>
      <Modal>
        <Header>
          <h2>Challenge a Friend 🚀</h2>
          <CloseBtn onClick={onClose}>×</CloseBtn>
        </Header>

        <Body>
          <p>
            Send this link to your friend and see if they can beat your score!
          </p>

          <LinkBox>
            <InviteLink
              href={inviteLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {inviteLink}
            </InviteLink>
            <CopyBtn onClick={handleCopy}>
              {copied ? "Copied!" : "Copy"}
            </CopyBtn>
          </LinkBox>

          <WhatsAppBtn
            href={`https://wa.me/?text=${encodeURIComponent(
              `Think you can beat me in Globetrotter? 🌍  ${inviteLink}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Share on WhatsApp
          </WhatsAppBtn>
        </Body>
      </Modal>
    </Overlay>,
    portalRoot
  );
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  display: grid;
  place-items: center;
  z-index: 999;
`;

const Modal = styled.div`
  background: #fff;
  width: min(90%, 480px);
  border-radius: 1rem;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  animation: pop 0.35s ease forwards;

  @keyframes pop {
    from {
      transform: scale(0.9);
      opacity: 0;
    }
    to {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid black;
  padding-bottom: 10px;
  background: #213555;
  border-radius: 10px 10px 0px 0px;
  color: white;
`;

const CloseBtn = styled.button`
  border: none;
  background: transparent;
  font-size: 1.75rem;
  cursor: pointer;
  line-height: 1;
  padding: 0;
  color: white;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1.5rem;
  padding-top: 0;
`;

const LinkBox = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 0.75rem;
  align-items: center;
`;

const InviteLink = styled.a`
  font-size: 0.9rem;
  word-break: break-all;
  text-decoration: none;
  color: #0066cc;
`;

const CopyBtn = styled.button`
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #4ade80 0%, #2dd4bf 100%);
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  color: #fff;
  transition: transform 0.2s;

  &:active {
    transform: scale(0.96);
  }
`;

const WhatsAppBtn = styled.a`
  padding: 0.65rem 1rem;
  background: #25d366;
  color: #fff;
  font-weight: 600;
  text-align: center;
  border-radius: 0.5rem;
  text-decoration: none;
  transition: filter 0.2s;

  &:hover {
    filter: brightness(1.1);
  }
`;

export default InviteModal;
