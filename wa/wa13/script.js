// 1

const employeesData = {
    employees: [
        { 
            "name": "Sam",
            "department": "Tech",
            "designation": "Manager",
            "salary": 40000,
            "raise eligible": true
        },
        {
            "name": "Mary",
            "department": "Finance",
            "designation": "Trainee",
            "salary": 18500,
            "raise eligible": true
        },
        {
            "name": "Bill",
            "department": "HR",
            "designation": "Executive",
            "salary": 21200,
            "raise eligible": false
        }
    ]
}

console.log("1:", employeesData);



// 2

const companyData = {
    "companyName": "Tech Stars",
    "website": "www.techstars.site",
    "employees": employeesData
}

console.log("2:", companyData);
console.log("Call problem3(); for the next part of this assignment. This is to prevent a weird thing where the earlier console logs would output the changed data rather than the initial data.");



// 3
function problem3() {
    const newEmployee = {
        "name": "Anna",
        "department": "Tech",
        "designation": "Executive",
        "salary": 25600,
        "raise eligible": false
    }

    employeesData.employees[3] = newEmployee;

    companyData.employees = employeesData.employees;

    console.log("3:", employeesData, companyData);
    console.log("Call problem4(); for the next part of this assignment.");
}



// 4

function problem4() {
    let salarySum = 0;

    for(const employee of employeesData.employees) {
        salarySum += employee.salary;
    }

    console.log("4:", salarySum);
    console.log("Call problem5(); for the next part of this assignment.");
}



// 5

function problem5() {
    raiseSalaries();
}

function raiseSalaries() {
    for(const employee of employeesData.employees) {
        if(employee["raise eligible"]) {
            employee.salary = employee.salary * 1.1;
            employee["raise eligible"] = false;
            console.log(`Raised salary of ${employee.name}.`);
        }
    }

    companyData.employees = employeesData.employees;

    console.log("5:", employeesData);
    console.log("Call problem6(); for the next part of this assignemnt.");
}



// 6

function problem6() {
    workingFromHome = ['Anna', 'Sam'];
    for(const employee of employeesData.employees) {
        employee.wfh = false;
        for(const name of workingFromHome) {
            if(employee.name == name) {
                employee.wfh = true;
            }
        }
    }

    companyData.employees = employeesData.employees;

    console.log("6:", employeesData);
}