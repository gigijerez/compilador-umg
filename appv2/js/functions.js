console.log("-----INIT DECLARE VARIABLES -----")
var file = document.getElementById("fileForUpload"),
    txtarea = document.getElementById("fileContents"),
    produccion = [],
    grammar = [],
    grammar1 = [],
    arrayOfLines = [],
    allVariables = [],
    preProd = [],
    prod2d = [],
    prod = [],
    preTerminales = [],
    terminales2 = [],
    terminales = [],
    termBit = [],
    txtvariables = document.getElementById("variables"),
    txtterminales = document.getElementById("terminales"),
    uniqueProd = [],
    uniqueVari = [],
    uniqueTerm = [],
    caracteres = [],
    tabla = '',
    result = {},
    fun1 = [],
    produk = [],
    bita = [],
    fPrimero = [],
    fSiguiente = [],
    funcSig = [],
    // regExp = /\-([^-]+)\-/, 
    // regExp2 = /\-([^-])\-/g,
    regExp = /\~([^~]+)\~/,
    regExp2 = /\~([^~])\~/g,
    regExp3 = /\~([^~]*)\~$/g,
    regexVar = /\d/g;
    console.log("-----END DECLARE VARIABLES -----")

function load() {
    console.log("-----INIT function load() -----")
    file.value = ''; //for IE11, latest Chrome/Firefox/Opera...
    txtarea.innerHTML = "Contenido del archivo...";
    grammar = [];
    arrayOfLines = [];
    allVariables = [];
    preProd = [];
    prod2d = [];
    prod = [];
    preTerminales = [];
    terminales2 = [];
    terminales = [];
    uniqueProd = [];
    uniqueVari = [];
    uniqueTerm = [];
    caracteres = [];
    document.addEventListener('contextmenu', event => event.preventDefault());
    console.log("-----END function load() -----")
}




function rst() {
    console.log("-----INIT function rst() -----")
    location.reload(true);
    if (document.getElementById("runbtn").disabled = true)
        document.getElementById("runbtn").disabled = false;
    console.log("-----END function rst() -----")
}




function limpiarlista(nomlista) {
    console.log("-----INIT function limpiarlista() -----")
    varroot = document.getElementById(nomlista);
    while (varroot.firstChild) {
        varroot.removeChild(varroot.firstChild);
    }
    console.log("-----END function limpiarlista() -----")
}




function notificar() {
    console.log("-----INIT function notificar() -----")
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    console.log("-----END function notificar() -----")
}




function processFile() {
    console.log("-----INIT function processFile() -----")
    var file = document.getElementById("fileForUpload").files[0];
    if (file) {
        var reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = function (evt) {
            var contents = evt.target.result;
            txtarea.innerHTML = contents;
            notificar();
        }
        reader.onerror = function (evt) {
            txtarea.innerHTML = "error reading file";
        }
    }
    document.getElementById("runbtn").disabled = false;
    console.log("-----END function processFile() -----")
}




function sum(num) {
    console.log("-----INIT function sum() -----")
    if (num === 0) {
        return 0;
    } else {
        console.log("-----END function sum() -----")
        return `num -> ${num + sum(--num)}`
    }
}




function primero(el, listaVar) {
    console.log("-----INIT function primero() -----")

    var funcPrim = [];
    if (el in result) {
        for (var j in result[el]) {
            var elemento = result[el][j].charAt(0);
            var largo = result[el][j].length;
            var element = "";
            for (var k = 0; k < largo; k++) {
                element += result[el][j].charAt(k);
            }
            if (listaVar.includes(elemento)) {
                funcPrim = primero(elemento, listaVar);
            }
            else if ((terminales2.includes(elemento)) && (elemento != 'e')) {
                funcPrim.push(elemento);
                if (result[el].includes('e')) {
                    funcPrim.push('e');
                }
            }
            else if (terminales2.includes(element)) {
                funcPrim.push(element);
                if (result[el].includes('e')) {
                    funcPrim.push('e');
                }
            }
        }
    }
    else {

    }
    var nFuncPrim = [...new Set(funcPrim)]
    if (nFuncPrim.includes("e")) {
        var posE = nFuncPrim.indexOf("e");

        nFuncPrim.splice(posE, 1);
        nFuncPrim.push("e");
    }

    console.log("-----END function primero() -----")
    return nFuncPrim;
}




function siguiente(el, listaVar) {
    console.log("-----INIT function siguiente() -----")
    

    
    if (el in result) {
        for (var i in result) {
            if ((funcSig[el] == null) || (funcSig[el] == undefined) || (funcSig[el] == "")) {
                funcSig[el] = [];
            }
            for (var j in result[i]) {
                var pCadena = result[i][j].indexOf(el);

                if (pCadena != -1) {
                    var pCadena2 = pCadena + 1;
                    var subToken = result[i][j].substring(pCadena2);
                    if (!isNaN(subToken)) {
                        subToken = subToken.substring(1);
                    }
                    if (terminales2.includes(subToken[0])) {
                        funcSig[el].push(subToken[0], "$");
                    }
                    else if (((subToken[0] == null) || (subToken[0] == "")) && (i != el)) {
                        if (Array.isArray(funcSig[el]) && funcSig[el].length) {

                        } else {
                            funcSig[el] = funcSig[i];
                        }
                    }
                    else if (((subToken[0] == null) || (subToken[0] == "")) && (i == el)) {

                    } else if (listaVar.includes(subToken[0])) {
                        var sigVar = subToken[0];
                        if (!isNaN(subToken[1])) {
                            sigVar = subToken.substring(0, 2);
                        }
                        var posSigVar = listaVar.indexOf(sigVar);
                        if (sigVar == i) {

                        } else {
                            funcSig[el] = fPrimero[posSigVar].concat(siguiente(sigVar, listaVar));
                        }
                    }
                }
            }
        }
    }
    if (funcSig[el].includes("e")) {
        var posE = funcSig[el].indexOf("e");
        funcSig[el].splice(posE, 1);
    }
    console.log("-----END function siguiente() -----")
    return funcSig[el];
}




function run() {
    console.log("-----INIT function run() -----")
    document.getElementById("runbtn").disabled = true;
    var txtarea = document.getElementById("fileContents");
    grammar1 = txtarea.value;
    grammar = grammar1.replace(/ /g, "");


    arrayOfLines = grammar.split('\n');

    allVariables = [];
    for (var i = 0; i < arrayOfLines.length; i++) {
        var pos = arrayOfLines[i].indexOf("=");
        allVariables[i] = arrayOfLines[i].slice(0, pos);
        // console.log(prod[i]+" array "+[i]);
    }

    for (var i = 0; i < arrayOfLines.length; i++) {
        var pos = arrayOfLines[i].indexOf("=");

        preProd[i] = arrayOfLines[i].substring(pos + 1);

    }

    for (var i = 0; i < preProd.length; i++) {
        prod2d[i] = preProd[i].split("|");
    }


    for (var i = 0; i < prod2d.length; i++) {
        prod = prod.concat(prod2d[i]);
    }

    caracteres = allVariables.concat("e", "", " ", null);
    for (var i = 0; i < prod.length; i++) {
        preTerminales[i] = prod[i].replace(/'/g, "~");
        terminales = terminales.concat(regExp.exec(preTerminales[i]));
        terminales = terminales.concat(regExp2.exec(preTerminales[i]));
        terminales = terminales.concat(regExp3.exec(preTerminales[i]));

    }

    terminales = terminales.filter((el) => !caracteres.includes(el));

    for (var i = 0; i < terminales.length; i++) {
        terminales2 = terminales2.concat(terminales[i]);
    }

    var ter3 = [];
    for (var i = 1; i <= terminales2.length; i = i + 2) {
        ter3.push(terminales2[i]);
    }
    terminales2 = ter3;

    uniqueTerm = [...new Set(terminales2)];


    uniqueTerm = uniqueTerm.filter((el) => !caracteres.includes(el));
    terminales2 = uniqueTerm;
    termBit = terminales2.concat("$");



    //REMUEVE "'" DENTRO DE LOS ARRAYS
    produccion = prod2d;
    for (var i in produccion) {
        for (var j in produccion[i]) {
            produccion[i][j] = produccion[i][j].replace(/'/g, "")
        }
    }


    console.log("Produccion:",produccion);


    //Result pasa a hacer un objeto y se pierde la 'a' 
    allVariables.forEach((variable, i) => result[variable] = produccion[i]);





    var isRecursive = []
    var newProd = {}

    for (let i = 0; i < allVariables.length; i++) {
        if (isRecursive[i] == undefined) {
            isRecursive[i] = []
        }
        for (let j = 0; j < produccion[i].length; j++) {
            if (produccion[i][j].startsWith(allVariables[i])) {
                isRecursive[i].push(true)
            } else {
                isRecursive[i].push(false)
            }
        }
    }

    // INIT PROCESO DE PRIMAS
    for (let i = 0; i < allVariables.length; i++) {
        for (let j = 0; j < produccion[i].length; j++) {
            var varPrima = allVariables[i] + '1'
            //es recursiva? si
            if (isRecursive[i].includes(true)) {
                var removeR = ''
                if (newProd[allVariables[i]] == undefined) {
                    newProd[allVariables[i]] = []
                }
                if (newProd[varPrima] == undefined) {
                    newProd[varPrima] = []
                }

                if (isRecursive[i][j] == true) {
                    removeR = produccion[i][j].replace(allVariables[i], '')
                    removeR += ' ' + varPrima
                    newProd[varPrima].push(removeR)
                } else {
                    removeR = produccion[i][j]
                    removeR += ' ' + varPrima
                    newProd[allVariables[i]].push(removeR)
                    // console.log('Variable Prima recursiva ' + varPrima);
                }
                // console.log(allVariables[i] + ' si es recursiva');
            } else {
            //no es recursiva
            newProd[allVariables[i]] =_.compact(_.uniq(_.concat(newProd[allVariables[i]],produccion[i])));
            }
        }
        if (newProd[varPrima] != undefined && !newProd[varPrima].includes('e')) {
            newProd[varPrima].push('e')
        }

    }
    // END PROCESO DE PRIMAS
    console.log("********* VALIDATE PRIMA")
    validatePrima = {}
    
    var arrayKeyNewProd = [...new Set(allVariables)]
    console.log(arrayKeyNewProd);

    for(var i = 0; i < arrayKeyNewProd.length; i++ ){
        if(_.has(newProd,arrayKeyNewProd[i]+1)){

            var arrayResult = _.get(newProd,arrayKeyNewProd[i])
            for (let j = 0; j < arrayResult.length; j++) {

                if(arrayResult[j].includes(arrayKeyNewProd[i]+1)){
                    console.log("SI TIENE")
                    console.log(newProd[arrayKeyNewProd[i]][j]);  

                }else{
                    console.log("NO TIENE")
                    newProd[arrayKeyNewProd[i]][j] +=" "+arrayKeyNewProd[i] + 1
                    console.log(newProd[arrayKeyNewProd[i]][j]);                    
                }                
            }
        }
    }
    
    


    for (let i = 0; i < produccion.length; i++) {
    
    }

    // INIT PROCESO RENDER GRAMATICA SIN RECURSIVIDAD TEXTAREA
    console.log("isRecursive:",isRecursive);

    console.log('---New Prod Json---');
    console.log("newProd:",newProd);
    var gramNoReAllVariables = Object.keys(newProd)
    var sinRText = ""
    var sinRVari
    for (let index = 0; index < gramNoReAllVariables.length; index++) {
        sinRText += gramNoReAllVariables[index] + '= ' + newProd[gramNoReAllVariables[index]].join(" | ") + "\n"
    }
    var terminalesSinR = uniqueTerm;
    var gramNoRecursiveTxt = sinRText;
    terminalesSinR.forEach(t => {
        gramNoRecursiveTxt = gramNoRecursiveTxt.replaceAll(t, "'" + t + "'")
    });
    console.log('gramNoRecursiveTxt:', gramNoRecursiveTxt);
    document.getElementById("sinRContent").innerHTML = gramNoRecursiveTxt
    // END PROCESO RENDER GRAMATICA SIN RECURSIVIDAD TEXTAREA

    
    showArrays(gramNoRecursiveTxt, gramNoReAllVariables);
    console.log("-----END function run() -----")
}




function primeroSiguiente(gramNoRecursiveTxt, gramNoReAllVariables) {
    console.log("-----INIT function primeroSiguiente() -----")



    grammar = gramNoRecursiveTxt.replace(/ /g, "");


    arrayOfLines = _.compact(grammar.split('\n'));

    allVariables = gramNoReAllVariables;

    

    for (var i = 0; i < arrayOfLines.length; i++) {
        var pos = arrayOfLines[i].indexOf("=");
        // var posP =arrayOfLines[i].indexOf("|");
        preProd[i] = arrayOfLines[i].substring(pos + 1);
        // console.log(terminales[i]+" array "+[i]);
    }
    // console.log(preProd);
    for (var i = 0; i < preProd.length; i++) {
        prod2d[i] = preProd[i].split("|");
        // console.log(terminales[i]+" array "+[i]);
    }

    // console.log(prod2d);
    prod = []
    for (var i = 0; i < prod2d.length; i++) {
        prod = prod.concat(prod2d[i]);
    }
    // console.log(prod);
    caracteres = allVariables.concat("e", "", " ", null);
    preTerminales = []
    terminales = []
    for (var i = 0; i < prod.length; i++) {
        preTerminales[i] = prod[i].replace(/'/g, "~");
        terminales = terminales.concat(regExp.exec(preTerminales[i]));
        terminales = terminales.concat(regExp2.exec(preTerminales[i]));
        terminales = terminales.concat(regExp3.exec(preTerminales[i]));

    }

    terminales = terminales.filter((el) => !caracteres.includes(el));

    terminales2 = []
    for (var i = 0; i < terminales.length; i++) {
        terminales2 = terminales2.concat(terminales[i]);
    }

    var ter3 = [];
    for (var i = 1; i <= terminales2.length; i = i + 2) {
        ter3.push(terminales2[i]);
    }
    terminales2 = ter3;

    uniqueTerm = [...new Set(terminales2)];


    uniqueTerm = uniqueTerm.filter((el) => !caracteres.includes(el));
    terminales2 = uniqueTerm;
    termBit = terminales2.concat("$");

    produccion = prod2d;
    for (var i in produccion) {
        for (var j in produccion[i]) {
            produccion[i][j] = produccion[i][j].replace(/'/g, "")
        }
    }
    console.log(produccion);
    allVariables.forEach((variable, i) => result[variable] = produccion[i]);

    showArrays2(gramNoReAllVariables);
    console.log("-----END function primeroSiguiente() -----")
}




function showArrays2(uniqueVari) {
    console.log("-----INIT function showArrays2() -----")

    
    var arrayTerminals = terminales2;
    arrayTerminals.push("$");
    console.log("**Funcion Primero")
    for (var i in uniqueVari) {
        fPrimero.push(primero(uniqueVari[i], uniqueVari));
    }
    console.log("**Funcion Siguiente")
    for (var i in uniqueVari) {
        fSiguiente.push(siguiente(uniqueVari[i], uniqueVari));
    }
    // fSiguiente = funcSig;
    for (var i in uniqueVari) {
        produk.push(["", "", "", "", "", "", "", ""])
        for (var j in fPrimero[i]) {
            var termi = fPrimero[i][j];
            var posic = arrayTerminals.indexOf(termi);
            if (posic != -1) {
                produk[i][posic] = `${allVariables[i]} → ${produccion[i][j]}`;
                if (produk[i][posic].includes("undefined")) {
                    produk[i][posic] = `${allVariables[i]} → ${produccion[i][j - 1]}`;
                }
            }
            else {
                for (var k in fSiguiente[i]) {
                    var varia = fSiguiente[i][k];
                    var poss = arrayTerminals.indexOf(varia);
                    if (poss != -1) {
                        produk[i][poss] = `${allVariables[i]} → ${produccion[i][j]}`;
                        var sitio = produk[i].length - 1;
                        produk[i][sitio] = `${allVariables[i]} → ${produccion[i][j]}`;
                    }
                }
            }

        }
    }

    for (var i in produk) {
        for (var j in produk[i]) {
            if (!produk[i][j].length) {
                produk[i][j] = "";
            }
        }
    }

    var prueba = ["$"];
    var cadenita = "hola";
    var caden = cadenita.split("");
    caden = caden.reverse();
    for (var i in caden) {
        prueba.unshift(caden[i]);
    }


    var tablaFun = '';
    for (var i in uniqueVari) {
        tablaFun += '<tr class="mdc-data-table__row"><td class="mdc-data-table__cell">PRIMERO(<span class="colores">' + uniqueVari[i] + '</span>):</td><td class="mdc-data-table__cell"><span class="llaves">{</span> ' + fPrimero[i] + ' <span class="llaves">}</span></td></tr>';
    }
    document.getElementById("funPrimero").innerHTML = tablaFun;




    var tablaSig = '';
    for (var i in uniqueVari) {
        tablaSig += '<tr class="mdc-data-table__row"><td class="mdc-data-table__cell">SIGUIENTE(<span class="colores">' + uniqueVari[i] + '</span>):</td><td class="mdc-data-table__cell"><span class="llaves">{</span> ' + fSiguiente[i] + ' <span class="llaves">}</span></td></tr>';
    }
    document.getElementById("funSiguiente").innerHTML = tablaSig;


    var headSym = '<tr class="mdc-data-table__row"><td></td>';
    for (var i in terminales2) {
        headSym += '<td>' + terminales2[i] + '</td>';
    }
    document.getElementById("symHeader").innerHTML = headSym;

    var tablaSim = '';
    for (var i in uniqueVari) {
        tablaSim += '<tr class="mdc-data-table__row"><td class="mdc-data-table__cell">' + uniqueVari[i] + '</td>';
        for (var j in produk[i]) {
            tablaSim += '<td>' + produk[i][j] + '</td>';
        }
        tablaSim += '</tr>';
    }
    document.getElementById("symTable").innerHTML = tablaSim;
    console.log("-----END function showArrays2() -----")
}




function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
    
}




function showArrays(gramNoRecursiveTxt, gramNoReAllVariables) {
    console.log("-----INIT function showArrays() -----")
    // console.log(allVariables);
    uniqueVari = [...new Set(allVariables)];
    console.log('SinRKey', gramNoReAllVariables);
    console.log('OrigiVar', uniqueVari);
    var str = '<ul id="lvar">';
    uniqueVari.forEach(function (item) {
        str += '<li>' + item + '</li>';
    });
    str += '</ul>';
    
    // RENDERIZA LA COLUMNA VARIABLES
    txtvariables.innerHTML += str;

    var str2 = '<ul id="lter">';
    terminales2.forEach(function (item) {
        str2 += '<li>' + item + '</li>';
    });
    str2 += '</ul>';


    // RENDERIZA LA COLUMNA TERMINALES
    txtterminales.innerHTML += str2;
    var produk1 = [];
    for (var i in prod2d) {
        for (var j in prod2d[i]) {
            produk1.push(`${allVariables[i]}→${prod2d[i][j]}`);
            tabla += '<tr class="mdc-data-table__row"><td class="mdc-data-table__cell">' + allVariables[i] + '</td><td class="mdc-data-table__cell">' + prod2d[i][j].replace(/'/g, "") + '</td></tr>';
        }
    }
    // RENDERIZA LA COLUMNA PRODUCCIONES
    document.getElementById("producciones").innerHTML = tabla;

    var arrayTerminals = terminales2;
    arrayTerminals.push("$");
    if (arrayEquals(uniqueVari, gramNoReAllVariables)) {
        console.log('Iguales');
        for (var i in uniqueVari) {
            fPrimero.push(primero(uniqueVari[i], uniqueVari));
        }
        for (var i in uniqueVari) {
            fSiguiente.push(siguiente(uniqueVari[i], uniqueVari));
        }
        // fSiguiente = funcSig;
        for (var i in uniqueVari) {
            produk.push(["", "", "", "", "", "", "", ""])
            for (var j in fPrimero[i]) {
                var termi = fPrimero[i][j];
                var posic = arrayTerminals.indexOf(termi);
                if (posic != -1) {
                    produk[i][posic] = `${allVariables[i]} → ${produccion[i][j]}`;
                    if (produk[i][posic].includes("undefined")) {
                        produk[i][posic] = `${allVariables[i]} → ${produccion[i][j - 1]}`;
                    }
                }
                else {
                    for (var k in fSiguiente[i]) {
                        var varia = fSiguiente[i][k];
                        var poss = arrayTerminals.indexOf(varia);
                        if (poss != -1) {
                            produk[i][poss] = `${allVariables[i]} → ${produccion[i][j]}`;
                            var sitio = produk[i].length - 1;
                            produk[i][sitio] = `${allVariables[i]} → ${produccion[i][j]}`;
                        }
                    }
                }
                // console.log(termi);
                // console.log(posic);
            }
        }

        for (var i in produk) {
            for (var j in produk[i]) {
                if (!produk[i][j].length) {
                    produk[i][j] = "";
                }
            }
        }

        var prueba = ["$"];
        var cadenita = "hola";
        var caden = cadenita.split("");
        caden = caden.reverse();
        for (var i in caden) {
            prueba.unshift(caden[i]);
        }
        // console.log(prueba);

        // console.log(produk);
        // console.log('Funcion PRIMERO');
        // console.log(fPrimero);

        var tablaFun = '';
        for (var i in uniqueVari) {
            tablaFun += '<tr class="mdc-data-table__row"><td class="mdc-data-table__cell">PRIMERO(<span class="colores">' + uniqueVari[i] + '</span>):</td><td class="mdc-data-table__cell"><span class="llaves">{</span> ' + fPrimero[i] + ' <span class="llaves">}</span></td></tr>';
        }
        document.getElementById("funPrimero").innerHTML = tablaFun;

        // console.log('Funcion SIGUIENTE');

        // for (var i in uniqueVari){
        //     fSiguiente.push(siguiente(uniqueVari[i]));
        // }
        // console.log(fSiguiente);


        var tablaSig = '';
        for (var i in uniqueVari) {
            tablaSig += '<tr class="mdc-data-table__row"><td class="mdc-data-table__cell">SIGUIENTE(<span class="colores">' + uniqueVari[i] + '</span>):</td><td class="mdc-data-table__cell"><span class="llaves">{</span> ' + fSiguiente[i] + ' <span class="llaves">}</span></td></tr>';
        }
        document.getElementById("funSiguiente").innerHTML = tablaSig;
        // document.getElementById("funSiguiente").style.visibility = "visible";
        // const found = prod2d[3][0].indexOf('T');
        // console.log(found);

        var headSym = '<tr class="mdc-data-table__row"><td></td>';
        for (var i in terminales2) {
            headSym += '<td>' + terminales2[i] + '</td>';
        }
        document.getElementById("symHeader").innerHTML = headSym;

        var tablaSim = '';
        for (var i in uniqueVari) {
            tablaSim += '<tr class="mdc-data-table__row"><td class="mdc-data-table__cell">' + uniqueVari[i] + '</td>';
            for (var j in produk[i]) {
                tablaSim += '<td>' + produk[i][j] + '</td>';
            }
            tablaSim += '</tr>';
        }
        document.getElementById("symTable").innerHTML = tablaSim;
    } else {
        console.log('Diferentes');
        primeroSiguiente(gramNoRecursiveTxt, gramNoReAllVariables);
    }

    console.log("-----END function showArrays() -----")
}
// document.getElementById('fileForUpload').addEventListener('change', run, false);
