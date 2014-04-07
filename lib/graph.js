var _ = require('underscore'),
    Canvas = require('canvas'),
    grid = require('./grid');
    line_graph = require('./line_graph'),
    bar_graph = require('./bar_graph');

var x_pixel = function(dimensions, time_elapsed, total_time) {
  return ((dimensions.width - dimensions.padding.left - dimensions.padding.right) * (time_elapsed / total_time)) + dimensions.padding.left;
};

var y_pixel = function(dimensions, value, max_y) {
  return dimensions.height - (((dimensions.height - dimensions.padding.top - dimensions.padding.bottom) / max_y) * value) - dimensions.padding.bottom;
};

var graph = function (res, dimensions, graphs, bgcolor) {
  var canvas = new Canvas(dimensions.width, dimensions.height),
      ctx = canvas.getContext('2d'),
      stream;
  
  dimensions.padding = (typeof(dimensions.padding) == 'object') ? dimensions.padding : {};
  dimensions.padding.left = dimensions.padding.left || 0;
  dimensions.padding.top = dimensions.padding.top || 0;
  dimensions.padding.right = dimensions.padding.right || 0;
  dimensions.padding.bottom = dimensions.padding.bottom || 0;
  
  if (bgcolor && /^[0-9A-Fa-f]{6}$/i.test(bgcolor)) {
    ctx.beginPath();
    ctx.fillStyle = '#' + bgcolor;
    ctx.fillRect(0, 0, dimensions.width, dimensions.height);
  }
  
  _.each(graphs, function(graph) {
    ctx.beginPath();
    switch(graph.type) {
      case 'grid': grid.draw(dimensions, ctx, graph, x_pixel, y_pixel); break;
      case 'bar': bar_graph.draw(dimensions, ctx, graph, x_pixel, y_pixel); break;
      case 'line': line_graph.draw(dimensions, ctx, graph, x_pixel, y_pixel); break;
      default: ; // intentionally left blank
    }
  });
  
  stream = canvas.pngStream();
  stream.on('data', function(chunk) { res.write(chunk, 'binary'); });
  stream.on('end', function() { res.end(); });
}

exports.graph = graph;