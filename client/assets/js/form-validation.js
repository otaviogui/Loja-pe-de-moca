function clearErrors(form) {
  for (let item of form.querySelectorAll('.has-danger'))
    item.classList.remove('has-danger')

  for (let item of form.querySelectorAll('small'))
    item.remove()
}

function checkValidity(form) {
  clearErrors(form)

  let firstError = null

  for (let field of form) {
    if (field.willValidate && !field.checkValidity()) {
      if (!firstError) firstError = field
      const small = document.createElement('small')
      small.innerHTML = field.validationMessage
      small.className = 'form-control-feedback'
      field.parentElement.appendChild(small)
      field.parentElement.classList.add('has-danger')
    }
  }

  if (firstError) firstError.focus()
  return firstError === null
}