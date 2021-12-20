window.onload = function () {
    document.getElementById('palindrome').oninput = palindromo;
    document.getElementById('num1').oninput = mayorQue;
    document.getElementById('num2').oninput = mayorQue;
    document.getElementById('vowels').oninput = buscarVocales;
    document.getElementById('counting_vowels').oninput = cuentaVocales;
    $recurso.innerHTML="https://mindicador.cl/api/dolar";
}

const vocales =["a", "e", "i", "o", "u"];

function palindromo(){
    let $frase = document.getElementById('palindrome').value;
    if(!$frase) return res1.innerHTML ="<br/>No introduciste ningún texto";
    let palabra=$frase.toLowerCase().replace(/ /g, "");
    let alReves=palabra.split("").reverse().join("");
    return (palabra===alReves)
     ?res1.innerHTML= `<br/>El texto ${$frase} es un palindromo`
     :res1.innerHTML =`<br/>El texto ${$frase} no es un palindromo`;
  }

function mayorQue() {
    let $num1 =Number(document.getElementById('num1').value);
    let $num2 =Number(document.getElementById('num2').value);
    if ($num1===$num2){
        res2.innerHTML=`Los números ${$num1} y ${$num1} son iguales`;
    }else if($num1>$num2){
        res2.innerHTML=`El ${$num1} es mayor que el ${$num2}`;
    }else{
        res2.innerHTML=`El ${$num2} es mayor que el ${$num1}`;
    }
}

 function buscarVocales(){
    let $cadena=document.getElementById('vowels').value;
    res3.innerHTML="";
    let cont=0;
    Array.from($cadena.toLowerCase()).forEach(element => {
        if(vocales.find(el=>el===element)){
            res3.innerHTML+=`${element} `;
            cont++;
        }
    });
    if (cont===0) res3.innerHTML="No hay vocales";
 }

 function cuentaVocales(){
    let $cadena= document.getElementById('counting_vowels').value;
    let contar={'a':0, 'e':0,'i':0,'o':0,'u':0  }
    res4.innerHTML="";
    Array.from($cadena.toLowerCase()).forEach(element =>{
        if(vocales.find(el=>el===element)) contar[element]++;
    });
    vocales.forEach(vocal => {
        res4.innerHTML+= `${vocal} ---- ${contar[vocal]} <br/>`
    })
 }


 function btnEnviar(){
    let initialTime = new Date();
    const xhr=new XMLHttpRequest(),
    $recurso=document.getElementById("recurso"),
    $cabeceras=document.getElementById("cabeceras"),
    $estados=document.getElementById("estados"),
    $contenidos=document.getElementById("contenidos"),
    $codigo=document.getElementById("codigo"),
    $fragment=document.createDocumentFragment();

    
    $cabeceras.innerHTML="";
    $estados.innerHTML="";
    $contenidos.innerHTML="";
    $codigo.innerHTML="";


    const valorEstados= ['UNSET', 'OPENED', 'HEADERS_RECEIVED', 'LOADING', 'DONE'];


    xhr.addEventListener("readystatechange", e=>{
        let finalTime = new Date();
        let miliseconds = finalTime - initialTime;

        //$estados.innerHTML=`${xhr.readyState} ${valorEstados[parseInt(xhr.readyState)-1]}`;
        $estados.innerHTML += xhr.readyState +" - [" + miliseconds + " ms.] " +
valorEstados[xhr.readyState] + "<br/>";
        if (xhr.readyState===4 && xhr.status===200){
            $cabeceras.innerHTML=` ${xhr.getAllResponseHeaders()}`;
            $contenidos.innerHTML=xhr.responseText;
        }
        $codigo.innerHTML=xhr.status + " " + xhr.statusText + "<br/>";
    });
    
        
   

    xhr.open("GET",$recurso.value);
    //xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
    xhr.send();
}
