
import React, { useState } from 'react';
import img1 from '../assets/pocket-notes.png';
import img2 from '../assets/Vector (9).png';
import sendIcon from '../assets/Vector (10).png';
import styles from './MessageSection.module.css';

const MessageSection = ({ selectedGroup, setSelectedGroup, onSendMessage }) => {
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;

        onSendMessage(selectedGroup, newMessage);

        if (typeof setSelectedGroup === 'function') {
            const updatedGroup = {
                ...selectedGroup,
                messages: [
                    ...selectedGroup.messages,
                    { content: newMessage, dateTime: new Date().toISOString() },
                ],
            };
            setSelectedGroup(updatedGroup);
        }

        setNewMessage('');
    };

    if (!selectedGroup) {
        return (
            <div className={styles.homeRight}>
                <div className={styles.rightContent}>
                    <img src={img1} alt="pocket-notes" />
                    <h1 className={styles.rightHeading}>Pocket Notes</h1>
                    <p className={styles.rightPara}>
                        Send and receive messages without keeping your phone online.
                        <br />
                        Use Pocket Notes on up to 4 linked devices and 1 mobile phone.
                    </p>
                </div>
                <div className={styles.footer}>
                    <p>
                        <img src={img2} alt="lock" /> end-to-end encrypted
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.messageSection}>
            <div className={styles.header}>
                <div
                    className={styles.groupDP}
                    style={{ backgroundColor: selectedGroup.color }}
                >
                    {selectedGroup.initials}
                </div>
                <h2 className={styles.groupName}>{selectedGroup.name}</h2>
            </div>

            <div className={styles.messages}>
                {selectedGroup.messages.length === 0 ? (
                    <p className={styles.noMessages}>No messages yet. Start a conversation!</p>
                ) : (
                    selectedGroup.messages.map((msg, index) => (
                        <div key={index} className={styles.messageCard}>
                            <p>{msg.content}</p>
                            <div className={styles.timeStamp}>
                                <span>{new Date(msg.dateTime).toLocaleDateString()}</span> •{' '}
                                <span>{new Date(msg.dateTime).toLocaleTimeString()}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <div className={styles.inputSection}>
                <div className={styles.textareaWrapper}>
                    <textarea
                        placeholder="Enter your note here ..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <img
                        src={sendIcon}
                        onClick={handleSendMessage}
                        alt="send"
                        className={styles.sendIcon}
                    />
                </div>
            </div>
        </div>
    );
};

export default MessageSection;





