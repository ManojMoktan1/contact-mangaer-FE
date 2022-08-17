import React, { useState } from "react";
import type { RadioChangeEvent } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Input, Button, Radio, Upload } from "antd";

import "./Contact.css";
import axios from "../../constants/axios";
import { contactToCreate } from "../../interfaces/contactInterface";

const Contact = () => {
  const [componentDisabled, setComponentDisabled] = useState<boolean>(false);
  const onFormLayoutChange = ({ disabled }: { disabled: boolean }) => {
    setComponentDisabled(disabled);
  };

  const [value, setValue] = useState("false");

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const onFinish = async (values: contactToCreate) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(values.photograph[0].originFileObj);
    fileReader.onload = () => {
      axios("/contacts/add", {
        method: "POST",
        data: {
          ...values,
          photograph: fileReader.result,
          user_id: localStorage.getItem("id"),
        },
      }).then((res) => console.log(res));
    };
  };

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  return (
    <div className="form-wrapper">
      <div className="card">
        <h1 className="card__title">ADD CONTACT</h1>
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
          layout="horizontal"
          onValuesChange={onFormLayoutChange}
          disabled={componentDisabled}
          onFinish={onFinish}
        >
          <Form.Item label="Name" name="name">
            <Input className="input-field" />
          </Form.Item>

          <Form.Item label="Email" name="email">
            <Input className="input-field" />
          </Form.Item>

          <Form.Item label="Phone" name="phone">
            <Input className="input-field" />
          </Form.Item>

          <Form.Item label="Address" name="address">
            <Input className="input-field" />
          </Form.Item>

          <Form.Item label="Add to favorites?" name="is_favourite_contact">
            <Radio.Group onChange={onChange} value={value}>
              <Radio value="true"> Yes </Radio>
              <Radio value="false"> No </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Photograph"
            valuePropName="fileList"
            name="photograph"
            getValueFromEvent={normFile}
          >
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button className="btn-register" type="primary" htmlType="submit">
              Add Contact
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Contact;
