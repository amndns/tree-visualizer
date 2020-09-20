import React, { FunctionComponent } from 'react';

import { QuestionOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import './TutorialView.scss';

const TutorialView: FunctionComponent = () => (
  <div className="overlay-bottom-right">
    <Button
      className="overlay-bottom-item"
      icon={<QuestionOutlined />}
      shape="circle"
      size="small"
      type="primary"
    />
  </div>
);

export default TutorialView;
