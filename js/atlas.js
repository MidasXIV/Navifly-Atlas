$(document).ready(function () {



    $('.slick-carousel').slick({
        mobilefirst: true,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '10%',
        prevArrow: $('.top-arrow'),
        nextArrow: $('.bottom-arrow')
    });


    var config = {
        apiKey: "AIzaSyCuA2qR6PRrlVev8UkYeSuh19PhOrwHcXs",
        authDomain: "hivemind-mxiv.firebaseapp.com",
        databaseURL: "https://hivemind-mxiv.firebaseio.com",
        projectId: "hivemind-mxiv",
        storageBucket: "hivemind-mxiv.appspot.com",
        messagingSenderId: "468470961309"
    };

    firebase.initializeApp(config);
    //console.log(firebase); 
    var database = firebase.database();


    database.ref('ATLAS-Todo').once('value', function (snapshot) {
        if (snapshot.exists()) {
            snapshot.forEach(function (data) {
                var val = data.val();
                //console.log(val);
                //$('.todolist').append(val.context);
                var tempstr = val.context;
                var date1 = new Date(val.deadline);
                var date2 = new Date();
                var dd = date2.getDate();
                var mm = date2.getMonth() + 1; //January is 0!
                var yyyy = date2.getFullYear();

                if (dd < 10) {
                    dd = '0' + dd
                }

                if (mm < 10) {
                    mm = '0' + mm
                }

                date2 = new Date(mm + '/' + dd + '/' + yyyy);
                var timeDiff = Math.abs(date2.getTime() - date1.getTime());
                var sign = 'left';
                if (date2.getTime() - date1.getTime() > 0) {
                    sign = 'overdue';
                }
                var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                var tyu = '<small class="label label-danger"><i class="fa fa-clock-o" style="float:none;"></i>&nbsp; ' + diffDays + '  days ' + sign + '</small>';

                tempstr = tempstr.replace('7mxiv7', tyu);
                //console.log(tempstr.indexOf('7mxiv7'));

                //$('#mCSB_1_container').append(val.context);
                //console.log(tempstr);
                if(val.member == "AmanShaikh")
                {   $('#mCSB_1_container').append(tempstr); }
                else if(val.member == "YashodhanNaik")
                {   $('#mCSB_2_container').append(tempstr); }
                else if(val.member == "AkanshaDas")
                {   $('#mCSB_3_container').append(tempstr); }
                else if(val.member == "ShivankGupta")
                {   $('#mCSB_4_container').append(tempstr); }
                else if(val.member == "AshlynDsouza")
                {   $('#mCSB_5_container').append(tempstr); }
                else if(val.member == "Hrishikesh")
                {   $('#mCSB_6_container').append(tempstr); }
                    

            });
        }
    });

    $('.todolist').on('click', '.todo', function () {
        $(this).toggleClass('completed');
    });

    $('.todolist').on('click', 'span', function (event) {
        $(this).parent().fadeOut(1000, function () {
            $(this).remove();
            var tempstr = (this).innerHTML;
            //console.log(this);
            //console.log(tempstr);
            //console.log(tempstr.indexOf('</span>'));
            console.log(tempstr.substring(tempstr.indexOf('</span>') + 8, tempstr.indexOf('<small')));

            
            var qry = database.ref('ATLAS-Todo').orderByChild('keyword').equalTo(tempstr.substring(tempstr.indexOf('</span>') + 8, tempstr.indexOf('<small')));
            /*
            database.ref('ATLAS-Todo').orderByChild('keyword').once('child_added', function (snapshot) {
                if (snapshot.exists()) {
                    snapshot.forEach(function (data) {
                        var val = data.val();
                        console.log(val);
                    }
                                     )}
            });*/
            qry.once('value', function (snapshot) {
                snapshot.ref.remove();
                console.log("deleted");
            });

        });
        event.stopPropagation();
    });

    $('.todolistinp').on('keypress', function (event) {
        if (event.which == 13) {
            var input = $(this).val();
            console.log();
            var Member = (this).dataset.user;
            //console.log(document.getElementById("date-picker").value);
            var date1 = new Date(document.getElementById(Member+"-date-picker").value);
            var date2 = new Date();
            var dd = date2.getDate();
            var mm = date2.getMonth() + 1; //January is 0!
            var yyyy = date2.getFullYear();

            if (dd < 10) {
                dd = '0' + dd
            }

            if (mm < 10) {
                mm = '0' + mm
            }

            date2 = new Date(mm + '/' + dd + '/' + yyyy);
            var timeDiff = Math.abs(date2.getTime() - date1.getTime());
            var sign = 'left';
            if (date2.getTime() - date1.getTime() > 0) {
                sign = 'overdue';
            }
            var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
            var tyu = '<small class="label label-danger"><i class="fa fa-clock-o" style="float:none;"></i>&nbsp; ' + diffDays + '  days ' + sign + '</small>';
            //console.log(date1);
            //console.log(date2);
            //console.log(diffDays);
            //.todolist 
            var tempstr = '<li class="todo list-group-item"><span><i class="fa fa-trash"></i></span> ' + input + '' + tyu + '<h6 class="list-info"><span><i class="fa fa-clock" style="float:left;"></i></span>&nbsp;' + displayTime() + '</h6></li>';
            
            

            if(Member == "AmanShaikh")
            {   $('#mCSB_1_container').prepend(tempstr); }
            else if(Member == "YashodhanNaik")
            {   $('#mCSB_2_container').prepend(tempstr); }
            else if(Member == "AkanshaDas")
            {   $('#mCSB_3_container').prepend(tempstr); }
            else if(Member == "ShivankGupta")
            {   $('#mCSB_4_container').prepend(tempstr); }
            else if(Member == "AshlynDsouza")
            {   $('#mCSB_5_container').prepend(tempstr); }
            else if(Member == "Hrishikesh")
            {   $('#mCSB_6_container').prepend(tempstr); }
            //$('#mCSB_1_container').prepend('<li class="todo list-group-item"><span><i class="fa fa-trash"></i></span> ' + input + '' + tyu + '<h6 class="list-info"><span><i class="fa fa-clock" style="float:left;"></i></span>&nbsp;' + displayTime() + '</h6></li>');

            var todo_item = {};
            todo_item.context = '<li class="todo list-group-item"><span><i class="fa fa-trash"></i></span> ' + input + ' 7mxiv7' + '<h6 class="list-info"><span><i class="fa fa-clock" style="float:left;"></i></span>&nbsp;' + displayTime() + '</h6></li>';
            todo_item.timestamp = displayTime();
            todo_item.keyword = input;
            todo_item.deadline = document.getElementById(Member+"-date-picker").value;
            //console.log(this);
            console.log((this).dataset.user);
            todo_item.member = (this).dataset.user;
            var ref = database.ref('ATLAS-Todo');
            ref.push(todo_item);

            console.log(input);
            $(this).val('');
        }
    });

    $('.fa-plus').click(function () {
        $('.todolistinp').fadeToggle(1000);
    });

    function displayTime() {
        var str = "\t";
        var currentdate = new Date();
        var locale = "en-us";
        var month = currentdate.toLocaleString(locale, {
            month: "long"
        });
        var day = currentdate.getDate();
        var year = currentdate.getFullYear();
        var time = currentdate.toLocaleTimeString();

        return str += time + " " + day + " " + month + " " + year;
    }

});
