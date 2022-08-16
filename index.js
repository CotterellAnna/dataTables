$(function() {
    let editBtn = `<button action="edit" type="button" style="background: #6841DB;" class= "edit-btn btn border-0 rounded-3 text-white me-2">Edit</button>`
    let deleteBtn = `<button class= "delete-btn btn btn-danger">Delete</button>`
    let buttons = `
    <div class = "btns d-flex">
        ${editBtn} ${deleteBtn}
    </div>
    `
    let table = $("#table_id").DataTable({
        columns: [
            { title: 'First Name' },
            { title: 'Last Name' },
            { title: 'Other Names' },
            { title: 'Email.' },
            { title: 'Phone Number' },
            { title: 'Action' }
        ],
    })
    $("#form").submit(function(e){
        e.preventDefault()
        // add a new row to table
        if($("#submit-btn").attr('action') == 'addRow'){
            table.row.add([$("#fName").val(), $("#lName").val(), $("#oNames").val(), $("#email").val(), $("#phone").val(), buttons]).draw()
            swal({
                title: "Great!",
                text: "Submitted successfully!",
                icon: "success",
            });  
        }
        // edit row on a table
        if($("#submit-btn").attr('action') == 'confirmEdit'){
            table.row($("#submit-btn").attr('rowindex')).data([$("#fName").val(), $("#lName").val(), $("#oNames").val(), $("#email").val(), $("#phone").val(), buttons]).draw();
            swal({
                title: "Great!",
                text: "Updated successfully!",
                icon: "success",
            });  
        }
        // empty all input fields on submit
        $("input").each(function(){
            $(this).val("")
        })

        // show the table after submit
        $("#myTab a[href='#table']").tab('show')
        
    })
    // delete selected row
    $("body").on('click', '.delete-btn', function () {
        table.row($(this).parents('tr')).remove().draw();
    })
    // edit selected row
    $('#table_id').on( 'click', '.edit-btn', function () {
        const row = table.row($(this).parents("tr"))
        $('#submit-btn').attr('rowindex', row.index())
        // change the action attribute of the submit-btn to "confirmEdit"
        $('#submit-btn').attr('action', 'confirmEdit')
        $("#fName").val(row.data()[0])
        $("#lName").val(row.data()[1])
        $("#oNames").val(row.data()[2])
        $("#email").val(row.data()[3])
        $("#phone").val(row.data()[4])
        $("#myTab a[href='#form-container']").tab('show')
    });
    $("#form-tab").click(function(){
        // change the action attribute of the submit-btn to "addRow"
        $("#submit-btn").attr('action', 'addRow')
        // empty the input fields
        $("input").each(function(){
            $(this).val("")
        })
    })
});