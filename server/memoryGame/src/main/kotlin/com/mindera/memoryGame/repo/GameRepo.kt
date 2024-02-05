package com.mindera.memoryGame.repo

import com.mindera.memoryGame.entity.CardEntity
import org.springframework.stereotype.Repository

@Repository
class GameRepo {
    private val gameField: MutableList<CardEntity> = mutableListOf()

    fun startGame(){
        var x = 0
        for(i in 0..20){
            val cardEntity = CardEntity.Builder().value(if (i >= 10) i - 10 else i).build()
            gameField.add(cardEntity)
        }
    }
    fun getCard(indexOfCard: Int): CardEntity? {
        return gameField.getOrNull(indexOfCard)
    }

    fun getCards() : List<CardEntity>{
        return gameField
    }

}
