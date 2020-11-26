function Log(txt,logdiv) {
	const ld = logdiv || document.getElementById('logdiv');
  if (txt) {
  	ld.innerHTML += txt + '<br/>';
  } else {
  	ld.innerHTML = '';
  }
} 
// function logMouseEnter() { log("enter") }
// function logMouseLeave() { log("&nbsp;&nbsp;&nbsp;onMouseLeave (react)") }

export default Log;