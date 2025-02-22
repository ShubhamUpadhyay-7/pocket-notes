import React, { useState } from 'react';
// import img1 from '../assets/pocket-notes.png';
// import img2 from '../assets/Vector (9).png'
import styles from './home.module.css';
import Sidebar from '../components/Sidebar';
import MessageSection from '../components/MessageSection';

const Home = () => {
    // const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);
    return (
        <div className={styles.homeContainer}>
            {/* <div className={styles.homeLeft}>
                <h1>Pocket Notes</h1>
                <div className={styles.plusButton} onClick={() => setIsModalOpen(true)}>+</div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
            <Sidebar onSelectGroup={setSelectedGroup} />
            <MessageSection selectedGroup={selectedGroup} />
        </div>
    )
}

export default Home
