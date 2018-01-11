/**
 * Created by Ricardo on 14/03/2017.
 */

var picUrl_base = location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + "/rest_server/getPicture?pic_name=";

var loadedAlbumTable = false;
var whatDidYouCall;
var rows = [];

$(document).ready(function () {

    console.log('ready');

});


$('#loaderModal').on('shown.bs.modal', function () {

    var modalToCall;

    switch (whatDidYouCall) {
        case 0:
            var t = $('#albumTable').DataTable({
                columnDefs: [
                    {"width": "5%", "targets": 0},
                    {"width": "30%", "targets": 1},
                    {"width": "30%", "targets": 2},
                    {"width": "30%", "targets": 3},
                    {"width": "5%", "targets": 4}
                ]
            });

            for (var i = 0; i < albums.length; i++) {

                rows.push([
                    albums[i].id,
                    albums[i].title,
                    '<div class="tableArtist">' + albums[i].artist + '</div>',
                    albums[i].genre,
                    albums[i].approved == true ? '<li class="glyphicon glyphicon-ok" />' : '<li class="glyphicon glyphicon-remove" />'
                ]);

            }
            t.rows.add(
                rows
            ).draw(false);

            modalToCall = '#albumListModal';


            $('#albumTable tbody ').on('click', 'tr > td > .tableArtist', function () {
                //alert('Row index: ' + this.innerText);
                t.search(this.innerText).draw();
            });

            break;
    }

    $('#loaderModal').modal('hide');
    $(modalToCall).modal();


});

$('.glyphicon-globe').on('click', function () {

    if (loadedAlbumTable == false) {
        whatDidYouCall = 0;
        loadedAlbumTable = true;
        $('#loaderModal').modal();
    }
    else {
        $('#albumListModal').modal();
    }

});
