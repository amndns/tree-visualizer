import React, { FunctionComponent, useState } from 'react';

import { QuestionOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import TutorialModal from './tutorial-modal/TutorialModal';
import './TutorialView.scss';

const TutorialView: FunctionComponent = () => {
  const [visible, setVisible] = useState(false);
  const [page, setPage] = useState(0);

  const showModal = () => {
    setVisible(true);
  };

  const handleAfterClose = () => {
    setPage(0);
  };

  const handleDone = () => {
    setVisible(false);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  return (
    <>
      <TutorialModal
        page={page}
        visible={visible}
        handleAfterClose={handleAfterClose}
        handleDone={handleDone}
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />
      <div className="overlay-bottom-right">
        <Button
          className="overlay-bottom-item"
          icon={<QuestionOutlined />}
          shape="circle"
          size="small"
          type="primary"
          onClick={showModal}
        />
      </div>
    </>
  );
};

export default TutorialView;
