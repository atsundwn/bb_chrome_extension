// Saves options to chrome.storage.sync.
function save_options() {
  var bool_autodetect = document.getElementById('autocheckbox').checked;
  var input_hostname = document.getElementById('inputhostname').value;
  chrome.storage.sync.set({
    useAutodetect: bool_autodetect,
    useHostname: input_hostname
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 1500);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
// Defined values are defaults.
function restore_options() {
  chrome.storage.sync.get({
    useAutodetect: true,
    useHostname: "bitbucket.org"
  }, function(items) {
    document.getElementById('autocheckbox').checked = items.useAutodetect;
    document.getElementById('inputhostname').value = items.useHostname;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);