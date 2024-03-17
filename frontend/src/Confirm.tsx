import React from 'react';

interface ConfirmDeleteProps {
    projectName: string;
}

const ConfirmDelete = (props: ConfirmDeleteProps) => {
    // Implement your component logic here
    
    return (
        <div>
            <p>You're about to <strong>delete</strong> the {props.projectName} project!</p>
            <p>Are you sure you want to do that?</p>

            <p>Are you <em>really</em> sure? Are you <strong>absolutely 100% positively</strong> sure?</p>

            <p>If you do that, the following might happen:</p>
            <ul>
                <li>The project will be permanently deleted. You can't go back - there is no "undo" this time. Don't even try Ctrl+Z, it won't work.</li>
                <li>CS students all over the program will suddenly be very sad.</li>
                <li>Grades might change via random number generators.</li>
                <li>All cats owned by students or faculty of CS will start meowing incessantly for the next week.</li>
            </ul>

        </div>
    );
};

export default ConfirmDelete;