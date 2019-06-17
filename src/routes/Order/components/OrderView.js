import React from 'react'
import { Link, IndexLink } from 'react-router'
import swal from "sweetalert2"
import Modal from 'components/Modal'
import lodash from 'lodash'
import moment from 'moment'
import Select from "react-dropdown-select";
import DatePicker from "react-datepicker";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
class OrderView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: null,
      isMobile: false,
      listStamp: null,
      searchKey: '',
      currentPage: 0,
      pageSize: 1000000,
      sortBy: 'CreatedDate',
      sortType: 'DES',
      endDate: new Date(),
      startDate: new Date(moment().year(-3).format("YYYY-MM-DD")),
      idSelected: null,
      scanData: [],
      locationData: [],
      timeData: [],
      temXacThuc: 0,
    }
  }
  handleClosePopup() {
    this.setState({ modal: null })
    $('body').removeClass('modal-open');
  }
  handleOpenPopup(modal) {
    this.setState({ modal: modal })
    $('body').addClass('modal-open');
  }
  componentDidMount() {
    //--get api
    this.getList()

  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.order.listStamp != null && !nextProps.order.loading) {
      this.setState({
        listStamp: nextProps.order.listStamp
      })
    }
    if (nextProps.order.report != null && !nextProps.order.loading) {
      this.setState({
        scanData: nextProps.order.report.date,
        locationData: nextProps.order.report.diaDiem,
        timeData: nextProps.order.report.gio,
        temXacThuc: nextProps.order.report.daXacThuc
      })
      if (nextProps.order.report.date.length > 0) {
        this.generateDateChart(nextProps.order.report.date)
      }
      if (nextProps.order.report.gio.length > 0) {
        this.generateStepLine(nextProps.order.report.gio, 'chartTime')
      }
      this.generatePiechart(nextProps.order.report.daQuet, 'Tem đã quét', 'piechart')
      this.generatePiechart(nextProps.order.report.daXacThuc, 'Tem đã xác thực', 'piechart2')
    }
  }
  getList() {
    this.props.GetListStamp(this.state.searchKey, this.state.currentPage, this.state.pageSize, this.state.sortBy, this.state.sortType, this.state.startDate, this.state.endDate)
  }
  getReport() {
    this.props.getReport(this.state.idSelected.id, this.state.startDate, this.state.endDate)
  }
  onChangeLoTem(value) {
    if (value.length <= 0) {
      return
    }
    this.setState({
      idSelected: value[0]
    })
    setTimeout(() => {
      this.getReport()
    }, 100);
  }
  onChangeStartDate(date) {
    this.setState({
      startDate: date
    })
    setTimeout(() => {
      this.getReport()
    }, 100);
  }
  onChangeEndDate(date) {
    this.setState({
      endDate: date
    })
    setTimeout(() => {
      this.getReport()
    }, 100);
  }
  generateDateChart(data) {
    if (!data) {
      return
    }
    let chart = am4core.create("chartdiv", am4charts.XYChart);
    chart.paddingRight = 20;
    chart.data = data;
    let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    dateAxis.renderer.grid.template.location = 0;

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.tooltip.disabled = true;
    valueAxis.renderer.minWidth = 35;

    let series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.dateX = "date";
    series.dataFields.valueY = "count";

    series.tooltipText = "lượt quét:{valueY.value} ";
    chart.cursor = new am4charts.XYCursor();

    let scrollbarX = new am4charts.XYChartScrollbar();
    scrollbarX.series.push(series);
    chart.scrollbarX = scrollbarX;
    this.chart = chart;
  }
  generatePiechart(value, label, element) {
    am4core.useTheme(am4themes_animated);
    let chart = am4core.create(element, am4charts.PieChart3D);
    chart.paddingRight = 20;
    chart.data = [
      {
        country: label,
        litres: value
      },
      {
        country: "Tổng số tem",
        litres: this.state.idSelected.soLuongTem
      },
    ];
    chart.innerRadius = am4core.percent(40);
    chart.depth = 20;
    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";
    var series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "litres";
    series.dataFields.depthValue = "litres";
    series.dataFields.category = "country";
    series.slices.template.cornerRadius = 5;
    series.colors.step = 3;
  }
  generateStepLine(data, element) {
    if (!data) {
      return
    }
    let hourFullData = [
      {
        gio: 0, count: 0
      },
      {
        gio: 1, count: 0
      },
      {
        gio: 2, count: 0
      },
      {
        gio: 3, count: 0
      },
      {
        gio: 4, count: 0
      },
      {
        gio: 5, count: 0
      },
      {
        gio: 6, count: 0
      },
      {
        gio: 7, count: 0
      },
      {
        gio: 8, count: 0
      },
      {
        gio: 9, count: 0
      },
      {
        gio: 10, count: 0
      },
      {
        gio: 11, count: 0
      },
      {
        gio: 12, count: 0
      },
      {
        gio: 13, count: 0
      },
      {
        gio: 14, count: 0
      },
      {
        gio: 15, count: 0
      },
      {
        gio: 16, count: 0
      },
      {
        gio: 17, count: 0
      },
      {
        gio: 18, count: 0
      },
      {
        gio: 19, count: 0
      },
      {
        gio: 20, count: 0
      },
      {
        gio: 21, count: 0
      },
      {
        gio: 22, count: 0
      },
      {
        gio: 23, count: 0
      },
    ]
    hourFullData.forEach(element => {
      element.count = 0
      let result = data.filter(obj => {
        return obj.gio === element.gio
      })
      if (result.length > 0) {
        element.count = result[0].count
      }
    });
    let chart = am4core.create(element, am4charts.XYChart);
    chart.paddingRight = 20;
    chart.data = hourFullData;
    // Create axes
    let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = "gio";

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

    // Create series
    var series = chart.series.push(new am4charts.StepLineSeries());
    series.dataFields.valueY = "count";
    series.dataFields.categoryX = "gio";
    series.name = "Sales";
    series.tooltipText = "lượt quét:{valueY.value} ";
    chart.cursor = new am4charts.XYCursor();
    this.chart = chart;
  }
  render() {
    const { modal, endDate, startDate, listStamp, locationData, scanData, idSelected, temXacThuc, timeData } = this.state
    let { home } = this.props
    return (
      <React.Fragment>
        <div className="main-body">
          <div className="qr-container text-center report-page">
            <h3 className="light-bold">phân tích <b>thống kê</b></h3>
            <div className="group-btn has-label">
              <div className="select-lo">
                {
                  listStamp &&
                  <React.Fragment>
                    <label htmlFor="">Chọn Lô Tem</label>
                    <Select
                      options={listStamp}
                      labelField={'name'}
                      valueField={'id'}
                      searchBy={'name'}
                      values={listStamp}
                      onChange={(value) => this.onChangeLoTem(value)}
                    />
                  </React.Fragment>
                }
              </div>
              <div className="date-group">
                <label htmlFor="">Ngày bắt đầu</label>
                <DatePicker
                  dateFormat="yyyy/MM/dd"
                  selected={startDate}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  onChange={e => this.onChangeStartDate(e)}
                />
              </div>
              <div className="date-group">
                <label htmlFor="">Ngày kết thúc</label>
                <DatePicker
                  dateFormat="yyyy/MM/dd"
                  selected={endDate}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  onChange={e => this.onChangeEndDate(e)}
                  minDate={startDate}
                />
              </div>
            </div>
            <div className="top-report">
              <ul>

                <li>
                  <a href="javascript:void(0)">
                    <h4 className="title">Số lượng Tem</h4>
                    {
                      idSelected &&
                      <span className="box-content">{idSelected.soLuongTem || 0}</span>
                    }
                    <span className="icon"></span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <h4 className="title">Tổng số lượt quét</h4>
                    {
                      scanData &&
                      <span className="box-content">{lodash.sumBy(scanData, function (o) { return o.count; })}</span>
                    }
                    <span className="icon"></span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <h4 className="title">Số tem đã xác thực</h4>
                    {
                      temXacThuc &&
                      <span className="box-content">{temXacThuc || 0}</span>
                    }
                    <span className="icon"></span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <h4 className="title">Khu vực quét</h4>
                    {
                      locationData &&
                      <span className="box-content">{locationData.length}</span>
                    }
                    <span className="icon"></span>
                  </a>
                </li>
                <li>
                  <a href="javascript:void(0)">
                    <h4 className="title">Giờ quét nhiều nhất</h4>
                    {
                      timeData && lodash.maxBy(timeData, 'count') &&
                      <span className="box-content">{lodash.maxBy(timeData, 'count').gio}h</span>
                    }
                    <span className="icon"></span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="table-panel">
              <h4 className="title">Thống kê lượt quét</h4>
              <i className="top-ico"><a href="javascript:void(0)">Refresh</a></i>
              <div className="tab-body">
                <div id="chartdiv" style={{ width: "100%", height: "350px" }}></div>
              </div>
            </div>
            <div className="table-panel">
              <h4 className="title">Thống kê Tem</h4>
              <i className="top-ico"><a href="javascript:void(0)">Refresh</a></i>
              <div className="tab-body">
                <div className="row">
                  <div className="col-sm-6">
                    <div id="piechart" style={{ width: "100%", height: "300px" }}></div>
                    <h5 className="char-title">Biểu đồ thống kê tem đã quét</h5>
                  </div>
                  <div className="col-sm-6">
                    <div id="piechart2" style={{ width: "100%", height: "300px" }}></div>
                    <h5 className="char-title">Biểu đồ thống kê tem  xác thực</h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="table-panel">
              <h4 className="title">Thống kê thời gian quét</h4>
              <i className="top-ico"><a href="javascript:void(0)">Refresh</a></i>
              <div className="tab-body">
                <div id="chartTime" style={{ width: "100%", height: "350px" }}></div>
              </div>
            </div>
            <div className="table-panel">
              <h4 className="title">Thống kê địa điểm quét</h4>
              <i className="top-ico"><a href="javascript:void(0)">Refresh</a></i>
              <div className="tab-body location-report">
                {
                  locationData.length > 0 ?
                    (
                      <div className="row">
                        <div className="col-sm-8"></div>
                        <div className="col-sm-4">
                          <h4 className="top-location">Khu vực quét nhiều</h4>
                          <div className="list-progress-bar">
                            {
                              locationData.map((item, index) => (
                                <div className="progress-location">
                                  <div className="clearfix">
                                    <h4 className="location-name">{item.diaDiem}</h4>
                                    <span className="view"> <i className="fas fa-eye-slash"></i> {item.count}</span>
                                  </div>
                                  <div className="progress-outner">
                                    <div className="progress-inner" style={{ width: (item.count / lodash.sumBy(locationData, function (o) { return o.count; })) * 100 + '%' }}></div>
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="no-entry">Không có dữ liệu</div>
                    )
                }
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default OrderView
// {lodash.sumBy(locationData, function (o) { return o.count; })}