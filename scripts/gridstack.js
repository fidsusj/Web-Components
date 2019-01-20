$(function() {
    var options = {
        float: true,
        width: 4,
        height: 4,
        animate: true,
        always_show_resize_handle: true,
        cellHeight: 110,
        verticalMargin: 18,
        horizontalMargin: 9,
        placeholder_class: 'grid-stack-placeholder',
        acceptWidgets: '.grid-stack-item'
    };
    $(document.querySelector('.grid-stack')).gridstack(_.defaults(options));
    $(document.querySelector('.grid-stack')).each(function() {
        var grid = $(this).data('gridstack');
        var items = [{x: 0, y: 0, width: 1, height: 1},
            {x: 1, y: 0, width: 1, height: 1},
            {x: 1, y: 1, width: 1, height: 1},
            {x: 2, y: 0, width: 1, height: 1},
            {x: 2, y: 1, width: 1, height: 1},
            {x: 3, y: 0, width: 1, height: 1}];
        _.each(items, function(node) {
            grid.addWidget($('<div><div class="grid-stack-item-content"><dashup-container rows="2" cols="2" pos="2"></dashup-container></div><div/>'),
                node.x, node.y, node.width, node.height);
        }, this);
    });
});