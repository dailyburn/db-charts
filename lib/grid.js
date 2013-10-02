var _ = require('underscore');

var draw = function (dimensions, ctx, grid, x_pixel, y_pixel) {
  var default_options = { line_width: 2, stroke_style: '#000' };
  grid.rows = grid.rows || {};
  grid.rows.options = grid.rows.options || {};
  grid.rows.count = grid.rows.count || 0;
  
  grid.cols = grid.cols || {};
  grid.cols.options = grid.cols.options || {};
  grid.cols.count = grid.cols.count || 0;
  
  var row_stroke = {
    width: grid.rows.options.line_width || default_options.line_width,
    style: grid.rows.options.stroke_style || default_options.stroke_style
  };
  
  var col_stroke = {
    width: grid.cols.options.line_width || default_options.line_width,
    style: grid.cols.options.stroke_style || default_options.stroke_style
  };
  
  for(i=0; i<=grid.rows.count; i++) {
    var start_x = x_pixel(dimensions, 0, grid.rows.count),
        end_x = x_pixel(dimensions, grid.rows.count, grid.rows.count),
        y = y_pixel(dimensions, i, grid.rows.count);
    
    ctx.beginPath();
    ctx.lineWidth = row_stroke.width;
    ctx.strokeStyle = row_stroke.style;
    ctx.moveTo(start_x, y);
    ctx.lineTo(end_x, y);
    ctx.stroke();
  }
  
  for(i=0; i<=grid.cols.count; i++) {
    var x = x_pixel(dimensions, i, grid.cols.count),
        start_y = y_pixel(dimensions, 0, grid.cols.count),
        end_y = y_pixel(dimensions, grid.cols.count, grid.cols.count);
    
    ctx.beginPath();
    ctx.lineWidth = col_stroke.width;
    ctx.strokeStyle = col_stroke.style;
    ctx.moveTo(x, start_y);
    ctx.lineTo(x, end_y);
    ctx.stroke();
  }
}

exports.draw = draw;
