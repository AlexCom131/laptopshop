const $ = {}

function createModal(options) {
    const modal = document.createElement('div');
    modal.classList.add('cmodal');
  
    const overlay = document.createElement('div');
    overlay.classList.add('modal-overlay');
    overlay.dataset.close = 'true';
  
    const window = document.createElement('div');
    window.classList.add('modal-window');
  
    const header = document.createElement('div');
    header.classList.add('modal-header');
  
    const title = document.createElement('span');
    title.classList.add('modal-title');
    title.textContent = options.title;
  
    const body = document.createElement('div');
    body.classList.add('modal-body');
    body.innerHTML = options.content;
  
    header.append(title);
  
    if (options.closable) {
      const close = document.createElement('span');
      close.className = 'modal-close';
      close.dataset.close = 'true';
      close.textContent = '×';
    
      header.appendChild(close);
    }
    
    window.append(header, body);
    overlay.append(window);
    modal.append(overlay);
  
    document.body.appendChild(modal);
  
    return modal;
  }
  
  $.modal = function(options) {
    const modalElement = createModal(options);
    let isClosing = false;
  
    const modal = {
      open() {
        if (!isClosing) {
          modalElement.classList.add('open');
        }
      },
      close() {
        isClosing = true;
        modalElement.classList.remove('open');
        modalElement.classList.add('hide');
        modalElement.classList.remove('hide');
        isClosing = false;
      }
    };
  
    const listener = event => {
      if (event.target.dataset.close) {
        modal.close();
      }
    };
  
    modalElement.addEventListener('click', listener);
  
  function showPrewImg() {
    let filename = document.getElementById('imgfile').value.replace(/C:\\fakepath\\/, '');
    document.getElementById('imgprev').setAttribute('src', `img/${filename}`);
    
  }
  
  document.getElementById('imgfile').addEventListener('change', showPrewImg);
  
    modal.destroy = () => {
      modalElement.remove();
      modalElement.removeEventListener('click', listener);
      isDestroyed = true;
    };
  
    return modal;
  };
  
  