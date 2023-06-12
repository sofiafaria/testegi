const queryDropdown = document.querySelector('.query-dropdown');

async function loadQueryDropdown(){
    const categories = await getCategories();

    categories.forEach(category =>{
        const queryEl = document.createElement('option');
        queryEl.value = category.id;
        queryEl.innerText = category.name;

        queryDropdown.appendChild(queryEl);
    });
    queryDropdown.children[0].selected = true;
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
      .forEach(function (form) {
        form.addEventListener('submit', function (event) {
          if (!form.checkValidity()) {
            event.preventDefault()
            event.stopPropagation()
          }
  
          form.classList.add('was-validated')
        }, false)
      })
  })()

loadQueryDropdown();