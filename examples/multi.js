var http = require('http'),
    db_charts = require('db-charts');

http.createServer(function(req, res) {
  var dimensions = { width: 500, height: 300, padding: { left: 10, top: 20, right: 10, bottom: 20 } };
  
  var line_chart_data = [
    { time: 0, value: 5 },
    { time: 2, value: 15 },
    { time: 5, value: 5 },
    { time: 15, value: 15 },
    { time: 17, value: 5 },
    { time: 18, value: 15 },
    { time: 25, value: 5 },
    { time: 40, value: 15 },
    { time: 43, value: 5 },
    { time: 71, value: 15 }
  ];
  
  var line_chart2_data = [
    { time: 0, value: 5 },
    { time: 12, value: 10 },
    { time: 15, value: 11 },
    { time: 25, value: 15 },
    { time: 27, value: 25 },
    { time: 28, value: 30 },
    { time: 35, value: 31 },
    { time: 40, value: 32 },
    { time: 43, value: 38 },
    { time: 81, value: 40 }
  ];
  
  
  var bar_chart_data = [
    { time: 0, duration: 8, value: 5 },
    { time: 10, duration: 3, value: 15 },
    { time: 15, duration: 3, value: 5 },
    { time: 20, duration: 8, value: 15 },
    { time: 30, duration: 3, value: 5 },
    { time: 35, duration: 14, value: 15, fill_style: '#900' },
    { time: 50, duration: 8, value: 5 },
    { time: 60, duration: 14, value: 15 },
    { time: 75, duration: 9, value: 5 },
    { time: 85, duration: 5, value: 15 }
  ];
  ;
  
  var last_line_datum = line_chart_data[line_chart_data.length - 1];
  var last_line2_datum = line_chart2_data[line_chart2_data.length - 1];
  var last_bar_datum = bar_chart_data[bar_chart_data.length - 1];
  
  var graphs = [
    { type: 'bar', data: bar_chart_data, total_time: last_bar_datum.time + last_bar_datum.duration, max_value: 30, options: { fill_style: 'rgba(2,18,32,.75)' } },
    { type: 'line', data: line_chart2_data, total_time: last_line2_datum.time, max_value: 45, options: { line_width: 6, stroke_style: '#090', bezier_curve: false } },
    { type: 'line', data: line_chart_data, total_time: last_line_datum.time, max_value: 20, options: { line_width: 4, stroke_style: 'rgba(110,0,0,.8)' } }
  ];
  
  db_charts.graph(res, dimensions, graphs);
}).listen(8080, '127.0.0.1');