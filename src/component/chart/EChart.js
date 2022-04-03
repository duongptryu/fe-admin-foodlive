import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography, notification } from "antd";
import API from "../../api/fetch";

function EChart() {
  const { Title, Paragraph } = Typography;
  const [userCount, setUserCount] = useState(0);
  const [cate, setCate] = useState([]);
  const [maxUser, setMaxUser] = useState(0);
  const [minUser, setMinUser] = useState(0);
  const [growth, setGrowth] = useState(0);
  const [growthLastMonth, setGrowthLastMonth] = useState(0);

  const fetchDataOrder = () => {
    API.get(`admin/stats/user`)
      .then((result) => {
        console.log(result.data.data);
        const v = result.data.data;
        setUserCount(v.user_count);
        setCate(v.cate);
        setMaxUser(v.new_max_user);
        setMinUser(v.new_min_user);
        setGrowth(v.growth);
        setGrowthLastMonth(v.growth_with_last_month);
      })
      .catch((e) => {
        notification["error"]({
          message: "Error server",
          description: e,
        });
      });
  };

  useEffect(() => {
    fetchDataOrder();
  }, []);

  const items = [
    {
      Title: maxUser,
      user: "New Max User",
    },
    {
      Title: minUser,
      user: "New Min User",
    },
    {
      Title: growth + "%",
      user: "Growth",
    },
    {
      Title: growthLastMonth + "%",
      user: "Growth with last month",
    },
  ];

  const eChart = {
    series: [
      {
        name: "Users",
        data: userCount,
        color: "#fff",
      },
    ],

    options: {
      chart: {
        type: "bar",
        width: "100%",
        height: "auto",

        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          borderRadius: 5,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 1,
        colors: ["transparent"],
      },
      grid: {
        show: true,
        borderColor: "#ccc",
        strokeDashArray: 2,
      },
      xaxis: {
        categories: cate,
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
            ],
          },
        },
      },
      yaxis: {
        labels: {
          show: true,
          align: "right",
          minWidth: 0,
          maxWidth: 160,
          style: {
            colors: [
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
              "#fff",
            ],
          },
        },
      },

      tooltip: {
        y: {
          formatter: function (val) {
            return val + " new users";
          },
        },
      },
    },
  };

  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={eChart.series}
          type="bar"
          height={220}
        />
      </div>
      <div className="chart-vistior">
        <Title level={5}>New Users</Title>
        <Paragraph className="lastweek">
          than last month
          {userCount[userCount.length - 1] - userCount[userCount.length - 2] >
          0 ? (
            <span className="bnb2">
              {" " +
                ((userCount[userCount.length - 1] -
                  userCount[userCount.length - 2]) /
                  userCount[userCount.length - 2]) *
                  100 +
                "%"}{" "}
            </span>
          ) : (
            <span className="redtext">
              {" -" +
                ((userCount[userCount.length - 2] -
                  userCount[userCount.length - 1]) /
                  userCount[userCount.length - 2]) *
                  100 +
                "%"}
            </span>
          )}
        </Paragraph>
        <Paragraph className="lastweek">
          We have created multiple options for you to put together and customise
          into pixel perfect pages.
        </Paragraph>
        <Row gutter>
          {items.map((v, index) => (
            <Col xs={6} xl={6} sm={6} md={6} key={index}>
              <div className="chart-visitor-count">
                <Title level={4}>{v.Title}</Title>
                <span>{v.user}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default EChart;
