$(function () {
    // $("#mySelect").append("<option value='Value'>Text</option>");
    axios.get('/api/getAllDate')
        .then((response) => {
            console.log(response);
            let dataSelect = response.data;
            for (i in dataSelect) {
                $("#mySelect").append('<option value=' + '" ' + dataSelect[i] + '"' + '>' + dataSelect[i] + '</option>');
            }

            $('select').selectOrDie({
                onChange: function () {
                    var temp =  $(this).val().trim()
                    axios.post('/api/getKindNum', {
                        date: temp,
                    }).then(function (response) {
                        console.log(response);
                        var myData3 = response.data;
                        Highcharts.chart('container3', {
                            chart: {
                                plotBackgroundColor: null,
                                plotBorderWidth: null,
                                plotShadow: false,
                                type: 'pie'
                            },
                            title: {
                                text: '7天全国各天气情况占比分布'
                            },
                            tooltip: {
                                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
                                style: {"fontSize":"14px"}
                            },
                            plotOptions: {
                                pie: {
                                    allowPointSelect: true,
                                    cursor: 'pointer',
                                    dataLabels: {
                                        enabled: false
                                    },
                                    showInLegend: true
                                }
                            },
                            series: [{
                                name: '占比',
                                colorByPoint: true,
                                data: myData3
                            }]
                        });
                    }).catch(function (error) {
                            console.log(error);
                        });
                }
            });
        }).catch(function (error) {
            console.log(error);
        });

});