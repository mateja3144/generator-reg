var startReg = 'Windows Registry Editor Version 5.00<br/><br/>[HKEY_LOCAL_MACHINE\\\SOFTWARE\\\SYSTEM-1]<br/><br/>[HKEY_LOCAL_MACHINE\\\SOFTWARE\\\SYSTEM-1\\\Aliasy]<br/>"DefaultAlias"=""<br/>"AutoDefaultAlias"=dword:00000000<br/>';
var export32 = "";
var export64 = "";
var lista = "";
var bazy =["AUDYK", "ALD", "AGILE", "AIRJU", "BUD", "DIALO", "EUROE", "GGAUD", "GRUGU", "GGKAN", "GGCOR", "GLOBA", "LARXX", "MONTV", "ORION", "OGLFO", "OGLSE", "PENZI", "STLXX", "REBAU", "GRX", "RUTRO", "ROLFE", "WHEEL", "TJH2B", "TUMBL", "WRJSE", "TEST" ]
var ilosc = bazy.length - 1;

function genList(){
    for(var i=0; i<=ilosc; i++){
        lista = lista + '<input id="'+bazy[i]+'" type="checkbox">'+bazy[i]+' <br/>  '
    }
    document.getElementById("lista").innerHTML = lista;
}

function download (data, filename, type) {
    var file = new Blob([ data ], { type: type });
 
    if (window.navigator.msSaveOrOpenBlob) {
        return window.navigator.msSaveOrOpenBlob(file, filename);
    }
 
    var link = document.createElement("a");
    var url = URL.createObjectURL(file);
 
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
 
    link.click();
 
    setTimeout(function () {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);  
    }, 0);
}

/*function genList () {
    return bazy.map(function (baza) {
        var input = document.createElement('input');
        input.type = 'checkbox';
        input.id = baza;
 
        return input;
    }).reduce(function (prev, next) {
        return prev + '\n' + next.outerHTML;
    }, '');
*/

function exportList32(){
    export32 = startReg;
    for(var i=0; i<=ilosc; i++){
        var ptaszek = document.getElementById(bazy[i]).checked;
        if(ptaszek == true){
            export32 = export32 + '<br/>[HKEY_LOCAL_MACHINE\\\SOFTWARE\\\SYSTEM-1\\\Aliasy'+"\\"+''+bazy[i]+']<br/>"ServerAdres"="192.168.105.207:/home/bazy/'+bazy[i]+'/SYSTEM-1.S1B"<br/>';
        }
     }
    export32 = export32.replace(/<br\/>/g, '\n');
    download(export32, "aliasy32.reg", "text/plain");

}

function exportList64(){
    export64 = startReg;
    for(var i=0; i<=ilosc; i++){
       var ptaszek = document.getElementById(bazy[i]).checked;
       if(ptaszek == true){
            export64 = export64 + '<br/>[HKEY_LOCAL_MACHINE\\\SOFTWARE\\\Wow6432Node\\\System-1\\\Aliasy'+"\\"+''+bazy[i]+']<br/>"ServerAdres"="192.168.105.207:/home/bazy/'+bazy[i]+'/SYSTEM-1.S1B"<br/>';
       }                                           
    }
    export64 = export64.replace(/<br\/>/g, '\n');
    download(export64, "aliasy64.reg", "text/plain");
}







