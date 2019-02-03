$(function() {
    let options = {
        float: true,
        width: 4,
        height: 4,
        animate: true,
        always_show_resize_handle: true,
        disableResize: true,
        cellHeight: 110,
        verticalMargin: 18,
        horizontalMargin: 9,
        placeholder_class: 'grid-stack-placeholder',
        acceptWidgets: '.grid-stack-item'
    };
    $(document.querySelector('.grid-stack')).gridstack(_.defaults(options));
    $(document.querySelector('.grid-stack')).each(function() {
        let grid = $(this).data('gridstack');
        let items = [{x: 0, y: 0, width: 1, height: 1},
                     {x: 3, y: 0, width: 1, height: 1}];

        grid.addWidget($('<div>' +
                            '<div class="grid-stack-item-content">' +
                                '<stock-panel company="sap"></stock-panel>' +
                            '</div>' +
                         '<div/>'), items[0].x, items[0].y, items[0].width, items[0].height);

        grid.addWidget($('<div>' +
                            '<div class="grid-stack-item-content">' +
                                '<time-clock></time-clock>' +
                            '</div>' +
                         '<div/>'), items[1].x, items[1].y, items[1].width, items[1].height);

    });
});