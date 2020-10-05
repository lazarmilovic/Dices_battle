$(document).ready(function(){
    const start= $('#start');
    const roll= $('#roll');
    const dice1= $('#dice_1');
    const dice2= $('#dice_2');
    const player1= $('#player1_info');
    const player2= $('#player2_info');
    const player1_div= $('#player_1');
    const player2_div=$('#player_2');
    const player1_energy= $('#player1_health_background_green');
    const player2_energy= $('#player2_health_background_green');
    const player1_health= $('#player1_health');
    const player2_health= $('#player2_health');

    let totalDices;
    let plr1;
    let plr2;
    let activePlayer= 1;
    let woundedPlayer= 2;

    //making roll button unavailable when the script is loaded so users cannot start rolling before the game is started. 
    roll.css('visibility', 'hidden');
    
   
    class Player{
        constructor(name, health){
            this.name= name;
            this.health= 100;
        }
        //a method wich will be used to reduce the health of each player
        gotWounded(damage){
            this.health= this.health- damage;
        }
    }
    // this function will roll the dices
    let startRolling = function(){
        //getting two random numbers in 1-6 range for two dices
        let dice_1 = Math.floor(Math.random() * 6) + 1;
        let dice_2 = Math.floor(Math.random() * 6) + 1;
        //changing the source for each dice img depending of a number on a lines above
        dice1.attr('src',`img/${dice_1}.png`);
        dice2.attr('src',`img/${dice_2}.png`);
        //getting the total summary for both dices which will be deducted from the total health of a player
        totalDices= dice_1+ dice_2;
        //setting up a new player's health after 'a hit'
        if(woundedPlayer===2){
            plr2.gotWounded(totalDices);
            //changing the height of the div with a green background which represents the health of the player- the initial value was 100px and the initial value of player's health was 100 so the heigth of the div will represent the player's health in every moment.
            player2_energy.css('height', plr2.health);
            //setting up a new health for player 2 if he is the one 'wounded'.
            player2_health.html(plr2.health);
            //checking if any of the players won with the delay of 1 second, so everythng can be displayed and visible preperly.
            setTimeout(function(){
                checkVictory(plr1.health,plr2.health) }, 1000
           );

        } else {
            plr1.gotWounded(totalDices);
            player1_energy.css('height', plr1.health);
            player1_health.html(plr1.health);
            setTimeout(function(){
                checkVictory(plr1.health,plr2.health) }, 1000
            );

        }
    }

    //checking if any of the player won the game. This function will be called after each rolling. 
    let checkVictory= function(player1, player2){
        if(player1<=0){
            alert(`${plr2.name} won!`);
        } else if(player2<=0) {
            alert(`${plr2.name} won!`);
        }
    }

    //this function will change the active player, the wounded player and will toggle the active class between players so both playes can see who's turn to roll the dices in next. Will be called after each rolling. 
    let changeActivePlayer = function() { 
        activePlayer===1 ? activePlayer=2 : activePlayer=1; 
        woundedPlayer===2 ? woundedPlayer=1 : woundedPlayer= 2;
        player1_div.toggleClass("active");
        player2_div.toggleClass("active");
        
    }

    //this function will disable click event on the roll button. The purpuse of it is to prevent quick and multiple clicking on the button before the effects of a previuos move are visible and shown. Will be called after each rolling. 
    let disableRolling = function(){
    
        roll.css({'background':'grey', 'pointer-events':'none'});
    }
    //this function will enable rolling again so the next player can continue with the play. Will be called after disableRolling function with the delay of 2 seconds, so players can see the reuslt of a previous rolling while they are unable to roll. 
    let enableRolling= function(){
    
        roll.css({'background':'darkolivegreen', 'pointer-events': 'auto'});
    } 
    

    roll.click(function(){
        startRolling();

        disableRolling();
        
        changeActivePlayer();

        setTimeout(function(){
            enableRolling()}, 2000
        ); 

        
    })
    //setting up an event listener for start button
    start.click(function(){
        // getting the values from prompts and assigning them to new objects as 'name' preperties. 
        let player1_name=  prompt('Please enter Player 1 name');
        let player2_name= prompt('Please enter Player 2 name');

        plr1= new Player(player1_name);
        plr2= new Player(player2_name);

        player1.html(player1_name);
        player2.html(player2_name);

        //making the roll button available after player names are set up and hidding the start button so users cannot re-start the game in the middle of it.
        roll.css('visibility', 'visible');
        start.css('visibility', 'hidden');
    });

});