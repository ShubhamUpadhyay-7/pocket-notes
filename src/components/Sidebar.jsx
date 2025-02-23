import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import styles from './Sidebar.module.css';

const Sidebar = ({ onSelectGroup }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        const storedGroups = JSON.parse(localStorage.getItem('groups')) || [];
        setGroups(storedGroups);
    }, []);

    const handleCreateGroup = (groupName, groupColor) => {
        const initials = groupName
            .split(' ')
            .map((word) => word[0]?.toUpperCase())
            .join('');

        const newGroup = {
            name: groupName,
            color: groupColor,
            initials,
            messages: [],
        };

        const updatedGroups = [...groups, newGroup];
        setGroups(updatedGroups);
        localStorage.setItem('groups', JSON.stringify(updatedGroups));
        setIsModalOpen(false);
    };

    // Select a group
    const handleGroupClick = (group) => {
        onSelectGroup(group);
    };

    return (
        <>
            <div className={styles.sidebar}>
                <h1>Pocket Notes</h1>
                <div className={styles.groupList}>
                    {groups.map((group, index) => (
                        <div
                            key={index}
                            className={styles.groupItem}
                            onClick={() => handleGroupClick(group)}
                        >
                            <div
                                className={styles.groupDP}
                                style={{ backgroundColor: group.color }}
                            >
                                {group.initials}
                            </div>
                            <span className={styles.groupName}>{group.name}</span>
                        </div>
                    ))}
                </div>

                <div className={styles.plusButton} onClick={() => setIsModalOpen(true)}>
                    +
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onCreate={handleCreateGroup}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default Sidebar;



