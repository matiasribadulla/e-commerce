document.getElementById("btn").addEventListener("click", function(event) {
  event.preventDefault(); // Evitar el envío automático del formulario

  var username = document.getElementById("emailinput").value;
  var password = document.getElementById("password").value;

  if (username === "" || password === "") {
      alert("Credenciales incorrectas. Por favor, inténtalo de nuevo.");
  } else {
      location.replace("index.html");
  }
});