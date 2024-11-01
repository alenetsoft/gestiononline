//
// Define a list of Microsoft XML HTTP ProgIDs.
//
var XMLHTTPREQUEST_MS_PROGIDS = new Array(
  "Msxml2.XMLHTTP.7.0",
  "Msxml2.XMLHTTP.6.0",
  "Msxml2.XMLHTTP.5.0",
  "Msxml2.XMLHTTP.4.0",
  "MSXML2.XMLHTTP.3.0",
  "MSXML2.XMLHTTP",
  "Microsoft.XMLHTTP"
);

//
// Define ready state constants.
//
var XMLHTTPREQUEST_READY_STATE_UNINITIALIZED = 0;
var XMLHTTPREQUEST_READY_STATE_LOADING       = 1;
var XMLHTTPREQUEST_READY_STATE_LOADED        = 2;
var XMLHTTPREQUEST_READY_STATE_INTERACTIVE   = 3;
var XMLHTTPREQUEST_READY_STATE_COMPLETED     = 4;

//
// Returns l'oggetto XMLHttpRequest.
//
function getXMLHttpRequest()
{
  var httpRequest = null;

  // Create the appropriate HttpRequest object for the browser.
  if (window.XMLHttpRequest != null)
    httpRequest = new window.XMLHttpRequest();
  else if (window.ActiveXObject != null)
  {
    // Must be IE, find the right ActiveXObject.
    var success = false;
    for (var i = 0;
         i < XMLHTTPREQUEST_MS_PROGIDS.length && !success;
         i++)
    {
      try
      {
        httpRequest = new ActiveXObject(XMLHTTPREQUEST_MS_PROGIDS[i]);
        success = true;
      }
      catch (ex)
      {}
    }
  }

  // Display an error if we couldn't create one.
  if (httpRequest == null)
    alert("Error in HttpRequest():\n\n"
      + "Impossible creare l'oggetto XMLHttpRequest.");

  // Return it.
  return httpRequest;
}
// Usage:
 var XRequest = null;
