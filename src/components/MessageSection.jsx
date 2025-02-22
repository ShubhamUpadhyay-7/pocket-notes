// import React from 'react'
// import img1 from '../assets/pocket-notes.png';
// import img2 from '../assets/Vector (9).png';
// import styles from "./MessageSection.module.css";

// const MessageSection = () => {
//     return (
//         <>
//             <div className={styles.homeRight}>
//                 <div className={styles.rightContent}>
//                     <img src={img1} alt='pocket-notes' />
//                     <h1 className={styles.rightHeading}>Pocket Notes</h1>
//                     <p className={styles.rightPara}>Send and receive messages without keeping your phone online.<br />Use Pocket Notes on up to 4 linked devices and 1 mobile phone</p>
//                 </div>
//                 <div className={styles.footer}>
//                     <p><img src={img2} alt="lock" /> end-to-end encrypted</p>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default MessageSection;

import React from 'react';
import img1 from '../assets/pocket-notes.png';
import img2 from '../assets/Vector (9).png';
import styles from './MessageSection.module.css';

const MessageSection = ({ selectedGroup }) => {
    if (!selectedGroup) {
        // Show default screen when no group is selected
        return (
            <div className={styles.homeRight}>
                <div className={styles.rightContent}>
                    <img src={img1} alt="pocket-notes" />
                    <h1 className={styles.rightHeading}>Pocket Notes</h1>
                    <p className={styles.rightPara}>
                        Send and receive messages without keeping your phone online.
                        <br />
                        Use Pocket Notes on up to 4 linked devices and 1 mobile phone
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

    // Show group message section when a group is selected
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

            {/* Display messages */}
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

            {/* Input Section */}
            <div className={styles.inputSection}>
                <textarea
                    placeholder="Enter your text here..."
                    value={selectedGroup.newMessage || ''}
                    onChange={(e) => selectedGroup.setNewMessage(e.target.value)}
                />
                <button onClick={selectedGroup.handleSendMessage}>
                    <i className="fa fa-paper-plane" />
                </button>
            </div>
        </div>
    );
};

export default MessageSection;
