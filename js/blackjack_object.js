// pcm 20172018a Blackjack object

//constante com o número máximo de pontos para blackJack
const MAX_POINTS = 21;
var dealer_point;
var player_point;



// Classe BlackJack - construtor
class BlackJack {
    constructor() {
        // array com as cartas do dealer
        this.dealer_cards = [];
        // array com as cartas do player
        this.player_cards = [];
        // variável booleana que indica a vez do dealer jogar até ao fim
        this.dealerTurn = false;

        this.gameStart = false;

        // objeto na fora literal com o estado do jogo
        this.state = {
            'gameEnded': false,
            'dealerWon': false,
            'playerBusted': false
        };

        //métodos utilizados no construtor (DEVEM SER IMPLEMENTADOS PELOS ALUNOS)
        this.new_deck = function () {
            //11, 12 e 13 representam respetivamente rei valete e dama e 1 sendo o ás
            var valores = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13"];
            var naipes = ["DIAMOND", "SPADE", "CLUB", "HEART"];
            var deck = new Array();
            for(var i = 0; i < valores.length; i++){
                for(var j = 0; j < naipes.length; j++){
                    var card = {valor : valores[i], naipe : naipes[j]};
                    deck.push(card);
                }
            }
            
            return deck;
        };

        this.shuffle = function (deck) {
            
            var new_baralho = [];
            var new_deck = [];
            for(var i = 0; i <= deck.length -1; i++){
                new_baralho.push(i);
                
            }

            for(var j = 1; j <= 52; j++){
               var aleatorio = Math.round(Math.random()*(new_baralho.length - 1));
               var index = new_baralho[aleatorio];
               new_deck.push(deck[index]);
               new_baralho.splice(aleatorio, 1);
            }
            // this.checkDeck(new_baralho);
            return new_deck
        };


        // baralho de cartas baralhado
        this.deck = this.shuffle(this.new_deck());
        // this.checkDeck(this.deck)
        // console.log(this.deck)
        //this.deck = this.new_deck();
    }

    // checkDeck = function (deck) {
    //     console.log(deck)
    //     var temp = []
    //     deck.forEach(card => {
    //         if(temp.includes(card)) {
    //             console.log('DUPLICATED CARD')
    //         }
    //         else {
    //             temp.push(card)
    //         }
    //     })
    // }
        
    // métodos
    // devolve as cartas do dealer num novo array (splice)
    get_dealer_cards() {
        return this.dealer_cards.slice();
    }

    // devolve as cartas do player num novo array (splice)
    get_player_cards() {
        return this.player_cards.slice();
    }

    // Ativa a variável booleana "dealerTurn"
    setDealerTurn (val) {
        this.dealerTurn = val;
    }

    //MÉTODOS QUE DEVEM SER IMPLEMENTADOS PELOS ALUNOS
    get_cards_value(cards) {
        var somaCartas = 0; 
        var hasAce = false;

        for(var i = 0; i < cards.length; i++){

            if(!cards[i].hidden || this.dealerTurn === true){

                if(cards[i].valor === "11" || cards[i].valor === "12" || cards[i].valor === "13"){                
                    somaCartas += 10;
                }

                else if(cards[i].valor === "1"){
                    somaCartas += 1; 
                    hasAce = true;
                }
                
                else{
                    somaCartas += parseInt(cards[i].valor); 
                }
            
            }
        }
        if(somaCartas + 10 <= MAX_POINTS && hasAce){
            somaCartas += 10;
        }
        // console.log(somaCartas);
        
        return somaCartas;

    }
    

    dealer_move(hidden = false) {
        
        var nova_carta = this.deck.pop();
        this.dealer_cards.push({...nova_carta, hidden});
        
        return this.get_game_state();
    }


    player_move() {
        var nova_carta = this.deck.pop();
        this.player_cards.push(nova_carta);
        // console.log(this.player_cards)
        return this.get_game_state();

    }

    //player_move()

    get_game_state(){

        var dealer_points = this.get_cards_value(this.dealer_cards);
        var player_points = this.get_cards_value(this.player_cards);

        if(dealer_points > MAX_POINTS - 5){
            this.state = {
                ...this.state,
                'gameEnded': true,
                'dealerWon': dealer_points > player_points && dealer_points < MAX_POINTS
            }
        }

        if(player_points === MAX_POINTS){
            this.state = {
                ...this.state,
                'gameEnded': true,
            }
        }

        if(player_points > MAX_POINTS){
            this.state = {
                'gameEnded': true,
                'dealerWon': true,
                'playerBusted': true
            }
        }

        return this.state;

    }
}

