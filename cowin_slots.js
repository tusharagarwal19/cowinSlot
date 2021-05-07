// Refer to ReadMe PAge, on how to run the script - https://github.com/tusharagarwal19/cowinSlot/README.md

var pincodes = ["122001"];
var dateArr = ["08-05-2021","09-05-2021","10-05-2021","11-05-2021","12-05-2021","13-05-2021","14-05-2021","15-05-2021","16-05-2021","17-05-2021","18-05-2021","19-05-2021","20-05-2021","21-05-2021","22-05-2021","23-05-2021","24-05-2021","25-05-2021","26-05-2021","27-05-2021","28-05-2021","29-05-2021","30-05-2021"];
var trialCounter = 1;

const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

async function fetchByPincode() {
    console.log("Check: ", trialCounter++);
    
    for (i=0;i < pincodes.length; i++) {
      for (j=0; j < dateArr.length; j++) {
        url = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByPin?pincode="+pincodes[i]+"&date="+dateArr[j];
        await sleepNow(1000);
        a = httpGet(url);
        try {
          a = JSON.parse(a)
        } catch(e) {
          continue;
        }
        for (c in a.centers) {
        for (s in a.centers[c].sessions) {
              if (a.centers[c].sessions[s].min_age_limit < 45 && a.centers[c].sessions[s].available_capacity > 0) {
                console.log("Trying Booking for", a.centers[c].pincode, a.centers[c].name, a.centers[c].sessions[s].available_capacity);
                var audio = new Audio('https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3');
                audio.play();
              }
          }
        }
      }
    }
    await sleepNow(10000);
    fetchByPincode();
}

console.log('Script Initialising');
fetchByPincode();
