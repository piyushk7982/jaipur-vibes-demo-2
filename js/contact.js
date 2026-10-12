/* ===== CONFIGURATION =====
   1. Create a free form at https://formspree.io (or use another endpoint that accepts JSON POST).
   2. Paste the endpoint below, e.g. "https://formspree.io/f/abcdwxyz".
   Until configured, the form does NOT send email: it opens WhatsApp with the enquiry text instead. */
var FORM_ENDPOINT = "";
var WA_NUMBER = "919352203891";
(function(){
var f=document.getElementById('enq'),st=document.getElementById('fstatus');if(!f)return;
function err(el,m){var s=el.parentNode.querySelector('.err');if(s)s.textContent=m;if(m)el.setAttribute('aria-invalid','true');else el.removeAttribute('aria-invalid')}
function check(el){var v=el.value.trim(),m='';
 if(el.required&&!v)m='This field is required.';
 else if(el.name==='email'&&v&&!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v))m='Please enter a valid email address.';
 else if(el.name==='phone'&&v&&!/^\+?[0-9][0-9\s-]{8,14}$/.test(v))m='Please enter a valid phone number (9\u201315 digits).';
 err(el,m);return !m}
f.querySelectorAll('input,select,textarea').forEach(function(el){el.addEventListener('blur',function(){check(el)})});
f.addEventListener('submit',function(e){e.preventDefault();
 var ok=true,first=null;f.querySelectorAll('input:not(.hp),select,textarea').forEach(function(el){if(!check(el)){ok=false;if(!first)first=el}});
 if(!ok){st.textContent='Please correct the highlighted fields.';first.focus();return}
 if(f._gotcha&&f._gotcha.value)return;
 var d={};new FormData(f).forEach(function(v,k){d[k]=v});
 if(!FORM_ENDPOINT){
  var t='Hello Jaipur Vibes, enquiry from website.%0AName: '+encodeURIComponent(d.name)+'%0ABusiness: '+encodeURIComponent(d.business||'-')+'%0APhone: '+encodeURIComponent(d.phone)+'%0ARequirement: '+encodeURIComponent(d.requirement)+'%0ACategory: '+encodeURIComponent(d.category||'-')+'%0AQuantity: '+encodeURIComponent(d.quantity||'-')+'%0AMessage: '+encodeURIComponent(d.message);
  st.textContent='Opening WhatsApp so you can send your enquiry\u2026';window.open('https://wa.me/'+WA_NUMBER+'?text='+t,'_blank','noopener');return}
 var b=f.querySelector('button[type=submit]');b.disabled=true;st.textContent='Sending\u2026';
 fetch(FORM_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(d)})
 .then(function(r){if(!r.ok)throw 0;window.location.href='thank-you.html'})
 .catch(function(){b.disabled=false;st.textContent='Sorry, we could not send your enquiry. Please call or WhatsApp us on 93522 03891.'})
});
})();
