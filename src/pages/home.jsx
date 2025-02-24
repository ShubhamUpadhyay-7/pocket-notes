import React, { useState, useEffect } from 'react';
import styles from './home.module.css';
import Sidebar from '../components/Sidebar';
import MessageSection from '../components/MessageSection';

const Home = () => {
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [groups, setGroups] = useState(
        JSON.parse(localStorage.getItem('groups')) || []
    );
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 700);

    // Detect screen resizing
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 700);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

    // Handle group selection (hide sidebar on mobile)
    const handleGroupSelect = (group) => {
        setSelectedGroup(group);
    };

    const handleBackToSidebar = () => {
        setSelectedGroup(null);
    };

    return (
        <div className={styles.homeContainer}>
            {/* ✅ Hide Sidebar when on mobile and a group is selected */}
            {(!isMobile || !selectedGroup) && (
                <Sidebar
                    groups={groups}
                    setGroups={setGroups}
                    onSelectGroup={handleGroupSelect}
                />
            )}

            {/* ✅ Message Section should take full screen on mobile */}
            <MessageSection
                selectedGroup={selectedGroup}
                setSelectedGroup={setSelectedGroup}
                onSendMessage={handleSendMessage}
                onBack={handleBackToSidebar}
            />
        </div>
    );
};

export default Home;

