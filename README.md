# db-charts

A lightweight module for streaming dynamically generated charts as PNGs.


## Installation

    $ npm install db-charts

This module relies on [node-canvas](https://github.com/learnboost/node-canvas), which 
in turn relies on Cairo.  Please read the instructions for installing node canvas as linked
above.

## Usage

Require it in your code as normal:

		var db_charts = require('db-charts');
		
Then pass the http res object, the dimensions of the canvas, and the array of graph
objects to draw.  Note that graph objects are drawn in the order they appear in the array,
so if overlapping occurs graphs that are written later (are further in the array) will
appear on top of graphs that were written first (are in the beginning of the array).

Note that this assumes that your code is using the http module and will pass in the
appropriate `res` object.

		db_charts.graph(res, dimensions, charts);
		
###Dimensions

The dimensions object specifies the width and height of the canvas, as well as any padding:

		dimensions = { width: 100, height: 100, padding: { left: 20, top: 10, right: 20, bottom: 10 } };
		
In the example above, a 100x100 PNG will be created and the final graph will have dimensions 60x80.

###Graphs

As of right now, two graph types are supported: bar graphs and line graphs.  A graph object has five
attributes: `type`, `data`, `total_time`, `max_value`, and `options`.  Type will be one of `"bar"` or `"line"`.

The x-axis of all graphs are calculated in terms of time.  The positioning of an element is the percentage
of time elapsed multiplied by the canvas size (taking into account any padding).  The scale of each graph
is calculated independently of all other graphs.  To draw graphs to the same scale, ensure that the `total_time` 
fields are identical.

The y-axis of all graphs are calculated in terms of value.  Similar to the x-axis, the y positioning of a given
element is determined by its relative value to the `max_value` attribute associated with the graph.  The scale of
each graph is calculated independently of all other graphs. To draw graphs to the same scale,
ensure that the `max_value` fields are identical.

#### Bar Graphs

The `data` component of a bar graph is an array of objects that take the following form:

		{ time: 20, duration: 10, value: 10 }

`time` is when the graph should start, and the width of the bar is calculated based on its duration in comparison
to the `total_time`.

The fill color of a bar graph can be set in its options attribute by setting a `fill_style`.  This can take in rgba
values for semi-transparent coloring.

Additionally, a given bar can override the global or optional `fill_style`.  So if there is a single bar that you want
to highlight, you can pass a `fill_style` attribute into the data point:

		{ time: 20, duration: 10, value: 10, fill_style: '#900' }
		
The final bar graph element will look something like this:

		var bar_graph_data = [
			{ time: 0, duration: 5, value: 10 },
			{ time: 10, duration: 5, value: 5 },
			{ time: 20, duration: 5, value: 30, fill_style: '#900' },
			{ time: 30, duration: 5, value: 35 },
			{ time: 40, duration: 5, value: 10 },
		];
		var bar_graph = { type: 'bar', total_time: 45, max_value: 40, data: bar_graph_data, options: { fill_style: 'rgba(120,120,120,.5)' }  }

**NOTE:**  If the `total_time` for a bar chart is less than the sum of when the last element starts and its duration, it 
will be clipped.  In the example above, a `total_time` less than 45 seconds would result in clipping.

#### Line Graphs

The `data` component of a line graph is an array of objects that take the following form:

		{ time: 20, value: 10 }
		
The line width and stroke style can be set in the options attribute.  The stroke style can take an rgba value
for semi-transparent coloring.  By default, the line graph will be drawn using a Bezier curve.  This can be turned
off by setting `bezier_curve` to `false` in the options object.

The final line graph element will look something like this:

		var line_graph_data = [
			{ time: 0, value: 5},
			{ time: 10, value: 3 },
			{ time: 30, value: 40 }
		];
		var line_graph = { type: 'line', total_time: 30, max_value: 40, data: line_graph_data, options: { line_width: 2, stroke_style: 'rgba(110,0,0,.5)', bezier_curve: false } };

**NOTE:** You will most likely want to order line graph data by its time before sending it off to be graphed.  We
make no assumptions about how data should be ordered.

#### Combining graphs

As mentioned before, you can combine as many graphs as you want:

		db_charts.graph(res, dimensions, [bar_graph, line_graph]);
		
See [this example](examples/multi.js) for a working example.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b some-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin some-new-feature`)
5. Create new Pull Request
