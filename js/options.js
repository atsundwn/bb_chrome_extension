// Saves options to chrome.storage.sync.
function save_options() {
  var bool_usessl = document.getElementById('sslcheckbox').checked;
  var input_hostname = document.getElementById('inputhostname').value;
  chrome.storage.sync.set({
    useSSL: bool_usessl,
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
    useSSL: false,
    useHostname: "bitbucket.org"
  }, function(items) {
    document.getElementById('sslcheckbox').checked = items.useSSL;
    document.getElementById('inputhostname').value = items.useHostname;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);