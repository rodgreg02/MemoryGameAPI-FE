package com.mindera.memoryGame.repo

import com.mindera.memoryGame.entity.CardEntity
import org.springframework.stereotype.Repository

@Repository
class GameRepo {
    private val gameField: MutableList<CardEntity> = mutableListOf()

    fun startGame(){
        for(i in 0..19){
            val cardEntity = CardEntity.Builder().value(if (i >= 10) i - 10 else i).build()
            gameField.add(cardEntity)
        }
        gameField.shuffle()
        for(i in 0..19){
            println(gameField[i].getCardValue())
        }
    }
    fun getCard(indexOfCard: Int) = gameField.getOrNull(indexOfCard)

    fun getAllCards() = gameField

    fun restartGame(){
        gameField.forEach{
            it.setCardFlippedFalse();
        }
    }
}
