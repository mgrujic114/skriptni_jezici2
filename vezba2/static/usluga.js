window.addEventListener("load", function(){
	//sadrzaj funkcije koja ce se pozvati kada browser proglasi stranicu ucitanom
//tj DOM tree potpuno formiranim

    document.getElementById("forma").addEventListener("submit", function(){
        var validno  = true;

        if(document.getElementById("naziv").value.length < 3 ){
            validno=false;
            document.getElementById("naziv").classList.remove("success")
            document.getElementById("naziv").classList.add("error");
        }
        else {
            document.getElementById("naziv").classList.remove("error")
            document.getElementById("naziv").classList.add("success");
        }
        
        if (!validno) event.preventDefault();
        else sacuvaj();
        
        return validno;
    });

    document.getElementById("forma").addEventListener("click", function(){
        var validno  = true;

        if(document.getElementById("naziv").value.length < 3 ){
            validno=false;
            document.getElementById("naziv").classList.remove("success")
            document.getElementById("naziv").classList.add("error");
        }
        else {
            document.getElementById("naziv").classList.remove("error")
            document.getElementById("naziv").classList.add("success");
        }
        
        return validno;
    });

    document.getElementById("naziv").addEventListener("keypress", function(){
        this.classList.remove('success'); 
        this.classList.remove('error'); 
    });

    document.getElementById("dodaj-opciju").addEventListener("click", function(){
        var id = document.getElementById("spisak-opcija").value;
        if(!id){
            alert("Izaberi opciju");
            return;
        }
        dodajOpciju( id );
    });

    document.getElementById("nazad").addEventListener("click", function () {
        window.history.back(); // This goes back to the previous page
    });

});

function dodajOpciju(id){ 
    document.querySelector(`#spisak-opcija > option[value='${id}']`).disabled = true;
    document.getElementById("spisak-opcija").selectedIndex = 0;

    var naziv = document.querySelector(`#spisak-opcija > option[value='${id}']`).innerHTML;

    var span = document.createElement("span");
    span.classList.add("badge");
    span.classList.add("bg-secondary");
    span.dataset.id = id;
    span.innerHTML = naziv;
    
    var button = document.createElement("button");
    button.type="button";
    button.classList.add("btn");
    button.classList.add("btn-default");
    button.classList.add("btn-sm");
    button.innerHTML = "X";

    span.appendChild(button);
    document.getElementById("opcije").appendChild(span);

    button.addEventListener("click", function(){  
        var id = this.parentNode.dataset.id;
        this.parentNode.parentNode.removeChild( this.parentNode );

        document.querySelector(`#spisak-opcija > option[value='${id}']`).disabled = false;
      });
}

  function sacuvaj(){
    var spanovi = document.querySelectorAll("#opcije > span.badge");
        var niz = [];
        for(let i=0; i<spanovi.length; i++){
            niz.push(spanovi[i].dataset.id);
         }
        
        var jsonNiz = JSON.stringify(niz);
        var hiddenInput = document.getElementById("opcije-input");
        hiddenInput.value = jsonNiz;
    
        console.log("Vrednost skrivenog input polja: " + hiddenInput.value);
  }