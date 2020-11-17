// pcm 20172018a Blackjack oop

let game = null;

function debug(an_object) {
    document.getElementById("debug").innerHTML = JSON.stringify(an_object);
}

function buttons_initialization(){
    document.getElementById("card").disabled     = false;
    document.getElementById("stand").disabled     = false;
    document.getElementById("new_game").disabled = true;
}

function finalize_buttons(){
    document.getElementById("card").disabled     = true;
    document.getElementById("stand").disabled     = true;
    document.getElementById("new_game").disabled = false;
}


//FUNÇÕES QUE DEVEM SER IMPLEMENTADOS PELOS ALUNOS
function new_game(){

    game = new BlackJack();
    game.gameStart = true;
    buttons_initialization();
    update_player();
    update_dealer();
    deckShow();
    dealer_new_card();
    setTimeout(() => {
        dealer_new_card(true);
    },2000)
    setTimeout(() => {
        game.gameStart = false;
        player_new_card();
    },4500)
    
    // dealer_new_card(true);
    // player_new_card();
    
    
    //debug(game);
    
}

function update_dealer(state){
    var points = game.get_cards_value(game.dealer_cards);
    console.log(points);
    var mostraCarta = "";
    for(var i = 0; i < game.dealer_cards.length; i++){
        if(game.dealer_cards[i].hidden === true && game.dealerTurn === false){
            mostraCarta += '<div id="dealer-card' + i + '" class="carta"><img class="image" src="./assets/back.png"/></div>';
            
       
        }
        else{
            mostraCarta += '<div id="dealer-card' + i + '" class="carta"><img class="image" src="./assets/' + game.dealer_cards[i].naipe + "-" + game.dealer_cards[i].valor + '.svg" /></div>';
        }
    }
    
    if(game.get_game_state().gameEnded === true){
        setTimeout(() => {
            finalize_buttons();
        if(game.get_game_state().dealerWon === false){
            showModal("Dealer lost");
            
        }

        else{
            showModal("Dealer won");
        }
            
        },3000)
       
    }

     //atualiza a string no elemento html associado ao dealer
     jQuery("#dealer").html(mostraCarta);
     var hiddenCard = jQuery('#dealer-card' + (game.dealer_cards.length - 1))
     if(hiddenCard.length){
        hiddenCard.css('visibility', 'hidden');
        var positionHidden = hiddenCard.offset();
        var positionBaralho = jQuery('#baralho').offset();
        animateCard(positionHidden.left - positionBaralho.left - 5, positionHidden.top - positionBaralho.top - 5, hiddenCard);
     }
}





function update_player(state){
    var mostraCarta = "";
    for(var i = 0; i < game.player_cards.length; i++){
        mostraCarta += '<div id="player-card' + i + '" class="carta"><img class="image" src="./assets/' + game.player_cards[i].naipe + "-" + game.player_cards[i].valor + '.svg" /></div>'
    }


    if(game.get_game_state().gameEnded === true){
        setTimeout(() => {
            finalize_buttons();
        if(game.get_game_state().dealerWon === false){
            showModal("Player won");
            
        }

        else{
            showModal("Player lost");
        }
            
        },2000)
        
       
    }

     //atualiza a string no elemento html associado ao dealer
     jQuery("#player").html(mostraCarta);
     var hiddenCard = jQuery('#player-card' + (game.player_cards.length - 1))
     if(hiddenCard.length){
        // console.log(hiddenCard);
        // console.log(hiddenCard.length);
        hiddenCard.css('visibility', 'hidden');
        var positionHidden = hiddenCard.offset();
        var positionBaralho = jQuery('#baralho').offset();
        animateCard(positionHidden.left - positionBaralho.left - 5, positionHidden.top - positionBaralho.top - 5, hiddenCard);
     }
     
}

function dealer_new_card(hidden = false){
    jQuery("#card").attr('disabled', true);
    jQuery("#stand").attr('disabled', true);
    game.dealer_move(hidden);
    update_dealer();
}

function player_new_card(){
    jQuery("#card").attr('disabled', true);
    jQuery("#stand").attr('disabled', true);
    game.player_move();
    update_player();
}

function dealer_finish(){
    
    game.setDealerTurn(true);
    update_dealer();
    while(game.get_game_state().gameEnded === false){
        dealer_new_card();
    }
    
}

//INTERFACE

function modalAction(){
    new_game()
    jQuery('#popup').modal('hide');
}

function showModal(texto){
    jQuery('#modalTexto').html(texto);
    jQuery('#popup').modal('show');
    
}

function deckShow(){
    var incrementCarta = "";
    
    for(i = game.deck.length;i >= 0 ;i--){
        console.log(i);
        incrementCarta += '<div id="card-'+ i + '" class="carta stack" style="transform:translate(' + i/3 + "px," + i/3 + 'px)" ><img class="image" src="./assets/back.png"/></div>';
    }
    jQuery('#baralho').html(incrementCarta);  
}

function animateCard(x, y, hiddenCard){
    var selectCard = jQuery('#card-0');
    selectCard.css('transform','translate('+ x + "px," + y + "px)");
    setTimeout(() => {
        hiddenCard.css('visibility', 'visible');
        selectCard.remove();
        deckShow();
        if(!game.gameStart && !game.get_game_state().gameEnded){
            jQuery("#card").attr('disabled', false);
            jQuery("#stand").attr('disabled', false);
        }
       
    },2000)
    
}
