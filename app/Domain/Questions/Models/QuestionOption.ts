import { BaseModel, column, belongsTo, BelongsTo, } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'

import Question from 'App/Domain/Questions/Models/Question'

class QuestionOption extends BaseModel {
    public static table: string = 'questions_options'

    @column({ isPrimary: true })
    public id: number

    @column()
    public questionId: number

    @column()
    public text: string

    @column.dateTime({ autoCreate: true })
    public createdAt: DateTime

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    public updatedAt: DateTime

    @belongsTo(() => Question)
    public survey: BelongsTo<typeof Question>
}

export default QuestionOption
