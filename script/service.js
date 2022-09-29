
const API_PATH = 'https://reqres.in/api/users';


const getAllUsers = async () => {
    const tableBody = document.getElementById('bodyTableUsers');
    let rows = '';
    try {
        const response = await fetch(API_PATH);

        const { data } = await response.json();

        let count = 1;
        data.forEach((item) => {

            rows += `
            <tr id="user_${count}">
                <th scope="row">${count}</th>
                <td><img src="${item.avatar}" class="rounded float-start" alt="..."></td>
                <td>${item.first_name} ${item.last_name}</td>
                <td>${item.email}</td>
                <td>
                    <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#modalUpdate" onclick="findById(${item.id},user_${count})">
                        Actualizar
                    </button>
                </td>
            </tr>
            `;
            count++;

        })

    } catch (err) {

    }

    if (tableBody != null) {
        tableBody.innerHTML = rows;
    }

};

const registerUser = async () => {
    const tableBody = document.getElementById('bodyTableUsers');

    const nameValue = document.getElementById('nameInputRegister').value.trim();
    const lastNameValue = document.getElementById('lastNameInputRegister').value.trim();
    const emailValue = document.getElementById('emailInputRegister').value.trim();

    if (nameValue.length == 0 || emailValue.length == 0 || lastNameValue.length == 0) {
        alert('Debe ingresar información en los campos');
        return '';
    }

    const dataRegister = {
        first_name: nameValue,
        last_name: lastNameValue,
        avatar: 'https://reqres.in/img/faces/4-image.jpg',
        email: emailValue
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: dataRegister })
    };


    try {
        const response = await fetch(API_PATH, requestOptions);

        const { status } = response;


        if (status == 201) {
            const { data } = await response.json();
            const count = tableBody.getElementsByTagName('tr').length + 1;

            const row = `<tr id="user_${count}">
                <th scope="row">${count}</th>
                <td><img src="${data.avatar}" class="rounded float-start" alt="..."></td>
                <td>${data.first_name} ${data.last_name}</td>
                <td>${data.email}</td>
                <td>
                    <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#modalUpdate" onclick="findById(${data.id},user_${count})">
                        Actualizar
                    </button>
                </td>
            </tr>
            `;

            const newRow = tableBody.insertRow();
            newRow.innerHTML = row;
        }


    } catch (err) {
        console.log(`error on petition ${err}`);
    }


}

const findById = async (userId, rowId) => {
    const idValue = document.getElementById('idInputUpdate');
    const nameValue = document.getElementById('nameInputUpdate');
    const lastNameValue = document.getElementById('lastNameInputUpdate');
    const emailValue = document.getElementById('emailInputUpdate');
    const avatarValue = document.getElementById('avatarInputUpdate');

    document.getElementById('rowIdValue').value = rowId.id;

    idValue.value = 0;
    nameValue.value = '';
    lastNameValue.value = '';
    emailValue.value = '';

    try {
        const response = await fetch(`${API_PATH}/${userId}`);

        const { status } = response;

        if (status == 200) {
            const { data } = await response.json();
            idValue.value = data.id;
            nameValue.value = data.first_name;
            lastNameValue.value = data.last_name;
            emailValue.value = data.email;
            avatarValue.value = data.avatar;
        }


    } catch (err) {

    }
}

const updateUser = async () => {
    const idValue = document.getElementById('idInputUpdate').value;
    const nameValue = document.getElementById('nameInputUpdate').value;
    const lastNameValue = document.getElementById('lastNameInputUpdate').value;
    const emailValue = document.getElementById('emailInputUpdate').value;
    const rowIdValue = document.getElementById('rowIdValue').value;
    const avatarValue = document.getElementById('avatarInputUpdate').value;



    const rowTable = document.getElementById(rowIdValue);

    const dataRegister = {
        first_name: nameValue,
        last_name: lastNameValue,
        avatar: avatarValue,
        email: emailValue
    }

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: dataRegister })
    };


    try {
        const response = await fetch(`${API_PATH}/${idValue}`, requestOptions);

        const { status } = response;

        if (status == 200) {
            const { data } = await response.json();

            const row = `<tr id="${rowIdValue}">
                <th scope="row">${rowIdValue.replace('user_','')}</th>
                <td><img src="${data.avatar}" class="rounded float-start" alt="..."></td>
                <td>${data.first_name} ${data.last_name}</td>
                <td>${data.email}</td>
                <td>
                    <button type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#modalUpdate" onclick="findById(${idValue},${rowIdValue})">
                        Actualizar
                    </button>
                </td>
            </tr>
            `;

            rowTable.innerHTML = row;

        }

    } catch (err) { }

}