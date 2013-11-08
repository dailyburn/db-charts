var _ = require('underscore');

var draw = function(dimensions, ctx, graph, x_pixel, y_pixel) {
  if (!graph.data instanceof Array || graph.data.length == 0) {
    return;
  }
  
  graph.options = graph.options || {};
  
  var default_options = { line_width: 1, stroke_style: '#000' },
      previous_x = x_pixel(dimensions, 0, graph.total_time),
      previous_y = y_pixel(dimensions, graph.data[0].value, graph.max_value),
      bezier_curve = !(graph.options.bezier_curve === false);
  
  ctx.beginPath();
  ctx.moveTo(previous_x, previous_y);
  ctx.lineWidth = graph.options.line_width || default_options.line_width;
  ctx.strokeStyle = graph.options.stroke_style || default_options.stroke_style;
  
  _.each(graph.data, function(datum){
    var target_x = x_pixel(dimensions, datum.time - graph.data[0].time, graph.total_time);
        target_y = y_pixel(dimensions, datum.value, graph.max_value);
    
    if (bezier_curve) {
      var mid_x = (target_x - previous_x) / 2.0 + previous_x;
      ctx.bezierCurveTo(mid_x, previous_y, mid_x, target_y, target_x, target_y);
    }
    else {
      ctx.lineTo(target_x, target_y);
    }
    previous_x = target_x;
    previous_y = target_y;
  });
  
  ctx.stroke();
}

exports.draw = draw;