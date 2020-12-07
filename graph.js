TESTER = document.getElementById('chart');
function getData() {
    return Math.random();
}
    Plotly.plot(TESTER,[{
        y:[getData()],
        type:'line'
}]);