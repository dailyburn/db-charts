var _ = require('underscore');

var draw = function (dimensions, ctx, graph, x_pixel, y_pixel) {
  var default_options = { fill_style: 'rgba(0,153,0,0.2)' };
  
  _.each(graph.data, function(datum) {
    var duration = datum.duration || 1,
        start_x = x_pixel(dimensions, datum.time - graph.data[0].time, graph.total_time),
        end_x = x_pixel(dimensions, datum.time + duration - graph.data[0].time, graph.total_time),
        start_y = y_pixel(dimensions, 0, graph.max_value),
        end_y = y_pixel(dimensions, datum.value, graph.max_value);
        
    ctx.fillStyle = datum.fill_style || graph.options.fill_style || default_options.fill_style;
    ctx.fillRect(start_x, start_y, end_x - start_x, end_y - start_y);
  });
}

exports.draw = draw;