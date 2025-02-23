import React, { useState } from 'react';
import styles from './home.module.css';
import Sidebar from '../components/Sidebar';
import MessageSection from '../components/MessageSection';

const Home = () => {
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [groups, setGroups] = useState(
        JSON.parse(localStorage.getItem('groups')) || []
    );

    // Function to update messages for the selected group
    const handleSendMessage = (group, message) => {
        const updatedGroups = groups.map((g) => {
            if (g.name === group.name) {
                return {
                    ...g,
                    messages: [...g.messages, { content: message, dateTime: new Date() }],
                };
            }
            return g;
        });

        setGroups(updatedGroups);
        localStorage.setItem('groups', JSON.stringify(updatedGroups));
    };

    return (
        <div className={styles.homeContainer}>
            <Sidebar
                groups={groups}
                setGroups={setGroups}
                onSelectGroup={setSelectedGroup}
            />
            <MessageSection
                selectedGroup={selectedGroup}
                setSelectedGroup={setSelectedGroup}
                onSendMessage={handleSendMessage}
            />
        </div>
    );
};

export default Home;

