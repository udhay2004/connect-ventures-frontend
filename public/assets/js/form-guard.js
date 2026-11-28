// Spam protection for the site's forms (checked by middleware/spamGuard.js in
// the backend). Adds a hidden "honeypot" field to every form, which people
// never see but form-filling bots do, and records when the page opened.
// Each form's submit code adds window.cvGuard(form) to its JSON payload.
(function () {
  var t0 = Date.now();

  function addHoneypot(form) {
    if (form.querySelector('[data-cv-hp]')) return;
    var box = document.createElement('div');
    box.setAttribute('aria-hidden', 'true');
    box.style.cssText = 'position:absolute;left:-10000px;top:auto;width:1px;height:1px;overflow:hidden;';
    box.innerHTML = '<label>Leave this field empty <input type="text" name="cv_extra" data-cv-hp tabindex="-1" autocomplete="off"></label>';
    form.appendChild(box);
  }

  function init() {
    Array.prototype.forEach.call(document.querySelectorAll('form'), addHoneypot);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  window.cvGuard = function (form) {
    var hp = form && form.querySelector('[data-cv-hp]');
    return { _hp: hp ? hp.value : '', _t: Date.now() - t0 };
  };
})();
