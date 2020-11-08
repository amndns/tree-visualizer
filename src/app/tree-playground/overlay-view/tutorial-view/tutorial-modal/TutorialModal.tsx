import React, { FunctionComponent } from 'react';

import { Button, Modal } from 'antd';

import { MAX_PAGE, TUTORIAL_CONTENT } from './TutorialContent';

interface TutorialModalProps {
  page: number;
  visible: boolean;
  handleDone: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
}

const MODAL_WIDTH = 600; // in pixels

const TutorialModal: FunctionComponent<TutorialModalProps> = ({
  page,
  visible,
  handleDone,
  handleNextPage,
  handlePreviousPage,
}) => {
  const { content, title } = TUTORIAL_CONTENT[page];

  return (
    <Modal
      centered
      visible={visible}
      title={title}
      footer={[
        <Button
          hidden={page === 0}
          key="previous"
          type="primary"
          onClick={handlePreviousPage}
        >
          Previous Page
        </Button>,
        <Button
          key="next"
          type="primary"
          onClick={page !== MAX_PAGE ? handleNextPage : handleDone}
        >
          {page !== MAX_PAGE ? 'Next Page' : 'Done'}
        </Button>,
      ]}
      width={MODAL_WIDTH}
      onOk={handleDone}
      onCancel={handleDone}
    >
      {content}
    </Modal>
  );
};

export default TutorialModal;
