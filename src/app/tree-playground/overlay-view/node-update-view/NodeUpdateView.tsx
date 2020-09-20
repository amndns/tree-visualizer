import React, { FunctionComponent } from 'react';

import { ApartmentOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';

import { MAX_NODE_VALUE_CHAR_COUNT } from 'helpers/tree';

import './NodeUpdateView.scss';

const NodeUpdateView: FunctionComponent = () => (
  <div className="overlay">
    <div className="overlay-left">
      <Input
        className="overlay-left-input"
        addonBefore={<ApartmentOutlined />}
        bordered
        maxLength={MAX_NODE_VALUE_CHAR_COUNT}
        placeholder="Node Value"
      />
      <Button className="overlay-left-item" type="primary">
        Edit Node
      </Button>
      <Button className="overlay-left-item danger" type="primary">
        Delete Node
      </Button>
    </div>
    <div className="overlay-right">
      <Button className="overlay-right-item" type="primary">
        Cancel
      </Button>
    </div>
  </div>
);

export default NodeUpdateView;
