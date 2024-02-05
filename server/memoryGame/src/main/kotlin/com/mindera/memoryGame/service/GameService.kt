package com.mindera.memoryGame.service

import com.mindera.memoryGame.entity.CardEntity
import com.mindera.memoryGame.exceptions.AlreadyFlippedException
import com.mindera.memoryGame.repo.GameRepo
import org.springframework.stereotype.Service

@Service
class GameService(val gameRepo: GameRepo) {
    fun startGame(){
gameRepo.startGame()
    }

    fun getCard(indexOfCard : Int, valueOfCurrCard: Int) : Boolean{
        var checkCard = gameRepo.getCard(indexOfCard)
        if (checkCard != null) {
            if(checkCard.getCardValue() == valueOfCurrCard){
                return true
            }else{
                return false
            }
        }
   return false }

    fun getCard(indexOfCard : Int) : CardEntity? {
        if(!(gameRepo.getCard(indexOfCard)?.flipped)!!) {
            gameRepo.getCard(indexOfCard)!!.setCardFlipped()
            return gameRepo.getCard(indexOfCard)
        }
        else{
            throw AlreadyFlippedException("This card was already flipped!")
        }
    }

    fun getCards() : List<CardEntity>{
        return gameRepo.getCards()
    }
}