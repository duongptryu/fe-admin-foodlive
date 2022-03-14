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
  Image,
  Drawer,
  Divider,
  Upload,
  Switch,
} from "antd";
import { useEffect, useState } from "react";
import ImgCrop from "antd-img-crop";
import API from "../../api/fetch";
const { Title, Paragraph, Text } = Typography;
const { Search } = Input;

const SubCategoryManager = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleEdit, setVisibleEdit] = useState(false);
  const [cate, setCate] = useState({
    id: "",
    name: "",
    icon: {
      url: "",
    },
    description: "",
    status: false,
    updated_at: "",
    created_at: "",
  });
  const [fileList, setFileList] = useState([
    {
      uid: "-1",
      name: "image.png",
      status: "done",
      url: "",
    },
  ]);
  const [editName, setEditName] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editIcon, setEditIcon] = useState({});
  const [cateStatus, setCateStatus] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const beforeUpload = async (file) => {
    var bodyFormData = new FormData();
    bodyFormData.append("file", file);
    API.post("/upload", bodyFormData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((result) => {
        console.log(result);
        notification["success"]({
          message: "Upload Success",
        });
        setEditIcon(result.data.data);
        return true;
      })
      .catch((err) => {
        notification["error"]({
          message: "Error server",
          description: err,
        });
        return false;
      });
  };

  const onEditCate = () => {
    setLoading(true);
    const cateUpdate = {
      name: editName,
      description: editDescription,
      icon: editIcon,
      status: cateStatus,
    };
    API.put(`/admin/category/${cate.id}`, cateUpdate)
      .then((result) => {
        console.log(result);
        notification["success"]({
          message: "Update Success",
        });
      })
      .catch((err) => {
        console.log(err);
        notification["error"]({
          message: "Error",
          description: err,
        });
      });
    onClose();
    fetchData()
    setLoading(false);
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onOpenEdit = () => {
    setFileList([
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: cate.icon.url,
      },
    ]);
    setEditIcon(cate.icon);
    setEditName(cate.name);
    setEditDescription(cate.description);
    setCateStatus(cate.status);
    setVisibleEdit(true);
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow.document.write(image.outerHTML);
  };

  const showDrawer = (cate) => {
    console.log(cate);
    setCate({
      id: cate.id,
      name: cate.name,
      icon: cate.icon,
      description: cate.description,
      status: cate.status,
      created_at: cate.created_at,
      updated_at: cate.updated_at,
    });
    setVisible(true);
  };

  const onClose = () => {
    setVisibleEdit(false);
    setVisible(false);
  };

  const fetchData = () => {
    setLoading(true);
    API.get("admin/category")
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

  const handleUpdateStatusCate = (id, status) => {
    setLoading(true);
    API.put(`admin/category/${id}`, {
      status: status,
    })
      .then((result) => {
        notification["success"]({
          message: "Notification",
          description: "Update status category successful",
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

  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Icon",
      key: "icon",
      render: (c) => {
        return <Image width={100} src={c.icon.url} />;
      },
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Status",
      key: "status",
      render: (u) => {
        return u.status ? (
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
              showDrawer(u);
            }}
          >
            Detail
          </Button>
          {u.status ? (
            <Button
              type="primary"
              danger
              onClick={() => {
                handleUpdateStatusCate(u.id, false);
              }}
            >
              Deactive
            </Button>
          ) : (
            <Button
              type="primary"
              onClick={() => {
                handleUpdateStatusCate(u.id, true);
              }}
            >
              Active
            </Button>
          )}
        </Space>
      ),
    },
  ];

  return (
    <>
      <Spin tip="Loading..." spinning={loading}>
        <Row>
          <Col span={24}>
            <Title keyboard>Category Management</Title>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Search
              placeholder="Search category"
              enterButton="Search"
              size="large"
              loading={false}
            />
          </Col>
        </Row>

        {/* //Detail */}
        <Drawer
          title="Category detail"
          width={736}
          placement="right"
          onClose={onClose}
          visible={visible}
          bodyStyle={{ paddingBottom: 80 }}
          extra={
            <Space>
              <Button onClick={onOpenEdit} type="primary" htmlType="submit">
                Edit
              </Button>
            </Space>
          }
        >
          <Divider orientation="left" plain>
            Icon
          </Divider>
          <Row>
            <Col span={24}>
              <Image width={360} src={cate.icon.url} style={{}} />
            </Col>
          </Row>
          <Divider orientation="left" plain>
            Information
          </Divider>
          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Text strong>ID: </Text> <Text>{cate.id}</Text>
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Text strong>Name: </Text> <Text>{cate.name}</Text>
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Text strong>Description: </Text>
              <Text>{cate.description}</Text>
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Text strong>Created At: </Text>
              <Text>{cate.created_at}</Text>
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Text strong>Updated At: </Text>
              <Text>{cate.updated_at}</Text>
            </Col>
          </Row>
        </Drawer>

        {/* Edit */}
        <Drawer
          title="Category Edit"
          width={736}
          placement="right"
          onClose={() => {
            setVisibleEdit(false);
            setVisible(false);
          }}
          visible={visibleEdit}
          bodyStyle={{ paddingBottom: 80 }}
          extra={
            <Space>
              <Button onClick={onEditCate} type="primary" htmlType="submit">
                Submit
              </Button>
            </Space>
          }
        >
          <Divider orientation="left" plain>
            Icon
          </Divider>
          <Row>
            <Col span={24}>
              <ImgCrop rotate width={360}>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={fileList}
                  beforeUpload={beforeUpload}
                  onChange={onChange}
                  onPreview={onPreview}
                >
                  {fileList.length < 1 && "+ Upload"}
                </Upload>
              </ImgCrop>
            </Col>
          </Row>
          <Divider orientation="left" plain>
            Information
          </Divider>

          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Text strong>Name: </Text>{" "}
              <Paragraph editable={{ onChange: setEditName }}>
                {editName}
              </Paragraph>
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Text strong>Description: </Text>
              <Paragraph editable={{ onChange: setEditDescription }}>
                {editDescription}
              </Paragraph>
            </Col>
          </Row>

          <Row style={{ marginBottom: "10px" }}>
            <Col span={24}>
              <Text strong>InActive </Text>
              <Switch
                checked={cateStatus}
                onChange={() => {
                  setCateStatus(!cateStatus);
                }}
              />
              <Text strong> Active</Text>
            </Col>
          </Row>
        </Drawer>

        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"],
          }}
        />
      </Spin>
    </>
  );
};

export default SubCategoryManager;
