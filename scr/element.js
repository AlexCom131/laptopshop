const modal = $.modal({
  closable: true,
  content: `
    <div class="modal-form text_headwrapper">
      <label for="producer">Назва ноутбука:</label><br>
      <select id="producer" producer="producer" class="modal-form-field">
        <option value="ACER">ACER</option>
        <option value="ASUS">ASUS</option>
        <option value="Lenovo">Lenovo</option>
        <option value="HP">HP</option>
        <option value="APPLE">APPLE</option>
      </select>

      <br><br>

      <label for="procesor">Процесор</label><br>
      <select id="procesor" procesor="procesor" class="modal-form-field">
        <option value="Intel Core i3">Intel Core i3</option>
        <option value="Intel Core i5">Intel Core i5</option>
        <option value="Intel Core i7">Intel Core i7</option>
        <option value="Intel Core i9">Intel Core i9</option>
        <option value="Intel Core i11">Intel Core i11</option>
        <option value="Intel Core i13">Intel Core i13</option>
        <option value="AMD Ryzen 3">AMD Ryzen 3</option>
        <option value="AMD Ryzen 5">AMD Ryzen 5</option>
        <option value="AMD Ryzen 7">AMD Ryzen 7</option>
        <option value="AMD Ryzen 9">AMD Ryzen 9</option>
      </select>

      <br><br>

      <label for="volume">Діагональ</label><br>
      <input type="volume" id="volume" producer="volume" min="10,1" max="20" class="modal-form-field" placeholder="..."/>

      <br><br>

      <label for="pzp" class="textModal">Пам'ять</label> <label for="ozp" class="TextModal1">ОЗУ</label><br>
      <select id="pzp" producer="pzp" class="modal-form-select"> 
        <option value="SSD">SSD</option>
        <option value="HDD">HDD</option>
      </select>
      <select id="ozp" producer="ozp" class="modal-form-select">
        <option value="8">8</option>
        <option value="12">12</option>
        <option value="16">16</option>
        <option value="32">32</option>
      </select>

      <br><br>

      <div id="img-prev-section">
        <img id="imgprev" src="">
      </div><br>
      <label for="file" id="label-select-img">Виберіть фото ноутбука:</label><br>
      <input type="file" id="imgfile" name="imgfile">
      
      <br><br>

      <button id="submitbtn" class="black-button"></button>
    </div> 
  `,
});

function buildElement(id, elem) {
  const element = document.createElement('p');
  element.className = 'element';
  element.innerHTML = `
    <img src="img/${elem.imeg}" class="element-img">
    <span> <strong>${elem.producer} ${elem.procesor}</strong></span> 
    <p><span class="textBlod">${elem.volume}, ${elem.pzp}, ${elem.ozp}GB</span></p>
    <button class="black-button" id="edit" onclick="modalToEdit(${id})">Edit</button><span> </span>
    <button class="red-button" onclick="removeFromLS(${id})">Delete</button>
    <p></p>
  `;
  document.querySelector('.displayzone').appendChild(element);
}


function modalToCreate() {
  document.querySelector('.modal-title').innerText = 'Додати ноутбук';
  document.getElementById('submitbtn').addEventListener('click', addToLS);
  document.getElementById('submitbtn').innerText = 'Створити';
  document.getElementById('producer').value = ' ';   
  document.getElementById('procesor').value = 0; 
  document.getElementById('volume').value = ' ';   
  document.getElementById('pzp').value = 0; 
  document.getElementById('ozp').value = 0;
  document.getElementById('img-prev-section').style.display = 'none';
  document.getElementById('label-select-img').innerText = 'Select image file:';
  modal.open();
}

function modalToEdit(id) {
  document.querySelector('.modal-title').innerText = 'Редагувати ноутбук';
  document.getElementById('submitbtn').innerText = 'Оновити';
  document.getElementById('submitbtn').addEventListener('click', () => editInLS(id));
  let edElem = JSON.parse(localStorage.getItem(id));
  document.getElementById('producer').value = edElem.producer;   
  document.getElementById('procesor').value = edElem.procesor; 
  document.getElementById('volume').value = edElem.volume;   
  document.getElementById('pzp').value = edElem.pzp; 
  document.getElementById('ozp').value = edElem.ozp;   
  document.getElementById('imgprev').setAttribute('src', `img/${edElem.imeg}`);
  document.getElementById('label-select-img').innerText = 'You can choose another image file:';
  document.getElementById('img-prev-section').style.display = 'block';
  modal.open();
}

function showDemoImg() {
  let filename = document.getElementById('imgfile').value.replace(/C:\\fakepath\\/, '');
  document.getElementById('imgprev').setAttribute('src', `img/${filename}`);
  document.getElementById('label-select-img').innerText = 'You can choose another image file:';
  document.getElementById('img-prev-section').style.display = 'block';
}

document.getElementById('imgfile').addEventListener('change', showDemoImg);

function validData() {
  let valid=true;
  let showMsg='';
  let formProd = document.getElementById('producer').value.trim();
  let formProc = document.getElementById('procesor').value.trim();
  let formPzp = document.getElementById('pzp').value.trim();
  let formOzp = document.getElementById('ozp').value.trim();
  let formVolume = document.getElementById('volume').value.trim();

  if (!formProd) {
    showMsg = 'Не вказано компанію ноутбука. Без неї робота не може бути викона.';
    valid = false;
  }
  if (!formVolume) {
    showMsg = 'Не вказано діагональ ноутбука. Без неї робота не може бути викона. ';
    valid = false;
  } else if (+formVolume > 25) {
    showMsg = 'Введена діагональ ноутбука завелика. Будь ласка введіть діагональ ще раз.';
    valid = false;
  } else if (+formVolume < 10) {
    showMsg = 'Введена діагональ ноутбука замала.Будь ласка введіть діагональ ще раз.';
    valid = false;
  }
  if (!formProc) {
    showMsg = 'Не вказано процесор ноутбука. Без нього робота не може бути викона.';
    valid = false;
  }
  if (!formPzp) {
    showMsg = 'Не вказано тип п"яті ноутбука. Без неї робота не може бути викона.';
    valid = false;
  }
  if (!formOzp) {
    showMsg = 'Не вказано оперативну пам^ять ноутбука. Без неї робота не може бути викона.';
    valid = false;
  }

  if (valid) {
    return valid;
  } else {
    alert(showMsg);
  }
}

function validImg() {
  if (document.getElementById('imgfile').value) {
    return true;
  } else {
    alert('Будь ласка виберіть зображення ноутбука.');
    return false;
  }
}

function addToLS() {
  if (validData() && validImg()) {
    let keyArr = Array.from(Object.keys(localStorage), Number);
    const freeKey = Math.max(...keyArr) + 1;
    let filename = document.getElementById('imgfile').value.replace(/C:\\fakepath\\/, '');
    const newElement = {
      producer: document.getElementById('producer').value,
      procesor: document.getElementById('procesor').value,
      volume: document.getElementById('volume').value,
      pzp: document.getElementById('pzp').value,
      ozp: document.getElementById('ozp').value,
      imeg: filename,
    };
    localStorage.setItem(`${freeKey}`, JSON.stringify(newElement));
    modal.close();
    setTimeout(() => location.reload(), 1000);
  }
}

function editInLS(id) {
  if (validData()) {
    let edElem = JSON.parse(localStorage.getItem(id));
    edElem.producer = document.getElementById('producer').value;
    edElem.procesor = document.getElementById('procesor').value;
    edElem.volume = document.getElementById('volume').value;
    edElem.pzp = document.getElementById('pzp').value;
    edElem.ozp = document.getElementById('ozp').value;
    if (document.getElementById('imgfile').value) {
      let filename = document.getElementById('imgfile').value.replace(/C:\\fakepath\\/, '');
      edElem.imeg = filename;
    }
    localStorage.setItem(`${id}`, JSON.stringify(edElem));
    modal.close();
    setTimeout(() => location.reload(), 1000);
  }
}

function removeFromLS(id) {
  if (confirm('Are you sure you want to delete?')) {
    localStorage.removeItem(id);
    location.reload();
  }
}

for (let k = 0; k < localStorage.length; k++) {
  let keyName = localStorage.key(k);
  let row = JSON.parse(localStorage.getItem(keyName));
  buildElement(keyName, row);
}