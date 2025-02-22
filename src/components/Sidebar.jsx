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

    // Function to add a new group
    const handleCreateGroup = (groupName, groupColor) => {
        const initials = groupName
            .split(' ')
            .map((word) => word[0]?.toUpperCase())
            .join('');

        const newGroup = {
            name: groupName,
            color: groupColor,
            initials,
            messages: [], // Each group now has its own messages array
        };

        const updatedGroups = [...groups, newGroup];
        setGroups(updatedGroups);
        localStorage.setItem('groups', JSON.stringify(updatedGroups)); // Save to localStorage
        setIsModalOpen(false);
    };

    // Handle group selection
    const handleGroupClick = (group) => {
        onSelectGroup(group); // Pass the selected group to the parent component
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
                            onClick={() => handleGroupClick(group)} // Pass selected group
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

                {/* Plus button for creating a new group */}
                <div className={styles.plusButton} onClick={() => setIsModalOpen(true)}>
                    +
                </div>
            </div>

            {/* Modal for creating a new group */}
            <Modal
                isOpen={isModalOpen}
                onCreate={handleCreateGroup}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default Sidebar;
