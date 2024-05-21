"use client";
import {
  Space,
  Table,
  TableProps,
  Spin,
  Button,
  Popconfirm,
  message,
} from "antd";
import { useState, useEffect } from "react";
import DrawerUser from "./DrawerUser";
import axios from "@/util/axios";

interface DataType {
  key?: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  contact: string;
}

interface UsersTableProps extends TableProps<DataType> {
  search?: string;
}

const UsersTable = ({ search, ...props }: UsersTableProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DataType[]>([]);
  const [currentUser, setCurrentUser] = useState<DataType | null>(null);
  const [messageApi, contextHolder] = message.useMessage();

  const showDrawer = (user: DataType) => {
    setCurrentUser(user);
    setOpen(true);
  };

  const onClose = () => {
    fetchData();
    setOpen(false);
    setCurrentUser(null);
  };

  const alert = (type: "success" | "error", content: string) => {
    console.log("first");
    messageApi.open({
      type: type,
      content: content,
    });
  };
  const onDelete = async (id: string) => {
    try {
      await axios.delete(`/users/${id}`);
      fetchData();
      alert("success", "Utilisateur supprimé avec succès.");
    } catch (error) {
      alert("error", "Utilisateur non supprimé avec succès:" + error);
      console.error(error);
    }
  };
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/users/");
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Nom",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Prénom",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Contact",
      key: "contact",
      dataIndex: "contact",
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            className="border border-[blue] text-[blue] font-bold py-2 px-4 rounded-2xl hover:bg-[blue] hover:text-white"
            onClick={() => showDrawer(record)}
          >
            Mettre à jour
          </button>
          <Popconfirm
            title="Supprimer cet utilisateur ?"
            description="êtes vous sur de vouloir supprimer cet utilisateur?"
            onConfirm={() => onDelete(record.id)}
            onCancel={() => console.log("Cancel")}
            okText="oui"
            cancelText="Non"
          >
            <Button danger>Supprimer</Button>
          </Popconfirm>
          {/* <button
            className="border border-[red] text-[red] font-bold py-2 px-4 rounded-2xl hover:bg-[red] hover:text-white"
            onClick={() => onDelete(record.id)}
          >
            
          </button> */}
        </Space>
      ),
    },
  ];
  const table = (
    <Table
      dataSource={
        search
          ? data.filter((item) =>
              item.firstName.toLowerCase().includes(search.toLowerCase())
            )
          : data
      }
      columns={columns}
      {...props}
    />
  );


  return (
    <>
      {contextHolder}

      <div className="w-full bg-[blue] text-white flex items-center justify-between p-4">
        <h1 className="text-xl font-bold">CRUD UTILISATEUR</h1>

        <button
          onClick={() =>
            showDrawer({
              id: "",
              firstName: "",
              lastName: "",
              email: "",
              contact: "",
            })
          }
          className="border bg-[blue] border-[white] text-[white] font-bold py-2 px-4 rounded-2xl"
        >
          Ajouter un utilisateur
        </button>
        {/* <div className="relative">
          <input
            type="text"
            placeholder="Rechercher"
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-2 top-2 h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div> */}
      </div>

      <div className="mt-4">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <Spin size="large" />
          </div>
        ) : (
          data && table
        )}
      </div>

     
      <DrawerUser
        open={open}
        onClose={onClose}
        user={currentUser ?? undefined}
      />
    </>
  );
};

export default UsersTable;
