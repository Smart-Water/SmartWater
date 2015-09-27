function logout() {
  $('#modalLogout').modal('show');
};

function confirmLogout() {
    window.location.href = '../session/sessionExit.php';
};
