import * as React from 'react';

const useModal = () => {
    const [showModal, setShowModal] = React.useState(false);

    const toggleShowModalHandler = React.useCallback(() => setShowModal(prev => !prev), []);

    return { showModal, toggleShowModalHandler };
};

export default useModal;
