import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Row,
  Select,
  Space,
  message,
} from "antd";
import React, { useEffect, useState } from "react";
import axios from "@/util/axios";

interface FormValues {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
}

const DrawerUser = ({
  open,
  onClose,
  user,
}: {
  open: boolean;
  onClose: () => void;
  user?: FormValues;
}) => {
  const [form] = Form.useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  console.log(user);
  useEffect(() => {
    if (user?.id != "") {
      form.setFieldsValue({
        id: user?.id,
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        contact: user?.contact,
      });
    }
  }, [user, form]);

  const [messageApi, contextHolder] = message.useMessage();
  const alert = ( type: "success" | "error", content: string ) => {
    console.log("first");
    messageApi.open({
      type: type,
      content: content,
    });
  };
  const onFinish = async (values: FormValues) => {
    setLoading(true);
    try {
      if (user?.id != "") {
        await axios.patch(
          `/users/${user?.id}`,
          values
        );
        alert("success","Utilisateur modifié avec succès.")
      
      } else {
        await axios.post("/users", values);
        alert("success", "Utilisateur ajouté avec succès.");
      }
      onClose();
      form.resetFields();
    } catch (error) {
      alert("error", error as string);

      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log(errorInfo);
  };

  return (
    <>
      {contextHolder}
      <Drawer
        title={
          user?.id ? "Modifier un utilisateur" : "Ajouter un nouvel utilisateur"
        }
        width={420}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
      >
        <Form<FormValues>
          layout="vertical"
          initialValues={user}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          {user && (
            <Form.Item name="id" hidden>
              <Input />
            </Form.Item>
          )}
          {/* <Row gutter={16}> */}
          <Col>
            <Form.Item
              name="firstName"
              label="Nom"
              rules={[{ required: true, message: "Veuillez entrer le nom" }]}
            >
              <Input placeholder="Veuillez entrer le nom" />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="lastName"
              label="Prénom"
              rules={[{ required: true, message: "Veuillez entrer le prénom" }]}
            >
              <Input
                placeholder="Veuillez entrer le prénom"
                defaultValue={user?.lastName}
              />
            </Form.Item>
          </Col>
          {/* </Row> */}
          {/* <Row gutter={16}> */}
          <Col>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Veuillez entrer l'email",
                },
              ]}
            >
              <Input
                placeholder="Veuillez entrer l\'email"
                defaultValue={user?.email}
              />
            </Form.Item>
          </Col>
          <Col>
            <Form.Item
              name="contact"
              label="Contact"
              rules={[
                { required: true, message: "Veuillez entrer le contact" },
              ]}
            >
              <Input
                placeholder="Veuillez entrer le contact"
                defaultValue={user?.contact}
              />
            </Form.Item>
          </Col>
          {/* </Row> */}
          <div className="flex items-center justify-center">
            <Button
              className="bg-[blue]"
              loading={loading}
              type="primary"
              htmlType="submit"
            >
              Soumettre
            </Button>
          </div>
        </Form>
      </Drawer>
    </>
  );
};

export default DrawerUser;
