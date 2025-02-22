import React, { useState } from 'react';
import styles from "./Modal.module.css";


const Modal = ({ isOpen, onClose, onCreate }) => {

    const [groupName, setGroupName] = useState('');
    const [selectedColor, setSelectedColor] = useState('#B38BFA');


    const handleCreate = () => {
        if (groupName.trim() !== '') {
            onCreate(groupName, selectedColor);
            setGroupName('');
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onclose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <h2>Create New Group</h2>

                <label className={styles.label1}>Group Name</label>
                <input type="text" className={styles.input} placeholder="Enter group name" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                <div className={styles.colorOptions}>
                    <div className={styles.colorPicker}>
                        <label className={styles.label2}>Choose Colour</label>
                        {["#B38BFA", "#FF79F2", "#43E6FC", "#F19576", "#0047FF", "#6691FF"].map((color, index) => (
                            <span
                                key={index}
                                // className={styles.colorCircle}
                                className={`${styles.colorCircle} ${selectedColor === color ? styles.selected : ''
                                    }`}
                                style={{ backgroundColor: color }}
                                onClick={() => setSelectedColor(color)}></span>
                        ))}
                    </div>
                    <button className={styles.createButton} onClick={handleCreate}>Create</button>
                </div>
            </div>
        </div >
    )
}

export default Modal