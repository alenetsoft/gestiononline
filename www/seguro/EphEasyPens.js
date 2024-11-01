var AnnoNascita = "";
var MeseNascita = "";
var AnnoNascitaCon = "";
var MeseNascitaCon = "";
var AnniContr = "";
var MesiContr = "";
var Cap = "";
var RedditoNow = "";
var Carriera = "";
var CatPrev = "";
var Sex = "";
var colGraph1 = ""
var colGraph2 = ""

var redditoMinimo = 2000;

var ResultVars = null;
var ResultValues = null;

var RedditoNetto;
var PensioneNetta;
var ConInflazione;
var CorrezDemogr;

function VerificaDati()
{
	GetDati();
	if (	MeseNascita == "" || 
			AnnoNascita == "" || 
			AnniContr == "" ||
			MesiContr == "" ||
			RedditoNow == "" ||
			Carriera == "" ||
			CatPrev == "" ||
			CatPrev == "0"
			)
		return "<b>Inserire tutte le informazioni.</b>";
	if (parseFloat(RedditoNow) < redditoMinimo)
		return "<b>Inserire un reddito di almeno " + redditoMinimo + " euro.</b>";
	return "";
}

function ReadSettings()
{
	var RedditoLordo = GetObj("input_lordi").value;
	if (RedditoLordo == "false")
		RedditoNetto = "true";
	else
		RedditoNetto = "false";
		
	var PensioneLorda = GetObj("output_lordi").value;
	if (PensioneLorda == "false")
		PensioneNetta = "true";
	else
		PensioneNetta = "false";
		
	ConInflazione = GetObj("output_reali").value;
	CorrezDemogr = GetObj("hasCorrezioneDemografica").value;
}

function SwitchFlag(quale)
{
	if (quale == "false")
		quale = "true";
	else
		quale = "false";
	return quale;
}

function SetFlags()
{
	var o1, o2, o3;
	
	o1 = document.getElementById("lblFlagRedditoNetto1")
	o2 = document.getElementById("lblFlagRedditoNetto2")
	if (RedditoNetto == "true")	
	{
		document.getElementById("lblRedditoOggi").innerHTML = "Reddito annuo netto";
		innerHtmlChange(o1, "netto");
		innerHtmlChange(o2, "(clicca qui per visualizzare i valori lordi)");
	}
	else
	{
		document.getElementById("lblRedditoOggi").innerHTML = "Reddito annuo lordo";
		innerHtmlChange(o1, "lordo");
		innerHtmlChange(o2, "(clicca qui per visualizzare i valori netti)");
	}
	
	o1 = document.getElementById("lblFlagPensioneNetto1")
	o2 = document.getElementById("lblFlagPensioneNetto2")
	if (PensioneNetta == "true")
	{
		innerHtmlChange(o1, "netto");
		innerHtmlChange(o2, "(clicca qui per visualizzare i valori lordi)");
	}
	else
	{
		innerHtmlChange(o1, "lordo");
		innerHtmlChange(o2, "(clicca qui per visualizzare i valori netti)");
	}
	
	o1 = document.getElementById("lblFlagInflazione1")
	o2 = document.getElementById("lblFlagInflazione2")
	o3 = document.getElementById("lblFlagInflazione3")
	if (ConInflazione == "true")	
	{
		innerHtmlChange(o1, "comprensivi");
		innerHtmlChange(o2, "non sono");
		innerHtmlChange(o3, "(clicca qui per visualizzare i risultati depurati dall'inflazione)");
	}
	else
	{
		innerHtmlChange(o1, "depurati");
		innerHtmlChange(o2, "sono");
		innerHtmlChange(o3, "(clicca qui per visualizzare i risultati comprensivi dell'inflazione)");
	}
	
	o1 = document.getElementById("lblFlagCorrezDemogr1")
	if (CorrezDemogr == "true")	
		innerHtmlChange(o1, "scontano");
	else
		innerHtmlChange(o1, "non scontano");
		
	if (Modified())
		Calcola();
}

function innerHtmlChange(obj, iHtml)
{
	if (obj != null)
		obj.innerHTML = iHtml;
}

function Modified() {
	var err = VerificaDati();
	if (err != "")
	{
		Risultati.innerHTML = err;
		return false;
	}
	else
	{
		Risultati.innerHTML = '<INPUT type="button" class="Bottone" value="Calcola" onclick="javascript:Calcola(\'\')">';
		return true;
	}
}

function CambiaData() {
    var Mese = GetComboValue("lstMesi");
    var Anno = GetComboValue("lstAnni");
    var Mese2 = GetComboValue("lstMesi2");
    var Anno2 = GetComboValue("lstAnni2");

    Calcola("01/" + Mese + "/" + Anno, "01/" + Mese2 + "/" + Anno2);
}

function Calcola(data, data2)
{
	Risultati.innerHTML = "<B>Calcolo in corso. Attendere prego ...</B>";
	GetDati();
	
	var calc_resource = GetObj("calc_resource").value;

	var url = calc_resource + "?" +
				"AnnoNascita=" + AnnoNascita + "&" +
				"MeseNascita=" + MeseNascita + "&" +
				"AnniContr=" + AnniContr + "&" +
				"MesiContr=" + MesiContr + "&" +
				"Cap=" + Cap + "&" +
				"RedditoNow=" + RedditoNow + "&" +
				"Carriera=" + Carriera + "&" +
				"CatPrev=" + CatPrev + "&" +
				"Sex=" + Sex + "&" +
				"FlagRedditoNetto=" + (RedditoNetto == "true" ? 1 : 0) + "&" +
				"FlagPensioneNetta=" + (PensioneNetta == "true" ? 1 : 0) + "&" +
				"FlagConInflazione=" + (ConInflazione == "true" ? 1 : 0) + "&" +
				"FlagCorrezDemogr=" + (CorrezDemogr == "true" ? 1 : 0) + "&" +
				"Data=" + data + "&" +
				"Data2=" + data2 + "&" +
				"AnnoNascitaCon=" + AnnoNascitaCon + "&" +
				"colGraph1=" + colGraph1 + "&" +
				"colGraph2=" + colGraph2 + "&" +
				"MeseNascitaCon=" + MeseNascitaCon;
				
	XRequest = getXMLHttpRequest();
	
	//Aggancio dell'evento per chiamata asincrona
	XRequest.onreadystatechange = Calcola_ReadyStateChange;
	
	//Apertura della richiesta in modalità asincrona (terzo param = true) 
	XRequest.open("GET", url, true);
	//Invio
	XRequest.send(null);

	//23/01/2013: nuova logica per kataweb del TrackingWrapper. Va posizionato al click del calcolo
	//Questo javascript è incluso su un server remoto kataweb
	try {
		var stringIdElemento = 'CalcoloPensione';
		if (!IsStringEmpty(pageHref))
			TrackingWrapper.sendGeneric(stringIdElemento, pageHref + "#" + stringIdElemento);
	}
	catch (e) { };
}
function IsStringEmpty(str) {
	if (str && str != '')
		return false;
	else
		return true;
}

function GraficoIndice(tt) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Label');
    data.addColumn('number', 'Value');
    data.addRows(1);
    data.setValue(0, 0, "indice");
    data.setValue(0, 1, tt);
    var chart = new google.visualization.Gauge(document.getElementById('divGauge1'));
    var options = {width: 120, height: 120, min: -25, max: 25,  greenFrom: 3, greenTo: 25, yellowFrom: 0, yellowTo: 3, redFrom: -25, redTo: 0,  minorTicks: 5};
    chart.draw(data, options);
}

function Calcola_ReadyStateChange()
{
	Risultati.innerHTML = "<B>Calcolo in corso, attendere...</B>";

	if (XRequest.readyState == XMLHTTPREQUEST_READY_STATE_COMPLETED)
	{
		try
		{
			var Result = XRequest.responseText;
			Risultati.innerHTML = Result;


			try {
			    var tt = parseFloat(document.getElementById("IndiceGrafico").value);
			    GraficoIndice(tt);
			}
			catch (exgraph) {
			}

        }
		catch (ex)
		{
		Risultati.innerHTML = "<B>"+ex.message+"... Riprovare...</B>";
		}
	}
}

function GetDati()
{
	Sex = GetComboValue("lstSex");
	MeseNascita = GetComboValue("lstMeseNascita");
	AnnoNascita = GetComboValue("lstAnnoNascita");
	try {
	    MeseNascitaCon = GetComboValue("lstMeseNascitaCon");
	    AnnoNascitaCon = GetComboValue("lstAnnoNascitaCon");
	}
	catch (e) {}

	AnniContr = GetComboValue("lstAnniContr");
	MesiContr = GetComboValue("lstMesiContr");
	try {
	    Cap = GetObj("txtCap").value;
	} catch (e) { }
	try {
	    colGraph1 = GetObj("cg1").value;
	    colGraph2 = GetObj("cg2").value;
	} catch (e) { }
	var reddito = GetObj("txtRedditoNow").value;
	reddito = reddito.replace('.','').replace(',','');
	RedditoNow = reddito;
	document.forms[0].elements["txtRedditoNow"].value = RedditoNow;
	Carriera = GetComboValue("lstCarriera");
	CatPrev = GetComboValue("lstCatPrev");
}

function GetComboValue(campo) {
try {
     var c = GetObj(campo)
    var n = c.selectedIndex;
    if (n < 0)	return "";
    return c.options[n].value;
   
} catch (e) {
    return "";
    
}

}

function GetObj(campo)
{
	try
	{
	return document.forms[0].elements[campo];
	}
	catch(ex)
	{
		return null;
	}
}

function INT(i)
{
	try
	{
	return parseInt(i, 10);
	}
	catch(ex)
	{
	}
	return 0;
}

function CheckAnzianita()
{
	var an = INT(AnnoNascita) + 15;
	var oggi = new Date().getFullYear();
	var maxAnz = oggi - an;
	
	var combo = GetObj("lstAnniContr");
	
	var actMaxAnz = combo.options.length -1;
	if (actMaxAnz == maxAnz)	return;
	
	if (actMaxAnz > maxAnz)
	{
		for(var x = maxAnz + 1; x <= actMaxAnz; x++)
			combo.remove(maxAnz + 1);
	}
	else
	{
		for(var x = actMaxAnz + 1; x <= maxAnz; x++)
		{
		var option = document.createElement("OPTION");
			option.text = x + " anni";
			option.value = x ;
			
		try
			{
				combo.add(option, null);
			}
			catch(ex)
			{
				// For IE.
				combo.add(option);
			}
		}
	}
}

