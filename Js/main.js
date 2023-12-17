let form = document.querySelector(".form input"),
    form_control = document.querySelectorAll(".form-control"),
    error_msg = document.querySelectorAll(".error_msg"),
    firstname_input = document.querySelector(".FirstName"),
    secondname_input = document.querySelector(".SecondName"),
    age_input = document.querySelector(".Age"),
    position_input = document.querySelector(".Position"),
    employees_details = document.querySelector(".employees_details"),
    employee_container = document.querySelector(".container"),
    employee = document.querySelector(".employee"),
    add_button = document.querySelector(".add"),
    submit_button = document.querySelector(".submit"),
    employees_array = [];

// Create Operation : 

add_button.onclick = () => {
    MessageError();
    if (firstname_input.value != "", secondname_input.value != "", age_input.value != "", position_input.value != "") {
        EmployeesArray(firstname_input.value, secondname_input.value, age_input.value, position_input.value);
        ResetValues();
    }
}

function EmployeesArray(firstname, secondname, age, position) {
    let employee =
    {
        id: Date.now(),
        Firstname: firstname,
        Secondname: secondname,
        Age: age,
        Position: position,
        Edited: false
    }
    employees_array.push(employee)
    DisplayEmployeesArray(employees_array);
    CreateStorage(employees_array);
}

// Display Items :

function DisplayEmployeesArray(employees_array) {
    employee_container.innerHTML = "";
    employees_array.forEach((employee) => {
        employee_container.innerHTML +=
            `
    <div class="employee row">
        <div class="employee_firstname col-lg-2 col-md-1">${employee.Firstname}</div>
        <div class="employee_lastname col-lg-2 col-md-1">${employee.Secondname}</div>
        <div class="employee_age col-lg-3 col-md-1">${employee.Age}</div>
        <div class="employee_position col-lg-3 col-md-1">${employee.Position}</div>
        <button class="btn btn-warning edit" onclick="EditEmployee(${employee.id})"><i class='fa fa-edit'></i></button>
        <button class="btn btn-danger  del" onclick="DeleteEmployee(${employee.id})"><i class='fa fa-remove'></i></button>
    </div>    
        `
    })
}

// Delete operation : 
function DeleteEmployee(employee_id) {
    if (confirm("Are you sure")) {
        employees_array = employees_array.filter((ele) => ele.id !== employee_id)
        DisplayEmployeesArray(employees_array)
        CreateStorage(employees_array)
    }
}

// Edit operation : 

function EditEmployee(employee_id) {
    for (let i = 0; i < employees_array.length; i++) {
        if (employees_array[i].id === employee_id) {
            firstname_input.value = employees_array[i].Firstname;
            secondname_input.value = employees_array[i].Secondname;
            age_input.value = employees_array[i].Age;
            position_input.value = employees_array[i].Position;
            employees_array[i].Edited = true;
            DisplayEmployeesArray(employees_array);
            CreateStorage(employees_array)
            if (employees_array[i].Edited === true) {
                add_button.style.display = "none";
                submit_button.style.visibility = "visible";
                submit_button.onclick = () => {
                    MessageError()
                    employees_array[i].Firstname = firstname_input.value
                    employees_array[i].Secondname = secondname_input.value
                    employees_array[i].Age = age_input.value
                    employees_array[i].Position = position_input.value
                    employees_array[i].Edited = false;
                    add_button.style.display = "block";
                    submit_button.style.visibility = "hidden";
                    ResetValues();
                    DisplayEmployeesArray(employees_array);
                    CreateStorage(employees_array)
                }
            }
        }
    }
}

// Create local storage :

function CreateStorage(employees_array) {
    localStorage.setItem("employee", JSON.stringify(employees_array));
}

function GetFromStorage() {
    let employees = JSON.parse(localStorage.getItem("employee"));
    if (employees) {
        employees_array = employees;
    }
    DisplayEmployeesArray(employees_array);
}
GetFromStorage()


function ResetValues() {
    firstname_input.value = ""
    secondname_input.value = ""
    age_input.value = ""
    position_input.value = ""
    error_msg.forEach((msg) => {
        msg.innerHTML = "";
    })
}

function MessageError() {
    for (let i = 0; i < form_control.length; i++) {
        if (form_control[i].value.trim().length == 0) {
            for (let j = i; i < error_msg.length; i++) {
                error_msg[j].style.visibility = "visible";
                break;
            }
        }
        if (form_control[i].classList.contains("Age")) {
            if (isNaN(form_control[i].value.trim())) {
                error_msg[i].style.visibility = "visible";
                error_msg[i].innerHTML = "Please Enter numbers"
                return fasle;
            }
        }

    }
}
