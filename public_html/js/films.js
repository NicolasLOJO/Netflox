/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function getMyXml() {
    $.ajax({url: "http://netflox.my/xml/netflotXMLDocument.xml",
                            method : "get",
                            success: function (result) {
                                readData(result);
                            }

    }); 
};


function readData(myXml) {
    
    
    var film = myXml.getElementsByTagName("film");
    
    for ( var i = 0 ; i < film.length ; i++) {
        
        var item = document.getElementById("item");
        item.setAttribute("class", "bloc"+[i]);
        var clone = item.cloneNode(true);
        
        document.getElementById('nom').innerHTML = myXml.getElementsByTagName('nom')[i].childNodes[0].nodeValue;
        document.getElementById('realisateur').innerHTML = myXml.getElementsByTagName('realisateur')[i].childNodes[0].nodeValue;
        document.getElementById('dateSortie').innerHTML = myXml.getElementsByTagName('dateSortie')[i].childNodes[0].nodeValue;
        document.getElementById('resumer').innerHTML = myXml.getElementsByTagName('resumer')[i].childNodes[0].nodeValue;
        document.getElementById('genre').innerHTML = myXml.getElementsByTagName('genre')[i].childNodes[0].nodeValue;
        document.getElementById('Output').appendChild(clone);
        console.log();
        //console.log(genre[i]);
        //console.log(realisateur[i]);
        //console.log(dateSortie[i]);
    }
    
    console.log(myXml);
};

getMyXml();