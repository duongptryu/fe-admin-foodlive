import {
  Table,
  Space,
  Tag,
  Row,
  Col,
  Typography,
  Input,
  notification,
  Spin,
  Button,
  Divider,
  Drawer,
  Image,
} from "antd";
import { useEffect, useState } from "react";
import API from "../../api/fetch";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
const { Search } = Input;

const SubUserManager = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [userDetail, setUserDetail] = useState({});
  const [userAddress, setUserAddress] = useState([]);
  const [useDevice, setUserDevice] = useState({});
  const [totalOrder, setTotalOrder] = useState(0);

  const fetchData = () => {
    setLoading(true);
    API.get(`admin/user-device-token?limit=${pageSize}&page=${currentPage}`)
      .then((result) => {
        console.log(result.data.data);
        setData(result.data.data);
      })
      .catch((e) => {
        notification["error"]({
          message: "Error server",
          description: e,
        });
      });
    setLoading(false);
  };

  const fetchUserDetail = (id) => {
    if (id == undefined) {
      notification["error"]({
        message: "Error server",
        description: "Id is undefined",
      });
      return false;
    }
    setLoading(true);
    API.get(`admin/user/${id}`)
      .then((result) => {
        console.log(result.data.data);
        const v = result.data.data;
        setTotalOrder(v.order_count);
        setUserDetail(v.user);
        setUserDevice(v.device);
        setUserAddress(v.address);
      })
      .catch((e) => {
        notification["error"]({
          message: "Error server",
          description: e,
        });
      });
    setLoading(false);
    setVisible(true);
  };

  const handleUpdateStatusUser = (id, status) => {
    setLoading(true);
    API.put(`admin/user/${id}`, {
      status: status,
    })
      .then((result) => {
        notification["success"]({
          message: "Notification",
          description: "Update status user successful",
        });
        fetchData();
      })
      .catch((err) => {
        console.log(err.response);
        notification["error"]({
          message: "Errorr",
          description: err.response.data.message,
        });
      });
    setLoading(false);
  };

  useEffect(() => {
    document.title = "User Management";
    fetchData();
  }, [currentPage, pageSize]);

  const search = () => {
    // let url = "admin/user";
    // if (searchText != "") {
    //   url = url + `?${searchedColumn}=${searchText}`;
    // }
    // setLoading(true);
    // API.get(url)
    //   .then((result) => {
    //     console.log(result.data.data);
    //     setData(result.data.data);
    //     setTotal(result.data.paging.total);
    //   })
    //   .catch((e) => {
    //     notification["error"]({
    //       message: "Error server",
    //       description: e,
    //     });
    //   });
    // setLoading(false);
  };

  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  useEffect(() => {
    search();
  }, [searchText, searchedColumn]);

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const columns = [
    {
      title: "Full Name",
      key: "name",
      ...getColumnSearchProps("last_name"),
      render: (u) => {
        return (
          <text>
            {u.user.first_name} {u.user.last_name}
          </text>
        );
      },
    },
    {
      title: "Phone Number",
      key: "phone",
      ...getColumnSearchProps("phone"),
      render: (u) => {
        return u.user.phone;
      },
    },
    {
      title: "Status",
      key: "status",
      render: (u) => {
        return u.user.status ? (
          <Tag color="#108ee9">Active</Tag>
        ) : (
          <Tag color="red">Deactive</Tag>
        );
      },
    },
    {
      title: "Created At",
      key: "created_at",
      dataIndex: "created_at",
    },
    {
      title: "Action",
      key: "action",
      render: (u) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => {
              fetchUserDetail(u.user?.id);
            }}
          >
            Detail
          </Button>
          {u.user.status ? (
            <Button
              type="primary"
              danger
              onClick={() => {
                handleUpdateStatusUser(u.user?.id, false);
              }}
            >
              Deactive
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() => {
                handleUpdateStatusUser(u.user?.id, true);
              }}
            >
              Active
            </Button>
          )}
          <Button type="primary">Push Notification</Button>
        </Space>
      ),
    },
  ];
  return (
    <>
      <Spin tip="Loading..." spinning={loading}>
        <Row>
          <Col span={24}>
            <Title keyboard>User Management</Title>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            {/* <Search
              placeholder="Search user"
              enterButton="Search"
              size="large"
              loading={false}
            /> */}
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"],
            total: total,
          }}
          onChange={(e) => {
            setCurrentPage(e.current);
            setPageSize(e.pageSize);
          }}
        />

        {/* //Detail */}
        <Drawer
          title="User detail"
          width={736}
          placement="right"
          onClose={() => {
            setVisible(false);
          }}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
          extra={
            <Space>
              <Button
                onClick={() => {
                  setVisible(false);
                }}
                type="primary"
                htmlType="submit"
              >
                Exit
              </Button>
            </Space>
          }
        >
          <Divider orientation="left" plain>
            <h3 style={{ color: "#5AD8A6" }}>Avatar</h3>
          </Divider>
          <Row>
            <Col span={24}>
              <Image width={360} src="https://joeschmoe.io/api/v1/random" />
            </Col>
          </Row>
          <Divider orientation="left" plain>
            <h3 style={{ color: "#5AD8A6" }}>Order</h3>
          </Divider>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Text strong>Total Order: </Text> <Text> {totalOrder} </Text>
            </Col>
          </Row>
          <Divider orientation="left" plain>
            <h3 style={{ color: "#5AD8A6" }}>Information</h3>
          </Divider>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Text strong>ID: </Text> <Text> {userDetail?.id} </Text>
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Text strong>Name: </Text>{" "}
              <Text>
                {" "}
                {userDetail?.first_name + " " + userDetail?.last_name}
              </Text>
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Text strong>Phone: </Text>
              <Text>{userDetail?.phone}</Text>
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Text strong>Status: </Text>
              <Text>{userDetail?.status ? "Active" : "Inactive"}</Text>
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Text strong>Created At: </Text>
              <Text> {userDetail?.created_at} </Text>
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Text strong>Updated At: </Text>
              <Text>{userDetail?.updated_at}</Text>
            </Col>
          </Row>

          <Divider orientation="left" plain>
            <h3 style={{ color: "#5AD8A6" }}>Device</h3>
          </Divider>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Text strong>OS: </Text> <Text> {useDevice?.os} </Text>
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Text strong>Token: </Text> <Text> {useDevice?.token} </Text>
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Text strong>Status: </Text>
              <Text>{useDevice?.status ? "Active" : "Inactive"}</Text>
            </Col>
          </Row>

          <Divider orientation="left" plain>
            <h3 style={{ color: "#5AD8A6" }}>Address</h3>
          </Divider>
          {userAddress.map((addr) => {
            return (
              <>
                <Divider orientation="mid" plain>
                  {addr?.addr} - {addr?.lat} - {addr?.lng}
                </Divider>
                <Row style={{ marginBottom: "10px" }}>
                  <Col span={24}>
                    <Text strong>ID: </Text>
                    <Text>{addr?.id}</Text>
                  </Col>
                </Row>
                <Row style={{ marginBottom: "10px" }}>
                  <Col span={24}>
                    <Text strong>City: </Text>
                    <Text>{addr?.city?.title}</Text>
                  </Col>
                </Row>
              </>
            );
          })}
        </Drawer>
      </Spin>
    </>
  );
};

export default SubUserManager;
