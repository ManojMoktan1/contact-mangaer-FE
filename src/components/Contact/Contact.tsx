import React, { useState } from 'react';
import type { RadioChangeEvent } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  Radio,
  Upload,
} from 'antd';

import './Contact.css'

const Contact = () => {
    const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
    const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
      setComponentDisabled(disabled);
    };

    const [value, setValue] = useState("no");

    const onChange = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
      };
  return (
    <div className='form-wrapper'>
        <div className='card'>
            <h1 className= 'card__title'>ADD CONTACT</h1>
            <Form
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 12 }}
            layout="horizontal"
            onValuesChange={onFormLayoutChange}
            disabled={componentDisabled}
            >
                <Form.Item label="Name">
                    <Input className='input-field' />
                </Form.Item>

                <Form.Item label="Email">
                    <Input className='input-field' />
                </Form.Item>

                <Form.Item label="Phone">
                    <Input className='input-field' />
                </Form.Item>

                <Form.Item label="Address">
                    <Input className='input-field' />
                </Form.Item>

                <Form.Item label="Add to favorites?">
                    <Radio.Group onChange={onChange} value={value}>
                        <Radio value="yes"> Yes </Radio>
                        <Radio value="no"> No </Radio>
                    </Radio.Group>
                </Form.Item>

                <Form.Item label="Photograph" valuePropName="fileList">
                    <Upload action="/upload.do" listType="picture-card">
                        <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button className='btn-register' type="primary" htmlType="submit">
                    Add Contact
                    </Button>
                </Form.Item>
            

            </Form>
            


        </div>
    </div>
  )
}

export default Contact

// id: number;
// name: string;
// email: string;
// phone: string;
// address: string;
// photograph: string;
// cloudinary_id: string;
// is_favourite_contact: boolean;
// user_id: number;