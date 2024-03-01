import { useState } from 'react';
import { Resizable } from 'react-resizable';
import '../App.css';

export const ResizableComponent = ({ add, latestDocument, count, handleUpdate }) => {
    const [size, setSize] = useState({ width: 200, height: 200 });
    const [isEdit, setIsEdit] = useState(false);
    const [editedContent, setEditedContent] = useState(latestDocument?.content);

    const onResize = (event, { size }) => {
        setSize(size);
    };

    const handleEdit = () => {
        setIsEdit((prev) => !prev);

        if (isEdit) {
            // If in edit mode, call the update API
            handleUpdate(editedContent, latestDocument?.id);
            setIsEdit(false);
        } else {
            // If not in edit mode, set the edited content to the content property of latestDocument
            setEditedContent(latestDocument?.content);
        }
    };

    const handleInputChange = (e) => {
        setEditedContent(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleEdit();
        }
    };

    const handleAdd = () => {
        if (isEdit && editedContent.trim() !== '') {
            latestDocument.content = editedContent;
            setEditedContent('');
        }
        add();
    };

    return (
        <Resizable
            width={size.width}
            height={size.height}
            onResize={onResize}
            draggableOpts={{ grid: [1, 1] }}
        >
            <div className="resizable-component">
                <h2>Count: {count}</h2>
                <h2>Content: {latestDocument?.content}</h2>
                {isEdit ? (
                    <div>
                        <input
                            type="text"
                            value={editedContent}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            placeholder="Type here..."
                        />
                        <br />
                    </div>
                ) : null}
                <button onClick={handleEdit}>{isEdit ? 'Done' : 'Edit'}</button>
                <button onClick={handleAdd}>Add</button>
            </div>
        </Resizable>
    );
};
