import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import dayjs from "dayjs";
import axios from "axios";

import { Layout, Menu, theme, Table} from "antd";
import { LoginOutlined, UserAddOutlined, HomeOutlined,} from "@ant-design/icons";
import { QueryFilter, ProFormSelect, ProFormText, ProFormDateRangePicker} from '@ant-design/pro-components';

//Antd元件屬性設定
const { Header, Content, Footer, Sider } = Layout;


//style設定
const headerStyle = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
  top: 0,
};
const contentStyle = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
};
const siderStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
};
const footerStyle = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#4096ff",
};

//選單項目
const menuItems = [
  { key: "1", label: "會員登入", icon: <LoginOutlined />, path: "/login" },
  { key: "2", label: "註冊", icon: <UserAddOutlined />, path: "/register" },
  { key: "3", label: "首頁", icon: <HomeOutlined />, path: "/" },
];

//地區選單
const locations = [
  { value: 1, label: "北部" },
  { value: 2, label: "中部" },
  { value: 3, label: "南部" },
  { value: 4, label: "東部" },
  { value: 5, label: "離島" },
];


function SearchPage() {
  const [camps, setCamps] = useState([]);
  const getCampList = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/v1/camps`);
      if (res.data.success === true) {
        setCamps(res.data.data);
      }
      console.log("getCampList取得成功:", camps);
    } catch (err) {
      console.log("getCampList取得異常:", err);
    }
  };

  useEffect(() => {
    getCampList();
  }, []);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  /** 特定條件查詢營區 */
  const onSearch = async (values) => {
    await waitTime(2000);
    console.log(values);
    window.location.href = "#/login";
  };

  const waitTime = (time) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, time);
    });
  };
  


  return (
    <Layout>
      <Sider style={siderStyle} breakpoint="md" collapsedWidth="0">
        <Menu mode="inline" theme="dark">
          {menuItems.map((item) => (
            <Menu.Item key={item.key} icon={item.icon}>
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Header style={headerStyle}>Go露營</Header>
        <Content style={contentStyle}>
          <div>
             <QueryFilter defaultCollapsed submitter onFinish={onSearch}>
                <ProFormSelect name="select" label="選擇地區" options={locations}  placeholder="請選擇地區"/>
                <ProFormDateRangePicker name="dateRange" label="日期" initialValue={[dayjs(), dayjs()]}/>
                <ProFormText name="status" label="營區名稱" placeholder="搜索..."/>
             </QueryFilter>
          </div>
          
        </Content>
        <Footer style={footerStyle}>
          Copyright ©{new Date().getFullYear()} Created by Go露營
        </Footer>
      </Layout>
    </Layout>
  );
}

export default SearchPage;
