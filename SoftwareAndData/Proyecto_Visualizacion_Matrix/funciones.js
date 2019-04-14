
//START THE SECTION OF FUNCTIONS FOR THE RADIO BUTTONS
//THE EXTRA FUNCTIONS THAT APEAR IN THE CODE ARE PLACED IN funciones_auxiliares.js

//This functions call congruende processing and turn on or off the slider
//Function to call processing function that paint the lines in the screen
//the lines are painted from right to left
function CargarLineasIzquierdas(){
    var processingInstance;
    processingInstance = Processing.getInstanceById('CANVAS');
    if (document.getElementById("Congruencia").checked){
        processingInstance.drawCongruency(); 
         processingInstance.setCongruence(true);
        cantidadCongruentes = processingInstance.returnCongruentes(); 
        document.getElementById("CongruenceStatsValue").innerHTML = cantidadCongruentes;
        window.sessionStorage.setItem("Congruencia_M", true);
    }
    else{        
        document.getElementById("Congruencia").checked = false;
        processingInstance.setup();
        document.getElementById("CongruenceStatsValue").innerHTML = "0";
        VerificarChecks();
        window.sessionStorage.setItem("Congruencia_M", false);
    }
    
   
}

//It is a function to celan up the screen
//Clean the color of the nodes and the lines that exist in the canvas
function LimpiarCanvas(){
    var processingInstance;
    processingInstance = Processing.getInstanceById('CANVAS');    
    processingInstance.setup();
    document.getElementById("Splits").checked = false;
    document.getElementById("News").checked = false;
    document.getElementById("Congruencia").checked = false;    
    document.getElementById("Mergers").checked = false;
    document.getElementById("Moves").checked = false;
    document.getElementById("Renames").checked = false;
    document.getElementById("Exclusions").checked = false;
    document.getElementById("All").checked = false;
}

//A function to paint the new nodes
//This function search nodes in the right taxonomy that not exist in the left taxonomy
function pintarNuevos(){
    var processingInstance;
    processingInstance = Processing.getInstanceById('CANVAS');
    cantidadNuevos = 0;
    if (document.getElementById("News").checked){
        processingInstance.setNuevos(true);
        for (var nodeR = 1; nodeR < nodesRight.length; nodeR++){
            if (processingInstance.existeNombreNuevos(nodesRight[nodeR].name,nodesRight[nodeR].author)){
                var sinonimos = nodesRight[nodeR].Synonym;
                if (sinonimos.length == 0){
                    cantidadNuevos = cantidadNuevos+1;// it is a variable to save the amount of new nodes that exist                    
                }
                else{ //enter if exist Synonyms
                    var flag = false;
                    for (i=0;i<sinonimos.length;i++){
                        if (processingInstance.existeNombre(sinonimos[i])){//verify if exist a Synonym in the left taxonomy
                            flag = false;
                        }      
                        else{
                            flag = true;
                            break;
                        }
                    }
                    if (flag == false){
                        cantidadNuevos = cantidadNuevos+1;//variable to save de amount of new nodes that exist
                        document.getElementById(nodesRight[nodeR].name+"2").style.color ="#40FF00";
                    }
                }
                
            }
        }
        document.getElementById("NewStatsValue").innerHTML = cantidadNuevos;
        window.sessionStorage.setItem("Nuevos_M", true);
    }
    else{       
       document.getElementById("News").checked = false; 
       processingInstance.setNuevos(false);
       processingInstance.setup();
       document.getElementById("NewStatsValue").innerHTML = "0";
       VerificarChecks();
       window.sessionStorage.setItem("Nuevos_M", false);
    }
    
}


//This function is to paint the splits that exist in the taxonomy
//First we clean up both taxonomies with de for
//Then ckeck each node of the left taxonomy and search the name of this node in the Synonyms of the right taxonomy 
//A split exist if two or more nodes in the right taxonomy have as Synonym the name of the left node
function pintarSplits(){
    var processingInstance;
    processingInstance = Processing.getInstanceById('CANVAS');
    cantidadSplits = 0;
    if (document.getElementById("Splits").checked){
        processingInstance.drawSplits();
        processingInstance.setSplits(true);
        var arregloIzquierdos =  processingInstance.returnSplitsLeft();
        var arregloDerechos =  processingInstance.returnSplitsRight();
        cantidadSplits = processingInstance.returnAmountSplits(); 
        document.getElementById("SplitsStatsValue").innerHTML = cantidadSplits;
        window.sessionStorage.setItem("Splits_M", true);     
    }
   else{         
        document.getElementById("Splits").checked = false;        
        processingInstance.setup();
        processingInstance.setSplits(false);
        document.getElementById("SplitsStatsValue").innerHTML = "0";
        VerificarChecks();
        window.sessionStorage.setItem("Splits_M", false);
    }   
}

//This function is to get the mergers
//We check if the name of the Synonym in the left taxonomy exist as name of a node in the right taxonomy
function merge(){
    cantidadMergers = 0;
    var processingInstance;
    processingInstance = Processing.getInstanceById('CANVAS');
    if (document.getElementById("Mergers").checked){
        processingInstance.merge();
        processingInstance.setMerges(true);
        var izquierdos = processingInstance.returnIzquierdosMerge();
        cantidadMergers = processingInstance.returnCantidadMergers();
        var derechos = processingInstance.returnDerechosMerge();
        document.getElementById("MergesStatsValue").innerHTML = cantidadMergers;
        window.sessionStorage.setItem("Merges_M", true);        
    }
    else{
        document.getElementById("Mergers").checked = false;
        processingInstance.setup();
        document.getElementById("MergesStatsValue").innerHTML = "0";
        VerificarChecks();
        window.sessionStorage.setItem("Merges_M", false);
    }
}

//This is the principal function of move that call the radio Buttun
//Call the processing function  drawMoves with the flag with the value of false and the RGB colors
//Call with false beacause the  Rename_Move  algoritm is used to move and rename functions, so the flag y to identify the disctincts algoritms
//The move and rename function are different beacuase in the rename the parent are the same and in the move are different
function Move(){
    var processingInstance;
    processingInstance = Processing.getInstanceById('CANVAS');
    cantidadMoves = 0;
    if (document.getElementById("Moves").checked){
        processingInstance.drawMoves(false,108,27,232);
        var izquierdos = processingInstance.returnRename_MovesLeft();
        var derechos = processingInstance.returnRename_MovesRight();
        cantidadMoves = processingInstance.returnMoves();
         processingInstance.setMoves(true);  
         document.getElementById("MovesStatsValue").innerHTML = cantidadMoves;
         window.sessionStorage.setItem("Moves_M", true);     
    }
    else{
        document.getElementById("Moves").checked = false;
        processingInstance.setup();
         document.getElementById("MovesStatsValue").innerHTML = "0";
        VerificarChecks();
        window.sessionStorage.setItem("Moves_M", false);
    }
    
}

//This is the principal rename function that the radio button call
//This functions works as the move function but call the processing function with the flag with true value and RGB colors
function Rename(){
    cantidadRename = 0;
    var processingInstance;
    processingInstance = Processing.getInstanceById('CANVAS');
    if (document.getElementById("Renames").checked){
        processingInstance.drawMoves(true,8,138,8);
        var izquierdos = processingInstance.returnRename_MovesLeft();
        var derechos = processingInstance.returnRename_MovesRight();
        cantidadRename = processingInstance.returnRenames(); 
        processingInstance.setRenames(true); 
        document.getElementById("RenamesStatsValue").innerHTML = cantidadRename;
        window.sessionStorage.setItem("Renames_M", true);      
    }
    else{
        document.getElementById("Renames").checked = false;
        processingInstance.setup();
        document.getElementById("RenamesStatsValue").innerHTML = "0";
        VerificarChecks();
        window.sessionStorage.setItem("Renames_M", false);
    }  
}

//This function is to search the excluded nodes
//First we clean up the screen, lines and nodes
//Check one by one the nodes of the left taxonomy
//use the existeNombreDerecha function to check if exist the name of if exist in the synonyms
//if not exist we paint the nodes
function exclusiones(){
    var processingInstance;
    processingInstance = Processing.getInstanceById('CANVAS');
    cantidadEclusiones = 0;
    if (document.getElementById("Exclusions").checked){
        processingInstance.setExclusiones(true);
        for (node = 1;node < nodesLeft.length;node++){
            if (existeNombreDerecha(nodesLeft[node].name,nodesLeft[node].author,nodesLeft[node].record_scrutiny_date) == true){
                cantidadEclusiones = cantidadEclusiones+1;     
                document.getElementById("ExclusionStatsValue").innerHTML = cantidadEclusiones;  
                window.sessionStorage.setItem("Exclusions_M", true);         
            }
        }
    }
    else{
        processingInstance.setExclusiones(false);
        document.getElementById("Exclusions").checked = false;
        d3.select("#Canvas").selectAll("*").remove();
        document.getElementById("ExclusionStatsValue").innerHTML = "0";
        VerificarChecks();
        window.sessionStorage.setItem("Exclusions_M", false);
    }
}

//Function to show all the functionalities
function mostrarTodos(){
    if (document.getElementById("All").checked){
        document.getElementById("Splits").checked = true;
        pintarSplits();
        document.getElementById("News").checked = true;
        pintarNuevos();
        document.getElementById("Moves").checked = true;
        Move();        
        document.getElementById("Mergers").checked = true;
        merge();
        document.getElementById("Exclusions").checked = true;
        exclusiones();
        document.getElementById("Renames").checked = true;
        Rename();
        document.getElementById("Congruencia").checked = true;
        CargarLineasIzquierdas();
         window.sessionStorage.setItem("All_M", true);
         window.sessionStorage.setItem("Congruencia_M", true);
         window.sessionStorage.setItem("Nuevos_M", true);
         window.sessionStorage.setItem("Exclusions_M", true);
         window.sessionStorage.setItem("Renames_M", true);
         window.sessionStorage.setItem("Moves_M", true);
         window.sessionStorage.setItem("Merges_M", true);
         window.sessionStorage.setItem("Splits_M", true);
    }
    else{
        var processingInstance;
        processingInstance = Processing.getInstanceById('CANVAS');
        document.getElementById("SplitsStatsValue").innerHTML = "0";
        document.getElementById("MergesStatsValue").innerHTML = "0";
        document.getElementById("MovesStatsValue").innerHTML = "0";
        document.getElementById("RenamesStatsValue").innerHTML = "0";
        document.getElementById("ExclusionStatsValue").innerHTML = "0";
        document.getElementById("NewStatsValue").innerHTML = "0";
        document.getElementById("CongruenceStatsValue").innerHTML = "0"; 
        processingInstance.setNuevos(false);
        processingInstance.setExclusiones(false);
        LimpiarCanvas();
        window.sessionStorage.setItem("All_M", false);
         window.sessionStorage.setItem("Congruencia_M", false);
         window.sessionStorage.setItem("Nuevos_M", false);
         window.sessionStorage.setItem("Exclusions_M", false);
         window.sessionStorage.setItem("Renames_M", false);
         window.sessionStorage.setItem("Moves_M", false);
         window.sessionStorage.setItem("Merges_M", false);
         window.sessionStorage.setItem("Splits_M", false);
    }
    
}