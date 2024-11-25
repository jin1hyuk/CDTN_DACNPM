import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/admin/Breadcrumb";
import { Table, Tag } from "antd";
import type { TableProps } from "antd";
import apiUser from "../../api/apiUser";

interface DataType {
  id: string;
  key: string;
  username: string;
  email: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  isActive: boolean;
  profilePictureUrl: string;
  roles: string[];
}

const User = () => {
  const [data, setData] = useState<DataType[]>([]);

  const fetchListUser = async() => {
    try {
      const res = apiUser.getListUser();
      if(res){
        setData(res as any)
      }
    } catch (error) {
      
    }
  }

  useEffect(() =>{
    new Promise(async()=>{
        await fetchListUser();
    })
  })

  const handleStatusClick = (key: string, id: string, status: boolean) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.key === key
          ? {
              ...item,
              isActive: item.isActive ? false : true,
            }
          : item
      )
    );

    apiUser.updateStatus({ id: id, isActive: !status})
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "fullName",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "phoneNumber",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "isActive",
      key: "isActive",
      dataIndex: "isActive",
      render: (_, record) => {
        const color = record.isActive ? "green" : "volcano";
        return (
          <Tag onClick={() => handleStatusClick(record.key, record.id, record.isActive)} color={color} style={{ cursor: "pointer" }}>
            {color}
          </Tag>
        );
      },
    },
    {
      title: "roles",
      key: "roles",
      dataIndex: "roles",
      render: (_, record) => {
        return (
          <>
            {record.roles.map((item) => (
              <Tag color={"cyan-inverse"}>{item}</Tag>
            ))}
          </>
        );
      },
    },
  ];

  return (
    <>
      <Breadcrumb pageName="User" />

      <div className="flex flex-col gap-10">
        <Table<DataType> columns={columns} dataSource={data} />
      </div>
    </>
  );
};

export default User;
