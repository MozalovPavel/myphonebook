app.filter('objectFilter', function () {
    return function (list, filterString) {
        if (!filterString || filterString.length === 0) {
            return list;
        }

        // console.log(list);
        console.log(filterString);

        return list.filter(function (item) {
            var keys = Object.keys(item);
            return keys.some(function (key) {
                return item[key].indexOf(filterString) === 0;
            });
        });
    };
});
